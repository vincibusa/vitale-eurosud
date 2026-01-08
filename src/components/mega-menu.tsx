'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MegaMenuItem {
	label: string
	href?: string
	submenu?: {
		category: string
		items: {
			name: string
			href: string
			description?: string
		}[]
	}[]
}

interface MegaMenuProps {
	items: MegaMenuItem[]
}

export default function MegaMenu({ items }: MegaMenuProps) {
	const [activeMenu, setActiveMenu] = useState<string | null>(null)

	return (
		<nav className="hidden lg:flex items-center gap-6">
			{items.map((item) => (
				<div
					key={item.label}
					className="relative"
					onMouseEnter={() => item.submenu && setActiveMenu(item.label)}
					onMouseLeave={() => setActiveMenu(null)}
				>
					{item.submenu ? (
						<>
							<button
								className={cn(
									'flex items-center gap-1 text-sm font-medium transition-colors duration-200 py-2',
									activeMenu === item.label
										? 'text-brand'
										: 'text-gray-700 hover:text-brand'
								)}
							>
								{item.label}
								<ChevronDown
									size={16}
									strokeWidth={1.5}
									className={cn(
										'transition-transform duration-200',
										activeMenu === item.label && 'rotate-180'
									)}
								/>
							</button>

							<AnimatePresence>
								{activeMenu === item.label && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2 }}
										className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-none shadow-2xl border border-gray-100 overflow-hidden z-50"
										style={{ minWidth: '600px' }}
									>
										<div className="p-6 grid grid-cols-2 gap-8">
											{item.submenu.map((section) => (
												<div key={section.category}>
													<h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
														{section.category}
													</h3>
													<div className="space-y-2">
														{section.items.map((subItem) => (
															<Link
																key={subItem.name}
																href={subItem.href}
																className="block group"
															>
																<div className="flex items-start gap-3 p-2 rounded-none hover:bg-brand/5 transition-colors">
																	<div className="flex-1">
																		<p className="text-sm font-medium text-gray-900 group-hover:text-brand transition-colors">
																			{subItem.name}
																		</p>
																		{subItem.description && (
																			<p className="text-xs text-gray-500 mt-0.5">
																				{subItem.description}
																			</p>
																		)}
																	</div>
																</div>
															</Link>
														))}
													</div>
												</div>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</>
					) : (
						<Link
							href={item.href || '#'}
							className="text-sm font-medium text-gray-700 hover:text-brand transition-colors duration-200 py-2"
						>
							{item.label}
						</Link>
					)}
				</div>
			))}
		</nav>
	)
}
