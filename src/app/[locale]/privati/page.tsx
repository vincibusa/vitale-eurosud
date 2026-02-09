'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import {
	Wallet,
	Shield,
	Zap,
	Headphones,
	Gift,
	ArrowRight,
	Phone,
	Mail,
	Percent
} from 'lucide-react'

const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const fadeIn = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.8 } }
}

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.2 }
	}
}

export default function PrivatiPage() {
	const t = useTranslations()

	const benefits = [
		{
			icon: Percent,
			title: 'Ecobonus 2024',
			description: 'Approfitta degli incentivi statali fino a 5.000€ per l\'acquisto di veicoli elettrici.'
		},
		{
			icon: Wallet,
			title: 'Finanziamenti Agevolati',
			description: 'Rate personalizzate, tassi competitivi e anticipo zero su tutti i nostri veicoli.'
		},
		{
			icon: Shield,
			title: 'Garanzia Estesa',
			description: 'Fino a 3 anni di garanzia completa su tutti i componenti e assistenza dedicata.'
		},
		{
			icon: Zap,
			title: 'Test Drive Gratuito',
			description: 'Prova i nostri veicoli prima dell\'acquisto, senza impegno e gratuitamente.'
		},
		{
			icon: Headphones,
			title: 'Consulenza Personalizzata',
			description: 'I nostri esperti ti aiutano a trovare il veicolo perfetto per le tue esigenze.'
		},
		{
			icon: Gift,
			title: 'Promozioni Esclusive',
			description: 'Offerte speciali riservate ai clienti privati e accessori in omaggio.'
		}
	]

	return (
		<div className="w-full">
			{/* Hero Section */}
			<section className="relative h-[60vh] min-h-[500px] overflow-hidden">
				<motion.div
					className="absolute inset-0"
					initial="hidden"
					animate="visible"
					variants={fadeIn}
				>
					<Image
						src="/immagini/rivenditore-privato-11.png"
						alt="Per Privati Vitale"
						fill
						className="object-cover object-center"
						priority
					/>
				</motion.div>
				<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
				
				<div className="relative container mx-auto px-4 h-full flex items-center">
					<motion.div
						className="max-w-2xl text-white"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeInUp}
					>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
							Veicoli Elettrici<br />
							<span className="text-brand-light">per Privati</span>
						</h1>
						<p className="text-xl md:text-2xl text-white/80 mb-8 font-light">
							Scopri la libertà della mobilità sostenibile. 
							Qualità, convenienza e rispetto per l'ambiente.
						</p>
						<div className="flex flex-wrap gap-4">
							<Link href="/biciclette">
								<Button
									size="lg"
									className="bg-brand hover:bg-brand-dark text-white font-semibold px-8"
								>
									Esplora i Modelli
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>
							</Link>
							<a href={`tel:${t('common.phone')}`}>
								<Button
									size="lg"
									variant="outline"
									className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-black font-semibold px-8"
								>
									<Phone className="mr-2 h-5 w-5" />
									Chiamaci Ora
								</Button>
							</a>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-16 md:py-24 bg-gray-50">
				<div className="container mx-auto px-4">
					<motion.div
						className="text-center mb-16"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeInUp}
					>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
							Vantaggi Esclusivi
						</h2>
						<p className="text-lg text-gray-600 max-w-3xl mx-auto">
							Acquistare da Vitale significa scegliere qualità, convenienza e un servizio completo
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainer}
					>
						{benefits.map((benefit, index) => {
							const Icon = benefit.icon
							return (
								<motion.div key={index} variants={fadeInUp}>
									<Card className="h-full hover:shadow-xl transition-shadow duration-300 border-0">
										<CardContent className="p-6 md:p-8">
											<div className="w-14 h-14 bg-brand/10 rounded-none flex items-center justify-center mb-4">
												<Icon className="h-7 w-7 text-brand" />
											</div>
											<h3 className="text-xl font-bold text-gray-900 mb-2">
												{benefit.title}
											</h3>
											<p className="text-gray-600">
												{benefit.description}
											</p>
										</CardContent>
									</Card>
								</motion.div>
							)
						})}
					</motion.div>
				</div>
			</section>

			{/* Contact Form Section */}
			<section className="py-16 md:py-24 bg-white">
				<div className="container mx-auto px-4">
					<motion.div
						className="max-w-4xl mx-auto"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeInUp}
					>
						<Card className="border border-gray-200">
							<CardHeader>
								<CardTitle className="text-2xl md:text-3xl text-gray-900">Richiedi informazioni</CardTitle>
								<p className="text-gray-600">
									Compila il form per ricevere un contatto personalizzato sui nostri veicoli elettrici.
								</p>
							</CardHeader>
							<CardContent>
								<form className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
											<input id="nome" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
										</div>
										<div>
											<label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-2">Cognome</label>
											<input id="cognome" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
										</div>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
											<input id="email" type="email" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
										</div>
										<div>
											<label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
											<input id="telefono" type="tel" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
										</div>
									</div>
									<div>
										<label htmlFor="comune" className="block text-sm font-medium text-gray-700 mb-2">Comune</label>
										<input id="comune" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
									</div>
									<div>
										<label htmlFor="messaggio" className="block text-sm font-medium text-gray-700 mb-2">Messaggio</label>
										<textarea id="messaggio" rows={5} className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
									</div>
									<div className="flex items-start gap-2">
										<input id="privacy" type="checkbox" className="mt-1" required />
										<label htmlFor="privacy" className="text-sm text-gray-600">
											Accetto l&apos;informativa sulla{' '}
											<Link href="/privacy-policy" className="text-brand hover:text-brand-dark underline">
												privacy policy
											</Link>
											.
										</label>
									</div>
									<Button type="submit" size="lg" className="w-full bg-brand hover:bg-brand-dark text-white font-semibold">
										Invia
									</Button>
								</form>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 md:py-24 bg-brand">
				<div className="container mx-auto px-4">
					<motion.div
						className="text-center text-white"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeInUp}
					>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
							Pronto a Passare all'Elettrico?
						</h2>
						<p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
							Contattaci per una consulenza gratuita e senza impegno. 
							Ti aiuteremo a trovare il veicolo perfetto per te.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Link href="/contatti">
								<Button
									size="lg"
									className="bg-white text-brand hover:bg-gray-100 font-semibold px-8"
								>
									<Mail className="mr-2 h-5 w-5" />
									Richiedi Informazioni
								</Button>
							</Link>
							<a href={`tel:${t('common.phone')}`}>
								<Button
									size="lg"
									variant="outline"
									className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand font-semibold px-8"
								>
									<Phone className="mr-2 h-5 w-5" />
									{t('common.phone')}
								</Button>
							</a>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	)
}
