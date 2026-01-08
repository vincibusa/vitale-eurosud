import VehicleCategoryLayout, { VehicleProduct } from '@/components/vehicles/vehicle-category-layout'
import CategoryHero from '@/components/category-hero'
import { getVehiclesByCategory, vehicleToProduct, getVehicleSubcategory } from '@/lib/vehicles'
import { CATEGORY_SUBCATEGORIES } from '@/config/subcategories'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function MinicarPage() {
	const vehicles = await getVehiclesByCategory('minicar')

	// Enrich vehicles with subcategory
	const enrichedVehicles = vehicles.map((v) => ({
		...v,
		subcategory: getVehicleSubcategory(v)
	}))

	const products: VehicleProduct[] = enrichedVehicles.map(vehicleToProduct)
	const subcategories = CATEGORY_SUBCATEGORIES['minicar']

	return (
		<>
			<CategoryHero
				title="Minicar e Auto Elettriche"
				description="Esplora la nostra gamma di minicar e auto elettriche compatte, ideali per la mobilità urbana sostenibile e confortevole."
				iconName="Car"
				gradient="bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"
				totalProducts={products.length}
			/>
			<VehicleCategoryLayout
				title="Minicar e Auto Elettriche"
				description="Esplora la nostra gamma di minicar e auto elettriche compatte, ideali per la mobilità urbana sostenibile e confortevole."
				products={products}
				subcategories={subcategories}
				categorySlug="minicar"
				badgeColor="bg-brand/10 text-brand hover:bg-brand/20"
				primaryColor="brand"
			/>
		</>
	)
}

