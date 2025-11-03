import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'
import { getVehiclesByCategory, vehicleToProduct } from '@/lib/vehicles'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function MonopattiniPage() {
	const vehicles = await getVehiclesByCategory('monopattini')
	const products: VehicleProduct[] = vehicles.map(vehicleToProduct)

	const filters: VehicleFilter[] = [
		{ name: "Marca", key: "marca", options: ["Vitale", "Altri"] },
		{ name: "Batteria", key: "batteria", options: ["Litio", "Piombo"] },
		{ name: "Potenza", key: "potenza", options: ["500W"] }
	]

	return (
		<VehicleCategoryLayout
			title="Monopattini Elettrici"
			description="Scopri i nostri monopattini elettrici, perfetti per la mobilità urbana sostenibile e veloce. Ideali per spostamenti agili in città."
			products={products}
			filters={filters}
			heroGradient="bg-gradient-to-r from-purple-500 to-purple-600"
			badgeColor="bg-purple-100 text-purple-700 hover:bg-purple-200"
			primaryColor="purple"
		/>
	)
}

