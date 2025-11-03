import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'
import { getVehiclesByCategory, vehicleToProduct } from '@/lib/vehicles'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function MobilitaDisabiliPage() {
	const vehicles = await getVehiclesByCategory('mobilita-disabili')
	const products: VehicleProduct[] = vehicles.map(vehicleToProduct)

	const filters: VehicleFilter[] = [
		{ name: "Marca", key: "marca", options: ["Vitale"] },
		{ name: "Batteria", key: "batteria", options: ["Litio", "Piombo"] },
		{ name: "Potenza", key: "potenza", options: ["500W", "1000W", "1200W", "1500W"] },
		{ name: "Tipologia", key: "tipologia", options: ["Scooter", "Cabinato"] }
	]

	return (
		<VehicleCategoryLayout
			title="Mobilità Elettrica per Disabili"
			description="Soluzioni di mobilità elettrica pensate per garantire autonomia, comfort e sicurezza a persone con disabilità e anziani."
			products={products}
			filters={filters}
			heroGradient="bg-gradient-to-r from-teal-500 to-teal-600"
			badgeColor="bg-teal-100 text-teal-700 hover:bg-teal-200"
			primaryColor="teal"
		/>
	)
}

