import { Zap } from 'lucide-react'
import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'
import { getVehiclesByCategory, vehicleToProduct } from '@/lib/vehicles'

export default async function ScooterPage() {
	const vehicles = await getVehiclesByCategory('scooter')
	const products: VehicleProduct[] = vehicles.map(vehicleToProduct)

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
