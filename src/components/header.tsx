'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import MegaMenu, { MegaMenuItem } from '@/components/mega-menu'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'
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
	ChevronRight,
	Globe
} from 'lucide-react'

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const t = useTranslations()
	const locale = useLocale()
	const pathname = usePathname()
	const router = useRouter()
	const currentLocale = locale as 'it' | 'en'
	
	const handleLanguageToggle = (e: React.MouseEvent) => {
		e.preventDefault()
		const newLocale = currentLocale === 'it' ? 'en' : 'it'
		// Remove current locale from pathname if present
		const pathWithoutLocale = pathname.startsWith(`/${currentLocale}`) 
			? pathname.slice(`/${currentLocale}`.length) || '/'
			: pathname
		router.push(pathWithoutLocale, { locale: newLocale })
	}

	// Configurazione mega-menu
	const menuItems: MegaMenuItem[] = [
		{
			label: t('header.vehicles'),
			submenu: [
				{
					category: t('header.urbanMobility'),
					items: [
						{ name: t('header.bicycles'), href: '/biciclette', description: t('header.bicyclesDesc') },
						{ name: t('header.electricScooters'), href: '/monopattini', description: t('header.electricScootersDesc') },
						{ name: t('header.scooters'), href: '/scooter', description: t('header.scootersDesc') }
					]
				},
				{
					category: t('header.autoMinicar'),
					items: [
						{ name: t('header.minicar'), href: '/minicar', description: t('header.minicarDesc') },
						{ name: t('header.quad'), href: '/quad', description: t('header.quadDesc') }
					]
				}
			]
		},
		{
			label: t('header.transport'),
			submenu: [
				{
					category: t('header.professionalSolutions'),
					items: [
						{ name: t('header.commercialVehicles'), href: '/veicoli-commerciali', description: t('header.commercialVehiclesDesc') },
						{ name: t('header.passengerTransport'), href: '/veicoli-commerciali', description: t('header.passengerTransportDesc') }
					]
				},
				{
					category: t('header.accessibility'),
					items: [
						{ name: t('header.disabledMobility'), href: '/mobilita-disabili', description: t('header.disabledMobilityDesc') }
					]
				}
			]
		},
		{
			label: t('header.services'),
			submenu: [
				{
					category: t('header.assistance'),
					items: [
						{ name: t('header.maintenance'), href: '/contatti', description: t('header.maintenanceDesc') },
						{ name: t('header.originalParts'), href: '/contatti', description: t('header.originalPartsDesc') }
					]
				},
				{
					category: t('header.support'),
					items: [
						{ name: t('header.warranties'), href: '/contatti', description: t('header.warrantiesDesc') },
						{ name: t('header.ecobonus'), href: '/contatti', description: t('header.ecobonusDesc') }
					]
				}
			]
		},
		{
			label: t('header.about'),
			href: '/contatti'
		},
		{
			label: t('header.contacts'),
			href: '/contatti'
		}
	]

	// Menu mobile
	const mobileMenuSections = [
		{
			title: t('header.vehicles'),
			icon: Bike,
			items: [
				{ name: t('header.bicycles'), href: '/biciclette', icon: Bike },
				{ name: t('header.electricScooters'), href: '/monopattini', icon: Bolt },
				{ name: t('header.scooters'), href: '/scooter', icon: Zap },
				{ name: t('header.minicar'), href: '/minicar', icon: Car },
				{ name: t('header.quad'), href: '/quad', icon: Car }
			]
		},
		{
			title: t('header.transport'),
			icon: Truck,
			items: [
				{ name: t('header.commercialVehicles'), href: '/veicoli-commerciali', icon: Truck },
				{ name: t('header.disabledMobility'), href: '/mobilita-disabili', icon: Users }
			]
		},
		{
			title: t('common.menu'),
			icon: MessageSquare,
			items: [
				{ name: t('header.services'), href: '/contatti', icon: Wrench },
				{ name: t('header.warranties'), href: '/contatti', icon: Shield },
				{ name: t('header.about'), href: '/contatti', icon: Users },
				{ name: t('header.contacts'), href: '/contatti', icon: MessageSquare }
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
						<a href={`tel:${t('common.phone')}`} className="flex items-center gap-2 hover:text-brand transition-colors">
							<Phone size={14} strokeWidth={1.5} className="flex-shrink-0" />
							<span>{t('common.phone')}</span>
						</a>
						<a href={`mailto:${t('common.email')}`} className="flex items-center gap-2 hover:text-brand transition-colors">
							<Mail size={14} strokeWidth={1.5} className="flex-shrink-0" />
							<span className="truncate">{t('common.email')}</span>
						</a>
						</div>
						<div className="hidden lg:block text-gray-400">
							<span>{t('common.hours')}</span>
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
						{/* Language Switcher - Toggle Switch (Visible on all screen sizes) */}
						<div className="flex items-center gap-2">
							<span className={`text-sm font-medium transition-colors ${currentLocale === 'it' ? 'text-blue-600' : 'text-gray-400'}`}>
								🇮🇹
							</span>
							<button
								onClick={handleLanguageToggle}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 cursor-pointer ${
									currentLocale === 'en' 
										? 'bg-blue-600 hover:bg-blue-700' 
										: 'bg-gray-200 hover:bg-gray-300'
								}`}
								role="switch"
								aria-checked={currentLocale === 'en'}
								aria-label="Toggle language"
							>
								<span
									className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
										currentLocale === 'en' ? 'translate-x-6' : 'translate-x-1'
									}`}
								/>
							</button>
							<span className={`text-sm font-medium transition-colors ${currentLocale === 'en' ? 'text-blue-600' : 'text-gray-400'}`}>
								🇬🇧
							</span>
						</div>
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
									<SheetTitle className="text-xl font-bold">{t('common.menu')}</SheetTitle>
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

								{/* Contact info in mobile menu */}
								<div className="space-y-3 px-4">
									<h3 className="text-sm font-semibold text-gray-900">{t('footer.contacts')}</h3>
									<a href={`tel:${t('common.phone')}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand transition-colors">
										<Phone size={16} strokeWidth={1.5} className="flex-shrink-0" />
										<span>{t('common.phone')}</span>
									</a>
									<a href={`mailto:${t('common.email')}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand transition-colors">
										<Mail size={16} strokeWidth={1.5} className="flex-shrink-0" />
										<span className="break-all">{t('common.email')}</span>
									</a>
								</div>

								{/* Opening hours in mobile menu */}
								<div className="mt-6 px-4 py-4 bg-gray-50 rounded-none">
									<h3 className="text-sm font-semibold text-gray-900 mb-2">{t('contacts.contactInfo.openingHours')}</h3>
									<p className="text-xs text-gray-600">{t('common.hoursShort')}</p>
									<p className="text-xs text-gray-600">{t('common.hoursSaturday')}</p>
									<p className="text-xs text-gray-600">{t('common.hoursSunday')}</p>
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
