'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
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
	FileText,
	X,
	Check,
	Image as ImageIcon,
	Box,
	MapPin,
	Clock,
	Calendar,
	Shield,
	Ruler,
	Wrench,
	Info
} from 'lucide-react'

// Carica Model3DViewer solo lato client
const Model3DViewer = dynamic(() => import('./model-3d-viewer'), {
	ssr: false,
	loading: () => (
		<div className="flex items-center justify-center h-full bg-gray-100">
			<div className="text-gray-500">Loading...</div>
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

// Types
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
	lunghezza?: string
	larghezza?: string
	altezza?: string
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
	availability: 'in-stock' | 'limited' | 'out-of-stock' | 'pre-order'
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
	availability?: 'in-stock' | 'limited' | 'out-of-stock' | 'pre-order'
}

// Availability Badge Component
function AvailabilityBadge({ status }: { status: ProductDetailProps['availability'] }) {
	const configs = {
		'in-stock': {
			label: 'Disponibile',
			className: 'bg-green-100 text-green-800 border-green-200',
			icon: Check
		},
		'limited': {
			label: 'Ultimi pezzi',
			className: 'bg-amber-100 text-amber-800 border-amber-200 animate-pulse',
			icon: Info
		},
		'out-of-stock': {
			label: 'Esaurito',
			className: 'bg-red-100 text-red-800 border-red-200',
			icon: X
		},
		'pre-order': {
			label: 'Pre-ordine',
			className: 'bg-blue-100 text-blue-800 border-blue-200',
			icon: Calendar
		}
	}

	const config = configs[status || 'in-stock']
	const Icon = config.icon

	return (
		<div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border ${config.className}`}>
			<Icon size={14} strokeWidth={2} />
			<span className="text-sm font-semibold">{config.label}</span>
		</div>
	)
}

// Spec Card Component
interface SpecCardProps {
	icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
	title: string
	specs: { label: string; value: string; highlight?: boolean }[]
	colorClass: string
}

function SpecCard({ icon: Icon, title, specs, colorClass }: SpecCardProps) {
	return (
		<motion.div
			variants={scaleIn}
			className="bg-gray-50 border border-gray-100 p-5 rounded-none hover:shadow-md transition-shadow"
		>
			<div className="flex items-center gap-3 mb-4">
				<div className={`p-2 bg-white ${colorClass}`}>
					<Icon size={20} strokeWidth={1.5} />
				</div>
				<h4 className="font-semibold text-gray-900">{title}</h4>
			</div>
			<dl className="space-y-3">
				{specs.map((spec, idx) => (
					<div key={idx} className="flex justify-between items-baseline">
						<dt className="text-sm text-gray-600">{spec.label}</dt>
						<dd className={`text-sm font-semibold ${spec.highlight ? colorClass : 'text-gray-900'}`}>
							{spec.value}
						</dd>
					</div>
				))}
			</dl>
		</motion.div>
	)
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

// Contact Form Component with Validation
function ContactForm({ model, productCode }: { model: string; productCode: string }) {
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
		privacy: false
	})
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const validate = () => {
		const newErrors: Record<string, string> = {}
		if (formState.name.length < 3) newErrors.name = 'Il nome deve essere almeno 3 caratteri'
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = 'Inserisci una email valida'
		if (formState.message.length < 10) newErrors.message = 'Il messaggio deve essere almeno 10 caratteri'
		if (!formState.privacy) newErrors.privacy = 'Devi accettare la privacy policy'
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validate()) return
		
		setIsSubmitting(true)
		// Simulazione invio
		await new Promise(resolve => setTimeout(resolve, 1500))
		setIsSubmitting(false)
		setIsSuccess(true)
	}

	if (isSuccess) {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className="text-center py-12"
			>
				<div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
					<Check size={32} />
				</div>
				<h3 className="text-xl font-bold text-gray-900 mb-2">Richiesta inviata!</h3>
				<p className="text-gray-600 mb-6">Ti contatteremo entro 24 ore lavorative.</p>
				<Button onClick={() => setIsSuccess(false)} variant="outline">
					Invia un'altra richiesta
				</Button>
			</motion.div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="bg-blue-50 border border-blue-100 p-4 rounded-none mb-6">
				<p className="text-sm text-blue-800">
					<strong>Stai richiedendo informazioni per:</strong><br />
					{model} (Cod: {productCode})
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<div>
					<label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
						Nome Completo *
					</label>
					<Input
						id="contact-name"
						value={formState.name}
						onChange={(e) => setFormState({ ...formState, name: e.target.value })}
						placeholder="Il tuo nome"
						className={`w-full h-12 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
						onBlur={validate}
					/>
					{errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
				</div>
				<div>
					<label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-2">
						Telefono
					</label>
					<Input
						id="contact-phone"
						type="tel"
						value={formState.phone}
						onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
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
					value={formState.email}
					onChange={(e) => setFormState({ ...formState, email: e.target.value })}
					placeholder="la.tua@email.com"
					className={`w-full h-12 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
					onBlur={validate}
				/>
				{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
			</div>

			<div>
				<label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
					Messaggio *
				</label>
				<Textarea
					id="contact-message"
					value={formState.message}
					onChange={(e) => setFormState({ ...formState, message: e.target.value })}
					placeholder={`Sono interessato al modello ${model}...`}
					rows={5}
					className={`w-full resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
					onBlur={validate}
				/>
				{errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
			</div>

			<div className="flex items-start gap-3">
				<input
					type="checkbox"
					id="contact-privacy"
					checked={formState.privacy}
					onChange={(e) => setFormState({ ...formState, privacy: e.target.checked })}
					className={`mt-1 rounded border-gray-300 text-brand focus:ring-brand ${errors.privacy ? 'border-red-500' : ''}`}
				/>
				<label htmlFor="contact-privacy" className="text-sm text-gray-600">
					Accetto l'informativa sulla{' '}
					<Link href="/privacy-policy" className="text-brand hover:underline font-medium">
						privacy policy
					</Link>
				</label>
			</div>
			{errors.privacy && <p className="text-red-500 text-xs -mt-3">{errors.privacy}</p>}

			<Button
				type="submit"
				disabled={isSubmitting}
				className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-6 text-base disabled:opacity-50"
				size="lg"
			>
				{isSubmitting ? (
					<span className="flex items-center gap-2">
						<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
					</svg>
						Invio in corso...
					</span>
				) : (
					'Invia Richiesta'
				)}
			</Button>
		</form>
	)
}

// Main Component
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
	model3d,
	availability = 'in-stock'
}: ProductDetailProps) {
	const t = useTranslations()
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [showContactForm, setShowContactForm] = useState(false)
	const has3DModel = Boolean(model3d)
	const [viewMode, setViewMode] = useState<'2d' | '3d'>(has3DModel ? '3d' : '2d')
	const galleryRef = useRef<HTMLDivElement>(null)

	const handlePreviousImage = () => {
		setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const handleNextImage = () => {
		setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
	}

	const colors = {
		bg: 'bg-brand',
		text: 'text-brand',
		hover: 'hover:bg-brand-dark',
		border: 'border-brand',
		badge: 'bg-brand/10 text-brand'
	}

	// Organizza specifiche in categorie
	const specCategories = [
		{
			icon: Zap,
			title: 'Prestazioni',
			specs: [
				{ label: 'Potenza', value: specs.potenza, highlight: true },
				{ label: 'Velocità Max', value: specs.velocitaMassima },
				{ label: 'Accelerazione', value: specs.pendenza ? `0-50 km/h in 3.5s` : 'N/D' }
			]
		},
		{
			icon: Battery,
			title: 'Batteria & Autonomia',
			specs: [
				{ label: 'Capacità', value: specs.batteria, highlight: true },
				{ label: 'Autonomia', value: specs.autonomia, highlight: true },
				{ label: 'Tempo Ricarica', value: specs.tempoRicarica }
			]
		},
		{
			icon: Shield,
			title: 'Sicurezza',
			specs: [
				{ label: 'Freni', value: specs.freni || 'Disco idraulico' },
				{ label: 'Illuminazione', value: 'LED Full' },
				{ label: 'Peso', value: specs.peso || 'N/D' }
			]
		},
		{
			icon: Ruler,
			title: 'Dimensioni',
			specs: [
				{ label: 'Lunghezza', value: specs.lunghezza || '2200 mm' },
				{ label: 'Larghezza', value: specs.larghezza || '800 mm' },
				{ label: 'Altezza', value: specs.altezza || '1150 mm' }
			]
		},
		{
			icon: Wrench,
			title: 'Telaio & Ruote',
			specs: [
				{ label: 'Materiale', value: specs.telaio },
				{ label: 'Cerchi', value: specs.ruote },
				{ label: 'Trazione', value: specs.trazione }
			]
		}
	]

	return (
		<div className="w-full min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-b from-gray-50 to-white">
				{/* Breadcrumbs */}
				<div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
					<div className="container mx-auto px-4 py-3">
						<nav className="flex items-center gap-2 text-sm text-gray-500">
							<Link href="/" className="hover:text-gray-900 transition-colors">
								{t('product.home')}
							</Link>
							<span>/</span>
							<Link href="/cerca" className="hover:text-gray-900 transition-colors">
								{t('product.inventory')}
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

				{/* Main Content */}
				<div className="container mx-auto px-4 pt-16">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
						{/* Gallery */}
						<div className="lg:col-span-8" ref={galleryRef}>
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
											{t('product.view3d')}
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
											{t('product.viewImages')}
										</button>
									</div>
								</motion.div>
							)}

							{/* Gallery/3D Viewer */}
							<motion.div
								initial="hidden"
								animate="visible"
								variants={fadeInUp}
								className="relative"
							>
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

									{(!has3DModel || viewMode === '2d') && (
										<>
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

												<div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-none text-sm font-medium backdrop-blur-sm">
													<span className="font-bold">{currentImageIndex + 1}</span>
													<span className="text-gray-400">/{images.length}</span>
												</div>
											</div>

											{images.length > 1 && (
												<div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
													{images.map((image, index) => (
														<button
															key={index}
															onClick={() => setCurrentImageIndex(index)}
															className={`relative flex-shrink-0 w-24 h-24 rounded-none overflow-hidden transition-all duration-300 ${
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

						{/* Sticky Info Panel */}
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
										<Badge className={`${colors.badge} text-xs mb-3`}>
											{category}
										</Badge>
										<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-1">
											{name}
										</h1>
										<p className="text-gray-500">Anno {year}</p>

										{/* Availability Badge */}
										<div className="mt-4">
											<AvailabilityBadge status={availability} />
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

									{/* Quick Specs */}
									<div className="p-6 border-b border-gray-100">
										<h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
											{t('product.mainSpecs')}
										</h3>
										<div className="grid grid-cols-2 gap-4">
											<div className="text-center p-3 bg-gray-50 rounded-none">
												<Zap size={20} strokeWidth={1.5} className={`mx-auto mb-2 ${colors.text}`} />
												<p className="text-xs text-gray-500 mb-1">{t('vehicles.specs.potenza')}</p>
												<p className="font-bold text-gray-900 text-sm">{specs.potenza}</p>
											</div>
											<div className="text-center p-3 bg-gray-50 rounded-none">
												<Compass size={20} strokeWidth={1.5} className={`mx-auto mb-2 ${colors.text}`} />
												<p className="text-xs text-gray-500 mb-1">{t('vehicles.specs.autonomia')}</p>
												<p className="font-bold text-gray-900 text-sm">{specs.autonomia}</p>
											</div>
											<div className="text-center p-3 bg-gray-50 rounded-none">
												<Gauge size={20} strokeWidth={1.5} className={`mx-auto mb-2 ${colors.text}`} />
												<p className="text-xs text-gray-500 mb-1">{t('vehicles.specs.velocitaMax')}</p>
												<p className="font-bold text-gray-900 text-sm">{specs.velocitaMassima}</p>
											</div>
											<div className="text-center p-3 bg-gray-50 rounded-none">
												<Battery size={20} strokeWidth={1.5} className={`mx-auto mb-2 ${colors.text}`} />
												<p className="text-xs text-gray-500 mb-1">{t('vehicles.specs.batteria')}</p>
												<p className="font-bold text-gray-900 text-sm truncate">{specs.batteria.split(' ')[0]}</p>
											</div>
										</div>
									</div>

									{/* Product Code */}
									<div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
										<p className="text-sm text-gray-600">
											<span className="text-gray-400">Codice prodotto:</span>{' '}
											<span className="font-mono font-medium text-gray-900">{productCode}</span>
										</p>
										<p className="text-xs text-gray-500 mt-2">
											Disponibile in vari colori. Contattaci per la configurazione personalizzata.
										</p>
									</div>

									{/* CTA Buttons */}
									<div className="p-6 space-y-3">
										<Button
											size="lg"
											className={`w-full ${colors.bg} ${colors.hover} text-white font-semibold py-6 text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5`}
											onClick={() => setShowContactForm(true)}
										>
											<FileText size={18} strokeWidth={1.5} className="mr-2" />
											Richiedi Preventivo
										</Button>
										<Button
											size="lg"
											variant="outline"
											className={`w-full border-2 ${colors.border} ${colors.text} hover:bg-brand/5 font-semibold py-5`}
											asChild
										>
											<a href="tel:0916145377">
												<Phone size={18} strokeWidth={1.5} className="mr-2" />
												Chiama 091 614 5377
											</a>
										</Button>
									</div>

									{/* Store Info */}
									<div className="px-6 pb-6 space-y-2">
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<Clock size={16} className="text-gray-400" />
											<span>Lun-Ven: 9:00-19:00 | Sab: 9:00-13:00</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<MapPin size={16} className="text-gray-400" />
											<span>Via delle Magnolie, 5 - Palermo</span>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Specs Section - Card Layout */}
			<section className="py-12 lg:py-16">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
						className="max-w-6xl mx-auto"
					>
						<motion.h2 
							variants={fadeInUp}
							className="text-2xl md:text-3xl font-bold text-gray-900 mb-8"
						>
							Specifiche Tecniche
						</motion.h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{specCategories.map((category, index) => (
								<SpecCard
									key={index}
									icon={category.icon}
									title={category.title}
									specs={category.specs}
									colorClass={colors.text}
								/>
								))}
							</div>
						</motion.div>
					</div>
				</section>

			{/* Optional Features */}
			<section className="py-12 lg:py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
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
										<div className="flex items-center gap-2 p-3 bg-white border border-gray-100 hover:border-brand/30 transition-colors">
											<Check size={16} strokeWidth={1.5} className={colors.text} />
											<span className="text-sm font-medium text-gray-700">{feature}</span>
										</div>
									</motion.div>
								))}
							</motion.div>
						</ExpandableSection>
					</div>
				</div>
			</section>

			{/* Description */}
			<section className="py-12 lg:py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<ExpandableSection title="Descrizione" defaultOpen={false} icon={FileText}>
							<div className="prose prose-gray max-w-none">
								<div className="text-gray-700 leading-relaxed whitespace-pre-line">
									{description}
								</div>
							</div>

							{descriptionImages.length > 0 && (
								<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
									{descriptionImages.map((image, index) => (
										<div key={index} className="relative h-64 md:h-80 rounded-none overflow-hidden">
											<Image
												src={image}
												alt={`${name} - Dettaglio ${index + 1}`}
												fill
												className="object-cover hover:scale-105 transition-transform duration-500"
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
									Il nostro team ti risponderà entro 24 ore
								</p>
							</div>
							<ContactForm model={model} productCode={productCode} />
						</div>
					</motion.div>
				</div>
			</section>

			{/* Related Products */}
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
									{t('product.otherVehicles')}
								</h2>
								<p className="text-gray-600">{t('product.discoverOther')}</p>
							</motion.div>
							<motion.div
								className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
								variants={staggerContainer}
							>
								{relatedProducts.slice(0, 3).map((product) => (
									<motion.div key={product.id} variants={scaleIn} className="h-full flex">
										<Link href={product.href} className="flex flex-col w-full">
											<div className="group bg-gray-50 rounded-none overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full border border-gray-100">
												<div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50">
													<Image
														src={product.image}
														alt={product.name}
														fill
														className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
													/>
												</div>
												<div className="p-5 flex flex-col flex-grow">
													<div className="flex items-center justify-between mb-2">
														<Badge className={`text-xs ${colors.badge}`}>
															{product.category}
														</Badge>
														<AvailabilityBadge status={product.availability} />
													</div>
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
													<Button 
														variant="outline" 
														size="sm"
														className="w-full mt-4 border-brand text-brand hover:bg-brand hover:text-white"
													>
														Richiedi Info
													</Button>
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
									<Link href="/cerca">{t('product.viewAll')}</Link>
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
						variant="outline"
						className="flex-1 border-2 border-brand text-brand hover:bg-brand/5 font-semibold py-3"
						asChild
					>
						<a href="tel:0916145377">
							<Phone size={18} strokeWidth={1.5} className="mr-2" />
							Chiama
						</a>
					</Button>
					<Button
						className={`flex-1 ${colors.bg} ${colors.hover} text-white font-semibold py-3`}
						onClick={() => setShowContactForm(true)}
					>
						Richiedi Info
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
								<ContactForm model={model} productCode={productCode} />
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
