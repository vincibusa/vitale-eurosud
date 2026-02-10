import VehicleCategoryLayout, { VehicleProduct } from '@/components/vehicles/vehicle-category-layout'
import CategoryHero from '@/components/category-hero'
import { getVehiclesByCategory, vehicleToProduct, getVehicleSubcategory } from '@/lib/vehicles'
import { CATEGORY_SUBCATEGORIES } from '@/config/subcategories'
import { getTranslations } from 'next-intl/server'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function QuadPage({
	params
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const t = await getTranslations()
	const vehicles = await getVehiclesByCategory('quad')

	// Enrich vehicles with subcategory
	const enrichedVehicles = vehicles.map((v) => ({
		...v,
		subcategory: getVehicleSubcategory(v)
	}))

	const products: VehicleProduct[] = enrichedVehicles.map((v) => vehicleToProduct(v, locale))
	const subcategories = CATEGORY_SUBCATEGORIES['quad']

	return (
		<>
			<CategoryHero
				title={t('vehicles.categories.quad')}
				description={t('vehicles.categoryDescriptions.quad')}
				iconName="ShoppingBag"
				totalProducts={products.length}
				backgroundImage="/images/quad-elettrico.jpg"
			/>
			<VehicleCategoryLayout
				title={t('vehicles.categories.quad')}
				description={t('vehicles.categoryDescriptions.quad')}
				products={products}
				subcategories={subcategories}
				categorySlug="quad"
				badgeColor="bg-brand/10 text-brand hover:bg-brand/20"
				primaryColor="brand"
			/>
		</>
	)
}
