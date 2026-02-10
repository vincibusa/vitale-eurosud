'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

interface BMWHeroSectionProps {
	title?: string
	subtitle?: string
	description?: string
	vehicleCount?: number
	onExploreClick?: () => void
}

const fadeInUp = {
	hidden: { opacity: 0, y: 40 },
	visible: { 
		opacity: 1, 
		y: 0, 
		transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } 
	}
}

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { 
			staggerChildren: 0.15, 
			delayChildren: 0.2 
		}
	}
}

export default function BMWHeroSection({
	title = 'La Gamma Vitale',
	subtitle = 'Veicoli Elettrici',
	description = 'Scopri tutti i modelli elettrici pensati per le tue esigenze di mobilità sostenibile. Design italiano, tecnologia avanzata, zero emissioni.',
	vehicleCount = 18,
	onExploreClick
}: BMWHeroSectionProps) {
	const scrollToVehicles = () => {
		const element = document.getElementById('vehicle-catalog')
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
		onExploreClick?.()
	}

	return (
		<section className="relative min-h-[70vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#F5F5F7]">
			{/* Background Gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#E8E8EA] via-[#F5F5F7] to-[#FFFFFF]" />

			{/* Content */}
			<motion.div 
				className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center"
				variants={staggerContainer}
				initial="hidden"
				animate="visible"
			>
				{/* Eyebrow */}
				<motion.div 
					variants={fadeInUp}
					className="mb-4 md:mb-6"
				>
					<span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider">
						{vehicleCount} Modelli Disponibili
					</span>
				</motion.div>

				{/* Main Title */}
				<motion.h1 
					variants={fadeInUp}
					className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] tracking-tight leading-[1.1] mb-4 md:mb-6"
				>
					{title}
				</motion.h1>

				{/* Subtitle */}
				<motion.p 
					variants={fadeInUp}
					className="text-lg sm:text-xl md:text-2xl text-[#1C69D4] font-semibold mb-4 md:mb-6"
				>
					{subtitle}
				</motion.p>

				{/* Description */}
				<motion.p 
					variants={fadeInUp}
					className="text-base md:text-lg text-[#6E6E73] max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
				>
					{description}
				</motion.p>

				{/* CTA Button */}
				<motion.div variants={fadeInUp}>
					<Button
						onClick={scrollToVehicles}
						size="lg"
						className="bg-[#1C69D4] hover:bg-[#0653B6] text-white px-8 py-6 text-base md:text-lg font-semibold rounded-none transition-all duration-300 hover:shadow-xl hover:shadow-[#1C69D4]/20"
					>
						Esplora la Gamma
						<ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
					</Button>
				</motion.div>
			</motion.div>

			{/* Bottom Fade */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F5F7] to-transparent" />
		</section>
	)
}
