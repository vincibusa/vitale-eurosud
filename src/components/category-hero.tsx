'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Home, Bike, Bolt, Zap, Car, Truck, Users, ShoppingBag } from 'lucide-react'

const fadeIn = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.8 } }
}

const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

// Icon mapping to avoid passing components from Server to Client
const iconMap = {
	Bike,
	Bolt,
	Zap,
	Car,
	Truck,
	Users,
	ShoppingBag
}

type IconName = keyof typeof iconMap

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
	iconName,
	gradient,
	totalProducts,
	backgroundImage = '/images/hero-banner.png'
}: CategoryHeroProps) {
	const Icon = iconMap[iconName]
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
					className="object-cover object-center"
					priority
				/>
			</motion.div>

			<div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />

			<div className="relative container mx-auto px-4 h-full flex flex-col justify-between py-12">
				{/* Breadcrumb */}
				<motion.nav
					className="flex items-center gap-2 text-white/80 text-sm"
					initial="hidden"
					animate="visible"
					variants={fadeInUp}
				>
					<Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
						<Home size={16} />
						<span>Home</span>
					</Link>
					<ChevronRight size={16} />
					<span className="text-white font-medium">{title}</span>
				</motion.nav>

				{/* Title Section */}
				<motion.div
					className="text-white"
					initial="hidden"
					animate="visible"
					variants={fadeInUp}
				>
					<div className="flex items-center gap-4 mb-4">
						<div className="w-16 h-16 md:w-20 md:h-20 rounded-none bg-white/20 backdrop-blur-sm flex items-center justify-center">
							<Icon size={36} className="text-white" />
						</div>
						<Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-4 py-1">
							{totalProducts} {totalProducts === 1 ? 'Prodotto' : 'Prodotti'}
						</Badge>
					</div>
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
