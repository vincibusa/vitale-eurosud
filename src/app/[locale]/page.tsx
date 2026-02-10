'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import QuickActions from '@/components/quick-actions'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import {
	Battery,
	Zap,
	Users,
	Truck
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
			<section className="relative h-screen min-h-screen md:h-[70vh] md:min-h-[520px] lg:h-[80vh] overflow-hidden">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={fadeIn}
					className="absolute inset-0"
				>
					<Image
						src="/immagini/hero.jpeg"
						alt={t('home.hero.title')}
						fill
						sizes="100vw"
						className="object-cover object-right"
						priority
					/>
				</motion.div>
				{/* Gradient overlay - bottom to top */}
				<div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/25 to-transparent md:from-black/70 md:via-black/30" />

				<div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center md:items-end md:justify-start pb-0 md:pb-20">
					<motion.div
						className="text-white max-w-3xl text-center md:text-left"
						initial="hidden"
						animate="visible"
						variants={fadeInUp}
					>
						<motion.div
							className="mb-10 md:mb-12"
							variants={fadeInUp}
						>
							<Image
								src="/images/vitale-logo.png"
								alt="Vitale - Fornitura Veicoli Elettrici"
								width={180}
								height={58}
								className="h-14 md:h-16 w-auto mb-10 md:mb-10 mx-auto md:mx-0"
							/>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
								Il futuro della
								<br />
								mobilità elettrica
							</h1>
						</motion.div>
						<motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
							<Link href="/catalogo-veicoli">
								<Button
									size="lg"
									className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 text-lg h-14 min-w-[200px] w-full sm:w-auto rounded-none transition-all"
								>
									Scopri i veicoli
								</Button>
							</Link>
							<Link href="/contatti">
								<Button
									size="lg"
									variant="outline"
									className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black font-semibold px-8 text-lg h-14 min-w-[200px] w-full sm:w-auto rounded-none transition-all"
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

			{/* ASYA - Featured Product - Full Image */}
			<section className="relative h-[52vh] min-h-[360px] md:h-[62vh] md:min-h-[440px] lg:h-[70vh] overflow-hidden">
				{/* Background Image */}
				<motion.div
					className="absolute inset-0"
					initial="hidden"
					animate="visible"
					variants={fadeIn}
				>
					<Image
						src="/immagini/asya_autoelettrica.jpg"
						alt="ASYA - Auto Elettrica"
						fill
						sizes="100vw"
						className="object-cover object-right"
						priority
					/>
				</motion.div>
				
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent md:from-black/80 md:via-black/50" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-black/60" />

				{/* Content */}
				<div className="relative container mx-auto px-4 h-full flex items-center justify-center md:justify-start">
					<motion.div
						className="max-w-2xl text-white text-center md:text-left"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeInUp}
					>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
							Asya<br />
							<span className="text-brand-light">Auto elettrica</span>
						</h2>
						<p className="text-xl md:text-2xl text-white/90 mb-6 font-light">
							Scopri la nuova auto elettrica a due posti
						</p>

						{/* Specs line */}
						<div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-8 text-white/80">
							<div className="flex items-center gap-2">
								<Battery className="text-green-400 flex-shrink-0" size={24} />
								<span className="text-base md:text-md">Aut. 150 Km</span>
							</div>
							<span className="text-white/40">|</span>
							<div className="flex items-center gap-2">
								<Zap className="text-brand-light flex-shrink-0" size={24} />
								<span className="text-base md:text-md">7 kW</span>
							</div>
							<span className="text-white/40">|</span>
							<div className="flex items-center gap-2">
								<span className="text-base md:text-md">Max 85 Km/h</span>
							</div>
						</div>

						<p className="text-sm text-white/60 mb-8">
							Omologazione L7e-CP
						</p>

						<div className="flex flex-wrap justify-center md:justify-start gap-4">
							<Link href="/minicar">
								<Button
									size="lg"
									className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 w-[220px] h-14"
								>
									Scopri di più
								</Button>
							</Link>
							<Link href="/privati">
								<Button
									size="lg"
									variant="outline"
									className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black font-semibold px-6 w-[220px] h-14"
								>
									Guarda le offerte
								</Button>
							</Link>
						</div>
					</motion.div>
				</div>
			</section>
			<div className="h-8 md:h-10 bg-white" />

			{/* Trasporto Passeggeri - Full Image */}
			<section className="relative h-[52vh] min-h-[360px] md:h-[62vh] md:min-h-[440px] lg:h-[70vh] overflow-hidden">
				{/* Background Image */}
				<motion.div
					className="absolute inset-0"
					initial="hidden"
					animate="visible"
					variants={fadeIn}
				>
					<Image
						src="/immagini/veicoli_elettrici.jpg"
						alt="Vitale Italy - Trasporto Passeggeri"
						fill
						sizes="100vw"
						className="object-cover object-right"
						priority
					/>
				</motion.div>
				
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent md:from-black/80 md:via-black/50" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-black/60" />

				{/* Content */}
				<div className="relative container mx-auto px-4 h-full flex items-center justify-center md:justify-start">
					<motion.div
						className="max-w-2xl text-white text-center md:text-left"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeInUp}
					>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
							Trasporto<br />
							<span className="text-brand-light">passeggeri</span>
						</h2>
						<p className="text-xl md:text-2xl text-white/90 mb-6 font-light">
							Veicoli elettrici per una prestazione eccellente
						</p>

						{/* Specs line */}
						<div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-8 text-white/80">
							<div className="flex items-center gap-2">
								<Users className="text-brand-light flex-shrink-0" size={24} />
								<span className="text-base md:text-lg">4 posti + 1 per il conducente</span>
							</div>
						</div>

						<div className="flex flex-wrap justify-center md:justify-start gap-4">
							<Link href="/veicoli-commerciali">
								<Button
									size="lg"
									className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 w-[220px] h-14"
								>
									Scopri di più
								</Button>
							</Link>
							<Link href="/rivenditori">
								<Button
									size="lg"
									variant="outline"
									className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black font-semibold px-6 w-[220px] h-14"
								>
									Guarda le offerte
								</Button>
							</Link>
						</div>
					</motion.div>
				</div>
			</section>
			<div className="h-8 md:h-10 bg-white" />

			{/* Mobilità Disabili - Full Image */}
			<section className="relative h-[52vh] min-h-[360px] md:h-[62vh] md:min-h-[440px] lg:h-[70vh] overflow-hidden">
				{/* Background Image */}
				<motion.div
					className="absolute inset-0"
					initial="hidden"
					animate="visible"
					variants={fadeIn}
				>
					<Image
						src="/immagini/veicolo_disabili 2.png"
						alt="Mobilità disabili"
						fill
						sizes="100vw"
						className="object-cover object-right"
						priority
					/>
				</motion.div>

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent md:from-black/80 md:via-black/50" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-black/60" />

				{/* Content */}
				<div className="relative container mx-auto px-4 h-full flex items-center justify-center md:justify-start">
					<motion.div
						className="max-w-2xl text-white text-center md:text-left"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeInUp}
					>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
							Mobilità
							<br />
							<span className="text-brand-light">disabili</span>
						</h2>

						<p className="text-xl md:text-2xl text-white/90 mb-6 font-light">
							Muoviti in libertà
						</p>

						<div className="flex flex-wrap justify-center md:justify-start gap-4">
							<Link href="/mobilita-disabili">
								<Button
									size="lg"
									className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 w-[220px] h-14"
								>
									Scopri di più
								</Button>
							</Link>
							<Link href="/rivenditori">
								<Button
									size="lg"
									variant="outline"
									className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black font-semibold px-6 w-[220px] h-14"
								>
									Guarda le offerte
								</Button>
							</Link>
						</div>
					</motion.div>
				</div>
			</section>
			<div className="h-8 md:h-10 bg-white" />

			{/* Trasporto Merci - Full Image */}
			<section className="relative h-[52vh] min-h-[360px] md:h-[62vh] md:min-h-[440px] lg:h-[70vh] overflow-hidden">
				{/* Background Image */}
				<motion.div
					className="absolute inset-0"
					initial="hidden"
					animate="visible"
					variants={fadeIn}
				>
					<Image
						src="/immagini/veicoli_elettrici_trasporto.jpg"
						alt="Vitale EGO - Trasporto Merci"
						fill
						sizes="100vw"
						className="object-cover object-right"
						priority
					/>
				</motion.div>
				
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent md:from-black/80 md:via-black/50" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-black/60" />

				{/* Content */}
				<div className="relative container mx-auto px-4 h-full flex items-center justify-center md:justify-start">
					<motion.div
						className="max-w-2xl text-white text-center md:text-left"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeInUp}
					>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
							Trasporto<br />
							<span className="text-brand-light">merci</span>
						</h2>

						<p className="text-xl md:text-2xl text-white/90 mb-6 font-light">
							L&apos;epicentro dell&apos;innovazione in mobilità sostenibile
						</p>

						{/* Specs line */}
						<div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-8 text-white/80">
							<div className="flex items-center gap-2">
								<Truck className="text-brand-light flex-shrink-0" size={24} />
								<span className="text-base md:text-lg">Portata fino a 1000 kg</span>
							</div>
						</div>

						<div className="flex flex-wrap justify-center md:justify-start gap-4">
							<Link href="/veicoli-commerciali">
								<Button
									size="lg"
									className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 w-[220px] h-14"
								>
									Scopri di più
								</Button>
							</Link>
							<Link href="/rivenditori">
								<Button
									size="lg"
									variant="outline"
									className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black font-semibold px-6 w-[220px] h-14"
								>
									Guarda le offerte
								</Button>
							</Link>
						</div>
					</motion.div>
				</div>
			</section>
			<div className="h-8 md:h-10 bg-white" />

			{/* Partnership - Rivenditori e Privati */}
			<section className="py-16 md:py-20 bg-white">
				<div className="container mx-auto px-4">
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
					>
						{/* Rivenditori Card */}
						<motion.div variants={scaleIn}>
							<Link href="/rivenditori">
								<div className="group relative aspect-square overflow-hidden cursor-pointer">
									<Image
										src="/immagini/rivenditore-privato-10.png"
										alt="Diventa Rivenditore"
										fill
										sizes="(max-width: 768px) 100vw, 50vw"
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									{/* Overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
									
									{/* CTA */}
									<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex justify-center">
										<Button
											size="lg"
											variant="outline"
											className="w-full md:w-[220px] h-14 border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black font-semibold"
										>
											Vendi
										</Button>
									</div>
								</div>
							</Link>
						</motion.div>

						{/* Privati Card */}
						<motion.div variants={scaleIn}>
							<Link href="/privati">
								<div className="group relative aspect-square overflow-hidden cursor-pointer">
									<Image
										src="/immagini/rivenditore-privato-11.png"
										alt="Per Privati"
										fill
										sizes="(max-width: 768px) 100vw, 50vw"
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									{/* Overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
									
									{/* CTA */}
									<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex justify-center">
										<Button
											size="lg"
											variant="outline"
											className="w-full md:w-[220px] h-14 border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black font-semibold"
										>
											Acquista
										</Button>
									</div>
								</div>
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</section>


		</div>

	)
}
