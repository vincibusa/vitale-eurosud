'use client'

import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'
import { Users } from 'lucide-react'

export default function MobilitaDisabiliPage() {
	const products: VehicleProduct[] = [
		{
			id: 1,
			name: "DK03 - Scooter Elettrico Per Disabili Tre Ruote",
			type: "Mobilità Disabili",
			power: "1.000W",
			battery: "Piombo 60V - 20AH",
			speed: "20KM/H",
			image: "/images/dk03-disabili.jpg",
			href: "/prodotti/dk03",
			isNew: true
		},
		{
			id: 2,
			name: "MOB50 - Cabinato Elettrico Per Disabili",
			type: "Mobilità Disabili",
			power: "1.200W",
			battery: "Piombo 60V - 58AH",
			speed: "20KM/H",
			image: "/images/mob50-disabili.jpg",
			href: "/prodotti/mob50",
			isNew: true
		},
		{
			id: 3,
			name: "MOB26 - Cabinato Elettrico Per Disabili",
			type: "Mobilità Disabili",
			power: "1.500W",
			battery: "Piombo 60V - 50AH",
			speed: "20KM/H",
			image: "/images/mob26-disabili.jpg",
			href: "/prodotti/mob26"
		},
		{
			id: 4,
			name: "MOB20 - Cabinato Elettrico Per Disabili",
			type: "Mobilità Disabili",
			power: "1.500W",
			battery: "Piombo 60V - 58AH",
			speed: "20KM/H",
			image: "/images/mob20-disabili.jpg",
			href: "/prodotti/mob20"
		},
		{
			id: 5,
			name: "MOB30A - Cabinato Elettrico Per Disabili",
			type: "Mobilità Disabili",
			power: "1.200W",
			battery: "Piombo 60V - 45AH",
			speed: "20KM/H",
			image: "/images/mob30a-disabili.jpg",
			href: "/prodotti/mob30a"
		},
		{
			id: 6,
			name: "DK02 - Scooter Elettrico Per Disabili Quattro Ruote",
			type: "Mobilità Disabili",
			power: "500W",
			battery: "Piombo 48V - 20AH",
			speed: "20KM/H",
			image: "/images/dk02-disabili.jpg",
			href: "/prodotti/dk02"
		},
		{
			id: 7,
			name: "DK01 - Scooter Elettrico Per Disabili Tre Ruote",
			type: "Mobilità Disabili",
			power: "500W",
			battery: "Piombo 48V - 20AH",
			speed: "20KM/H",
			image: "/images/dk01-disabili.jpg",
			href: "/prodotti/dk01"
		},
		{
			id: 8,
			name: "MOB01 - Scooter Elettrico Per Disabili Tre Ruote",
			type: "Mobilità Disabili",
			power: "500W",
			battery: "Piombo 60V - 20AH",
			speed: "20KM/H",
			image: "/images/mob01-disabili.jpg",
			href: "/prodotti/mob01"
		},
		{
			id: 9,
			name: "MOB02 - Scooter Elettrico Per Disabili Quattro Ruote",
			type: "Mobilità Disabili",
			power: "500W",
			battery: "Piombo 60V - 20AH",
			speed: "20KM/H",
			image: "/images/mob02-disabili.jpg",
			href: "/prodotti/mob02"
		}
	]

	const filters: VehicleFilter[] = [
		{ name: "Marca", key: "marca", options: ["Vitale"] },
		{ name: "Batteria", key: "batteria", options: ["Piombo"] },
		{ name: "Potenza", key: "potenza", options: ["500W", "1000W", "1200W", "1500W"] },
		{ name: "Tipologia", key: "tipologia", options: ["Scooter", "Cabinato"] }
	]

	return (
		<VehicleCategoryLayout
			title="Mobilità Elettrica per Disabili"
			description="Soluzioni di mobilità elettrica pensate per garantire autonomia, comfort e sicurezza a persone con disabilità e anziani."
			icon={Users}
			products={products}
			filters={filters}
			heroGradient="bg-gradient-to-r from-teal-500 to-teal-600"
			badgeColor="bg-teal-100 text-teal-700 hover:bg-teal-200"
			primaryColor="teal"
		/>
	)
}

