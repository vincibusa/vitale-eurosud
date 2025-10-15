'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
	Car, 
	Users, 
	Truck, 
	Handshake, 
	MapPin,
	Leaf,
	Trophy,
	Zap,
	Battery,
	Shield,
	Bike,
	Bolt
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
	hidden: { opacity: 0, scale: 0.8 },
	visible: { 
		opacity: 1, 
		scale: 1,
		transition: { duration: 0.5 }
	}
}

const slideInLeft = {
	hidden: { opacity: 0, x: -50 },
	visible: { 
		opacity: 1, 
		x: 0,
		transition: { duration: 0.6 }
	}
}

const slideInRight = {
	hidden: { opacity: 0, x: 50 },
	visible: { 
		opacity: 1, 
		x: 0,
		transition: { duration: 0.6 }
	}
}

export default function Home() {
	const vehicleCategories = [
		{ name: 'Biciclette', href: '/biciclette', icon: Bike },
		{ name: 'Monopattini', href: '/monopattini', icon: Bolt },
		{ name: 'Minicar', href: '/minicar', icon: Car },
		{ name: 'Scooter', href: '/scooter', icon: Zap },
		{ name: 'Quad', href: '/quad', icon: Car },
		{ name: 'Disabili', href: '/disabili', icon: Users },
	]

  return (
		<div className="w-full">
			{/* Hero Section with Banner */}
			<section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={fadeIn}
				>
        <Image
						src="/images/hero-banner.png"
						alt="Scopri tutti i nostri veicoli elettrici"
						fill
						className="object-cover object-center"
          priority
        />
				</motion.div>
				<div className="absolute inset-0 bg-black/30" />
				<div className="relative container mx-auto px-4 h-full flex items-center">
					<motion.div 
						className="text-white max-w-2xl"
						initial="hidden"
						animate="visible"
						variants={fadeInUp}
					>
						<motion.h1 
							className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
							variants={fadeInUp}
						>
							Scopri tutti i nostri <span className="text-yellow-300">veicoli elettrici</span>
						</motion.h1>
						<motion.p 
							className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/95"
							variants={fadeInUp}
						>
							Leader nella fornitura di veicoli elettrici di qualità superiore. 
							Mobilità sostenibile e all'avanguardia per il futuro.
						</motion.p>
						<motion.div variants={fadeInUp}>
							<Button 
								size="lg" 
								className="bg-white text-orange-600 hover:bg-gray-100 hover:text-orange-700 font-semibold px-6 md:px-8 text-sm md:text-base"
							>
								Scopri i Prodotti
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Vehicle Categories */}
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
							Categorie Veicoli
						</h2>
						<p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
							Esplora la nostra gamma completa di veicoli elettrici per ogni esigenza
						</p>
					</motion.div>
					<motion.div 
						className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
					>
						{vehicleCategories.map((category) => {
							const IconComponent = category.icon
  return (
								<motion.div key={category.name} variants={scaleIn}>
									<Link href={category.href}>
										<Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group border-2 hover:border-orange-500 h-full">
											<CardContent className="p-4 md:p-6 text-center">
												<IconComponent className="mx-auto mb-3 md:mb-4 text-orange-500 group-hover:text-orange-600 transition-colors" size={28} />
												<h3 className="font-semibold text-sm md:text-base text-gray-900 group-hover:text-orange-600 transition-colors">
													{category.name}
												</h3>
											</CardContent>
										</Card>
									</Link>
								</motion.div>
							)
						})}
					</motion.div>
				</div>
			</section>

			{/* ASYA - Auto Elettrica */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
						<motion.div 
							className="order-2 lg:order-1"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={slideInLeft}
						>
							<div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
									src="/images/asya-auto.jpeg"
									alt="ASYA - Auto Elettrica"
									fill
									className="object-cover object-center"
								/>
							</div>
						</motion.div>
						<motion.div 
							className="order-1 lg:order-2"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={slideInRight}
						>
							<Badge className="mb-3 md:mb-4 bg-orange-500 hover:bg-orange-600 text-white">Novità</Badge>
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
								ASYA - AUTO ELETTRICA
							</h2>
							<div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 mb-6 md:mb-8">
								<p>
									Scopri la nuova Asya: l'auto elettrica da due posti prodotta da Vitale, 
									pensata per un'esperienza di guida ecologica e all'avanguardia con 
									un'autonomia di 150 km, una potenza di 7 kW e una velocità massima di 85 km/h, 
									è il compagno ideale per la guida urbana e extraurbana.
								</p>
								<p>
									Grazie alla sua batteria ad alta efficienza e al sistema di gestione energetica 
									avanzato, l'Asya ti permette di viaggiare con tranquillità, senza dover ricaricare 
									troppo spesso.
								</p>
							</div>
							<div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
								<div className="flex items-center gap-2 text-xs md:text-sm">
									<Battery className="text-green-500 flex-shrink-0" size={16} />
									<span>Autonomia 150km</span>
								</div>
								<div className="flex items-center gap-2 text-xs md:text-sm">
									<Zap className="text-blue-500 flex-shrink-0" size={16} />
									<span>Potenza 7 kW</span>
								</div>
								<div className="flex items-center gap-2 text-xs md:text-sm">
									<Shield className="text-gray-700 flex-shrink-0" size={16} />
									<span>Omologazione L7e-CP</span>
								</div>
							</div>
							<Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white w-full md:w-auto">
								MAGGIORI INFORMAZIONI
							</Button>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Veicoli elettrici per trasporto passeggeri */}
			<section className="py-12 md:py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={slideInLeft}
						>
							<Badge className="mb-3 md:mb-4 bg-blue-500 hover:bg-blue-600 text-white">Trasporto Passeggeri</Badge>
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
								Veicoli elettrici per trasporto passeggeri
							</h2>
							<div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 mb-6 md:mb-8">
								<p>
									Vitale Italy, la nostra eccellenza nel trasporto passeggeri. Progettato per 
									offrire prestazioni eccezionali e guidato dall'energia sostenibile, Vitale Italy 
									è il veicolo elettrico che ridefinisce il tuo concetto di trasporto passeggeri 
									grazie ai 4 posti + 1 per il conducente.
								</p>
								<p>
									Stiamo cercando concessionari appassionati e ambiziosi per unirsi a noi nella 
									diffusione di Vitale Italy in tutto il territorio.
								</p>
        </div>
							<Button size="lg" className="border-2 border-blue-500 text-blue-600 bg-white hover:bg-blue-50 hover:text-blue-700 w-full md:w-auto">
								maggiori informazioni
							</Button>
						</motion.div>
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={slideInRight}
						>
							<div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
									src="/images/italy-passeggeri.png"
									alt="Vitale Italy - Trasporto Passeggeri"
									fill
									className="object-cover object-center"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Veicoli Elettrici: Trasporto merci */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
						<motion.div 
							className="order-2 lg:order-1"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={slideInLeft}
						>
							<div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
									src="/images/vitale-ego.png"
									alt="Vitale EGO - Trasporto Merci"
									fill
									className="object-cover object-center"
								/>
							</div>
						</motion.div>
						<motion.div 
							className="order-1 lg:order-2"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={slideInRight}
						>
							<Badge className="mb-3 md:mb-4 bg-green-500 hover:bg-green-600 text-white">Trasporto Merci</Badge>
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
								Veicoli Elettrici: Trasporto merci
							</h2>
							<div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 mb-6 md:mb-8">
								<p>
									Diamo il benvenuto all'epicentro dell'innovazione in mobilità sostenibile, 
									dove la nostra azienda brilla come leader nella fornitura di veicoli elettrici 
									di qualità superiore.
								</p>
								<p>
									Dalle straordinarie biciclette ai dinamici scooter, dalle avanzate auto ai 
									veicoli specializzati per persone con disabilità, collaboriamo con una rete 
									di concessionari fidati per guidare la rivoluzione verde su strada.
								</p>
							</div>
							<Button size="lg" className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto">
								scopri Vitale-EGO
							</Button>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Soluzioni su misura per le tue esigenze */}
			<section className="py-12 md:py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={slideInLeft}
						>
							<Badge className="mb-3 md:mb-4 bg-purple-500 hover:bg-purple-600 text-white">Partnership</Badge>
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
								Soluzioni su misura per le tue esigenze
							</h2>
							<div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 mb-6 md:mb-8">
								<p>
									Diventare un nostro concessionario è un'opportunità imperdibile che ti mette 
									direttamente al volante del successo.
								</p>
								<p>
									Come leader nella fornitura di veicoli elettrici all'avanguardia, garantiamo 
									una partnership che si basa su risultati concreti.
								</p>
								<p>
									Avrai accesso prioritario a una gamma completa di prodotti di alta qualità, 
									supportati da un affidabile approvvigionamento di ricambi e un'assistenza 
									tempestiva.
								</p>
							</div>
							<Button size="lg" className="border-2 border-purple-500 text-purple-600 bg-white hover:bg-purple-50 hover:text-purple-700 w-full md:w-auto">
								maggiori informazioni
							</Button>
						</motion.div>
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={slideInRight}
						>
							<div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
									src="/images/partnership.jpg"
									alt="Partnership - Soluzioni su misura"
									fill
									className="object-cover object-center"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4">
					<motion.div 
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
					>
						{/* Libertà di movimento */}
						<motion.div variants={scaleIn}>
							<Card className="text-center p-6 md:p-8 hover:shadow-lg transition-shadow h-full">
								<CardHeader>
									<div className="mx-auto mb-4 w-14 h-14 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center">
										<MapPin className="text-orange-500" size={28} />
									</div>
									<CardTitle className="text-lg md:text-xl font-bold text-gray-900">
										LIBERTA' DI MOVIMENTO
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-sm md:text-base text-gray-600">
										Di' addio alle restrizioni della città e goditi la libertà di guidare un 
										veicolo elettrico al 100%. Alla VITALE ci impegniamo per una mobilità 
										ecologica e sostenibile.
									</CardDescription>
								</CardContent>
							</Card>
						</motion.div>

						{/* Mobilità sostenibile */}
						<motion.div variants={scaleIn}>
							<Card className="text-center p-6 md:p-8 hover:shadow-lg transition-shadow h-full">
								<CardHeader>
									<div className="mx-auto mb-4 w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center">
										<Leaf className="text-green-500" size={28} />
									</div>
									<CardTitle className="text-lg md:text-xl font-bold text-gray-900">
										MOBILITA' SOSTENIBILE
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-sm md:text-base text-gray-600">
										La strada verso un futuro più verde inizia con ogni passo che facciamo verso 
										la mobilità sostenibile, le nostre città cambiano, e anche il nostro modo 
										di spostarci.
									</CardDescription>
								</CardContent>
							</Card>
						</motion.div>

						{/* Ecobonus */}
						<motion.div variants={scaleIn} className="md:col-span-2 lg:col-span-1">
							<Card className="text-center p-6 md:p-8 hover:shadow-lg transition-shadow h-full">
								<CardHeader>
									<div className="mx-auto mb-4 w-20 h-14 md:w-24 md:h-16 flex items-center justify-center">
										<Image
											src="/images/ecobonus-logo.png"
											alt="Ecobonus Logo"
											width={96}
											height={64}
											className="w-auto h-full object-contain"
										/>
									</div>
									<CardTitle className="text-lg md:text-xl font-bold text-gray-900">
										ECOBONUS
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-sm md:text-base text-gray-600">
										L'ecobonus è un aiuto attuato in Italia per promuovere l'acquisizione di 
										veicoli a basse emissioni. Questo aiuto è rivolto sia alle aziende che ai 
										privati.
									</CardDescription>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
        </div>
			</section>

			{/* Call to Action */}
			<motion.section 
				className="py-12 md:py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeIn}
			>
				<div className="container mx-auto px-4 text-center">
					<motion.h2 
						className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6"
						variants={fadeInUp}
					>
						Pronto per il futuro della mobilità elettrica?
					</motion.h2>
					<motion.p 
						className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/95 max-w-2xl mx-auto px-4"
						variants={fadeInUp}
					>
						Scopri la nostra gamma completa di veicoli elettrici e unisciti alla 
						rivoluzione verde con VITALE
					</motion.p>
					<motion.div 
						className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4"
						variants={fadeInUp}
					>
						<Button 
							size="lg" 
							className="bg-white text-orange-600 hover:bg-gray-100 hover:text-orange-700 font-semibold w-full sm:w-auto"
						>
							Contattaci Ora
						</Button>
						<Button 
							size="lg" 
							className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-semibold w-full sm:w-auto"
						>
							Scopri i Prodotti
						</Button>
					</motion.div>
				</div>
			</motion.section>
    </div>
	)
}