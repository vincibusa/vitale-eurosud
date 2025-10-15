'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { 
	Menu, 
	Phone, 
	Mail, 
	Home,
	Truck,
	Users,
	Bike,
	Bolt,
	Car,
	Zap,
	MessageSquare
} from 'lucide-react'

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const navigationItems = [
		{ name: 'Home', href: '/', icon: Home },
		{ name: 'Veicoli Commerciali', href: '/veicoli-commerciali', icon: Truck },
		{ name: 'Mobilità per Disabili', href: '/mobilita-disabili', icon: Users },
		{ name: 'Biciclette', href: '/biciclette', icon: Bike },
		{ name: 'Monopattini', href: '/monopattini', icon: Bolt },
		{ name: 'Minicar', href: '/minicar', icon: Car },
		{ name: 'Scooter', href: '/scooter', icon: Zap },
		{ name: 'Quad', href: '/quad', icon: Car },
		{ name: 'Contatti', href: '/contatti', icon: MessageSquare },
	]

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
						{navigationItems.map((item) => {
							const Icon = item.icon
							return (
								<Link 
									key={item.name} 
									href={item.href}
									className="text-gray-700 hover:text-orange-500 transition-colors duration-200 text-sm font-medium relative group flex items-center gap-2"
								>
									<Icon size={16} className="flex-shrink-0" />
									{item.name}
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full" />
								</Link>
							)
						})}
					</nav>

					{/* Mobile Menu Sheet */}
					<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								className="lg:hidden"
								aria-label="Toggle menu"
							>
								<Menu size={20} />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[300px] sm:w-[400px]">
							<SheetHeader>
								<SheetTitle className="text-left">Menu</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-col gap-1 mt-6">
								{navigationItems.map((item) => {
									const Icon = item.icon
									return (
										<Link
											key={item.name}
											href={item.href}
											onClick={() => setIsMenuOpen(false)}
											className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 group"
										>
											<Icon size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
											<span className="font-medium">{item.name}</span>
										</Link>
									)
								})}
							</nav>

							<Separator className="my-6" />

							{/* Contact info in mobile menu */}
							<div className="space-y-3 px-4">
								<h3 className="text-sm font-semibold text-gray-900">Contatti</h3>
								<a href="tel:0916145377" className="flex items-center gap-3 text-sm text-gray-600 hover:text-orange-500 transition-colors">
									<Phone size={16} className="flex-shrink-0" />
									<span>0916145377</span>
								</a>
								<a href="mailto:info@vitale-eu.it" className="flex items-center gap-3 text-sm text-gray-600 hover:text-orange-500 transition-colors">
									<Mail size={16} className="flex-shrink-0" />
									<span className="break-all">info@vitale-eu.it</span>
								</a>
							</div>

							{/* Opening hours in mobile menu */}
							<div className="mt-6 px-4 py-4 bg-orange-50 rounded-lg">
								<h3 className="text-sm font-semibold text-gray-900 mb-2">Orari</h3>
								<p className="text-xs text-gray-600">Lun-Ven: 09:00-13:00 / 15:30-19:00</p>
								<p className="text-xs text-gray-600">Sab: 09:00-13:00</p>
								<p className="text-xs text-gray-600">Dom: Chiuso</p>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}

export default Header