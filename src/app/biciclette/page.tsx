import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'
import { getVehiclesByCategory, vehicleToProduct } from '@/lib/vehicles'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BiciclettePage() {
	const vehicles = await getVehiclesByCategory('biciclette')
	const products: VehicleProduct[] = vehicles.map(vehicleToProduct)

	const filters: VehicleFilter[] = [
		{ name: "Marca", key: "marca", options: ["Vitale", "Altri"] },
		{ name: "Batteria", key: "batteria", options: ["Litio", "Piombo"] },
		{ name: "Potenza", key: "potenza", options: ["250W", "500W"] }
	]

	return (
		<VehicleCategoryLayout
			title="Biciclette Elettriche"
			description="Scopri la nostra collezione di biciclette elettriche per una mobilità sostenibile e divertente. Perfette per la città e i percorsi extraurbani."
			products={products}
			filters={filters}
			heroGradient="bg-gradient-to-r from-green-500 to-green-600"
			badgeColor="bg-green-100 text-green-700 hover:bg-green-200"
			primaryColor="green"
		/>
	)
}
