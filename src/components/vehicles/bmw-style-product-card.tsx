'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export interface VehicleProduct {
	id: string
	name: string
	type: string
	power?: string
	battery?: string
	speed?: string
	autonomy?: string
	chargingTime?: string
	image: string
	href: string
	isNew?: boolean
	subcategory?: string
	optionalFeatures?: string[]
	specs?: Record<string, string>
}

interface BMWStyleProductCardProps {
	product: VehicleProduct
	badgeColor?: string
	primaryColor?: string
	onCompareClick: (id: string) => void
	isInCompare: boolean
}

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5 }
	}
}

export default function BMWStyleProductCard({
	product,
	badgeColor = 'bg-zinc-100 text-zinc-700',
	primaryColor = 'blue',
	onCompareClick,
	isInCompare
}: BMWStyleProductCardProps) {
	const specs = [
		{
			label: 'Autonomia',
			value: product.autonomy || 'N/D'
		},
		{
			label: 'Tempo ricarica',
			value: product.chargingTime || 'N/D'
		},
		{
			label: 'Potenza',
			value: product.power || 'N/D'
		}
	]

	return (
		<motion.div
			variants={cardVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-50px' }}
			className="group bg-white rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
		>
			{/* Image Section */}
			<Link href={product.href} className="block relative">
				<div className="relative h-64 sm:h-72 md:h-80 bg-gray-100 overflow-hidden">
					<Image
						src={product.image}
						alt={product.name}
						fill
						className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
					/>

					{/* Badges */}
					<div className="absolute top-4 left-4 flex flex-col gap-2">
						{product.isNew && (
							<Badge className={`${badgeColor} border-0`}>
								Novità
							</Badge>
						)}
						<Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
							{product.type}
						</Badge>
					</div>
				</div>
			</Link>

			{/* Content Section */}
			<div className="p-6 space-y-6 flex flex-col flex-grow">
				{/* Title */}
				<Link href={product.href}>
					<h3 className="text-xl md:text-2xl font-bold text-gray-900 hover:text-brand transition-colors line-clamp-2">
						{product.name}
					</h3>
				</Link>

				{/* Specs Table - BMW Style */}
				<div className="space-y-3 border-t border-b border-gray-200 py-4">
					{specs.map((spec, index) => (
						<div
							key={index}
							className="flex items-center justify-between text-sm"
						>
							<span className="text-gray-600 font-medium">
								{spec.label}
							</span>
							<span className="text-gray-900 font-semibold">
								{spec.value}
							</span>
						</div>
					))}
				</div>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-3 mt-auto">
					<Button
						asChild
						className="flex-1 bg-brand hover:bg-brand-dark text-white"
					>
						<Link href={product.href}>
							Scopri
						</Link>
					</Button>

					<Button
						variant="outline"
						className={`
							flex-1
							${isInCompare
								? 'border-brand text-brand bg-brand/10'
								: 'border-gray-300 text-gray-700 hover:border-brand hover:text-brand'
							}
						`}
						onClick={(e) => {
							e.preventDefault()
							onCompareClick(product.id)
						}}
					>
						{isInCompare ? (
							<>
								<Check className="w-4 h-4 mr-2" />
								Confronta
							</>
						) : (
							'Confronta'
						)}
					</Button>
				</div>
			</div>
		</motion.div>
	)
}
