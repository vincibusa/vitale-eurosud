'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import MegaMenu, { MegaMenuItem } from '@/components/mega-menu'
import {
	Menu,
	Phone,
	Mail,
	Bike,
	Bolt,
	Car,
	Zap,
	Truck,
	Users,
	Wrench,
	Shield,
	MessageSquare,
	ChevronRight
} from 'lucide-react'

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	// Configurazione mega-menu
	const menuItems: MegaMenuItem[] = [
		{
			label: 'Veicoli Elettrici',
			submenu: [
				{
					category: 'Mobilità Urbana',
					items: [
						{ name: 'Biciclette', href: '/biciclette', description: 'E-bike per città e tempo libero' },
						{ name: 'Monopattini', href: '/monopattini', description: 'Scooter elettrici pratici' },
						{ name: 'Scooter', href: '/scooter', description: 'Mobilità elettrica veloce' }
					]
				},
				{
					category: 'Auto & Minicar',
					items: [
						{ name: 'Minicar', href: '/minicar', description: 'Minicar elettriche compatte' },
						{ name: 'Quad', href: '/quad', description: 'Quad elettrici potenti' }
					]
				}
			]
		},
		{
			label: 'Trasporto',
			submenu: [
				{
					category: 'Soluzioni Professionali',
					items: [
						{ name: 'Veicoli Commerciali', href: '/veicoli-commerciali', description: 'Per trasporto merci' },
						{ name: 'Trasporto Passeggeri', href: '/veicoli-commerciali', description: 'Shuttle elettrici' }
					]
				},
				{
					category: 'Accessibilità',
					items: [
						{ name: 'Mobilità Disabili', href: '/mobilita-disabili', description: 'Veicoli accessibili' }
					]
				}
			]
		},
		{
			label: 'Servizi',
			submenu: [
				{
					category: 'Assistenza',
					items: [
						{ name: 'Manutenzione', href: '/contatti', description: 'Servizi di assistenza' },
						{ name: 'Ricambi Originali', href: '/contatti', description: 'Parti di ricambio certificate' }
					]
				},
				{
					category: 'Supporto',
					items: [
						{ name: 'Garanzie', href: '/contatti', description: 'Copertura estesa' },
						{ name: 'Ecobonus', href: '/contatti', description: 'Incentivi statali' }
					]
				}
			]
		},
		{
			label: 'Chi Siamo',
			href: '/contatti'
		},
		{
			label: 'Contatti',
			href: '/contatti'
		}
	]

	// Menu mobile
	const mobileMenuSections = [
		{
			title: 'Veicoli Elettrici',
			icon: Bike,
			items: [
				{ name: 'Biciclette', href: '/biciclette', icon: Bike },
				{ name: 'Monopattini', href: '/monopattini', icon: Bolt },
				{ name: 'Scooter', href: '/scooter', icon: Zap },
				{ name: 'Minicar', href: '/minicar', icon: Car },
				{ name: 'Quad', href: '/quad', icon: Car }
			]
		},
		{
			title: 'Trasporto',
			icon: Truck,
			items: [
				{ name: 'Veicoli Commerciali', href: '/veicoli-commerciali', icon: Truck },
				{ name: 'Mobilità Disabili', href: '/mobilita-disabili', icon: Users }
			]
		},
		{
			title: 'Altro',
			icon: MessageSquare,
			items: [
				{ name: 'Servizi', href: '/contatti', icon: Wrench },
				{ name: 'Garanzie', href: '/contatti', icon: Shield },
				{ name: 'Chi Siamo', href: '/contatti', icon: Users },
				{ name: 'Contatti', href: '/contatti', icon: MessageSquare }
			]
		}
	]

	return (
		<header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
			{/* Top contact bar - Dark theme */}
			<div className="bg-gray-900 text-white">
				<div className="container mx-auto px-4 py-2">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs sm:text-sm">
						<div className="flex flex-wrap items-center gap-3 md:gap-4">
						<a href="tel:0916145377" className="flex items-center gap-2 hover:text-brand transition-colors">
							<Phone size={14} strokeWidth={1.5} className="flex-shrink-0" />
							<span>0916145377</span>
						</a>
						<a href="mailto:info@vitale-eu.it" className="flex items-center gap-2 hover:text-brand transition-colors">
							<Mail size={14} strokeWidth={1.5} className="flex-shrink-0" />
							<span className="truncate">info@vitale-eu.it</span>
						</a>
						</div>
						<div className="hidden lg:block text-gray-400">
							<span>Lun-Ven 09:00-13:00 / 15:30-19:00 • Sab 09:00-13:00</span>
						</div>
					</div>
				</div>
			</div>

			{/* Main navigation */}
			<div className="container mx-auto px-4 py-4">
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
								width={140}
								height={45}
								className="h-10 md:h-12 w-auto"
								priority
							/>
						</motion.div>
					</Link>

					{/* Desktop Mega Menu */}
					<MegaMenu items={menuItems} />

					{/* Right icons */}
					<div className="flex items-center gap-3">
						{/* Mobile Menu Sheet */}
						<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="lg:hidden"
									aria-label="Toggle menu"
								>
									<Menu size={22} />
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[320px] sm:w-[400px] overflow-y-auto">
								<SheetHeader className="text-left mb-6">
									<SheetTitle className="text-xl font-bold">Menu</SheetTitle>
								</SheetHeader>

								{/* Mobile menu sections */}
								<div className="space-y-6">
									{mobileMenuSections.map((section, idx) => {
										const SectionIcon = section.icon
										return (
											<div key={idx}>
												<div className="flex items-center gap-2 mb-3 px-2">
													<SectionIcon size={18} strokeWidth={1.5} className="text-brand" />
													<h3 className="text-sm font-semibold text-gray-900">
														{section.title}
													</h3>
												</div>
												<div className="space-y-1">
													{section.items.map((item, itemIdx) => {
														const ItemIcon = item.icon
														return (
															<Link
																key={itemIdx}
																href={item.href}
																onClick={() => setIsMenuOpen(false)}
																className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-brand hover:bg-brand/5 rounded-none transition-all duration-200 group"
															>
																<div className="flex items-center gap-3">
																	<ItemIcon size={18} strokeWidth={1.5} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
																	<span className="font-medium text-sm">{item.name}</span>
																</div>
																<ChevronRight size={16} strokeWidth={1.5} className="text-gray-400 group-hover:text-brand transition-colors" />
															</Link>
														)
													})}
												</div>
												{idx < mobileMenuSections.length - 1 && <Separator className="mt-6" />}
											</div>
										)
									})}
								</div>

								<Separator className="my-6" />

								{/* Contact info in mobile menu */}
								<div className="space-y-3 px-4">
									<h3 className="text-sm font-semibold text-gray-900">Contatti</h3>
									<a href="tel:0916145377" className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand transition-colors">
										<Phone size={16} strokeWidth={1.5} className="flex-shrink-0" />
										<span>0916145377</span>
									</a>
									<a href="mailto:info@vitale-eu.it" className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand transition-colors">
										<Mail size={16} strokeWidth={1.5} className="flex-shrink-0" />
										<span className="break-all">info@vitale-eu.it</span>
									</a>
								</div>

								{/* Opening hours in mobile menu */}
								<div className="mt-6 px-4 py-4 bg-gray-50 rounded-none">
									<h3 className="text-sm font-semibold text-gray-900 mb-2">Orari</h3>
									<p className="text-xs text-gray-600">Lun-Ven: 09:00-13:00 / 15:30-19:00</p>
									<p className="text-xs text-gray-600">Sab: 09:00-13:00</p>
									<p className="text-xs text-gray-600">Dom: Chiuso</p>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
