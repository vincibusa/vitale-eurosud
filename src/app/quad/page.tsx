import VehicleCategoryLayout, { VehicleProduct } from '@/components/vehicles/vehicle-category-layout'
import CategoryHero from '@/components/category-hero'
import { getVehiclesByCategory, vehicleToProduct, getVehicleSubcategory } from '@/lib/vehicles'
import { CATEGORY_SUBCATEGORIES } from '@/config/subcategories'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function QuadPage() {
	const vehicles = await getVehiclesByCategory('quad')

	// Enrich vehicles with subcategory
	const enrichedVehicles = vehicles.map((v) => ({
		...v,
		subcategory: getVehicleSubcategory(v)
	}))

	const products: VehicleProduct[] = enrichedVehicles.map(vehicleToProduct)
	const subcategories = CATEGORY_SUBCATEGORIES['quad']

	return (
		<>
			<CategoryHero
				title="Quad Elettrici"
				description="Scopri i nostri quad elettrici a 4 ruote, perfetti per avventure sostenibili e divertimento off-road con zero emissioni."
				iconName="ShoppingBag"
				gradient="bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"
				totalProducts={products.length}
			/>
			<VehicleCategoryLayout
				title="Quad Elettrici"
				description="Scopri i nostri quad elettrici a 4 ruote, perfetti per avventure sostenibili e divertimento off-road con zero emissioni."
				products={products}
				subcategories={subcategories}
				categorySlug="quad"
				badgeColor="bg-brand/10 text-brand hover:bg-brand/20"
				primaryColor="brand"
			/>
		</>
	)
}

