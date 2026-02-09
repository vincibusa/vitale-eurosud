'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const fadeIn = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.8 } }
}

const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

type IconName = 'Bike' | 'Bolt' | 'Zap' | 'Car' | 'Truck' | 'Users' | 'ShoppingBag'

interface CategoryHeroProps {
	title: string
	description: string
	iconName: IconName
	gradient: string
	totalProducts: number
	backgroundImage?: string
}

export default function CategoryHero({
	title,
	description,
	backgroundImage = '/images/hero-banner.png'
}: CategoryHeroProps) {
	return (
		<section className="relative h-[400px] md:h-[500px] overflow-hidden">
			{/* Background Image */}
			<motion.div
				initial="hidden"
				animate="visible"
				variants={fadeIn}
				className="absolute inset-0"
			>
				<Image
					src={backgroundImage}
					alt={title}
					fill
					className="object-cover object-right"
					priority
				/>
			</motion.div>

			<div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />

			<div className="relative container mx-auto px-4 h-full flex items-end py-12">
				{/* Title Section */}
				<motion.div
					className="text-white"
					initial="hidden"
					animate="visible"
					variants={fadeInUp}
				>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
						{title}
					</h1>
					<p className="text-lg md:text-xl text-white/90 max-w-2xl">
						{description}
					</p>
				</motion.div>
			</div>
		</section>
	)
}
