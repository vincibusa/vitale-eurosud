'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Send, Bot, User, Loader2, MessageCircle, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getApiBaseUrl } from '@/lib/api-config'

export interface ChatMessage {
	id: string
	role: 'customer' | 'operator' | 'ai'
	content: string
	createdAt: string
}

interface CustomerInfo {
	firstName: string
	lastName: string
	email: string
	phone: string
}

export function CustomerChatWidget() {
	const [isOpen, setIsOpen] = useState(false)
	const [sessionId, setSessionId] = useState<string>('')
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isTyping, setIsTyping] = useState(false)
	const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
		firstName: '',
		lastName: '',
		email: '',
		phone: ''
	})
	const [isRegistered, setIsRegistered] = useState(false)
	const [isRegistering, setIsRegistering] = useState(false)
	const [hasRequestedOperator, setHasRequestedOperator] = useState(false)
	const scrollAreaRef = useRef<HTMLDivElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		if (scrollAreaRef.current) {
			scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
		}
	}, [messages])

	// Nessuna subscription realtime necessaria - la chat si chiude quando viene richiesto l'operatore

	const handleRegister = async () => {
		// Validazione campi obbligatori
		if (!customerInfo.firstName.trim() || !customerInfo.lastName.trim() || !customerInfo.email.trim() || !customerInfo.phone.trim()) {
			alert('Tutti i campi sono obbligatori')
			return
		}

		// Validazione email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(customerInfo.email)) {
			alert('Inserisci un indirizzo email valido')
			return
		}

		try {
			setIsRegistering(true)
			const response = await fetch(`${getApiBaseUrl()}/api/public/customer-chat/sessions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					firstName: customerInfo.firstName.trim(),
					lastName: customerInfo.lastName.trim(),
					email: customerInfo.email.trim(),
					phone: customerInfo.phone.trim()
				})
			})

			if (response.ok) {
				const data = await response.json()
				setSessionId(data.sessionId)
				setIsRegistered(true)

				// Aggiungi messaggio di benvenuto
				const welcomeMessage: ChatMessage = {
					id: crypto.randomUUID(),
					role: 'ai',
					content: 'Ciao! Sono l\'assistente AI di Vitale Eurosud. Posso aiutarti a trovare informazioni sui nostri veicoli. Cosa ti interessa sapere?',
					createdAt: new Date().toISOString()
				}
				setMessages([welcomeMessage])
			} else {
				const errorData = await response.json()
				alert(`Errore durante la registrazione: ${errorData.error}`)
			}
		} catch {
			alert('Errore di connessione. Riprova più tardi.')
		} finally {
			setIsRegistering(false)
		}
	}

	const handleSendMessage = async () => {
		if (!inputValue.trim() || isLoading || !sessionId) return

		const userMessage: ChatMessage = {
			id: crypto.randomUUID(),
			role: 'customer',
			content: inputValue.trim(),
			createdAt: new Date().toISOString()
		}

		// Aggiungi messaggio utente immediatamente
		setMessages(prev => [...prev, userMessage])
		setInputValue('')
		setIsLoading(true)
		setIsTyping(true)

		try {
			// Salva il messaggio del cliente
			const saveResponse = await fetch(`${getApiBaseUrl()}/api/public/customer-chat/messages`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					sessionId,
					message: userMessage.content,
					messageType: 'customer'
				})
			})
			
			if (!saveResponse.ok) {
				// Errore salvataggio messaggio - continua comunque
			}

			// Se un operatore è stato richiesto, non permettere più messaggi
			if (hasRequestedOperator) {
				setIsLoading(false)
				setIsTyping(false)
				return
			}

			// Genera risposta AI solo se non c'è operatore assegnato
			const aiResponse = await fetch(`${getApiBaseUrl()}/api/public/customer-chat/ai-response`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					sessionId,
					message: userMessage.content
				})
			})
			
			if (!aiResponse.ok) {
				setIsLoading(false)
				setIsTyping(false)
				return
			}

			if (aiResponse.ok) {
				const reader = aiResponse.body?.getReader()
				const decoder = new TextDecoder()
				let aiMessageContent = ''

				if (reader) {
					while (true) {
						const { done, value } = await reader.read()
						if (done) break

						const chunk = decoder.decode(value)
						const lines = chunk.split('\n')

						for (const line of lines) {
							if (line.startsWith('data: ')) {
								const data = line.slice(6)
								if (data === '[DONE]') break

								try {
									const parsed = JSON.parse(data)
									if (parsed.content) {
										aiMessageContent += parsed.content
										setMessages(prev => {
											const lastMessage = prev[prev.length - 1]
											if (lastMessage.role === 'ai' && lastMessage.id === 'ai-streaming') {
												return [...prev.slice(0, -1), {
													...lastMessage,
													content: aiMessageContent
												}]
											} else {
												return [...prev, {
													id: 'ai-streaming',
													role: 'ai',
													content: aiMessageContent,
													createdAt: new Date().toISOString()
												}]
											}
										})
									}
								} catch {
									// Ignora errori di parsing
								}
							}
						}
					}
				}

				// Sostituisci il messaggio streaming con quello finale
				setMessages(prev => {
					const filtered = prev.filter(msg => msg.id !== 'ai-streaming')
					return [...filtered, {
						id: crypto.randomUUID(),
						role: 'ai',
						content: aiMessageContent,
						createdAt: new Date().toISOString()
					}]
				})
			} else {
				const errorData = await aiResponse.json()
				const errorMessage: ChatMessage = {
					id: crypto.randomUUID(),
					role: 'ai',
					content: `Errore: ${errorData.error || 'Impossibile processare la richiesta'}`,
					createdAt: new Date().toISOString()
				}
				setMessages(prev => [...prev, errorMessage])
			}
		} catch {
			const errorMessage: ChatMessage = {
				id: crypto.randomUUID(),
				role: 'ai',
				content: 'Errore di connessione. Riprova più tardi.',
				createdAt: new Date().toISOString()
			}
			setMessages(prev => [...prev, errorMessage])
		} finally {
			setIsLoading(false)
			setIsTyping(false)
		}
	}

	const handleRequestOperator = async () => {
		if (!sessionId || hasRequestedOperator) return

		try {
			const response = await fetch(`${getApiBaseUrl()}/api/public/customer-chat/operator-request`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ sessionId })
			})

			if (response.ok) {
				setHasRequestedOperator(true)
				
				// Mostra messaggio finale e chiudi la chat dopo 3 secondi
				const finalMessage: ChatMessage = {
					id: crypto.randomUUID(),
					role: 'ai',
					content: 'Grazie per la tua richiesta! Un nostro operatore ti contatterà a breve via telefono o email all\'indirizzo che hai fornito. A presto!',
					createdAt: new Date().toISOString()
				}
				setMessages(prev => [...prev, finalMessage])
				
				// Chiudi automaticamente la chat dopo 3 secondi
				setTimeout(() => {
					resetChat()
				}, 3000)
			} else {
				const errorData = await response.json()
				alert(`Errore nella richiesta operatore: ${errorData.error}`)
			}
		} catch {
			alert('Errore di connessione. Riprova più tardi.')
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	const formatTimestamp = (timestamp: string) => {
		return new Date(timestamp).toLocaleTimeString('it-IT', {
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	const resetChat = () => {
		setIsOpen(false)
		setTimeout(() => {
			setSessionId('')
			setMessages([])
			setCustomerInfo({
				firstName: '',
				lastName: '',
				email: '',
				phone: ''
			})
			setIsRegistered(false)
			setHasRequestedOperator(false)
		}, 300)
	}

	return (
		<>
			{/* Floating Button - BMW Style */}
			{!isOpen && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 260, damping: 20 }}
					className="fixed bottom-6 right-6 z-50"
				>
					<Button
						onClick={() => setIsOpen(true)}
						className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand-dark border-4 border-white transition-all duration-300 hover:scale-110"
						size="icon"
					>
						<MessageCircle className="h-7 w-7 text-white" strokeWidth={1.5} />
					</Button>
					<motion.div
						className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ repeat: Infinity, duration: 2 }}
					/>
				</motion.div>
			)}

			{/* Overlay for mobile */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/40 sm:bg-transparent z-40 sm:z-auto"
					onClick={() => resetChat()}
					aria-hidden="true"
				/>
			)}

			{/* Chat Widget - BMW Style */}
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 20, scale: 0.95 }}
					transition={{ duration: 0.2 }}
					className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-24 sm:right-6 w-auto sm:w-96 z-50"
				>
					<Card className="h-[calc(100vh-100px)] sm:h-[600px] max-h-[600px] shadow-2xl flex flex-col overflow-hidden border-0 p-0">
						{/* Header con gradiente blu BMW */}
						<CardHeader className="py-4 sm:py-5 pb-3 flex-shrink-0 bg-gradient-to-r from-brand to-brand-dark text-white">
							<div className="flex items-center justify-between">
								<CardTitle className="flex items-center gap-3 text-sm sm:text-base font-semibold text-white">
									<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-none bg-white/20 flex items-center justify-center">
										<Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" strokeWidth={1.5} />
									</div>
									<div className="text-white">
										<div className="truncate text-white">Assistente Vitale</div>
										<div className="text-xs font-normal text-white">
											{isTyping ? 'Sta scrivendo...' : 'Online ora'}
										</div>
									</div>
								</CardTitle>
								<Button
									onClick={resetChat}
									variant="ghost"
									size="icon"
									className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-white/20 text-white"
								>
									<X className="h-4 w-4 sm:h-5 sm:w-5 text-white" strokeWidth={1.5} />
								</Button>
							</div>
						</CardHeader>
					
					<Separator className="flex-shrink-0" />
					
					<CardContent className="flex flex-col p-0 flex-1 min-h-0 overflow-hidden">
						{/* Registration Form or Chat */}
						{!isRegistered ? (
							<div className="flex-1 p-4 sm:p-6 flex flex-col justify-center overflow-y-auto">
								<div className="space-y-4 sm:space-y-6">
									<div className="text-center space-y-2">
										<h3 className="text-base sm:text-lg font-semibold">Inizia una chat</h3>
										<p className="text-xs sm:text-sm text-muted-foreground">
											Inserisci i tuoi dati per iniziare a chattare con il nostro assistente
										</p>
									</div>
									
									<div className="space-y-3 sm:space-y-4">
										<div className="grid grid-cols-2 gap-2 sm:gap-3">
											<Input
												placeholder="Nome"
												value={customerInfo.firstName}
												onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
												className="h-9 sm:h-10 text-sm"
											/>
											<Input
												placeholder="Cognome"
												value={customerInfo.lastName}
												onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
												className="h-9 sm:h-10 text-sm"
											/>
										</div>
										<Input
											placeholder="Email"
											type="email"
											value={customerInfo.email}
											onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
											className="h-9 sm:h-10 text-sm"
										/>
										<Input
											placeholder="Telefono"
											type="tel"
											value={customerInfo.phone}
											onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
											className="h-9 sm:h-10 text-sm"
										/>
									</div>

									<Button
										onClick={handleRegister}
										disabled={isRegistering}
										className="w-full h-10 sm:h-11 font-medium text-sm sm:text-base"
									>
										{isRegistering ? (
											<>
												<Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2 animate-spin" />
												Registrazione...
											</>
										) : (
											'Inizia Chat'
										)}
									</Button>
								</div>
							</div>
						) : (
							<>
								{/* Messages Area - Fixed height with proper scrolling */}
								<div 
									className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0" 
									ref={scrollAreaRef}
								>
									{messages.map((message) => (
										<div
											key={message.id}
											className={cn(
												'flex gap-2 sm:gap-3 animate-in slide-in-from-bottom-2 duration-300',
												message.role === 'customer' ? 'justify-end' : 'justify-start'
											)}
										>
											{message.role === 'ai' && (
												<Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
													<AvatarFallback className="bg-primary/10">
														<Bot className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
													</AvatarFallback>
												</Avatar>
											)}
											
											<div
												className={cn(
													'max-w-[85%] rounded-none px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm shadow-sm',
													message.role === 'customer'
														? 'bg-primary text-primary-foreground rounded-br-md'
														: 'bg-muted rounded-bl-md'
												)}
											>
												<div className="whitespace-pre-wrap leading-relaxed break-words">{message.content}</div>
												<div className="text-[10px] sm:text-xs opacity-70 mt-1 sm:mt-2">
													{formatTimestamp(message.createdAt)}
												</div>
											</div>
											
											{message.role === 'customer' && (
												<Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
													<AvatarFallback className="bg-primary">
														<User className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
													</AvatarFallback>
												</Avatar>
											)}
										</div>
									))}
									
									{isTyping && (
										<div className="flex gap-2 sm:gap-3 justify-start animate-in slide-in-from-bottom-2 duration-300">
											<Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
												<AvatarFallback className="bg-primary/10">
													<Bot className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
												</AvatarFallback>
											</Avatar>
											<div className="bg-muted rounded-none rounded-bl-md px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm shadow-sm">
												<div className="flex items-center gap-2">
													<Loader2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 animate-spin" />
													<span>Digitando...</span>
												</div>
											</div>
										</div>
									)}
								</div>
								
								{/* Input Area - Fixed at bottom */}
								{hasRequestedOperator ? (
									<div className="border-t bg-background/50 p-3 sm:p-4 flex-shrink-0">
										<div className="text-center text-xs sm:text-sm text-muted-foreground">
											La chat si chiuderà automaticamente...
										</div>
									</div>
								) : (
									<div className="border-t bg-background/50 p-3 sm:p-4 flex-shrink-0">
										<div className="flex gap-2 sm:gap-3 items-end">
											<div className="flex-1 relative">
												<Textarea
													ref={textareaRef}
													value={inputValue}
													onChange={(e) => setInputValue(e.target.value)}
													onKeyDown={handleKeyPress}
													placeholder="Chiedi informazioni sui nostri veicoli..."
													className="min-h-[40px] sm:min-h-[44px] max-h-[100px] sm:max-h-[120px] resize-none pr-10 sm:pr-12 rounded-none border-0 bg-muted/50 focus:bg-background transition-colors text-xs sm:text-sm"
													disabled={isLoading}
												/>
												<Button
													onClick={handleSendMessage}
													disabled={!inputValue.trim() || isLoading}
													size="icon"
													className="absolute right-1.5 sm:right-2 bottom-1.5 sm:bottom-2 h-7 w-7 sm:h-8 sm:w-8 rounded-none"
												>
													{isLoading ? (
														<Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
													) : (
														<Send className="h-3 w-3 sm:h-4 sm:w-4" />
													)}
												</Button>
											</div>
										</div>
										
										<div className="mt-2 sm:mt-3">
											<Button
												onClick={handleRequestOperator}
												variant="outline"
												size="sm"
												className="w-full text-[10px] sm:text-xs h-7 sm:h-8 rounded-none"
											>
												<Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1.5 sm:mr-2" />
												Parla con un operatore
											</Button>
										</div>
										
										<p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2 text-center">
											Premi Invio per inviare, Shift+Invio per andare a capo
										</p>
									</div>
								)}
							</>
						)}
					</CardContent>
				</Card>
				</motion.div>
			)}
		</>
	)
}