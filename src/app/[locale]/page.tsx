'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import QuickActions from '@/components/quick-actions'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import {
	Battery,
	Zap,
	Shield,
	MapPin,
	Leaf
} from 'lucide-react'

// Animation variants
const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6 }
	}
}

const fadeIn = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.8 }
	}
}

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2
		}
	}
}

const scaleIn = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.5 }
	}
}

export default function Home() {
	const t = useTranslations()
	
	return (
		<div className="w-full">
			{/* Hero Section - BMW Style */}
			<section className="relative h-[600px] lg:h-[80vh] min-h-[600px] overflow-hidden">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={fadeIn}
					className="absolute inset-0"
				>
					<Image
						src="/images/hero-banner.png"
						alt={t('home.hero.title')}
						fill
						className="object-cover object-center"
						priority
					/>
				</motion.div>
				{/* Gradient overlay - bottom to top */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

				<div className="relative container mx-auto px-4 h-full flex items-end pb-16 md:pb-20">
					<motion.div
						className="text-white max-w-3xl"
						initial="hidden"
						animate="visible"
						variants={fadeInUp}
					>
						<motion.h1
							className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
							variants={fadeInUp}
						>
							{t('home.hero.title')}
						</motion.h1>
						<motion.p
							className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 font-light leading-relaxed"
							variants={fadeInUp}
						>
							{t('home.hero.subtitle')} {t('home.hero.description')}
						</motion.p>
						<motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
							<Link href="/biciclette">
								<Button
									size="lg"
									className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 text-lg h-14 min-w-[200px] rounded-none transition-all"
								>
									{t('home.hero.discoverVehicles')}
								</Button>
							</Link>
							<Link href="/contatti">
								<Button
									size="lg"
									variant="outline"
									className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black font-semibold px-8 text-lg h-14 min-w-[200px] rounded-none transition-all"
								>
									{t('home.hero.contactUs')}
								</Button>
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Quick Actions */}
			<QuickActions />

			{/* ASYA - Featured Product - Dark Theme */}
			<section className="py-16 md:py-20 bg-gray-900 text-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
						{/* Image - 60% width */}
						<motion.div
							className="lg:col-span-3"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={scaleIn}
						>
							<div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-none overflow-hidden shadow-2xl">
								<Image
									src="/images/asya-auto.jpeg"
									alt="ASYA - Auto Elettrica"
									fill
									className="object-cover object-center"
								/>
							</div>
						</motion.div>

						{/* Content - 40% width */}
						<motion.div
							className="lg:col-span-2"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeInUp}
						>
							<Badge className="mb-4 bg-brand hover:bg-brand-dark text-white text-sm px-4 py-1">
								Novità 2024
							</Badge>
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
								ASYA<br />
								<span className="text-brand-light">AUTO ELETTRICA</span>
							</h2>
							<div className="space-y-4 text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
								<p>
									La nuova Asya: l'auto elettrica da due posti pensata per un'esperienza
									di guida ecologica e all'avanguardia. Con un'autonomia di 150 km,
									una potenza di 7 kW e una velocità massima di 85 km/h.
								</p>
								<p>
									Il compagno ideale per la guida urbana e extraurbana, con batteria
									ad alta efficienza e sistema di gestione energetica avanzato.
								</p>
							</div>

							{/* Specs badges */}
							<div className="flex flex-wrap gap-4 mb-8">
								<div className="flex items-center gap-3 bg-white/10 rounded-none px-4 py-2">
									<Battery className="text-green-400 flex-shrink-0" size={20} />
									<span className="text-sm font-medium">Autonomia 150km</span>
								</div>
								<div className="flex items-center gap-3 bg-white/10 rounded-none px-4 py-2">
									<Zap className="text-brand-light flex-shrink-0" size={20} />
									<span className="text-sm font-medium">Potenza 7 kW</span>
								</div>
								<div className="flex items-center gap-3 bg-white/10 rounded-none px-4 py-2">
									<Shield className="text-brand-light flex-shrink-0" size={20} strokeWidth={1.5} />
									<span className="text-sm font-medium">Omologazione L7e-CP</span>
								</div>
							</div>

							<div className="flex flex-wrap gap-4">
								<Button
									size="lg"
									className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 min-w-[200px]"
								>
									Maggiori Informazioni
								</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-2 border-white bg-white text-black hover:bg-gray-100 hover:text-black font-semibold px-8 min-w-[200px]"
							>
								Richiedi Preventivo
							</Button>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Trasporto Passeggeri */}
			<section className="py-16 md:py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
						{/* Image - 60% width */}
						<motion.div
							className="lg:col-span-3"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={scaleIn}
						>
							<div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-none overflow-hidden shadow-2xl">
								<Image
									src="/images/italy-passeggeri.png"
									alt="Vitale Italy - Trasporto Passeggeri"
									fill
									className="object-cover object-center"
								/>
							</div>
						</motion.div>

						{/* Content - 40% width */}
						<motion.div
							className="lg:col-span-2"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeInUp}
						>
							<Badge className="mb-4 bg-brand hover:bg-brand-dark text-white text-sm px-4 py-1">
								Trasporto Passeggeri
							</Badge>
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
								Veicoli elettrici per trasporto passeggeri
							</h2>
							<div className="space-y-4 text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
								<p>
									Vitale Italy, la nostra eccellenza nel trasporto passeggeri. Progettato per
									offrire prestazioni eccezionali e guidato dall'energia sostenibile.
								</p>
								<p>
									Il veicolo elettrico che ridefinisce il tuo concetto di trasporto passeggeri
									grazie ai 4 posti + 1 per il conducente.
								</p>
							</div>

							<div className="flex flex-wrap gap-4">
								<Button
									size="lg"
									className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 min-w-[200px]"
								>
									Maggiori Informazioni
								</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-2 border-brand text-brand bg-white hover:bg-brand/5 hover:text-brand font-semibold px-8 min-w-[200px]"
							>
								Richiedi Preventivo
							</Button>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Trasporto Merci */}
			<section className="py-16 md:py-20 bg-gray-900 text-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
						{/* Image - 60% width */}
						<motion.div
							className="lg:col-span-3"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={scaleIn}
						>
							<div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-none overflow-hidden shadow-2xl">
								<Image
									src="/images/vitale-ego.png"
									alt="Vitale EGO - Trasporto Merci"
									fill
									className="object-cover object-center"
								/>
							</div>
						</motion.div>

						{/* Content - 40% width */}
						<motion.div
							className="lg:col-span-2"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeInUp}
						>
							<Badge className="mb-4 bg-brand hover:bg-brand-dark text-white text-sm px-4 py-1">
								Trasporto Merci
							</Badge>
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
								Veicoli Elettrici per trasporto merci
							</h2>
							<div className="space-y-4 text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
								<p>
									L'epicentro dell'innovazione in mobilità sostenibile, dove la nostra
									azienda brilla come leader nella fornitura di veicoli elettrici di
									qualità superiore.
								</p>
								<p>
									Collaboriamo con una rete di concessionari fidati per guidare la
									rivoluzione verde su strada.
								</p>
							</div>

							<div className="flex flex-wrap gap-4">
								<Button
									size="lg"
									className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 min-w-[200px]"
								>
									Scopri Vitale-EGO
								</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-2 border-white bg-white text-black hover:bg-gray-100 hover:text-black font-semibold px-8 min-w-[200px]"
							>
								Richiedi Preventivo
							</Button>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Partnership */}
			<section className="py-16 md:py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
						{/* Image - 60% width */}
						<motion.div
							className="lg:col-span-3"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={scaleIn}
						>
							<div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-none overflow-hidden shadow-2xl">
								<Image
									src="/images/partnership.jpg"
									alt="Partnership - Soluzioni su misura"
									fill
									className="object-cover object-center"
								/>
							</div>
						</motion.div>

						{/* Content - 40% width */}
						<motion.div
							className="lg:col-span-2"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeInUp}
						>
							<Badge className="mb-4 bg-brand hover:bg-brand-dark text-white text-sm px-4 py-1">
								Partnership
							</Badge>
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
								Soluzioni su misura per le tue esigenze
							</h2>
							<div className="space-y-4 text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
								<p>
									Diventare un nostro concessionario è un'opportunità imperdibile che ti
									mette direttamente al volante del successo.
								</p>
								<p>
									Avrai accesso prioritario a una gamma completa di prodotti di alta qualità,
									supportati da un affidabile approvvigionamento di ricambi.
								</p>
							</div>

							<div className="flex flex-wrap gap-4">
								<Button
									size="lg"
									className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 min-w-[200px]"
								>
									Maggiori Informazioni
								</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-2 border-brand text-brand bg-white hover:bg-brand/5 hover:text-brand font-semibold px-8 min-w-[200px]"
							>
								Richiedi Preventivo
							</Button>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-16 md:py-20 bg-gray-50">
				<div className="container mx-auto px-4">
					<motion.div
						className="text-center mb-12"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeInUp}
					>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
							I Nostri Valori
						</h2>
						<p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-light">
							Impegnati per un futuro sostenibile e una mobilità accessibile a tutti
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
					>
						{/* Libertà di movimento */}
						<motion.div variants={scaleIn}>
							<Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 h-full border-0 group bg-white">
								<CardContent className="pt-6">
									<div className="mx-auto mb-6 w-20 h-20 bg-gray-50 rounded-none flex items-center justify-center group-hover:bg-brand transition-colors duration-300">
										<MapPin className="text-brand group-hover:text-white transition-colors duration-300" size={36} strokeWidth={1.5} />
									</div>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
										Libertà di Movimento
									</h3>
									<p className="text-base text-gray-600 leading-relaxed font-light">
										Di' addio alle restrizioni della città e goditi la libertà di guidare
										un veicolo elettrico al 100%. Mobilità ecologica e sostenibile.
									</p>
								</CardContent>
							</Card>
						</motion.div>

						{/* Mobilità sostenibile */}
						<motion.div variants={scaleIn}>
							<Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 h-full border-0 group bg-white">
								<CardContent className="pt-6">
									<div className="mx-auto mb-6 w-20 h-20 bg-gray-50 rounded-none flex items-center justify-center group-hover:bg-brand transition-colors duration-300">
										<Leaf className="text-brand group-hover:text-white transition-colors duration-300" size={36} strokeWidth={1.5} />
									</div>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
										Mobilità Sostenibile
									</h3>
									<p className="text-base text-gray-600 leading-relaxed font-light">
										La strada verso un futuro più verde inizia con ogni passo che facciamo
										verso la mobilità sostenibile. Le nostre città cambiano.
									</p>
								</CardContent>
							</Card>
						</motion.div>

						{/* Ecobonus */}
						<motion.div variants={scaleIn}>
							<Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 h-full border-0 group">
								<CardContent className="pt-6">
									<div className="mx-auto mb-6 w-24 h-20 flex items-center justify-center">
										<Image
											src="/images/ecobonus-logo.png"
											alt="Ecobonus Logo"
											width={96}
											height={64}
											className="w-auto h-full object-contain group-hover:scale-110 transition-transform duration-300"
										/>
									</div>
									<h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
										Ecobonus
									</h3>
									<p className="text-base text-gray-600 leading-relaxed">
										L'ecobonus è un aiuto attuato in Italia per promuovere l'acquisizione
										di veicoli a basse emissioni.
									</p>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
				</div>
			</section>
		</div>
	)
}
