'use client'

import { useState, useEffect } from 'react'
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
	Car,
	Truck,
	Users,
	Store,
	MessageSquare,
	ChevronRight,
} from 'lucide-react'

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const t = useTranslations()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}
		
		window.addEventListener('scroll', handleScroll)
		handleScroll() // Check initial scroll position
		
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	const locale = useLocale()
	const pathname = usePathname()
	const router = useRouter()
	const currentLocale = locale as 'it' | 'en'
	const isProductDetailPage = pathname.includes('/prodotti/')
	const isCatalogPage = pathname.includes('/catalogo-veicoli')
	const isComparePage = pathname.includes('/confronta')
	const isDealerPage = pathname.includes('/rivenditori')
	const isSolidHeader = isScrolled || isProductDetailPage || isCatalogPage || isComparePage || isDealerPage
	
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
			label: 'Veicoli commerciali',
			submenu: [
				{
					category: 'Soluzioni professionali',
					items: [
						{ name: 'Trasporto merci', href: '/veicoli-commerciali', description: 'Modelli professionali per carico e lavoro' },
						{ name: 'Trasporto passeggeri', href: '/veicoli-commerciali', description: 'Soluzioni dedicate al trasporto persone' }
					]
				}
			]
		},
		{
			label: 'Veicoli privati',
			submenu: [
				{
					category: 'Tutti i veicoli',
					items: [
						{ name: 'Biciclette', href: '/biciclette', description: 'Mobilità urbana e tempo libero' },
						{ name: 'Monopattini', href: '/monopattini', description: 'Compatti e pratici per la città' },
						{ name: 'Scooter', href: '/scooter', description: 'Comfort e autonomia per ogni giorno' },
						{ name: 'Minicar', href: '/minicar', description: 'City car elettriche per uso quotidiano' },
						{ name: 'Quad', href: '/quad', description: 'Prestazioni e versatilità su più terreni' }
					]
				}
			]
		},
		{
			label: 'Mobilità per disabili',
			href: '/mobilita-disabili'
		},
		{
			label: 'Rivenditore',
			href: '/rivenditori'
		},
		{
			label: 'Contatti',
			href: '/contatti'
		}
	]

	// Menu mobile
	const mobileMenuSections = [
		{
			title: 'Veicoli commerciali',
			icon: Truck,
			items: [
				{ name: 'Trasporto merci', href: '/veicoli-commerciali', icon: Truck },
				{ name: 'Trasporto passeggeri', href: '/veicoli-commerciali', icon: Users }
			]
		},
		{
			title: 'Veicoli privati',
			icon: Car,
			items: [
				{ name: 'Biciclette', href: '/biciclette', icon: Car },
				{ name: 'Monopattini', href: '/monopattini', icon: Car },
				{ name: 'Scooter', href: '/scooter', icon: Car },
				{ name: 'Minicar', href: '/minicar', icon: Car },
				{ name: 'Quad', href: '/quad', icon: Car }
			]
		},
		{
			title: 'Altre sezioni',
			icon: MessageSquare,
			items: [
				{ name: 'Mobilità per disabili', href: '/mobilita-disabili', icon: Users },
				{ name: 'Rivenditore', href: '/rivenditori', icon: Store },
				{ name: 'Contatti', href: '/contatti', icon: MessageSquare }
			]
		}
	]

	return (
		<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
			isSolidHeader
				? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm' 
				: 'bg-transparent border-b border-transparent'
			}`}>
			{/* Main navigation */}
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center">
					{/* Logo */}
					<Link href="/" className="flex items-center group">
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
							className="relative flex items-center h-9 md:h-11 w-[150px] md:w-[180px]"
						>
							<Image
								src={isSolidHeader ? '/images/vitale-logo.png' : '/immagini/Vitale_logo_bianco.png'}
								alt="Vitale - Fornitura Veicoli Elettrici"
								fill
								sizes="(max-width: 768px) 150px, 180px"
								className={isSolidHeader ? 'object-contain' : 'object-cover'}
								priority
							/>
						</motion.div>
					</Link>

					{/* Desktop Mega Menu */}
					<div className="ml-6">
						<MegaMenu items={menuItems} isScrolled={isSolidHeader} />
					</div>

					{/* Right icons */}
					<div className="ml-auto flex items-center gap-3">
						{/* Language Switcher - Toggle Switch (Visible on all screen sizes) */}
						<div className="flex items-center gap-2">
							<span
								className={`text-sm font-medium transition-colors ${
									isSolidHeader
										? currentLocale === 'it'
											? 'text-blue-600'
											: 'text-gray-400'
										: currentLocale === 'it'
											? 'text-white'
											: 'text-white/70'
								}`}
							>
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
							<span
								className={`text-sm font-medium transition-colors ${
									isSolidHeader
										? currentLocale === 'en'
											? 'text-blue-600'
											: 'text-gray-400'
										: currentLocale === 'en'
											? 'text-white'
											: 'text-white/70'
								}`}
							>
								🇬🇧
							</span>
						</div>
						{/* Mobile Menu Sheet */}
						<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className={`lg:hidden ${isSolidHeader ? 'text-gray-900' : 'text-white hover:text-white'}`}
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
