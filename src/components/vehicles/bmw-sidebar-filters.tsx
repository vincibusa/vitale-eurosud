'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
	SlidersHorizontal, 
	X, 
	RotateCcw,
	ChevronDown,
	ChevronUp,
	Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterOption {
	label: string
	value: string
	count: number
}

interface FilterSection {
	id: string
	label: string
	type: 'checkbox' | 'radio'
	options: FilterOption[]
}

interface BMWSidebarFiltersProps {
	filters: FilterSection[]
	selectedFilters: Record<string, string[]>
	onFilterChange: (sectionId: string, values: string[]) => void
	priceRange: { min: string; max: string }
	onPriceChange: (min: string, max: string) => void
	onReset: () => void
	totalVehicles: number
	filteredCount: number
	isOpen: boolean
	onClose: () => void
}

const accordionVariants = {
	collapsed: { height: 0, opacity: 0 },
	expanded: { height: 'auto', opacity: 1 }
}

export default function BMWSidebarFilters({
	filters,
	selectedFilters,
	onFilterChange,
	priceRange,
	onPriceChange,
	onReset,
	totalVehicles,
	filteredCount,
	isOpen,
	onClose
}: BMWSidebarFiltersProps) {
	const [expandedSections, setExpandedSections] = useState<string[]>(
		filters.map(f => f.id)
	)

	const toggleSection = (sectionId: string) => {
		setExpandedSections(prev => 
			prev.includes(sectionId) 
				? prev.filter(id => id !== sectionId)
				: [...prev, sectionId]
		)
	}

	const isSectionExpanded = (sectionId: string) => 
		expandedSections.includes(sectionId)

	const hasActiveFilters = Object.values(selectedFilters).some(
		values => values.length > 0
	) || priceRange.min || priceRange.max

	const activeFiltersCount = Object.values(selectedFilters).reduce(
		(acc, values) => acc + values.length, 0
	) + (priceRange.min || priceRange.max ? 1 : 0)

	const SidebarContent = () => (
		<div className="flex flex-col h-full">
			{/* Header - Desktop only */}
			<div className="hidden lg:flex items-center justify-between p-6 border-b border-gray-200">
				<div className="flex items-center gap-2">
					<Filter className="w-5 h-5 text-[#1C69D4]" />
					<h2 className="text-lg font-semibold text-[#1A1A1A]">Filtri</h2>
				</div>
				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="sm"
						onClick={onReset}
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
					{activeFiltersCount > 0 && (
						<span className="bg-[#1C69D4] text-white text-xs px-2 py-0.5 rounded-full">
							{activeFiltersCount}
						</span>
					)}
				</div>
				<button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
					<X className="w-5 h-5 text-gray-600" />
				</button>
			</div>

			{/* Results Count */}
			<div className="px-6 py-4 bg-[#F5F5F7] border-b border-gray-200">
				<p className="text-sm text-[#6E6E73]">
					<span className="font-semibold text-[#1A1A1A]">{filteredCount}</span> di{' '}
					<span className="font-semibold text-[#1A1A1A]">{totalVehicles}</span> veicoli
				</p>
			</div>

			{/* Filter Sections */}
			<div className="flex-1 overflow-y-auto">
				{/* Price Range Section */}
				<div className="border-b border-gray-200">
					<button
						onClick={() => toggleSection('price')}
						className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
					>
						<span className="font-semibold text-[#1A1A1A]">Prezzo</span>
						{isSectionExpanded('price') ? (
							<ChevronUp className="w-4 h-4 text-gray-400" />
						) : (
							<ChevronDown className="w-4 h-4 text-gray-400" />
						)}
					</button>
					<AnimatePresence>
						{isSectionExpanded('price') && (
							<motion.div
								initial="collapsed"
								animate="expanded"
								exit="collapsed"
								variants={accordionVariants}
								transition={{ duration: 0.2 }}
								className="overflow-hidden"
							>
								<div className="p-4 pt-0 space-y-3">
									<div className="grid grid-cols-2 gap-3">
										<div>
											<Label className="text-xs text-[#6E6E73] mb-1.5 block">Min €</Label>
											<Input
												type="number"
												placeholder="0"
												value={priceRange.min}
												onChange={(e) => onPriceChange(e.target.value, priceRange.max)}
												className="rounded-none border-gray-300 focus:border-[#1C69D4] focus:ring-[#1C69D4]"
											/>
										</div>
										<div>
											<Label className="text-xs text-[#6E6E73] mb-1.5 block">Max €</Label>
											<Input
												type="number"
												placeholder="20000"
												value={priceRange.max}
												onChange={(e) => onPriceChange(priceRange.min, e.target.value)}
												className="rounded-none border-gray-300 focus:border-[#1C69D4] focus:ring-[#1C69D4]"
											/>
										</div>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Dynamic Filter Sections */}
				{filters.map((section) => (
					<div key={section.id} className="border-b border-gray-200 last:border-b-0">
						<button
							onClick={() => toggleSection(section.id)}
							className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
						>
							<span className="font-semibold text-[#1A1A1A]">{section.label}</span>
							{isSectionExpanded(section.id) ? (
								<ChevronUp className="w-4 h-4 text-gray-400" />
							) : (
								<ChevronDown className="w-4 h-4 text-gray-400" />
							)}
						</button>
						<AnimatePresence>
							{isSectionExpanded(section.id) && (
								<motion.div
									initial="collapsed"
									animate="expanded"
									exit="collapsed"
									variants={accordionVariants}
									transition={{ duration: 0.2 }}
									className="overflow-hidden"
								>
									<div className="p-4 pt-0 space-y-2">
										{section.type === 'checkbox' ? (
											section.options.map((option) => (
												<div 
													key={option.value}
													className="flex items-center justify-between group"
												>
													<div className="flex items-center space-x-3">
														<Checkbox
															id={`${section.id}-${option.value}`}
															checked={selectedFilters[section.id]?.includes(option.value)}
															onCheckedChange={(checked) => {
																const current = selectedFilters[section.id] || []
																if (checked) {
																	onFilterChange(section.id, [...current, option.value])
																} else {
																	onFilterChange(section.id, current.filter(v => v !== option.value))
																}
															}}
															className="rounded-none border-gray-300 data-[state=checked]:bg-[#1C69D4] data-[state=checked]:border-[#1C69D4]"
														/>
														<Label
															htmlFor={`${section.id}-${option.value}`}
															className="text-sm text-[#1A1A1A] cursor-pointer group-hover:text-[#1C69D4] transition-colors"
														>
															{option.label}
														</Label>
													</div>
													<span className="text-xs text-[#6E6E73]">({option.count})</span>
												</div>
											))
										) : (
											<RadioGroup
												value={selectedFilters[section.id]?.[0] || ''}
												onValueChange={(value) => onFilterChange(section.id, [value])}
												className="space-y-2"
											>
												{section.options.map((option) => (
													<div 
														key={option.value}
														className="flex items-center justify-between group"
													>
														<div className="flex items-center space-x-3">
															<RadioGroupItem
																id={`${section.id}-${option.value}`}
																value={option.value}
																className="border-gray-300 text-[#1C69D4]"
															/>
															<Label
																htmlFor={`${section.id}-${option.value}`}
																className="text-sm text-[#1A1A1A] cursor-pointer group-hover:text-[#1C69D4] transition-colors"
															>
																{option.label}
															</Label>
														</div>
														<span className="text-xs text-[#6E6E73]">({option.count})</span>
													</div>
												))}
											</RadioGroup>
										)}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				))}
			</div>

			{/* Mobile Apply Button */}
			<div className="lg:hidden p-4 border-t border-gray-200 bg-white">
				<Button
					onClick={onClose}
					className="w-full bg-[#1C69D4] hover:bg-[#0653B6] text-white rounded-none py-6"
				>
					Mostra {filteredCount} veicoli
				</Button>
			</div>
		</div>
	)

	return (
		<>
			{/* Desktop Sidebar Content - Hidden on mobile */}
			<div className="hidden lg:block h-full">
				<SidebarContent />
			</div>

			{/* Mobile Drawer */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-black/50 z-40 lg:hidden"
							onClick={onClose}
						/>
						{/* Drawer */}
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
		</>
	)
}
