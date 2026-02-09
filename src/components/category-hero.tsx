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
	gradient?: string
	totalProducts: number
	backgroundImage?: string
	titleClassName?: string
	descriptionClassName?: string
	bottomGradientClassName?: string
	titleAccent?: string
	titleAccentClassName?: string
	titleBreakBeforeAccent?: boolean
	autoBreakTitle?: boolean
	imageAlt?: string
}

export default function CategoryHero({
	title,
	description,
	backgroundImage = '/images/hero-banner.png',
	titleClassName,
	descriptionClassName,
	gradient = 'bg-gradient-to-r from-black/65 via-black/40 to-transparent md:from-black/80 md:via-black/50',
	bottomGradientClassName = 'bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-black/60',
	titleAccent,
	titleAccentClassName = 'text-brand-light',
	titleBreakBeforeAccent = false,
	autoBreakTitle = true,
	imageAlt
}: CategoryHeroProps) {
	const titleParts = title.trim().split(/\s+/)
	const canAutoBreak = autoBreakTitle && !titleAccent && titleParts.length > 1
	const resolvedTitle = canAutoBreak ? titleParts.slice(0, -1).join(' ') : title
	const resolvedAccent = canAutoBreak ? titleParts[titleParts.length - 1] : titleAccent
	const resolvedBreakBeforeAccent = canAutoBreak ? true : titleBreakBeforeAccent

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
					alt={imageAlt ?? `${resolvedTitle}${resolvedAccent ? ` ${resolvedAccent}` : ''}`}
					fill
					className="object-cover object-right"
					priority
				/>
			</motion.div>

			<div className={`absolute inset-0 ${gradient}`} />
			{bottomGradientClassName ? (
				<div className={`absolute inset-0 ${bottomGradientClassName}`} />
			) : null}

			<div className="relative container mx-auto px-4 h-full flex items-end py-12">
				{/* Title Section */}
					<motion.div
					className="text-white"
					initial="hidden"
					animate="visible"
					variants={fadeInUp}
				>
					<h1 className={titleClassName ?? 'text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white'}>
						{resolvedTitle}
						{resolvedAccent ? (
							resolvedBreakBeforeAccent ? (
								<>
									<br />
									<span className={titleAccentClassName}>{resolvedAccent}</span>
								</>
							) : (
								<>
									{' '}
									<span className={titleAccentClassName}>{resolvedAccent}</span>
								</>
							)
						) : null}
					</h1>
					<p className={descriptionClassName ?? 'text-xl md:text-2xl text-white/90 mb-6 font-light max-w-2xl'}>
						{description}
					</p>
				</motion.div>
			</div>
		</section>
	)
}
