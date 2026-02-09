'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from '@/i18n/routing'
import { Search, X } from 'lucide-react'
import CategoryTabs from './category-tabs'
import BMWStyleProductCard, { type VehicleProduct } from './bmw-style-product-card'
import ComparisonBar from './comparison-bar'

// Re-export VehicleProduct for backward compatibility
export type { VehicleProduct }
import { useComparison } from '@/contexts/comparison-context'
import type { SubcategoryConfig } from '@/config/subcategories'

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

interface VehicleCategoryLayoutProps {
	title: string
	description: string
	products: VehicleProduct[]
	subcategories: SubcategoryConfig[]
	badgeColor: string
	primaryColor: string
	categorySlug: string
}

export default function VehicleCategoryLayout({
	title,
	description,
	products,
	subcategories,
	badgeColor,
	primaryColor = 'blue',
	categorySlug
}: VehicleCategoryLayoutProps) {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState('')
	const [activeTab, setActiveTab] = useState<string>('all')
	const { items, addItem, removeItem, clearAll, isInComparison, maxItems } = useComparison()

	// Calculate vehicle counts per tab
	const vehicleCounts = useMemo(() => {
		const counts: Record<string, number> = {}
		subcategories.forEach((tab) => {
			if (tab.value === 'all') {
				counts[tab.value] = products.length
			} else {
				counts[tab.value] = products.filter((p) => p.subcategory === tab.value).length
			}
		})
		return counts
	}, [products, subcategories])

	// Filter products by tab and search
	const filteredProducts = useMemo(() => {
		let filtered = products

		// 1. Filter by active tab (subcategory)
		if (activeTab !== 'all') {
			filtered = filtered.filter((p) => p.subcategory === activeTab)
		}

		// 2. Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					p.type.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		return filtered
	}, [products, activeTab, searchTerm])

	// Get selected vehicles for comparison bar
	const selectedVehicles = useMemo(() => {
		return products.filter((p) => items.includes(p.id))
	}, [products, items])

	// Handle comparison actions
	const handleCompareClick = useCallback(
		(id: string) => {
			if (isInComparison(id)) {
				removeItem(id)
			} else {
				if (items.length >= maxItems) {
					// Optionally show a toast/notification here
					return
				}
				addItem(id)
			}
		},
		[addItem, removeItem, isInComparison, items.length, maxItems]
	)

	const handleCompare = useCallback(() => {
		if (selectedVehicles.length >= 2) {
			const ids = selectedVehicles.map((v) => v.id).join(',')
			router.push(`/confronta?ids=${ids}`)
		}
	}, [selectedVehicles, router])

	return (
		<div className="w-full pb-24">
			{/* Main Content */}
			<section className="py-8 md:py-12 lg:py-16">
				<div className="container mx-auto px-4">
					<motion.p
						className="mb-5 md:mb-6 max-w-4xl text-sm md:text-base text-gray-600 leading-relaxed"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						variants={fadeInUp}
					>
						Veicolo elettrico sostenibile, progettato per ridurre le emissioni e l&apos;impatto ambientale.
						Silenzioso, efficiente e alimentato da energia pulita, offre una mobilità moderna che unisce prestazioni,
						comfort e rispetto per il pianeta.
					</motion.p>

					{/* Category Tabs */}
					<motion.div
						className="mb-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						variants={fadeInUp}
					>
						<CategoryTabs
							tabs={subcategories}
							activeTab={activeTab}
							onTabChange={setActiveTab}
							vehicleCounts={vehicleCounts}
							primaryColor={primaryColor}
						/>
					</motion.div>

					{/* Search Bar */}
					<motion.div
						className="mb-6 md:mb-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						variants={fadeInUp}
					>
						<div className="relative">
							<Search
								size={18}
								className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
							/>
							<input
								type="text"
								placeholder="Cerca modello..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-none focus:ring-2 focus:ring-brand focus:border-brand text-sm"
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
					</motion.div>

					{/* Results Header */}
					<motion.div
						className="mb-4 md:mb-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						variants={fadeInUp}
					>
						<h2 className="text-lg md:text-xl font-bold text-gray-900">
							{filteredProducts.length}{' '}
							{filteredProducts.length === 1 ? 'Risultato' : 'Risultati'}
						</h2>
						<p className="text-xs md:text-sm text-gray-600 mt-1">
							{filteredProducts.length === products.length
								? `Tutti i ${title.toLowerCase()} disponibili`
								: `Filtrati da ${products.length} prodotti totali`}
						</p>
					</motion.div>

					{/* Products Grid - BMW Style (2 columns on desktop) */}
					{filteredProducts.length > 0 ? (
						<motion.div
							className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-100px' }}
							variants={staggerContainer}
						>
							{filteredProducts.map((product) => (
								<BMWStyleProductCard
									key={product.id}
									product={product}
									badgeColor={badgeColor}
									primaryColor={primaryColor}
									onCompareClick={handleCompareClick}
									isInCompare={isInComparison(product.id)}
								/>
							))}
						</motion.div>
					) : (
						<motion.div
							className="text-center py-12 md:py-16"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-100px' }}
							variants={fadeInUp}
						>
							<div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-none flex items-center justify-center">
								<Search size={32} className="text-gray-400" />
							</div>
							<h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
								Nessun risultato trovato
							</h3>
							<p className="text-sm md:text-base text-gray-600 mb-4">
								Prova a modificare la tab o la ricerca
							</p>
							<button
								onClick={() => {
									setSearchTerm('')
									setActiveTab('all')
								}}
								className="px-4 py-2 border border-gray-300 rounded-none hover:bg-gray-50 transition-colors"
							>
								Resetta Filtri
							</button>
						</motion.div>
					)}
				</div>
			</section>

			{/* CTA Section */}
			<motion.section
				className="py-8 md:py-12 lg:py-16 bg-gray-50"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-100px' }}
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
						<a
							href="/contatti"
							className="px-6 py-3 bg-brand hover:bg-brand-dark text-white rounded-none font-medium transition-colors w-full sm:w-auto sm:min-w-[200px] text-center"
						>
							Contattaci
						</a>
					</div>
				</div>
			</motion.section>

			{/* Comparison Bar */}
			<ComparisonBar
				selectedVehicles={selectedVehicles}
				onRemove={removeItem}
				onCompare={handleCompare}
				onClear={clearAll}
				maxItems={maxItems}
			/>
		</div>
	)
}
