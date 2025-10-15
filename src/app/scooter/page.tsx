'use client'

import { Zap } from 'lucide-react'
import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'

export default function ScooterPage() {
	const products: VehicleProduct[] = [
		{
			id: 1,
			name: "Vitale V28 – Scooter Elettrico a Tre Ruote",
			type: "Scooter Elettrico",
			power: "2.000W",
			battery: "Litio 72V - 40AH",
			speed: "45KM/H",
			image: "/images/v28-scooter.png",
			href: "/prodotti/vitale-v28",
			isNew: false
		},
		{
			id: 2,
			name: "ECOZONE MAX - Scooter Elettrico",
			type: "Scooter Elettrico",
			power: "2.000W",
			battery: "Litio 72V - 40AH",
			speed: "45KM/H",
			image: "/images/ecozone-max-scooter.jpg",
			href: "/prodotti/ecozone-max",
			isNew: true
		},
		{
			id: 3,
			name: "Ecozone - Scooter Elettrico (Targabile)", 
			type: "Scooter Elettrico",
			power: "500W",
			battery: "Piombo 48V - 20AH / Optional Litio 60V - 20AH",
			speed: "25KM/H",
			image: "/images/ecozone-scooter.png",
			href: "/prodotti/ecozone",
			isNew: false
		},
		{
			id: 4,
			name: "SCT001 - Scooter Elettrico (Uso Privato)",
			type: "Scooter Elettrico", 
			power: "500W",
			battery: "Piombo 48V - 20AH",
			speed: "25KM/H",
			image: "/images/sct001-scooter.png",
			href: "/prodotti/sct001",
			isNew: false
		}
	]

	const filters: VehicleFilter[] = [
		{ name: "Marca", key: "marca", options: ["Vitale", "Altri"] },
		{ name: "Batteria", key: "batteria", options: ["Litio", "Piombo"] },
		{ name: "Potenza", key: "potenza", options: ["500W", "2000W"] },
		{ name: "Ruote", key: "ruote", options: ["Due Ruote", "Tre Ruote"] }
	]

	return (
		<VehicleCategoryLayout
			title="Scooter Elettrici"
			description="La libertà di muoversi in città con stile e sostenibilità. I nostri scooter elettrici uniscono performance e rispetto per l'ambiente."
			icon={Zap}
			products={products}
			filters={filters}
			heroGradient="bg-gradient-to-r from-blue-500 to-blue-600"
			badgeColor="bg-blue-100 text-blue-700 hover:bg-blue-200"
			primaryColor="blue"
		/>
	)
}
