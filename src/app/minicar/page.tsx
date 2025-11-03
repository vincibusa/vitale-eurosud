import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'
import { getVehiclesByCategory, vehicleToProduct } from '@/lib/vehicles'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function MinicarPage() {
	const vehicles = await getVehiclesByCategory('minicar')
	const products: VehicleProduct[] = vehicles.map(vehicleToProduct)

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

