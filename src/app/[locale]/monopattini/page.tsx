import VehicleCategoryLayout, { VehicleProduct } from '@/components/vehicles/vehicle-category-layout'
import CategoryHero from '@/components/category-hero'
import { getVehiclesByCategory, vehicleToProduct, getVehicleSubcategory } from '@/lib/vehicles'
import { CATEGORY_SUBCATEGORIES } from '@/config/subcategories'
import { getTranslations } from 'next-intl/server'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function MonopattiniPage() {
	const t = await getTranslations()
	const vehicles = await getVehiclesByCategory('monopattini')

	// Enrich vehicles with subcategory
	const enrichedVehicles = vehicles.map((v) => ({
		...v,
		subcategory: getVehicleSubcategory(v)
	}))

	const products: VehicleProduct[] = enrichedVehicles.map(vehicleToProduct)
	const subcategories = CATEGORY_SUBCATEGORIES['monopattini']

	return (
		<>
			<CategoryHero
				title={t('vehicles.categories.monopattini')}
				description={t('vehicles.categoryDescriptions.monopattini')}
				iconName="Bolt"
				gradient="bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"
				totalProducts={products.length}
				backgroundImage="/images/me750-monopattino.jpg"
			/>
			<VehicleCategoryLayout
				title={t('vehicles.categories.monopattini')}
				description={t('vehicles.categoryDescriptions.monopattini')}
				products={products}
				subcategories={subcategories}
				categorySlug="monopattini"
				badgeColor="bg-brand/10 text-brand hover:bg-brand/20"
				primaryColor="brand"
			/>
		</>
	)
}
