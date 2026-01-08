import VehicleCategoryLayout, { VehicleProduct } from '@/components/vehicles/vehicle-category-layout'
import CategoryHero from '@/components/category-hero'
import { getVehiclesByCategory, vehicleToProduct, getVehicleSubcategory } from '@/lib/vehicles'
import { CATEGORY_SUBCATEGORIES } from '@/config/subcategories'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ScooterPage() {
	const vehicles = await getVehiclesByCategory('scooter')

	// Enrich vehicles with subcategory
	const enrichedVehicles = vehicles.map((v) => ({
		...v,
		subcategory: getVehicleSubcategory(v)
	}))

	const products: VehicleProduct[] = enrichedVehicles.map(vehicleToProduct)
	const subcategories = CATEGORY_SUBCATEGORIES['scooter']

	return (
		<>
			<CategoryHero
				title="Scooter Elettrici"
				description="La libertà di muoversi in città con stile e sostenibilità. I nostri scooter elettrici uniscono performance e rispetto per l'ambiente."
				iconName="Zap"
				gradient="bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"
				totalProducts={products.length}
			/>
			<VehicleCategoryLayout
				title="Scooter Elettrici"
				description="La libertà di muoversi in città con stile e sostenibilità. I nostri scooter elettrici uniscono performance e rispetto per l'ambiente."
				products={products}
				subcategories={subcategories}
				categorySlug="scooter"
				badgeColor="bg-brand/10 text-brand hover:bg-brand/20"
				primaryColor="brand"
			/>
		</>
	)
}
