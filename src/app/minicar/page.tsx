'use client'

import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'

export default function MinicarPage() {
	const products: VehicleProduct[] = [
		{
			id: 1,
			name: "MIA - Minicar Elettrica",
			type: "Minicar Elettrica",
			power: "5.000W",
			battery: "Litio 72V - 70AH",
			speed: "45KM/H",
			image: "/images/mia-minicar.jpg",
			href: "/prodotti/mia-minicar"
		},
		{
			id: 2,
			name: "ASYA - Auto Elettrica",
			type: "Auto Elettrica",
			power: "4.000W",
			battery: "Litio 72V - 100AH",
			speed: "70KM/H",
			image: "/images/asya-minicar.jpg",
			href: "/prodotti/asya-auto",
			isNew: true
		}
	]

	const filters: VehicleFilter[] = [
		{ name: "Marca", key: "marca", options: ["MIA", "ASYA"] },
		{ name: "Batteria", key: "batteria", options: ["Litio"] },
		{ name: "Potenza", key: "potenza", options: ["4000W", "5000W"] }
	]

	return (
		<VehicleCategoryLayout
			title="Minicar e Auto Elettriche"
			description="Esplora la nostra gamma di minicar e auto elettriche compatte, ideali per la mobilità urbana sostenibile e confortevole."
			products={products}
			filters={filters}
			heroGradient="bg-gradient-to-r from-indigo-500 to-indigo-600"
			badgeColor="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
			primaryColor="indigo"
		/>
	)
}

