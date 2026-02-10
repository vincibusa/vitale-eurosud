'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from '@/i18n/routing'
import { Search, X, Filter, RotateCcw } from 'lucide-react'
import BMWStyleProductCard, { type VehicleProduct } from './bmw-style-product-card'
import ComparisonBar from './comparison-bar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export type { VehicleProduct }
import { useComparison } from '@/contexts/comparison-context'
import type { SubcategoryConfig } from '@/config/subcategories'

const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
	const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
	const { items, addItem, removeItem, clearAll, isInComparison, maxItems } = useComparison()

	// Get subcategory options (excluding 'all')
	const subcategoryOptions = useMemo(() => {
		return subcategories
			.filter(s => s.value !== 'all')
			.map(s => ({
				value: s.value,
				label: s.label,
				count: products.filter(p => p.subcategory === s.value).length
			}))
	}, [subcategories, products])

	// Filter products
	const filteredProducts = useMemo(() => {
		let filtered = products

		// Filter by selected subcategories
		if (selectedSubcategories.length > 0) {
			filtered = filtered.filter((p) => selectedSubcategories.includes(p.subcategory || ''))
		}

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					p.type.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		return filtered
	}, [products, selectedSubcategories, searchTerm])

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
				if (items.length >= maxItems) return
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

	const toggleSubcategory = (value: string) => {
		setSelectedSubcategories(prev =>
			prev.includes(value)
				? prev.filter(v => v !== value)
				: [...prev, value]
		)
	}

	const resetFilters = () => {
		setSelectedSubcategories([])
		setSearchTerm('')
	}

	const hasActiveFilters = selectedSubcategories.length > 0 || searchTerm

	// Sidebar content
	const SidebarContent = () => (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="hidden lg:flex items-center justify-between p-6 border-b border-gray-200">
				<div className="flex items-center gap-2">
					<Filter className="w-5 h-5 text-[#1C69D4]" />
					<h2 className="text-lg font-semibold text-[#1A1A1A]">Filtri</h2>
				</div>
				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="sm"
						onClick={resetFilters}
						className="text-[#6E6E73] hover:text-[#1C69D4] text-sm"
					>
						<RotateCcw className="w-4 h-4 mr-1" />
						Resetta
					</Button>
				)}
			</div>

			{/* Mobile Header */}
			<div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
				<div className="flex items-center gap-2">
					<Filter className="w-5 h-5 text-[#1C69D4]" />
					<h2 className="text-lg font-semibold text-[#1A1A1A]">Filtri</h2>
					{selectedSubcategories.length > 0 && (
						<span className="bg-[#1C69D4] text-white text-xs px-2 py-0.5 rounded-full">
							{selectedSubcategories.length}
						</span>
					)}
				</div>
				<button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
					<X className="w-5 h-5 text-gray-600" />
				</button>
			</div>

			{/* Results Count */}
			<div className="px-6 py-4 bg-[#F5F5F7] border-b border-gray-200">
				<p className="text-sm text-[#6E6E73]">
					<span className="font-semibold text-[#1A1A1A]">{filteredProducts.length}</span> di{' '}
					<span className="font-semibold text-[#1A1A1A]">{products.length}</span> veicoli
				</p>
			</div>

			{/* Filter Sections */}
			<div className="flex-1 overflow-y-auto p-6">
				{/* Subcategories */}
				{subcategoryOptions.length > 0 && (
					<div className="border-b border-gray-100 pb-6">
						<h3 className="font-semibold text-[#1A1A1A] mb-4">Sottocategorie</h3>
						<div className="space-y-3">
							{subcategoryOptions.map((option) => (
								<div
									key={option.value}
									className="flex items-center justify-between group cursor-pointer"
									onClick={() => toggleSubcategory(option.value)}
								>
									<div className="flex items-center gap-3">
										<Checkbox
											checked={selectedSubcategories.includes(option.value)}
											onCheckedChange={() => toggleSubcategory(option.value)}
											className="rounded-none border-gray-300 data-[state=checked]:bg-[#1C69D4] data-[state=checked]:border-[#1C69D4]"
										/>
										<Label className="text-sm text-[#1A1A1A] cursor-pointer group-hover:text-[#1C69D4] transition-colors">
											{option.label}
										</Label>
									</div>
									<span className="text-xs text-[#6E6E73]">({option.count})</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Mobile Apply Button */}
			<div className="lg:hidden p-4 border-t border-gray-200 bg-white">
				<Button
					onClick={() => setIsMobileFilterOpen(false)}
					className="w-full bg-[#1C69D4] hover:bg-[#0653B6] text-white rounded-none py-6"
				>
					Mostra {filteredProducts.length} veicoli
				</Button>
			</div>
		</div>
	)

	return (
		<section id="vehicle-catalog" className="bg-[#F5F5F7] min-h-screen">
			{/* Desktop Sidebar - Fixed */}
			<aside className="hidden lg:block fixed top-[80px] left-0 w-[280px] h-[calc(100vh-80px)] bg-white border-r border-gray-200 shadow-sm z-30 overflow-hidden">
				<SidebarContent />
			</aside>

			{/* Mobile Drawer */}
			<AnimatePresence>
				{isMobileFilterOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black/50 z-40 lg:hidden"
							onClick={() => setIsMobileFilterOpen(false)}
						/>
						<motion.div
							initial={{ x: '-100%' }}
							animate={{ x: 0 }}
							exit={{ x: '-100%' }}
							transition={{ type: 'spring', damping: 25, stiffness: 200 }}
							className="fixed left-0 top-0 bottom-0 w-[320px] max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl"
						>
							<SidebarContent />
						</motion.div>
					</>
				)}
			</AnimatePresence>

			{/* Main Content */}
			<main className="min-w-0 lg:ml-[280px]">
				{/* Toolbar */}
				<div className="sticky top-20 z-20 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						{/* Search & Mobile Filter */}
						<div className="flex items-center gap-3 flex-1">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsMobileFilterOpen(true)}
								className="lg:hidden rounded-none border-gray-300"
							>
								<Filter className="w-4 h-4 mr-2" />
								Filtri
								{selectedSubcategories.length > 0 && (
									<span className="ml-2 bg-[#1C69D4] text-white text-xs px-1.5 py-0.5 rounded-full">
										{selectedSubcategories.length}
									</span>
								)}
							</Button>

							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
								<input
									type="text"
									placeholder="Cerca modello..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-none focus:ring-2 focus:ring-[#1C69D4] focus:border-[#1C69D4] text-sm"
								/>
								{searchTerm && (
									<button
										type="button"
										onClick={() => setSearchTerm('')}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
									>
										<X className="w-4 h-4" />
									</button>
								)}
							</div>
						</div>

						{/* Results count */}
						<span className="text-sm text-[#6E6E73] hidden sm:inline">
							{filteredProducts.length} risultati
						</span>
					</div>

					{/* Active Filters */}
					{hasActiveFilters && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100"
						>
							<span className="text-xs text-[#6E6E73]">Filtri attivi:</span>
							{selectedSubcategories.map((sub) => {
								const option = subcategoryOptions.find(o => o.value === sub)
								return (
									<span key={sub} className="inline-flex items-center gap-1 px-2 py-1 bg-[#1C69D4]/10 text-[#1C69D4] text-xs font-medium">
										{option?.label}
										<button onClick={() => toggleSubcategory(sub)} className="ml-1 hover:text-[#0653B6]">
											<X className="w-3 h-3" />
										</button>
									</span>
								)
							})}
							{searchTerm && (
								<span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1C69D4]/10 text-[#1C69D4] text-xs font-medium">
									Ricerca: &quot;{searchTerm}&quot;
									<button onClick={() => setSearchTerm('')} className="ml-1 hover:text-[#0653B6]">
										<X className="w-3 h-3" />
									</button>
								</span>
							)}
							<Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-[#6E6E73] hover:text-[#1C69D4]">
								Cancella tutto
							</Button>
						</motion.div>
					)}
				</div>

				{/* Vehicle Grid */}
				<div className="px-4 sm:px-6 lg:px-8 pt-30 pb-8">
					{filteredProducts.length > 0 ? (
						<motion.div
							className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 items-stretch"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-100px' }}
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: { staggerChildren: 0.1 }
								}
							}}
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
							className="text-center py-20"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
						>
							<div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
								<Search className="w-10 h-10 text-gray-400" />
							</div>
							<h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Nessun veicolo trovato</h3>
							<p className="text-[#6E6E73] mb-6">Prova a modificare i filtri o la ricerca</p>
							<Button
								onClick={resetFilters}
								variant="outline"
								className="rounded-none border-[#1C69D4] text-[#1C69D4] hover:bg-[#1C69D4] hover:text-white"
							>
								Resetta filtri
							</Button>
						</motion.div>
					)}
				</div>
			</main>

			{/* Comparison Bar */}
			<ComparisonBar
				selectedVehicles={selectedVehicles}
				onRemove={removeItem}
				onCompare={handleCompare}
				onClear={clearAll}
				maxItems={maxItems}
			/>
		</section>
	)
}
