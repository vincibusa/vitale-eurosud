'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
	ChevronLeft,
	ChevronRight,
	Share2,
	Phone,
	Zap,
	Battery,
	Gauge,
	Scale,
	Compass,
	Settings
} from 'lucide-react'

// Animation variants
const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

// Interfaces
export interface ProductSpecs {
	batteria: string
	autonomia: string
	tempoRicarica: string
	ruote: string
	potenza: string
	velocitaMassima: string
	trazione: string
	telaio: string
	freni?: string
	pendenza?: string
	peso?: string
}

export interface RelatedProduct {
	id: string | number
	name: string
	category: string
	power: string
	battery: string
	speed: string
	image: string
	href: string
}

export interface ProductDetailProps {
	// Basic Info
	name: string
	model: string
	brand: string
	year: string
	productCode: string
	category: string
	categorySlug: string
	categoryHref: string
	
	// Images
	images: string[]
	
	// Technical Specs
	specs: ProductSpecs
	
	// Description
	description: string
	specialBadges?: string[]
	descriptionImages?: string[]
	
	// Features
	optionalFeatures: string[]
	
	// Related products
	relatedProducts?: RelatedProduct[]
	
	// Styling
	primaryColor: string
	badgeColor: string
}

export default function ProductDetailLayout({
	name,
	model,
	brand,
	year,
	productCode,
	category,
	// categorySlug,
	categoryHref,
	images,
	specs,
	description,
	specialBadges = [],
	descriptionImages = [],
	optionalFeatures,
	relatedProducts = [],
	primaryColor,
	badgeColor
}: ProductDetailProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const handlePreviousImage = () => {
		setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const handleNextImage = () => {
		setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
	}

	const handleShare = async (platform: 'facebook' | 'twitter') => {
		const url = window.location.href
		if (platform === 'facebook') {
			window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
		} else {
			window.open(`https://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(name)}`, '_blank')
		}
	}

	return (
		<div className="w-full">
			{/* Breadcrumbs */}
			<section className="bg-gray-100 py-4">
				<div className="container mx-auto px-4">
					<nav className="flex items-center gap-2 text-sm text-gray-600">
						<Link href="/" className="hover:text-orange-600 transition-colors">
							Home
						</Link>
						<span>/</span>
						<Link href="/cerca" className="hover:text-orange-600 transition-colors">
							Inventario
						</Link>
						<span>/</span>
						<Link href={categoryHref} className="hover:text-orange-600 transition-colors">
							{category}
						</Link>
						<span>/</span>
						<span className="text-gray-900 font-medium">{model}</span>
					</nav>
				</div>
			</section>

			{/* Hero Section */}
			<section className="bg-white py-8 md:py-12">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={fadeInUp}
					>
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
							<div>
								<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
									{name}
								</h1>
								<p className="text-gray-600 text-lg">Anno {year}</p>
							</div>
							<div className="flex flex-wrap gap-2">
								<Badge className={`${badgeColor} text-sm px-4 py-2`}>
									{category}
								</Badge>
								<Badge variant="outline" className="text-sm px-4 py-2">
									Elettrica
								</Badge>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Main Content - Gallery + Specs */}
			<section className="py-8 md:py-12 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
						{/* Image Gallery */}
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeInUp}
						>
							<Card className="p-0 overflow-hidden">
								{/* Main Image */}
								<div className="relative h-[400px] md:h-[500px] bg-gray-100">
									<Image
										src={images[currentImageIndex]}
										alt={`${name} - Immagine ${currentImageIndex + 1}`}
										fill
										className="object-contain p-8"
										priority={currentImageIndex === 0}
									/>
									{images.length > 1 && (
										<>
											<button
												onClick={handlePreviousImage}
												className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
												aria-label="Immagine precedente"
											>
												<ChevronLeft size={24} className="text-gray-900" />
											</button>
											<button
												onClick={handleNextImage}
												className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
												aria-label="Immagine successiva"
											>
												<ChevronRight size={24} className="text-gray-900" />
											</button>
											<div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
												{currentImageIndex + 1} / {images.length}
											</div>
										</>
									)}
								</div>

								{/* Thumbnail Gallery */}
								{images.length > 1 && (
									<div className="p-4 bg-white">
										<div className="grid grid-cols-6 md:grid-cols-8 gap-2">
											{images.map((image, index) => (
												<button
													key={index}
													onClick={() => setCurrentImageIndex(index)}
													className={`relative h-16 md:h-20 rounded-md overflow-hidden border-2 transition-all ${
														index === currentImageIndex
															? `border-${primaryColor}-500`
															: 'border-gray-200 hover:border-gray-300'
													}`}
												>
													<Image
														src={image}
														alt={`Thumbnail ${index + 1}`}
														fill
														className="object-cover"
													/>
												</button>
											))}
										</div>
									</div>
								)}
							</Card>
						</motion.div>

						{/* Technical Specifications */}
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeInUp}
						>
							<Card className="h-full">
								<CardHeader>
									<CardTitle className="text-2xl font-bold text-gray-900">
										Scheda Tecnica
									</CardTitle>
									<p className="text-sm text-gray-600 mt-2">
										Codice Articolo: <span className="font-semibold">{productCode}</span>
									</p>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{/* Specs Grid */}
										<div className="grid grid-cols-1 gap-3">
											<div className="flex items-start justify-between py-3 border-b border-gray-200">
												<span className="text-gray-600 font-medium">Marca:</span>
												<span className="text-gray-900 font-semibold text-right">{brand}</span>
											</div>
											<div className="flex items-start justify-between py-3 border-b border-gray-200">
												<span className="text-gray-600 font-medium">Modello:</span>
												<span className="text-gray-900 font-semibold text-right">{model}</span>
											</div>
											<div className="flex items-start justify-between py-3 border-b border-gray-200">
												<span className="text-gray-600 font-medium flex items-center gap-2">
													<Zap size={16} className={`text-${primaryColor}-500`} />
													Potenza:
												</span>
												<span className="text-gray-900 font-semibold text-right">{specs.potenza}</span>
											</div>
											<div className="flex items-start justify-between py-3 border-b border-gray-200">
												<span className="text-gray-600 font-medium flex items-center gap-2">
													<Battery size={16} className={`text-${primaryColor}-500`} />
													Batteria:
												</span>
												<span className="text-gray-900 font-semibold text-right">{specs.batteria}</span>
											</div>
											<div className="flex items-start justify-between py-3 border-b border-gray-200">
												<span className="text-gray-600 font-medium flex items-center gap-2">
													<Gauge size={16} className={`text-${primaryColor}-500`} />
													Velocità Max:
												</span>
												<span className="text-gray-900 font-semibold text-right">{specs.velocitaMassima}</span>
											</div>
											<div className="flex items-start justify-between py-3 border-b border-gray-200">
												<span className="text-gray-600 font-medium flex items-center gap-2">
													<Compass size={16} className={`text-${primaryColor}-500`} />
													Autonomia:
												</span>
												<span className="text-gray-900 font-semibold text-right">{specs.autonomia}</span>
											</div>
											<div className="flex items-start justify-between py-3 border-b border-gray-200">
												<span className="text-gray-600 font-medium">Tempo Ricarica:</span>
												<span className="text-gray-900 font-semibold text-right">{specs.tempoRicarica}</span>
											</div>
											<div className="flex items-start justify-between py-3 border-b border-gray-200">
												<span className="text-gray-600 font-medium">Ruote:</span>
												<span className="text-gray-900 font-semibold text-right">{specs.ruote}</span>
											</div>
											<div className="flex items-start justify-between py-3 border-b border-gray-200">
												<span className="text-gray-600 font-medium">Trazione:</span>
												<span className="text-gray-900 font-semibold text-right">{specs.trazione}</span>
											</div>
											<div className="flex items-start justify-between py-3 border-b border-gray-200">
												<span className="text-gray-600 font-medium">Telaio:</span>
												<span className="text-gray-900 font-semibold text-right">{specs.telaio}</span>
											</div>
											{specs.freni && (
												<div className="flex items-start justify-between py-3 border-b border-gray-200">
													<span className="text-gray-600 font-medium">Freni:</span>
													<span className="text-gray-900 font-semibold text-right">{specs.freni}</span>
												</div>
											)}
											{specs.pendenza && (
												<div className="flex items-start justify-between py-3 border-b border-gray-200">
													<span className="text-gray-600 font-medium">Pendenza Max:</span>
													<span className="text-gray-900 font-semibold text-right">{specs.pendenza}</span>
												</div>
											)}
											{specs.peso && (
												<div className="flex items-start justify-between py-3 border-b border-gray-200">
													<span className="text-gray-600 font-medium flex items-center gap-2">
														<Scale size={16} className={`text-${primaryColor}-500`} />
														Peso:
													</span>
													<span className="text-gray-900 font-semibold text-right">{specs.peso}</span>
												</div>
											)}
										</div>

										<Separator className="my-6" />

										{/* Share & Contact Buttons */}
										<div className="flex flex-col gap-3">
											<Button
												size="lg"
												className={`w-full bg-${primaryColor}-500 hover:bg-${primaryColor}-600 text-white`}
												asChild
											>
												<a href="#contact-form">Richiedi Informazioni</a>
											</Button>
											<div className="flex gap-2">
												<Button
													size="sm"
													variant="outline"
													className="flex-1"
													onClick={() => handleShare('facebook')}
												>
													<Share2 size={16} className="mr-2" />
													Condividi
												</Button>
												<Button
													size="sm"
													variant="outline"
													className="flex-1"
													asChild
												>
													<a href="tel:0916145377">
														<Phone size={16} className="mr-2" />
														Chiama
													</a>
												</Button>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Description Section */}
			<section className="py-12 md:py-16 bg-white">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeInUp}
						className="max-w-4xl mx-auto"
					>
						{/* Special Badges */}
						{specialBadges.length > 0 && (
							<div className="mb-6 flex flex-wrap gap-3">
								{specialBadges.map((badge, index) => (
									<Badge
										key={index}
										className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 text-sm"
									>
										{badge}
									</Badge>
								))}
							</div>
						)}

						{/* Description */}
						<div className="prose prose-lg max-w-none">
							<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
								Descrizione
							</h2>
							<div className="text-gray-700 leading-relaxed whitespace-pre-line">
								{description}
							</div>
						</div>

						{/* Description Images */}
						{descriptionImages.length > 0 && (
							<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
								{descriptionImages.map((image, index) => (
									<div key={index} className="relative h-64 md:h-80 rounded-lg overflow-hidden">
										<Image
											src={image}
											alt={`${name} - Dettaglio ${index + 1}`}
											fill
											className="object-cover"
										/>
									</div>
								))}
							</div>
						)}
					</motion.div>
				</div>
			</section>

			{/* Optional Features */}
			{optionalFeatures.length > 0 && (
				<section className="py-12 md:py-16 bg-gray-50">
					<div className="container mx-auto px-4">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={staggerContainer}
							className="max-w-4xl mx-auto"
						>
							<motion.h2
								className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
								variants={fadeInUp}
							>
								Optional di Serie
							</motion.h2>
							<motion.div
								className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
								variants={staggerContainer}
							>
								{optionalFeatures.map((feature, index) => (
									<motion.div key={index} variants={scaleIn}>
										<Badge
											variant="outline"
											className="w-full justify-center py-3 px-4 text-sm font-medium hover:bg-gray-100 transition-colors"
										>
											<Settings size={14} className={`mr-2 text-${primaryColor}-500`} />
											{feature}
										</Badge>
									</motion.div>
								))}
							</motion.div>
						</motion.div>
					</div>
				</section>
			)}

			{/* Contact Form */}
			<section id="contact-form" className="py-12 md:py-16 bg-white">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeInUp}
						className="max-w-2xl mx-auto"
					>
						<Card className="p-6 md:p-8">
							<CardHeader className="px-0 pt-0">
								<CardTitle className="text-2xl font-bold text-gray-900 text-center mb-2">
									Richiedi Informazioni
								</CardTitle>
								<p className="text-gray-600 text-center">
									Compila il form per ricevere informazioni dettagliate su questo prodotto
								</p>
							</CardHeader>
							<CardContent className="px-0 pb-0">
								<form className="space-y-4">
									<div>
										<label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
											Nome Completo *
										</label>
										<Input
											id="contact-name"
											placeholder="Il tuo nome"
											className="w-full"
											required
										/>
									</div>
									<div>
										<label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
											Email *
										</label>
										<Input
											id="contact-email"
											type="email"
											placeholder="la.tua@email.com"
											className="w-full"
											required
										/>
									</div>
									<div>
										<label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-2">
											Telefono
										</label>
										<Input
											id="contact-phone"
											type="tel"
											placeholder="Il tuo numero di telefono"
											className="w-full"
										/>
									</div>
									<div>
										<label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
											Messaggio *
										</label>
										<Textarea
											id="contact-message"
											placeholder="Scrivi qui la tua richiesta..."
											rows={5}
											className="w-full"
											required
										/>
									</div>
									<div className="flex items-start gap-2">
										<input
											type="checkbox"
											id="contact-privacy"
											className={`mt-1 rounded border-gray-300 text-${primaryColor}-500 focus:ring-${primaryColor}-500`}
											required
										/>
										<label htmlFor="contact-privacy" className="text-sm text-gray-700">
											Accetto l'informativa sulla{' '}
											<Link href="/privacy-policy" className={`text-${primaryColor}-600 hover:underline`}>
												privacy policy
											</Link>
										</label>
									</div>
									<Button
										type="submit"
										className={`w-full bg-${primaryColor}-500 hover:bg-${primaryColor}-600 text-white`}
										size="lg"
									>
										Invia Richiesta
									</Button>
								</form>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</section>

			{/* Related Products */}
			{relatedProducts.length > 0 && (
				<section className="py-12 md:py-16 bg-gray-50">
					<div className="container mx-auto px-4">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={staggerContainer}
						>
							<motion.h2
								className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
								variants={fadeInUp}
							>
								Altri Veicoli
							</motion.h2>
							<motion.div
								className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
								variants={staggerContainer}
							>
								{relatedProducts.slice(0, 6).map((product) => (
									<motion.div key={product.id} variants={scaleIn}>
										<Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group h-full">
											<Link href={product.href}>
												<CardHeader className="p-0">
													<div className="relative h-48 rounded-t-lg overflow-hidden bg-gray-100">
														<Image
															src={product.image}
															alt={product.name}
															fill
															className="object-contain object-center p-4"
														/>
													</div>
												</CardHeader>
												<CardContent className="p-4">
													<Badge className={`text-xs mb-2 ${badgeColor}`}>
														{product.category}
													</Badge>
													<CardTitle className={`text-base font-semibold text-gray-900 mb-3 group-hover:text-${primaryColor}-600 transition-colors line-clamp-2`}>
														{product.name}
													</CardTitle>
													<div className="space-y-1 text-sm text-gray-600">
														<div className="flex items-center gap-2">
															<Zap size={14} className={`text-${primaryColor}-500`} />
															<span>{product.power}</span>
														</div>
														<div className="flex items-center gap-2">
															<Battery size={14} className={`text-${primaryColor}-500`} />
															<span>{product.battery}</span>
														</div>
														<div className="flex items-center gap-2">
															<Gauge size={14} className={`text-${primaryColor}-500`} />
															<span>{product.speed}</span>
														</div>
													</div>
												</CardContent>
											</Link>
										</Card>
									</motion.div>
								))}
							</motion.div>
							<div className="text-center mt-8">
								<Button
									variant="outline"
									size="lg"
									asChild
								>
									<Link href="/cerca">Guarda tutti i veicoli</Link>
								</Button>
							</div>
						</motion.div>
					</div>
				</section>
			)}
		</div>
	)
}

