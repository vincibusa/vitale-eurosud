import VehicleCategoryLayout, { VehicleProduct } from '@/components/vehicles/vehicle-category-layout'
import CategoryHero from '@/components/category-hero'
import { getVehiclesByCategory, vehicleToProduct, getVehicleSubcategory } from '@/lib/vehicles'
import { CATEGORY_SUBCATEGORIES } from '@/config/subcategories'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function VeicoliCommercialiPage() {
	const vehicles = await getVehiclesByCategory('veicoli-commerciali')

	// Enrich vehicles with subcategory
	const enrichedVehicles = vehicles.map((v) => ({
		...v,
		subcategory: getVehicleSubcategory(v)
	}))

	const products: VehicleProduct[] = enrichedVehicles.map(vehicleToProduct)
	const subcategories = CATEGORY_SUBCATEGORIES['veicoli-commerciali']

	return (
		<>
			<CategoryHero
				title="Veicoli Commerciali Elettrici"
				description="Veicoli elettrici professionali per il trasporto di passeggeri e merci. Soluzioni ecologiche per aziende e attività commerciali."
				iconName="Truck"
				gradient="bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"
				totalProducts={products.length}
			/>
			<VehicleCategoryLayout
				title="Veicoli Commerciali Elettrici"
				description="Veicoli elettrici professionali per il trasporto di passeggeri e merci. Soluzioni ecologiche per aziende e attività commerciali."
				products={products}
				subcategories={subcategories}
				categorySlug="veicoli-commerciali"
				badgeColor="bg-brand/10 text-brand hover:bg-brand/20"
				primaryColor="brand"
			/>
		</>
	)
}

