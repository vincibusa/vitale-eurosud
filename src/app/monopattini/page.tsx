'use client'

import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'
import { Bolt } from 'lucide-react'

export default function MonopattiniPage() {
	const products: VehicleProduct[] = [
		{
			id: 1,
			name: "ME750 - Monopattino Elettrico (Targabile)",
			type: "Monopattino Elettrico",
			power: "500W",
			battery: "Piombo 48V - 20AH / Optional Litio 60V - 20AH",
			speed: "25KM/H",
			image: "/images/me750-monopattino.jpg",
			href: "/prodotti/me750"
		}
	]

	const filters: VehicleFilter[] = [
		{ name: "Marca", key: "marca", options: ["Vitale", "Altri"] },
		{ name: "Batteria", key: "batteria", options: ["Litio", "Piombo"] },
		{ name: "Potenza", key: "potenza", options: ["500W"] }
	]

	return (
		<VehicleCategoryLayout
			title="Monopattini Elettrici"
			description="Scopri i nostri monopattini elettrici, perfetti per la mobilità urbana sostenibile e veloce. Ideali per spostamenti agili in città."
			icon={Bolt}
			products={products}
			filters={filters}
			heroGradient="bg-gradient-to-r from-purple-500 to-purple-600"
			badgeColor="bg-purple-100 text-purple-700 hover:bg-purple-200"
			primaryColor="purple"
		/>
	)
}

