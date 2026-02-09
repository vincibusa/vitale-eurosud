'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.2 }
	}
}

interface QuickAction {
	iconSrc: string
	title: string
	description: string
	href: string
}

export default function QuickActions() {
	const t = useTranslations()
	
	const quickActions: QuickAction[] = [
		{
			iconSrc: '/immagini/Icone/VITALE_SITO WEB-01.png',
			title: t('home.quickActions.vehicleCatalog'),
			description: t('home.quickActions.vehicleCatalogDesc'),
			href: '/catalogo-veicoli'
		},
		{
			iconSrc: '/immagini/Icone/VITALE_SITO WEB-03.png',
			title: t('home.quickActions.cargoTransport'),
			description: t('home.quickActions.cargoTransportDesc'),
			href: '/veicoli-commerciali'
		},
		{
			iconSrc: '/immagini/Icone/VITALE_SITO WEB-04.png',
			title: t('home.quickActions.disabledMobility'),
			description: t('home.quickActions.disabledMobilityDesc'),
			href: '/mobilita-disabili'
		},
		{
			iconSrc: '/immagini/Icone/VITALE_SITO WEB-05.png',
			title: t('home.quickActions.contactUs'),
			description: t('home.quickActions.contactUsDesc'),
			href: '/contatti'
		}
	]
	
	return (
		<section className="py-12 md:py-16 bg-white">
			<div className="container mx-auto px-4">
				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={staggerContainer}
				>
					{quickActions.map((action, index) => (
						<motion.div key={index} variants={fadeInUp}>
							<Link href={action.href}>
								<Card className="group h-full overflow-hidden border-2 border-gray-200 hover:border-brand transition-all duration-300 hover:shadow-xl cursor-pointer">
									<CardContent className="p-6 md:p-8 flex flex-col items-center text-center h-full">
										<div className="w-16 h-16 md:w-20 md:h-20 rounded-none bg-brand/5 group-hover:bg-brand flex items-center justify-center mb-4 md:mb-6 transition-all duration-300 overflow-hidden">
											<Image
												src={action.iconSrc}
												alt={action.title}
												width={64}
												height={64}
												className="w-12 h-12 md:w-14 md:h-14 object-contain group-hover:scale-110 transition-transform duration-300"
											/>
										</div>
										<h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-brand transition-colors mb-2">
											{action.title}
										</h3>
										<p className="text-sm md:text-base text-gray-600 mb-4 flex-1">
											{action.description}
										</p>
										<div className="flex items-center gap-2 text-brand group-hover:gap-3 transition-all duration-300">
											<span className="text-sm font-medium">{t('common.discover')}</span>
											<ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
										</div>
									</CardContent>
								</Card>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
