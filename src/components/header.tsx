'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone, Mail } from 'lucide-react'

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const navigationItems = [
		{ name: 'Home', href: '/' },
		{ name: 'Veicoli Commerciali', href: '/veicoli-commerciali' },
		{ name: "Mobilità per Disabili", href: '/mobilita-disabili' },
		{ name: 'Biciclette', href: '/biciclette' },
		{ name: 'Monopattini', href: '/monopattini' },
		{ name: 'Minicar', href: '/minicar' },
		{ name: 'Scooter', href: '/scooter' },
		{ name: 'Quad', href: '/quad' },
		{ name: 'Contatti', href: '/contatti' },
	]

	const menuVariants = {
		closed: {
			opacity: 0,
			height: 0,
			transition: {
				duration: 0.3,
				ease: 'easeInOut'
			}
		},
		open: {
			opacity: 1,
			height: 'auto',
			transition: {
				duration: 0.3,
				ease: 'easeInOut'
			}
		}
	}

	const itemVariants = {
		closed: { opacity: 0, x: -20 },
		open: { 
			opacity: 1, 
			x: 0,
			transition: {
				duration: 0.3
			}
		}
	}

	return (
		<header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 shadow-sm">
			{/* Top contact bar */}
			<div className="bg-orange-500 text-white">
				<div className="container mx-auto px-4 py-2">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs sm:text-sm">
						<div className="flex flex-wrap items-center gap-3 md:gap-4">
							<a href="tel:0916145377" className="flex items-center gap-2 hover:text-orange-100 transition-colors">
								<Phone size={14} className="flex-shrink-0" />
								<span>0916145377</span>
							</a>
							<a href="mailto:info@vitale-eu.it" className="flex items-center gap-2 hover:text-orange-100 transition-colors">
								<Mail size={14} className="flex-shrink-0" />
								<span className="truncate">info@vitale-eu.it</span>
							</a>
						</div>
						<div className="hidden lg:block">
							<span>Orari: Lun-Ven 09:00-13:00 / 15:30-19:00 • Sab 09:00-13:00</span>
						</div>
					</div>
				</div>
			</div>

			{/* Main navigation */}
			<div className="container mx-auto px-4 py-3 md:py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center group">
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
							className="flex items-center"
						>
							<Image
								src="/images/vitale-logo.png"
								alt="Vitale - Fornitura Veicoli Elettrici"
								width={120}
								height={40}
								className="h-8 md:h-10 w-auto"
								priority
							/>
						</motion.div>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center gap-6">
						{navigationItems.map((item) => (
							<Link 
								key={item.name} 
								href={item.href}
								className="text-gray-700 hover:text-orange-500 transition-colors duration-200 text-sm font-medium relative group"
							>
								{item.name}
								<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full" />
							</Link>
						))}
					</nav>

					{/* Mobile menu button */}
					<Button
						variant="ghost"
						size="sm"
						className="lg:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label="Toggle menu"
					>
						<AnimatePresence mode="wait">
							{isMenuOpen ? (
								<motion.div
									key="close"
									initial={{ rotate: -90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: 90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<X size={20} />
								</motion.div>
							) : (
								<motion.div
									key="menu"
									initial={{ rotate: 90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: -90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Menu size={20} />
								</motion.div>
							)}
						</AnimatePresence>
					</Button>
				</div>

				{/* Mobile Navigation */}
				<AnimatePresence>
					{isMenuOpen && (
						<motion.nav 
							className="lg:hidden overflow-hidden"
							initial="closed"
							animate="open"
							exit="closed"
							variants={menuVariants}
						>
							<div className="mt-4 pb-4 border-t border-gray-100 pt-4 flex flex-col gap-3">
								{navigationItems.map((item, index) => (
									<motion.div
										key={item.name}
										variants={itemVariants}
										custom={index}
									>
										<Link 
											href={item.href}
											className="text-gray-700 hover:text-orange-500 transition-colors duration-200 py-2 text-sm font-medium block"
											onClick={() => setIsMenuOpen(false)}
										>
											{item.name}
										</Link>
									</motion.div>
								))}
							</div>
						</motion.nav>
					)}
				</AnimatePresence>
			</div>
		</header>
	)
}

export default Header