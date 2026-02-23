'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from '@/i18n/routing'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Search, Filter, ArrowUpDown, X } from 'lucide-react'
import BMWVehicleCard, { type BMWVehicle } from './bmw-vehicle-card'
import BMWSidebarFilters from './bmw-sidebar-filters'
import ComparisonBar from './comparison-bar'
import { useComparison } from '@/contexts/comparison-context'
import type { VehicleProduct } from './bmw-style-product-card'

interface BMWVehicleGridProps {
	vehicles: BMWVehicle[]
	filterSections: {
		id: string
		label: string
		type: 'checkbox' | 'radio'
		options: { label: string; value: string; count: number }[]
	}[]
	heroSection?: React.ReactNode
}

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'newest'

export default function BMWVehicleGrid({ vehicles, filterSections, heroSection }: BMWVehicleGridProps) {
	const router = useRouter()
	const { items, addItem, removeItem, clearAll, isInComparison, maxItems } = useComparison()
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState<SortOption>('newest')
	const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
	const [priceRange, setPriceRange] = useState({ min: '', max: '' })

	const filteredVehicles = useMemo(() => {
		let result = [...vehicles]

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase()
			result = result.filter(v => 
				v.name.toLowerCase().includes(query) ||
				v.model.toLowerCase().includes(query) ||
				v.category.toLowerCase().includes(query)
			)
		}

		if (selectedFilters.category?.length > 0) {
			result = result.filter(v => selectedFilters.category.includes(v.category))
		}

		if (selectedFilters.autonomy?.length > 0) {
			result = result.filter(v => {
				// Handle range values like "35-40 KM" or "80-100 KM"
				const autonomyStr = v.specs.autonomy.replace(/\D/g, ' ')
				const parts = autonomyStr.trim().split(/\s+/)
				let autonomy: number

				if (parts.length >= 2) {
					// It's a range - take the average
					const num1 = parseInt(parts[0]) || 0
					const num2 = parseInt(parts[1]) || 0
					autonomy = Math.round((num1 + num2) / 2)
				} else {
					// Single value
					autonomy = parseInt(parts[0]) || 0
				}

				return selectedFilters.autonomy.some(range => {
					if (range === 'under50') return autonomy < 50
					if (range === '50to100') return autonomy >= 50 && autonomy <= 100
					if (range === 'over100') return autonomy > 100
					return false
				})
			})
		}

		const minPrice = parseInt(priceRange.min) || 0
		const maxPrice = parseInt(priceRange.max) || Infinity
		result = result.filter(v => {
			if (!v.price) return true
			return v.price >= minPrice && v.price <= maxPrice
		})

		switch (sortBy) {
			case 'price-asc':
				result.sort((a, b) => (a.price || 0) - (b.price || 0))
				break
			case 'price-desc':
				result.sort((a, b) => (b.price || 0) - (a.price || 0))
				break
			case 'name-asc':
				result.sort((a, b) => a.name.localeCompare(b.name))
				break
			case 'newest':
				result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
				break
		}

		return result
	}, [vehicles, searchQuery, selectedFilters, priceRange, sortBy])

	// Get selected vehicles for comparison bar
	const selectedVehicles = useMemo(() => {
		return vehicles.filter((v) => items.includes(v.id))
	}, [vehicles, items])

	// Handle comparison actions
	const handleCompareClick = useCallback(
		(id: string) => {
			if (isInComparison(id)) {
				removeItem(id)
			} else {
				if (items.length >= maxItems) {
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

	const handleFilterChange = (sectionId: string, values: string[]) => {
		setSelectedFilters(prev => ({ ...prev, [sectionId]: values }))
	}

	const handleReset = () => {
		setSelectedFilters({})
		setPriceRange({ min: '', max: '' })
		setSearchQuery('')
	}

	const hasActiveFilters = Object.values(selectedFilters).some(v => v.length > 0) || 
		priceRange.min || 
		priceRange.max ||
		searchQuery

	return (
		<section id="vehicle-catalog" className="bg-[#F5F5F7] min-h-screen">
			{/* Hero Section (opzionale) - fuori dal layout flex */}
			{heroSection}

			{/* Layout Flex per Sidebar + Content */}
			<div className="flex">
				{/* Desktop Sidebar - STICKY */}
				<aside className="hidden lg:block sticky top-[80px] w-[280px] h-[calc(100vh-80px)] overflow-y-auto z-20 bg-white border-r border-gray-200 shadow-sm flex-shrink-0">
					<BMWSidebarFilters
						filters={filterSections}
						selectedFilters={selectedFilters}
						onFilterChange={handleFilterChange}
						priceRange={priceRange}
						onPriceChange={(min, max) => setPriceRange({ min, max })}
						onReset={handleReset}
						totalVehicles={vehicles.length}
						filteredCount={filteredVehicles.length}
						isOpen={isMobileFilterOpen}
						onClose={() => setIsMobileFilterOpen(false)}
					/>
				</aside>

				{/* Mobile Drawer */}
				<div className="lg:hidden">
					<BMWSidebarFilters
						filters={filterSections}
						selectedFilters={selectedFilters}
						onFilterChange={handleFilterChange}
						priceRange={priceRange}
						onPriceChange={(min, max) => setPriceRange({ min, max })}
						onReset={handleReset}
						totalVehicles={vehicles.length}
						filteredCount={filteredVehicles.length}
						isOpen={isMobileFilterOpen}
						onClose={() => setIsMobileFilterOpen(false)}
					/>
				</div>

				{/* Main Content */}
				<main className="flex-1 min-w-0">
				{/* Toolbar - sticky con z-index alto e sfondo solido */}
				<div className="sticky top-[80px] z-40 bg-white border-b border-gray-200 shadow-md px-4 sm:px-6 lg:px-8 py-4">
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
									{hasActiveFilters && (
										<span className="ml-2 bg-[#1C69D4] text-white text-xs px-1.5 py-0.5 rounded-full">!</span>
									)}
								</Button>

								<div className="relative flex-1 max-w-md">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
									<Input
										placeholder="Cerca modello..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="pl-10 rounded-none border-gray-300 focus:border-[#1C69D4] focus:ring-[#1C69D4]"
									/>
									{searchQuery && (
										<button
											onClick={() => setSearchQuery('')}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
										>
											<X className="w-4 h-4" />
										</button>
									)}
								</div>
							</div>

							{/* Sort & Results */}
							<div className="flex items-center gap-4">
								<span className="text-sm text-[#6E6E73] hidden sm:inline">
									{filteredVehicles.length} risultati
								</span>
								<Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
									<SelectTrigger className="w-[160px] rounded-none border-gray-300">
										<ArrowUpDown className="w-4 h-4 mr-2" />
										<SelectValue placeholder="Ordina per" />
									</SelectTrigger>
									<SelectContent className="rounded-none">
										<SelectItem value="newest">Novità</SelectItem>
										<SelectItem value="price-asc">Prezzo: Crescente</SelectItem>
										<SelectItem value="price-desc">Prezzo: Decrescente</SelectItem>
										<SelectItem value="name-asc">Nome: A-Z</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Active Filters */}
						{hasActiveFilters && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100"
							>
								<span className="text-xs text-[#6E6E73]">Filtri attivi:</span>
								{Object.entries(selectedFilters).map(([key, values]) => 
									values.map(value => {
										const section = filterSections.find(s => s.id === key)
										const option = section?.options.find(o => o.value === value)
										return (
											<span key={`${key}-${value}`} className="inline-flex items-center gap-1 px-2 py-1 bg-[#1C69D4]/10 text-[#1C69D4] text-xs font-medium">
												{option?.label}
												<button onClick={() => handleFilterChange(key, selectedFilters[key].filter(v => v !== value))} className="ml-1 hover:text-[#0653B6]">
													<X className="w-3 h-3" />
												</button>
											</span>
										)
									})
								)}
								{(priceRange.min || priceRange.max) && (
									<span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1C69D4]/10 text-[#1C69D4] text-xs font-medium">
										Prezzo: {priceRange.min || '0'}€ - {priceRange.max || '∞'}€
										<button onClick={() => setPriceRange({ min: '', max: '' })} className="ml-1 hover:text-[#0653B6]">
											<X className="w-3 h-3" />
										</button>
									</span>
								)}
								{searchQuery && (
									<span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1C69D4]/10 text-[#1C69D4] text-xs font-medium">
										Ricerca: &quot;{searchQuery}&quot;
										<button onClick={() => setSearchQuery('')} className="ml-1 hover:text-[#0653B6]">
											<X className="w-3 h-3" />
										</button>
									</span>
								)}
								<Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-[#6E6E73] hover:text-[#1C69D4]">
									Cancella tutto
								</Button>
							</motion.div>
						)}
					</div>

					{/* Vehicle Grid con padding aumentato */}
					<div className="px-4 sm:px-6 lg:px-8 pt-[120px] pb-24">
						{filteredVehicles.length > 0 ? (
							<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 items-stretch">
								{filteredVehicles.map((vehicle, index) => (
									<BMWVehicleCard
										key={vehicle.id}
										vehicle={vehicle}
										isInCompare={isInComparison(vehicle.id)}
										onCompareClick={() => handleCompareClick(vehicle.id)}
										index={index}
									/>
									))}
								</div>
							) : (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-center py-20"
								>
									<div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
										<Search className="w-10 h-10 text-gray-400" />
									</div>
									<h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Nessun veicolo trovato</h3>
									<p className="text-[#6E6E73] mb-6">Prova a modificare i filtri o la ricerca</p>
									<Button
										onClick={handleReset}
										variant="outline"
										className="rounded-none border-[#1C69D4] text-[#1C69D4] hover:bg-[#1C69D4] hover:text-white"
									>
										Resetta filtri
									</Button>
								</motion.div>
							)}
						</div>
			</main>
		</div>

		{/* Comparison Bar */}
		<ComparisonBar
				selectedVehicles={selectedVehicles as VehicleProduct[]}
				onRemove={removeItem}
				onCompare={handleCompare}
				onClear={clearAll}
				maxItems={maxItems}
			/>
		</section>
	)
}
