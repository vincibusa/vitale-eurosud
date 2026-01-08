import VehicleCategoryLayout, { VehicleProduct } from '@/components/vehicles/vehicle-category-layout'
import CategoryHero from '@/components/category-hero'
import { getVehiclesByCategory, vehicleToProduct, getVehicleSubcategory } from '@/lib/vehicles'
import { CATEGORY_SUBCATEGORIES } from '@/config/subcategories'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BiciclettePage() {
	const vehicles = await getVehiclesByCategory('biciclette')

	// Enrich vehicles with subcategory
	const enrichedVehicles = vehicles.map((v) => ({
		...v,
		subcategory: getVehicleSubcategory(v)
	}))

	const products: VehicleProduct[] = enrichedVehicles.map(vehicleToProduct)
	const subcategories = CATEGORY_SUBCATEGORIES['biciclette']

	return (
		<>
			<CategoryHero
				title="Biciclette Elettriche"
				description="Scopri la nostra collezione di biciclette elettriche per una mobilità sostenibile e divertente. Perfette per la città e i percorsi extraurbani."
				iconName="Bike"
				gradient="bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"
				totalProducts={products.length}
			/>
			<VehicleCategoryLayout
				title="Biciclette Elettriche"
				description="Scopri la nostra collezione di biciclette elettriche per una mobilità sostenibile e divertente. Perfette per la città e i percorsi extraurbani."
				products={products}
				subcategories={subcategories}
				categorySlug="biciclette"
				badgeColor="bg-brand/10 text-brand hover:bg-brand/20"
				primaryColor="brand"
			/>
		</>
	)
}
