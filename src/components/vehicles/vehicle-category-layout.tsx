'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { 
	Battery,
	Zap,
	Gauge,
	Filter,
	Search,
	SlidersHorizontal,
	X
} from 'lucide-react'

// Animation variants from design system
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

export interface VehicleProduct {
	id: number | string
	name: string
	type: string
	power: string
	battery: string
	speed: string
	image: string
	href: string
	isNew?: boolean
}

export interface VehicleFilter {
	name: string
	key: string
	options: string[]
}

interface VehicleCategoryLayoutProps {
	title: string
	description: string
	products: VehicleProduct[]
	filters: VehicleFilter[]
	heroGradient: string
	badgeColor: string
	primaryColor: string
}

export default function VehicleCategoryLayout({
	title,
	// description,
	products,
	filters,
	// heroGradient,
	badgeColor,
	primaryColor
}: VehicleCategoryLayoutProps) {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
	const [isFilterOpen, setIsFilterOpen] = useState(false)

	// Funzione per gestire il toggle dei filtri
	const handleFilterToggle = (filterKey: string, option: string) => {
		setSelectedFilters(prev => {
			const current = prev[filterKey] || []
			const isSelected = current.includes(option)
			
			if (isSelected) {
				return {
					...prev,
					[filterKey]: current.filter(item => item !== option)
				}
			} else {
				return {
					...prev,
					[filterKey]: [...current, option]
				}
			}
		})
	}

	// Funzione per resettare i filtri
	const resetFilters = () => {
		setSelectedFilters({})
		setSearchTerm('')
	}

	// Filtraggio dei prodotti
	const filteredProducts = useMemo(() => {
		let filtered = products

		// Filtra per ricerca
		if (searchTerm) {
			filtered = filtered.filter(product =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.type.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		// Applica filtri selezionati (AND tra categorie, OR dentro la stessa categoria)
		Object.entries(selectedFilters).forEach(([filterKey, selectedOptions]) => {
			if (selectedOptions.length > 0) {
				filtered = filtered.filter(product => {
					// Per ogni categoria di filtro, il prodotto deve matchare ALMENO UNA delle opzioni selezionate
					switch (filterKey) {
						case 'marca':
							return selectedOptions.some(option => 
								product.name.toLowerCase().includes(option.toLowerCase())
							)
						case 'batteria':
							return selectedOptions.some(option =>
								product.battery.toLowerCase().includes(option.toLowerCase())
							)
						case 'potenza':
							// Confronto normalizzato per la potenza (rimuove punti e spazi)
							return selectedOptions.some(option => {
								const productPower = product.power.toLowerCase().replace(/[\s.]/g, '')
								const filterPower = option.toLowerCase().replace(/[\s.]/g, '')
								return productPower.includes(filterPower) || filterPower.includes(productPower)
							})
						case 'tipologia':
							return selectedOptions.some(option =>
								product.type.toLowerCase().includes(option.toLowerCase()) ||
								product.name.toLowerCase().includes(option.toLowerCase())
							)
						default:
							// Se il filterKey non è riconosciuto, non filtrare
							return true
					}
				})
			}
		})

		return filtered
	}, [products, searchTerm, selectedFilters])

	// Conta filtri attivi
	const activeFiltersCount = useMemo(() => {
		return Object.values(selectedFilters).reduce((acc, curr) => acc + curr.length, 0)
	}, [selectedFilters])

	// Componente Filtri (riutilizzabile per desktop e mobile)
	const FilterContent = () => (
		<div className="space-y-6">
			{filters.map((filter, index) => (
				<div key={index}>
					<h4 className="font-semibold text-gray-900 mb-3">{filter.name}</h4>
					<div className="space-y-2">
						{filter.options.map((option, optionIndex) => (
							<label key={optionIndex} className="flex items-center gap-2 cursor-pointer">
								<input 
									type="checkbox" 
									checked={(selectedFilters[filter.key] || []).includes(option)}
									onChange={() => handleFilterToggle(filter.key, option)}
									className={`rounded border-gray-300 focus:ring-2 focus:ring-${primaryColor}-500`}
									style={{
										accentColor: `var(--${primaryColor}-500, #f97316)`
									}}
								/>
								<span className="text-sm text-gray-700">{option}</span>
							</label>
						))}
					</div>
					{index < filters.length - 1 && <Separator className="mt-4" />}
				</div>
			))}
			
			{activeFiltersCount > 0 && (
				<Button 
					variant="outline" 
					className="w-full" 
					onClick={resetFilters}
				>
					<X size={16} className="mr-2" />
					Resetta Filtri ({activeFiltersCount})
				</Button>
			)}
		</div>
	)

	return (
		<div className="w-full">
			{/* Filtri e Prodotti */}
			<section className="py-8 md:py-12 lg:py-16">
				<div className="container mx-auto px-4">
					{/* Barra di ricerca e filtri mobile */}
					<motion.div
						className="mb-6 md:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeInUp}
					>
						{/* Ricerca */}
						<div className="relative flex-1">
							<Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
							<input 
								type="text"
								placeholder="Cerca modello..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
							/>
							{searchTerm && (
								<button
									type="button"
									onClick={() => setSearchTerm('')}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
									aria-label="Cancella ricerca"
								>
									<X size={18} />
								</button>
							)}
						</div>

						{/* Bottone Filtri Mobile */}
						<Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
							<SheetTrigger asChild>
								<Button 
									variant="outline" 
									className="lg:hidden relative"
								>
									<SlidersHorizontal size={18} className="mr-2" />
									Filtri
									{activeFiltersCount > 0 && (
										<Badge className="ml-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 min-w-[20px]">
											{activeFiltersCount}
										</Badge>
									)}
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
								<SheetHeader className="px-6 pt-6 pb-4">
									<SheetTitle className="flex items-center gap-2 text-xl">
										<Filter size={22} />
										Filtri
									</SheetTitle>
								</SheetHeader>
								<div className="px-6 pb-6">
									<FilterContent />
								</div>
							</SheetContent>
						</Sheet>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
						{/* Sidebar Filtri (Desktop) */}
						<motion.div 
							className="hidden lg:block lg:col-span-1"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={fadeInUp}
						>
							<Card className="p-6 sticky top-24">
								<CardHeader className="px-0 pt-0 pb-4">
									<CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
										<Filter size={20} />
										Filtri
									</CardTitle>
								</CardHeader>
								<CardContent className="px-0 pb-0">
									<FilterContent />
								</CardContent>
							</Card>
						</motion.div>

						{/* Griglia Prodotti */}
						<div className="lg:col-span-3">
							{/* Risultati header */}
							<motion.div
								className="mb-4 md:mb-6"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: "-100px" }}
								variants={fadeInUp}
							>
								<h2 className="text-lg md:text-xl font-bold text-gray-900">
									{filteredProducts.length} {filteredProducts.length === 1 ? 'Risultato' : 'Risultati'}
								</h2>
								<p className="text-xs md:text-sm text-gray-600 mt-1">
									{filteredProducts.length === products.length 
										? `Tutti i ${title.toLowerCase()} disponibili`
										: `Filtrati da ${products.length} prodotti totali`
									}
								</p>
							</motion.div>

							{/* Griglia */}
							{filteredProducts.length > 0 ? (
								<motion.div 
									className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, margin: "-100px" }}
									variants={staggerContainer}
									key={`grid-${filteredProducts.length}-${searchTerm}-${activeFiltersCount}`}
								>
									{filteredProducts.map((product) => (
										<motion.div key={`product-${product.id}`} variants={scaleIn}>
											<Link href={product.href}>
												<Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group h-full overflow-hidden !pt-0">
													<CardHeader className="p-0">
														<div className="relative h-40 sm:h-48 md:h-56 bg-gray-100">
															<Image
																src={product.image}
																alt={product.name}
																fill
																className="object-contain object-center p-3 md:p-4"
															/>
															{product.isNew && (
																<div className="absolute top-2 left-2 md:top-3 md:left-3">
																	<Badge className="bg-red-500 text-white text-xs">NOVITÀ</Badge>
																</div>
															)}
														</div>
													</CardHeader>
													<CardContent className="p-3 md:p-4 lg:p-6">
														<div className="mb-2 md:mb-3">
															<Badge className={`text-xs ${badgeColor}`}>
																{product.type}
															</Badge>
														</div>
														<CardTitle className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 mb-2 md:mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
															{product.name}
														</CardTitle>
														<div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
															<div className="flex items-center gap-2">
																<Zap className="text-blue-500 flex-shrink-0" size={14} />
																<span className="truncate">Potenza: {product.power}</span>
															</div>
															<div className="flex items-center gap-2">
																<Battery className="text-green-500 flex-shrink-0" size={14} />
																<span className="truncate">Batteria: {product.battery}</span>
															</div>
															<div className="flex items-center gap-2">
																<Gauge className="text-orange-500 flex-shrink-0" size={14} />
																<span className="truncate">Velocità: {product.speed}</span>
															</div>
														</div>
													</CardContent>
												</Card>
											</Link>
										</motion.div>
									))}
								</motion.div>
							) : (
								<motion.div
									className="text-center py-12 md:py-16"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, margin: "-100px" }}
									variants={fadeInUp}
								>
									<div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
										<Search size={32} className="text-gray-400" />
									</div>
									<h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
										Nessun risultato trovato
									</h3>
									<p className="text-sm md:text-base text-gray-600 mb-4">
										Prova a modificare i filtri o la ricerca
									</p>
									<Button onClick={resetFilters} variant="outline">
										Resetta Filtri
									</Button>
								</motion.div>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Sezione */}
			<motion.section 
				className="py-8 md:py-12 lg:py-16 bg-gray-50"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeInUp}
			>
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
						Non hai trovato quello che cerchi?
					</h2>
					<p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto px-4">
						Contattaci per ricevere informazioni personalizzate sui nostri veicoli elettrici
					</p>
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<Button 
							size="lg" 
							className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto"
							asChild
						>
							<Link href="/contatti">Contattaci</Link>
						</Button>
						<Button 
							size="lg" 
							variant="outline"
							className="border-orange-500 text-orange-600 hover:bg-orange-50 w-full sm:w-auto"
							asChild
						>
							<Link href="/cerca">Tutti i Veicoli</Link>
						</Button>
					</div>
				</div>
			</motion.section>
		</div>
	)
}

