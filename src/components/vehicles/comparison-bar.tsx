'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X, Scale } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { VehicleProduct } from './bmw-style-product-card'

interface ComparisonBarProps {
	selectedVehicles: VehicleProduct[]
	onRemove: (id: string) => void
	onCompare: () => void
	onClear: () => void
	maxItems?: number
}

const barVariants = {
	hidden: { y: 100, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring' as const,
			stiffness: 300,
			damping: 30
		}
	}
}

export default function ComparisonBar({
	selectedVehicles,
	onRemove,
	onCompare,
	onClear,
	maxItems = 4
}: ComparisonBarProps) {
	const t = useTranslations()
	if (selectedVehicles.length === 0) return null

	return (
		<AnimatePresence>
			<motion.div
				variants={barVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
				className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
			>
				<div className="container mx-auto px-4 py-3 sm:py-4">
					<div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
						{/* Selected Vehicles Thumbnails */}
						<div className="flex items-center gap-2 sm:gap-3 flex-1 overflow-x-auto scrollbar-hide min-w-0">
							<div className="flex items-center gap-2 text-sm font-medium text-gray-700 whitespace-nowrap">
								<Scale className="w-4 h-4 text-brand" strokeWidth={1.5} />
								<span className="hidden sm:inline">{t('vehicles.compareLabel')}</span>
							</div>

							{selectedVehicles.slice(0, maxItems).map((vehicle) => (
								<motion.div
									key={vehicle.id}
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.8, opacity: 0 }}
									className="relative flex-shrink-0 group"
								>
									<div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-none overflow-hidden bg-gray-100 border-2 border-brand">
										<Image
											src={vehicle.image}
											alt={vehicle.name}
											fill
											className="object-contain p-1"
										/>
									</div>

									{/* Remove Button */}
									<button
										onClick={() => onRemove(vehicle.id)}
										className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
										aria-label={`Rimuovi ${vehicle.name} dal confronto`}
									>
										<X className="w-3 h-3" />
									</button>

									{/* Vehicle Name Tooltip */}
									<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
										{vehicle.name}
									</div>
								</motion.div>
							))}

							{selectedVehicles.length > maxItems && (
								<div className="flex-shrink-0 text-sm text-gray-500 font-medium">
									+{selectedVehicles.length - maxItems}
								</div>
							)}
						</div>

						{/* Actions */}
						<div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
							<Button
								variant="outline"
								size="sm"
								onClick={onClear}
								className="text-xs sm:text-sm"
							>
								{t('vehicles.clearAll')}
							</Button>

							<Button
								onClick={onCompare}
								className="bg-brand hover:bg-brand-dark text-white text-xs sm:text-sm"
								disabled={selectedVehicles.length < 2}
							>
								{t('vehicles.compare')} {selectedVehicles.length} {selectedVehicles.length === 1 ? t('vehicles.productSingular') : t('vehicles.productPlural')}
							</Button>
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

