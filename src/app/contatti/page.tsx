'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
	Phone, 
	Mail, 
	MapPin, 
	Clock,
	Building,
	Users,
	Handshake,
	Star
} from 'lucide-react'

// Animation variants from design system
const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const slideInLeft = {
	hidden: { opacity: 0, x: -50 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

const slideInRight = {
	hidden: { opacity: 0, x: 50 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.2 }
	}
}

const scaleIn = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

export default function ContattiPage() {
	const benefits = [
		{
			icon: Star,
			title: "Prodotti di Qualità",
			description: "Accesso prioritario a una gamma completa di prodotti di alta qualità"
		},
		{
			icon: Users,
			title: "Supporto Completo", 
			description: "Assistenza tempestiva e approvvigionamento ricambi garantito"
		},
		{
			icon: Handshake,
			title: "Partnership Solida",
			description: "Una partnership che si basa su risultati concreti e duraturi"
		}
	]

	return (
		<div className="w-full">
			{/* Hero Section - Diventa rivenditore */}
			<section className="relative py-16 md:py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
				<div className="absolute inset-0 bg-black/10" />
				<div className="relative container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
						<motion.div
							initial="hidden"
							animate="visible"
							variants={slideInLeft}
						>
							<Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Partnership</Badge>
							<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
								Diventa rivenditore
							</h1>
							<div className="space-y-4 text-base md:text-lg mb-8 text-white/95">
								<p>
									Diventare rivenditore di Vitale offre diverse ragioni convincenti. 
									Innanzitutto, l'azienda offre una vasta gamma di veicoli elettrici di alta qualità, 
									che coprono diverse categorie.
								</p>
								<p>
									Inoltre, Vitale fornisce un supporto professionale completo ai propri rivenditori. 
									Questo include assistenza nella gestione delle vendite, formazione sul prodotto, 
									supporto marketing e servizi post-vendita.
								</p>
							</div>
							<Button 
								size="lg" 
								className="bg-white text-orange-600 hover:bg-gray-100 hover:text-orange-700 font-semibold"
							>
								Richiedi Informazioni
							</Button>
						</motion.div>
						
						<motion.div
							initial="hidden"
							animate="visible"
							variants={slideInRight}
						>
							<div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
								<Image
									src="/images/partnership.jpg"
									alt="Diventa rivenditore Vitale"
									fill
									className="object-cover object-center"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Vantaggi Partnership */}
			<section className="py-12 md:py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<motion.div
						className="text-center mb-8 md:mb-12"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeInUp}
					>
						<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
							Perché scegliere Vitale
						</h2>
						<p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
							Vantaggi esclusivi per i nostri partner commerciali
						</p>
					</motion.div>

					<motion.div 
						className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
					>
						{benefits.map((benefit, index) => {
							const IconComponent = benefit.icon
							return (
								<motion.div key={index} variants={scaleIn}>
									<Card className="text-center p-6 md:p-8 hover:shadow-lg transition-shadow h-full">
										<CardHeader>
											<div className="mx-auto mb-4 w-14 h-14 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center">
												<IconComponent className="text-orange-500" size={28} />
											</div>
											<CardTitle className="text-lg md:text-xl font-bold text-gray-900">
												{benefit.title}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-sm md:text-base text-gray-600">
												{benefit.description}
											</CardDescription>
										</CardContent>
									</Card>
								</motion.div>
							)
						})}
					</motion.div>
				</div>
			</section>

			{/* Informazioni di Contatto */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
						{/* Form di Contatto */}
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={slideInLeft}
						>
							<Card className="p-6 md:p-8">
								<CardHeader className="px-0 pt-0">
									<CardTitle className="text-2xl font-bold text-gray-900 mb-2">
										Contattaci
									</CardTitle>
									<CardDescription className="text-gray-600">
										Compila il form per richiedere informazioni sui nostri veicoli elettrici
									</CardDescription>
								</CardHeader>
								<CardContent className="px-0 pb-0">
									<form className="space-y-4">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
													Nome *
												</label>
												<input
													type="text"
													id="nome"
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
													required
												/>
											</div>
											<div>
												<label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-2">
													Cognome *
												</label>
												<input
													type="text"
													id="cognome"
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
													required
												/>
											</div>
										</div>
										<div>
											<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
												Email *
											</label>
											<input
												type="email"
												id="email"
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
												required
											/>
										</div>
										<div>
											<label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
												Telefono
											</label>
											<input
												type="tel"
												id="telefono"
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
											/>
										</div>
										<div>
											<label htmlFor="messaggio" className="block text-sm font-medium text-gray-700 mb-2">
												Messaggio *
											</label>
											<textarea
												id="messaggio"
												rows={5}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
												placeholder="Scrivi qui il tuo messaggio..."
												required
											/>
										</div>
										<div className="flex items-start gap-2">
											<input
												type="checkbox"
												id="privacy"
												className="mt-1"
												required
											/>
											<label htmlFor="privacy" className="text-xs text-gray-600">
												Accetto l'informativa sulla{' '}
												<Link href="/privacy-policy" className="text-orange-500 hover:text-orange-600 underline">
													privacy policy
												</Link>
											</label>
										</div>
										<Button 
											type="submit"
											size="lg" 
											className="w-full bg-orange-500 hover:bg-orange-600 text-white"
										>
											Invia Messaggio
										</Button>
									</form>
								</CardContent>
							</Card>
						</motion.div>

						{/* Informazioni di Contatto */}
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={slideInRight}
						>
							<div className="space-y-6 md:space-y-8">
								{/* Recapiti */}
								<Card className="p-6 md:p-8">
									<CardHeader className="px-0 pt-0">
										<CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
											<Phone className="text-orange-500" size={24} />
											Recapiti
										</CardTitle>
									</CardHeader>
									<CardContent className="px-0 pb-0">
										<div className="space-y-4">
											<div className="flex items-center gap-3">
												<MapPin className="text-orange-500 flex-shrink-0" size={20} />
												<div>
													<p className="font-medium">Via Messina Montagne, 6</p>
													<p className="text-sm text-gray-600">90121 Palermo (PA)</p>
												</div>
											</div>
											<div className="flex items-center gap-3">
												<Phone className="text-orange-500 flex-shrink-0" size={20} />
												<a 
													href="tel:0916145377"
													className="text-gray-900 hover:text-orange-500 transition-colors font-medium"
												>
													0916145377
												</a>
											</div>
											<div className="flex items-center gap-3">
												<Mail className="text-orange-500 flex-shrink-0" size={20} />
												<a 
													href="mailto:info@vitale-eu.it"
													className="text-gray-900 hover:text-orange-500 transition-colors"
												>
													info@vitale-eu.it
												</a>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Orari */}
								<Card className="p-6 md:p-8">
									<CardHeader className="px-0 pt-0">
										<CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
											<Clock className="text-orange-500" size={24} />
											Orari di apertura
										</CardTitle>
									</CardHeader>
									<CardContent className="px-0 pb-0">
										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="font-medium">Lun – Ven:</span>
												<span className="text-gray-600">09:00 – 13:00 / 15:30 – 19:00</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">Sabato:</span>
												<span className="text-gray-600">09:00 – 13:00</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">Domenica:</span>
												<span className="text-red-500">CHIUSO</span>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Informazioni Aziendali */}
								<Card className="p-6 md:p-8">
									<CardHeader className="px-0 pt-0">
										<CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
											<Building className="text-orange-500" size={24} />
											Informazioni Aziendali
										</CardTitle>
									</CardHeader>
									<CardContent className="px-0 pb-0">
										<div className="space-y-2 text-sm">
											<p><span className="font-medium">Ragione Sociale:</span> EUROSUD S.R.L.</p>
											<p><span className="font-medium">P.IVA:</span> 04165720824</p>
											<p><span className="font-medium">Fax:</span> 0916145372</p>
										</div>
									</CardContent>
								</Card>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<motion.section 
				className="py-12 md:py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeInUp}
			>
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
						Pronto a unirti alla rivoluzione elettrica?
					</h2>
					<p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/95 max-w-2xl mx-auto">
						Contattaci oggi stesso per scoprire le opportunità di partnership con Vitale
					</p>
					<div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
						<Button 
							size="lg" 
							className="bg-white text-orange-600 hover:bg-gray-100 hover:text-orange-700 font-semibold w-full sm:w-auto"
						>
							Chiama Ora
						</Button>
						<Button 
							size="lg" 
							className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-semibold w-full sm:w-auto"
						>
							Invia Email
						</Button>
					</div>
				</div>
			</motion.section>
		</div>
	)
}
