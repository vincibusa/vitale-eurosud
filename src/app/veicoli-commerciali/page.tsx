'use client'

import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'

export default function VeicoliCommercialiPage() {
	const products: VehicleProduct[] = [
		{
			id: 1,
			name: "Vitale Yodo - Furgone Elettrico",
			type: "Veicolo Commerciale",
			power: "13.000W",
			battery: "Litio 96V - 100AH",
			speed: "80KM/H",
			image: "/images/yodo-commerciale.jpg",
			href: "/prodotti/vitale-yodo",
			isNew: true
		},
		{
			id: 2,
			name: "Italy - Tre Ruote Elettrico Per Trasporto Passeggeri",
			type: "Veicolo Commerciale",
			power: "4.000W",
			battery: "60V 120AH Litio",
			speed: "45KM/H",
			image: "/images/italy-commerciale.jpg",
			href: "/prodotti/vitale-italy",
			isNew: true
		},
		{
			id: 3,
			name: "Italy Mini - Tre Ruote Elettrico Per Trasporto Passeggeri",
			type: "Veicolo Commerciale",
			power: "4.000W",
			battery: "60V 120AH Litio",
			speed: "45KM/H",
			image: "/images/italy-mini-commerciale.jpg",
			href: "/prodotti/vitale-italy-mini",
			isNew: true
		},
		{
			id: 4,
			name: "E-GO - Furgone Elettrico",
			type: "Veicolo Commerciale",
			power: "3.000W",
			battery: "Litio 72V - 70AH",
			speed: "45KM/H",
			image: "/images/ego-commerciale.jpg",
			href: "/prodotti/vitale-ego",
			isNew: true
		},
		{
			id: 5,
			name: "E-Truck - Furgone Elettrico",
			type: "Veicolo Commerciale",
			power: "2.500W",
			battery: "Litio 72V - 50AH",
			speed: "45KM/H",
			image: "/images/e-truck-commerciale.jpg",
			href: "/prodotti/e-truck",
			isNew: true
		}
	]

	const filters: VehicleFilter[] = [
		{ name: "Marca", key: "marca", options: ["Vitale"] },
		{ name: "Batteria", key: "batteria", options: ["Litio"] },
		{ name: "Potenza", key: "potenza", options: ["2500W", "3000W", "4000W", "13000W"] },
		{ name: "Tipologia", key: "tipologia", options: ["Passeggeri", "Merci"] }
	]

	return (
		<VehicleCategoryLayout
			title="Veicoli Commerciali Elettrici"
			description="Veicoli elettrici professionali per il trasporto di passeggeri e merci. Soluzioni ecologiche per aziende e attività commerciali."
			products={products}
			filters={filters}
			heroGradient="bg-gradient-to-r from-amber-500 to-amber-600"
			badgeColor="bg-amber-100 text-amber-700 hover:bg-amber-200"
			primaryColor="amber"
		/>
	)
}

