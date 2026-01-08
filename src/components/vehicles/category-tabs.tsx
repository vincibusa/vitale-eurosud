'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { SubcategoryConfig } from '@/config/subcategories'

interface CategoryTabsProps {
	tabs: SubcategoryConfig[]
	activeTab: string
	onTabChange: (value: string) => void
	vehicleCounts: Record<string, number>
	primaryColor?: string
}

export default function CategoryTabs({
	tabs,
	activeTab,
	onTabChange,
	vehicleCounts,
	primaryColor = 'blue'
}: CategoryTabsProps) {
	return (
		<div className="w-full border-b border-gray-200">
			<div className="overflow-x-auto scrollbar-hide">
				<div className="flex gap-1 sm:gap-2 min-w-max sm:min-w-0 px-1">
					{tabs.map((tab) => {
						const isActive = activeTab === tab.value
						const count = vehicleCounts[tab.value] || 0

						return (
							<button
								key={tab.value}
								onClick={() => onTabChange(tab.value)}
								className={`
									relative px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium
									transition-colors duration-200 whitespace-nowrap
									${isActive
										? 'text-brand'
										: 'text-gray-600 hover:text-gray-900'
									}
								`}
								aria-current={isActive ? 'page' : undefined}
							>
								<div className="flex items-center gap-2">
									<span>{tab.label}</span>
									{count > 0 && (
										<Badge
											variant="secondary"
											className={`
												text-xs px-1.5 py-0.5 min-w-[20px]
												${isActive
													? 'bg-brand/10 text-brand'
													: 'bg-gray-100 text-gray-600'
												}
											`}
										>
											{count}
										</Badge>
									)}
								</div>

								{/* Active Tab Indicator */}
								{isActive && (
									<motion.div
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
										layoutId="activeTab"
										transition={{
											type: 'spring',
											stiffness: 380,
											damping: 30
										}}
									/>
								)}
							</button>
						)
					})}
				</div>
			</div>
		</div>
	)
}
