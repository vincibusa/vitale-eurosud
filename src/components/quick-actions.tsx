'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
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
	description?: string
	ctaLabel: string
	href: string
}

export default function QuickActions() {
	const t = useTranslations()
	
	const quickActions: QuickAction[] = [
		{
			iconSrc: '/immagini/Icone/VITALE_SITO WEB-01.png',
			title: 'Trova il tuo veicolo',
			ctaLabel: 'Catalogo',
			href: '/catalogo-veicoli'
		},
		{
			iconSrc: '/immagini/Icone/VITALE_SITO WEB-03.png',
			title: t('home.quickActions.cargoTransport'),
			ctaLabel: 'Modelli disponibili',
			href: '/veicoli-commerciali'
		},
		{
			iconSrc: '/immagini/Icone/VITALE_SITO WEB-04.png',
			title: t('home.quickActions.disabledMobility'),
			ctaLabel: 'Muoviti in libertà',
			href: '/mobilita-disabili'
		},
		{
			iconSrc: '/immagini/Icone/VITALE_SITO WEB-05.png',
			title: t('home.quickActions.contactUs'),
			ctaLabel: 'Siamo qui per te',
			href: '/contatti'
		}
	]
	
	return (
		<section className=" bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-2 md:mb-4 mt-8">
					<h2 className="max-w-4xl mx-auto text-base md:text-lg font-light text-gray-900 mb-1 leading-relaxed text-center">
						Leader nella fornitura di veicoli elettrici di qualità superiore.
						<br />
						Scopri la nostra gamma completa per una mobilità sostenibile e all&apos;avanguardia.
					</h2>
				</div>
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
								<Card className="group h-full overflow-hidden border-0 shadow-none cursor-pointer">
									<CardContent className="p-3 md:p-4 flex flex-col items-center text-center h-full min-h-[240px]">
										<div className="w-24 h-24 md:w-28 md:h-28 rounded-none flex items-center justify-center  overflow-hidden">
											<Image
												src={action.iconSrc}
												alt={action.title}
												width={112}
												height={112}
												className="w-20 h-20 md:w-24 md:h-24 object-contain"
											/>
										</div>
										<h3 className="text-base md:text-lg font-light text-gray-900 mb-1">
											{action.title}
										</h3>

										<div className="mt-5 flex items-center gap-2 border border-black bg-white text-black px-6 py-4 transition-all duration-200 group-hover:border-[3px]">
											<span className="text-sm font-medium">{action.ctaLabel}</span>
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
