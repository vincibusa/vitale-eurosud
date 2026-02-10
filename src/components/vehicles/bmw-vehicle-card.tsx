'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
	ArrowRight, 
	Scale,
	Check,
	Battery,
	Zap,
	Gauge,
	Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BMWVehicle {
	id: string
	name: string
	model: string
	category: string
	type?: string
	price?: number
	image: string
	href: string
	isNew?: boolean
	isBestseller?: boolean
	specs: {
		autonomy: string
		power: string
		speed: string
		chargingTime: string
	}
	badge?: string
}

interface BMWVehicleCardProps {
	vehicle: BMWVehicle
	isInCompare?: boolean
	onCompareClick?: () => void
	index?: number
}

const cardVariants = {
	hidden: { 
		opacity: 0, 
		y: 30 
	},
	visible: (index: number) => ({ 
		opacity: 1, 
		y: 0,
		transition: { 
			duration: 0.5, 
			ease: [0.25, 0.46, 0.45, 0.94] as const,
			delay: index * 0.1
		}
	})
}

export default function BMWVehicleCard({ 
	vehicle, 
	isInCompare = false, 
	onCompareClick,
	index = 0
}: BMWVehicleCardProps) {
	const formatPrice = (price?: number) => {
		if (!price) return 'Prezzo su richiesta'
		return `Da ${price.toLocaleString('it-IT')} €`
	}

	const specItems = [
		{ icon: Battery, label: 'Autonomia', value: vehicle.specs.autonomy },
		{ icon: Zap, label: 'Potenza', value: vehicle.specs.power },
		{ icon: Gauge, label: 'Velocità', value: vehicle.specs.speed },
		{ icon: Clock, label: 'Ricarica', value: vehicle.specs.chargingTime },
	]

	return (
		<motion.article
			variants={cardVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-50px' }}
			custom={index}
			className="group h-full flex flex-col bg-white border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500"
		>
			{/* Image Container */}
			<Link href={vehicle.href} className="block relative">
				<div className="relative aspect-[16/10] bg-gradient-to-b from-[#F5F5F7] to-white overflow-hidden">
					<Image
						src={vehicle.image}
						alt={vehicle.name}
						fill
						className="object-contain p-6 md:p-8 group-hover:scale-105 transition-transform duration-700 ease-out"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
					/>
					
					{/* Badges */}
					<div className="absolute top-4 left-4 flex flex-col gap-2">
						{vehicle.isNew && (
							<Badge className="bg-[#1C69D4] hover:bg-[#0653B6] text-white rounded-none px-3 py-1 text-xs font-semibold uppercase tracking-wider">
								Novità
							</Badge>
						)}
						{vehicle.isBestseller && (
							<Badge className="bg-[#1A1A1A] hover:bg-[#333] text-white rounded-none px-3 py-1 text-xs font-semibold uppercase tracking-wider">
								Best Seller
							</Badge>
						)}
						<Badge 
							variant="secondary" 
							className="bg-white/90 backdrop-blur-sm text-[#6E6E73] rounded-none px-3 py-1 text-xs font-medium"
						>
							{vehicle.category}
						</Badge>
					</div>
				</div>
			</Link>

			{/* Content */}
			<div className="p-5 md:p-6 flex flex-col flex-1">
				{/* Title & Model */}
				<Link href={vehicle.href} className="block group/title">
					<h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] group-hover/title:text-[#1C69D4] transition-colors duration-300 leading-tight">
						{vehicle.name}
					</h3>
					<p className="text-sm text-[#6E6E73] mt-1 font-medium">
						{vehicle.model}
					</p>
				</Link>

				{/* Price */}
				<div className="mt-4 pt-4 border-t border-gray-100">
					<p className="text-lg md:text-xl font-semibold text-[#1A1A1A]">
						{formatPrice(vehicle.price)}
					</p>
				</div>

				{/* Specs Grid - flex-grow per spingere i bottoni in basso */}
				<div className="mt-4 grid grid-cols-2 gap-3 flex-grow content-start">
					{specItems.map((spec, idx) => (
						<div 
							key={idx}
							className="flex items-start gap-2 p-2.5 bg-[#F5F5F7] rounded-sm h-[72px]"
						>
							<spec.icon className="w-4 h-4 text-[#1C69D4] mt-0.5 flex-shrink-0" />
							<div className="min-w-0">
								<p className="text-[10px] uppercase tracking-wider text-[#6E6E73] font-medium">
									{spec.label}
								</p>
								<p className="text-sm font-semibold text-[#1A1A1A] truncate">
									{spec.value}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* CTAs - mt-auto per allineare in fondo */}
				<div className="mt-auto pt-5 flex flex-col sm:flex-row gap-3">
					<Button
						asChild
						className="flex-1 bg-[#1C69D4] hover:bg-[#0653B6] text-white rounded-none h-12 font-semibold transition-all duration-300 group/btn"
					>
						<Link href={vehicle.href}>
							Scopri di più
							<ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
						</Link>
					</Button>

					{onCompareClick && (
						<Button
							variant="outline"
							onClick={onCompareClick}
							className={cn(
								"flex-1 rounded-none h-12 font-semibold transition-all duration-300",
								isInCompare 
									? "bg-[#1C69D4]/10 border-[#1C69D4] text-[#1C69D4] hover:bg-[#1C69D4]/20" 
									: "border-gray-300 text-[#1A1A1A] hover:border-[#1C69D4] hover:text-[#1C69D4]"
							)}
						>
							{isInCompare ? (
								<>
									<Check className="mr-2 w-4 h-4" />
									Aggiunto
								</>
							) : (
								<>
									<Scale className="mr-2 w-4 h-4" />
									Confronta
								</>
							)}
						</Button>
					)}
				</div>
			</div>
		</motion.article>
	)
}
