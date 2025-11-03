import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'
import { getVehiclesByCategory, vehicleToProduct } from '@/lib/vehicles'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function QuadPage() {
	const vehicles = await getVehiclesByCategory('quad')
	const products: VehicleProduct[] = vehicles.map(vehicleToProduct)

	const filters: VehicleFilter[] = [
		{ name: "Marca", key: "marca", options: ["Vitale"] },
		{ name: "Batteria", key: "batteria", options: ["Litio", "Piombo"] },
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

