'use client'

import { Bike } from 'lucide-react'
import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'

export default function BiciclettePage() {
	const products: VehicleProduct[] = [
		{
			id: 1,
			name: "FAT-02 DB - Fat Bike Elettrica Telaio Dritto",
			type: "Bicicletta Elettrica",
			power: "250W",
			battery: "Litio 36V - 10AH",
			speed: "25KM/H",
			image: "/images/fat-bike-db.png",
			href: "/prodotti/fat-02-db"
		},
		{
			id: 2,
			name: "FAT-02 CB - Fat Bike Elettrica Telaio Curvo", 
			type: "Bicicletta Elettrica",
			power: "250W",
			battery: "Litio 36V - 10AH",
			speed: "25KM/H",
			image: "/images/fat-bike-cb.png",
			href: "/prodotti/fat-02-cb"
		},
		{
			id: 3,
			name: "NJT007 - Bicicletta Elettrica",
			type: "Bicicletta Elettrica", 
			power: "250W",
			battery: "Piombo 48V - 20AH",
			speed: "25KM/H",
			image: "/images/njt007-bike.png",
			href: "/prodotti/njt007"
		}
	]

	const filters: VehicleFilter[] = [
		{ name: "Marca", key: "marca", options: ["Vitale", "Altri"] },
		{ name: "Batteria", key: "batteria", options: ["Litio", "Piombo"] },
		{ name: "Potenza", key: "potenza", options: ["250W", "500W"] }
	]

	return (
		<VehicleCategoryLayout
			title="Biciclette Elettriche"
			description="Scopri la nostra collezione di biciclette elettriche per una mobilità sostenibile e divertente. Perfette per la città e i percorsi extraurbani."
			icon={Bike}
			products={products}
			filters={filters}
			heroGradient="bg-gradient-to-r from-green-500 to-green-600"
			badgeColor="bg-green-100 text-green-700 hover:bg-green-200"
			primaryColor="green"
		/>
	)
}
