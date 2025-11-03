'use client'

import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'

export default function QuadPage() {
	const products: VehicleProduct[] = [
		{
			id: 1,
			name: "Vitale Q3000 - Quad Elettrico a 4 Ruote",
			type: "Quad Elettrico",
			power: "3.000W",
			battery: "Piombo 72V - 52AH",
			speed: "45KM/H",
			image: "/images/quad-elettrico.jpg",
			href: "/prodotti/quad-elettrico"
		}
	]

	const filters: VehicleFilter[] = [
		{ name: "Marca", key: "marca", options: ["Vitale"] },
		{ name: "Batteria", key: "batteria", options: ["Litio"] },
		{ name: "Potenza", key: "potenza", options: ["3000W"] }
	]

	return (
		<VehicleCategoryLayout
			title="Quad Elettrici"
			description="Scopri i nostri quad elettrici a 4 ruote, perfetti per avventure sostenibili e divertimento off-road con zero emissioni."
			products={products}
			filters={filters}
			heroGradient="bg-gradient-to-r from-red-500 to-red-600"
			badgeColor="bg-red-100 text-red-700 hover:bg-red-200"
			primaryColor="red"
		/>
	)
}

