import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'
import { getVehiclesByCategory, vehicleToProduct } from '@/lib/vehicles'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function VeicoliCommercialiPage() {
	const vehicles = await getVehiclesByCategory('veicoli-commerciali')
	const products: VehicleProduct[] = vehicles.map(vehicleToProduct)

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

