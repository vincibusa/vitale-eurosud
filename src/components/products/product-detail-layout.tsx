'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
	ChevronLeft,
	ChevronRight,
	Phone,
	Zap,
	Battery,
	Gauge,
	Scale,
	Compass,
	Settings,
	ChevronDown,
	Calendar,
	FileText,
	X,
	Check,
	Image as ImageIcon,
	Box
} from 'lucide-react'

// Carica Model3DViewer solo lato client (evita errori SSR con @google/model-viewer)
const Model3DViewer = dynamic(() => import('./model-3d-viewer'), {
	ssr: false,
	loading: () => (
		<div className="flex items-center justify-center h-full bg-gray-100">
			<div className="text-gray-500">Caricamento modello 3D...</div>
		</div>
	)
})

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
	hidden: { opacity: 0, scale: 0.95 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
}

const slideIn = {
	hidden: { opacity: 0, x: 50 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
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
	[key: string]: string | undefined
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
	name: string
	model: string
	brand: string
	year: string
	productCode: string
	category: string
	categorySlug: string
	categoryHref: string
	images: string[]
	specs: ProductSpecs
	description: string
	specialBadges?: string[]
	descriptionImages?: string[]
	optionalFeatures: string[]
	relatedProducts?: RelatedProduct[]
	primaryColor: string
	badgeColor: string
	model3d?: string
}

// Expandable Section Component
function ExpandableSection({
	title,
	defaultOpen = false,
	children,
	icon: Icon
}: {
	title: string
	defaultOpen?: boolean
	children: React.ReactNode
	icon?: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
}) {
	const [isOpen, setIsOpen] = useState(defaultOpen)

	return (
		<div className="border-b border-gray-200">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-1"
			>
				<div className="flex items-center gap-3">
					{Icon && <Icon size={20} strokeWidth={1.5} className="text-gray-500" />}
					<span className="text-lg font-semibold text-gray-900">{title}</span>
				</div>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<ChevronDown size={24} strokeWidth={1.5} className="text-gray-500" />
				</motion.div>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="overflow-hidden"
					>
						<div className="pb-6 px-1">
							{children}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default function ProductDetailLayout({
	name,
	model,
	brand,
	year,
	productCode,
	category,
	categoryHref,
	images,
	specs,
	description,
	specialBadges = [],
	descriptionImages = [],
	optionalFeatures,
	relatedProducts = [],
	primaryColor,
	badgeColor,
	model3d
}: ProductDetailProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [showContactForm, setShowContactForm] = useState(false)
	const has3DModel = Boolean(model3d)
	const [viewMode, setViewMode] = useState<'2d' | '3d'>(Boolean(model3d) ? '3d' : '2d')
	const galleryRef = useRef<HTMLDivElement>(null)

	const handlePreviousImage = () => {
		setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const handleNextImage = () => {
		setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
	}


	// BMW-style color palette - using CSS variables
	const colors = {
		bg: 'bg-brand',
		text: 'text-brand',
		hover: 'hover:bg-brand-dark',
		border: 'border-brand',
		badge: 'bg-brand/10 text-brand'
	}

	return (
		<div className="w-full min-h-screen bg-white">
			{/* BMW-Style Hero Section */}
			<section className="relative bg-gradient-to-b from-gray-50 to-white">
				{/* Breadcrumbs - Minimal */}
				<div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
					<div className="container mx-auto px-4 py-3">
						<nav className="flex items-center gap-2 text-sm text-gray-500">
							<Link href="/" className="hover:text-gray-900 transition-colors">
								Home
							</Link>
							<span>/</span>
							<Link href="/cerca" className="hover:text-gray-900 transition-colors">
								Inventario
							</Link>
							<span>/</span>
							<Link href={categoryHref} className="hover:text-gray-900 transition-colors">
								{category}
							</Link>
							<span>/</span>
							<span className="text-gray-900 font-medium">{model}</span>
						</nav>
					</div>
				</div>

				{/* Main Hero Content */}
				<div className="container mx-auto px-4 pt-16">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
						{/* Left Side - Gallery */}
						<div className="lg:col-span-8" ref={galleryRef}>
							{/* View Mode Toggle - Solo se modello 3D presente */}
							{has3DModel && (
								<motion.div
									initial="hidden"
									animate="visible"
									variants={fadeInUp}
									className="mb-4"
								>
									<div className="flex gap-2 p-1 bg-gray-100 rounded-none w-fit">
										<button
											onClick={() => setViewMode('3d')}
											className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
												viewMode === '3d'
													? 'bg-brand text-white'
													: 'text-gray-600 hover:text-gray-900'
											}`}
										>
											<Box size={16} strokeWidth={1.5} />
											Modello 3D
										</button>
										<button
											onClick={() => setViewMode('2d')}
											className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
												viewMode === '2d'
													? 'bg-brand text-white'
													: 'text-gray-600 hover:text-gray-900'
											}`}
										>
											<ImageIcon size={16} strokeWidth={1.5} />
											Foto
										</button>
									</div>
								</motion.div>
							)}

							{/* Image Gallery o Model 3D - BMW Style */}
							<motion.div
								initial="hidden"
								animate="visible"
								variants={fadeInUp}
								className="relative"
							>
								{/* 3D Model Viewer */}
								{has3DModel && viewMode === '3d' && (
									<div className="relative aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-50 rounded-none overflow-hidden">
										<Model3DViewer
											src={model3d!}
											poster={images[0]}
											alt={`Modello 3D di ${name}`}
											autoRotate={true}
											cameraControls={true}
											ar={true}
											shadowIntensity={1}
											className="w-full h-full"
										/>
									</div>
								)}

								{/* 2D Image Gallery */}
								{(!has3DModel || viewMode === '2d') && (
									<>
										{/* Main Image Container */}
										<div className="relative aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-50 rounded-none overflow-hidden group">
											<AnimatePresence mode="wait">
												<motion.div
													key={currentImageIndex}
													initial={{ opacity: 0, scale: 1.05 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.95 }}
													transition={{ duration: 0.5 }}
													className="absolute inset-0"
												>
													<Image
														src={images[currentImageIndex]}
														alt={`${name} - Immagine ${currentImageIndex + 1}`}
														fill
														className="object-contain p-8 lg:p-12"
														priority={currentImageIndex === 0}
													/>
												</motion.div>
											</AnimatePresence>

											{/* Navigation Arrows */}
											{images.length > 1 && (
												<>
													<button
														onClick={handlePreviousImage}
														className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-none shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
														aria-label="Immagine precedente"
													>
														<ChevronLeft size={24} strokeWidth={1.5} className="text-gray-900" />
													</button>
													<button
														onClick={handleNextImage}
														className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-none shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
														aria-label="Immagine successiva"
													>
														<ChevronRight size={24} strokeWidth={1.5} className="text-gray-900" />
													</button>
												</>
											)}

											{/* Image Counter - BMW Style */}
											<div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-none text-sm font-medium backdrop-blur-sm">
												<span className="font-bold">{currentImageIndex + 1}</span>
												<span className="text-gray-400">/{images.length}</span>
											</div>
										</div>

										{/* Thumbnail Strip - BMW Style */}
										{images.length > 1 && (
											<div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
												{images.map((image, index) => (
													<button
														key={index}
														onClick={() => setCurrentImageIndex(index)}
														className={`relative flex-shrink-0 w-20 h-20 rounded-none overflow-hidden transition-all duration-300 ${
															index === currentImageIndex
																? `ring-2 ring-offset-2 ${colors.border} scale-105`
																: 'opacity-60 hover:opacity-100 hover:scale-105'
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
										)}
									</>
								)}
							</motion.div>
						</div>

						{/* Right Side - Sticky Summary Panel */}
						<div className="lg:col-span-4">
							<motion.div
								initial="hidden"
								animate="visible"
								variants={slideIn}
								className="lg:sticky lg:top-24"
							>
								<div className="bg-white rounded-none shadow-xl border border-gray-100 overflow-hidden">
									{/* Header */}
									<div className="p-6 border-b border-gray-100">
										<div className="flex items-start justify-between gap-4 mb-4">
											<div>
												<Badge className={`${colors.badge} text-xs mb-2`}>
													{category}
												</Badge>
												<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
													{name}
												</h1>
												<p className="text-gray-500 mt-1">Anno {year}</p>
											</div>
										</div>

										{/* Special Badges */}
										{specialBadges.length > 0 && (
											<div className="flex flex-wrap gap-2 mt-3">
												{specialBadges.map((badge, index) => (
													<Badge
														key={index}
														className="bg-red-100 text-red-700 text-xs"
													>
														{badge}
													</Badge>
												))}
											</div>
										)}
									</div>

									{/* Quick Specs - BMW Style */}
									<div className="p-6 border-b border-gray-100">
										<h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
											Specifiche Principali
										</h3>
										<div className="grid grid-cols-2 gap-4">
											<div className="text-center p-3 bg-gray-50 rounded-none">
												<Zap size={20} strokeWidth={1.5} className={`mx-auto mb-2 ${colors.text}`} />
												<p className="text-xs text-gray-500 mb-1">Potenza</p>
												<p className="font-bold text-gray-900 text-sm">{specs.potenza}</p>
											</div>
											<div className="text-center p-3 bg-gray-50 rounded-none">
												<Compass size={20} strokeWidth={1.5} className={`mx-auto mb-2 ${colors.text}`} />
												<p className="text-xs text-gray-500 mb-1">Autonomia</p>
												<p className="font-bold text-gray-900 text-sm">{specs.autonomia}</p>
											</div>
											<div className="text-center p-3 bg-gray-50 rounded-none">
												<Gauge size={20} strokeWidth={1.5} className={`mx-auto mb-2 ${colors.text}`} />
												<p className="text-xs text-gray-500 mb-1">Velocità Max</p>
												<p className="font-bold text-gray-900 text-sm">{specs.velocitaMassima}</p>
											</div>
											<div className="text-center p-3 bg-gray-50 rounded-none">
												<Battery size={20} strokeWidth={1.5} className={`mx-auto mb-2 ${colors.text}`} />
												<p className="text-xs text-gray-500 mb-1">Batteria</p>
												<p className="font-bold text-gray-900 text-sm truncate">{specs.batteria.split(' ')[0]}</p>
											</div>
										</div>
									</div>

									{/* CTA Buttons */}
									<div className="p-6 space-y-3">
									<Button
										size="lg"
										className={`w-full ${colors.bg} ${colors.hover} text-white font-semibold py-6 text-base`}
										onClick={() => setShowContactForm(true)}
									>
										<FileText size={18} strokeWidth={1.5} className="mr-2" />
										Richiedi Preventivo
									</Button>
									<Button
										size="sm"
										variant="ghost"
										className="w-full text-gray-600 hover:text-gray-900 pt-2"
										asChild
									>
										<a href="tel:0916145377">
											<Phone size={16} strokeWidth={1.5} className="mr-2" />
											Chiama
										</a>
									</Button>
									</div>

									{/* Product Code */}
									<div className="px-6 pb-6">
										<p className="text-xs text-gray-400 text-center">
											Codice Articolo: <span className="font-mono">{productCode}</span>
										</p>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Configuration Sections - BMW Style */}
			<section className="py-12 lg:py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						{/* Technical Specs Section */}
						<ExpandableSection title="Scheda Tecnica Completa" defaultOpen={true} icon={Settings}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600">Marca</span>
									<span className="font-semibold text-gray-900">{brand}</span>
								</div>
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600">Modello</span>
									<span className="font-semibold text-gray-900">{model}</span>
								</div>
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600 flex items-center gap-2">
										<Zap size={16} strokeWidth={1.5} className={colors.text} />
										Potenza
									</span>
									<span className="font-semibold text-gray-900">{specs.potenza}</span>
								</div>
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600 flex items-center gap-2">
										<Battery size={16} strokeWidth={1.5} className={colors.text} />
										Batteria
									</span>
									<span className="font-semibold text-gray-900">{specs.batteria}</span>
								</div>
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600 flex items-center gap-2">
										<Gauge size={16} strokeWidth={1.5} className={colors.text} />
										Velocità Max
									</span>
									<span className="font-semibold text-gray-900">{specs.velocitaMassima}</span>
								</div>
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600 flex items-center gap-2">
										<Compass size={16} strokeWidth={1.5} className={colors.text} />
										Autonomia
									</span>
									<span className="font-semibold text-gray-900">{specs.autonomia}</span>
								</div>
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600">Tempo Ricarica</span>
									<span className="font-semibold text-gray-900">{specs.tempoRicarica}</span>
								</div>
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600">Ruote</span>
									<span className="font-semibold text-gray-900">{specs.ruote}</span>
								</div>
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600">Trazione</span>
									<span className="font-semibold text-gray-900">{specs.trazione}</span>
								</div>
								<div className="flex items-center justify-between py-3 border-b border-gray-100">
									<span className="text-gray-600">Telaio</span>
									<span className="font-semibold text-gray-900">{specs.telaio}</span>
								</div>
								{specs.freni && (
									<div className="flex items-center justify-between py-3 border-b border-gray-100">
										<span className="text-gray-600">Freni</span>
										<span className="font-semibold text-gray-900">{specs.freni}</span>
									</div>
								)}
								{specs.pendenza && (
									<div className="flex items-center justify-between py-3 border-b border-gray-100">
										<span className="text-gray-600">Pendenza Max</span>
										<span className="font-semibold text-gray-900">{specs.pendenza}</span>
									</div>
								)}
								{specs.peso && (
									<div className="flex items-center justify-between py-3 border-b border-gray-100">
										<span className="text-gray-600 flex items-center gap-2">
											<Scale size={16} strokeWidth={1.5} className={colors.text} />
											Peso
										</span>
										<span className="font-semibold text-gray-900">{specs.peso}</span>
									</div>
								)}
							</div>
						</ExpandableSection>

						{/* Optional Features Section */}
						{optionalFeatures.length > 0 && (
							<ExpandableSection title="Optional di Serie" defaultOpen={true} icon={Check}>
								<motion.div
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									variants={staggerContainer}
									className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
								>
									{optionalFeatures.map((feature, index) => (
										<motion.div key={index} variants={scaleIn}>
											<div className={`flex items-center gap-2 p-3 rounded-none bg-gray-50 hover:bg-gray-100 transition-colors`}>
												<Check size={16} strokeWidth={1.5} className={colors.text} />
												<span className="text-sm font-medium text-gray-700">{feature}</span>
											</div>
										</motion.div>
									))}
								</motion.div>
							</ExpandableSection>
						)}

						{/* Description Section */}
						<ExpandableSection title="Descrizione" defaultOpen={false} icon={FileText}>
							<div className="prose prose-gray max-w-none">
								<div className="text-gray-700 leading-relaxed whitespace-pre-line">
									{description}
								</div>
							</div>

							{/* Description Images */}
							{descriptionImages.length > 0 && (
								<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
									{descriptionImages.map((image, index) => (
										<div key={index} className="relative h-64 md:h-80 rounded-none overflow-hidden">
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
						</ExpandableSection>
					</div>
				</div>
			</section>

			{/* Contact Form Section */}
			<section id="contact-form" className="py-12 lg:py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeInUp}
						className="max-w-2xl mx-auto"
					>
						<div className="bg-white rounded-none shadow-xl p-8 md:p-10">
							<div className="text-center mb-8">
								<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
									Richiedi Informazioni
								</h2>
								<p className="text-gray-600">
									Compila il form per ricevere informazioni dettagliate su <strong>{model}</strong>
								</p>
							</div>
							<form className="space-y-5">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
									<div>
										<label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
											Nome Completo *
										</label>
										<Input
											id="contact-name"
											placeholder="Il tuo nome"
											className="w-full h-12"
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
											placeholder="Il tuo numero"
											className="w-full h-12"
										/>
									</div>
								</div>
								<div>
									<label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
										Email *
									</label>
									<Input
										id="contact-email"
										type="email"
										placeholder="la.tua@email.com"
										className="w-full h-12"
										required
									/>
								</div>
								<div>
									<label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
										Messaggio *
									</label>
									<Textarea
										id="contact-message"
										placeholder={`Sono interessato al modello ${model}...`}
										rows={5}
										className="w-full resize-none"
										required
									/>
								</div>
								<div className="flex items-start gap-3">
									<input
										type="checkbox"
										id="contact-privacy"
										className={`mt-1 rounded border-gray-300 ${colors.text} focus:ring-2`}
										required
									/>
									<label htmlFor="contact-privacy" className="text-sm text-gray-600">
										Accetto l'informativa sulla{' '}
										<Link href="/privacy-policy" className={`${colors.text} hover:underline font-medium`}>
											privacy policy
										</Link>
									</label>
								</div>
								<Button
									type="submit"
									className={`w-full ${colors.bg} ${colors.hover} text-white font-semibold py-6 text-base`}
									size="lg"
								>
									Invia Richiesta
								</Button>
							</form>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Related Products - BMW Style */}
			{relatedProducts.length > 0 && (
				<section className="py-12 lg:py-16 bg-white">
					<div className="container mx-auto px-4">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={staggerContainer}
						>
							<motion.div variants={fadeInUp} className="text-center mb-10">
								<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
									Altri Veicoli
								</h2>
								<p className="text-gray-600">Scopri altri modelli della nostra gamma</p>
							</motion.div>
							<motion.div
								className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
								variants={staggerContainer}
							>
								{relatedProducts.slice(0, 3).map((product) => (
									<motion.div key={product.id} variants={scaleIn} className="h-full flex">
										<Link href={product.href} className="flex flex-col w-full">
											<div className="group bg-gray-50 rounded-none overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
												<div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50">
													<Image
														src={product.image}
														alt={product.name}
														fill
														className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
													/>
												</div>
												<div className="p-5 flex flex-col flex-grow">
													<Badge className={`text-xs mb-2 ${colors.badge}`}>
														{product.category}
													</Badge>
													<h3 className="font-semibold text-gray-900 mb-3 group-hover:text-brand transition-colors line-clamp-2">
														{product.name}
													</h3>
													<div className="flex items-center gap-4 text-sm text-gray-600 mt-auto">
														<div className="flex items-center gap-1">
															<Zap size={14} strokeWidth={1.5} className={colors.text} />
															<span>{product.power}</span>
														</div>
														<div className="flex items-center gap-1">
															<Gauge size={14} strokeWidth={1.5} className={colors.text} />
															<span>{product.speed}</span>
														</div>
													</div>
												</div>
											</div>
										</Link>
									</motion.div>
								))}
							</motion.div>
							<div className="text-center mt-10">
								<Button
									variant="outline"
									size="lg"
									className="px-8"
									asChild
								>
									<Link href="/cerca">Guarda tutti i veicoli</Link>
								</Button>
							</div>
						</motion.div>
					</div>
				</section>
			)}

			{/* Mobile Sticky CTA Bar */}
			<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-2xl">
				<div className="flex gap-3">
					<Button
						className={`flex-1 ${colors.bg} ${colors.hover} text-white font-semibold py-3`}
						onClick={() => setShowContactForm(true)}
					>
						Richiedi Info
					</Button>
					<Button
						variant="outline"
						className={`flex-1 border-2 ${colors.border} ${colors.text} hover:bg-brand/5 font-semibold py-3`}
						asChild
					>
						<a href="tel:0916145377">
							<Phone size={18} strokeWidth={1.5} className="mr-2" />
							Chiama
						</a>
					</Button>
				</div>
			</div>

			{/* Contact Form Modal */}
			<AnimatePresence>
				{showContactForm && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
						onClick={() => setShowContactForm(false)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="bg-white rounded-none shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="p-6 border-b border-gray-100 flex items-center justify-between">
								<h3 className="text-xl font-bold text-gray-900">Richiedi Preventivo</h3>
								<button
									onClick={() => setShowContactForm(false)}
									className="p-2 hover:bg-gray-100 rounded-none transition-colors"
								>
									<X size={20} strokeWidth={1.5} className="text-gray-500" />
								</button>
							</div>
							<div className="p-6">
								<p className="text-gray-600 mb-6">
									Compila il form per ricevere un preventivo personalizzato per <strong>{model}</strong>
								</p>
								<form className="space-y-4">
									<div>
										<label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-2">
											Nome Completo *
										</label>
										<Input
											id="modal-name"
											placeholder="Il tuo nome"
											className="w-full"
											required
										/>
									</div>
									<div>
										<label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-2">
											Email *
										</label>
										<Input
											id="modal-email"
											type="email"
											placeholder="la.tua@email.com"
											className="w-full"
											required
										/>
									</div>
									<div>
										<label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700 mb-2">
											Telefono
										</label>
										<Input
											id="modal-phone"
											type="tel"
											placeholder="Il tuo numero"
											className="w-full"
										/>
									</div>
									<div>
										<label htmlFor="modal-message" className="block text-sm font-medium text-gray-700 mb-2">
											Note aggiuntive
										</label>
										<Textarea
											id="modal-message"
											placeholder="Eventuali richieste specifiche..."
											rows={3}
											className="w-full resize-none"
										/>
									</div>
									<div className="flex items-start gap-3">
										<input
											type="checkbox"
											id="modal-privacy"
											className={`mt-1 rounded border-gray-300 ${colors.text}`}
											required
										/>
										<label htmlFor="modal-privacy" className="text-sm text-gray-600">
											Accetto l'informativa sulla{' '}
											<Link href="/privacy-policy" className={`${colors.text} hover:underline font-medium`}>
												privacy policy
											</Link>
										</label>
									</div>
									<Button
										type="submit"
										className={`w-full ${colors.bg} ${colors.hover} text-white font-semibold py-5`}
										size="lg"
									>
										Invia Richiesta
									</Button>
								</form>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Spacer for mobile sticky bar */}
			<div className="lg:hidden h-20" />
		</div>
	)
}
