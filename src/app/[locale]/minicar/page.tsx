import VehicleCategoryLayout, { VehicleProduct } from '@/components/vehicles/vehicle-category-layout'
import CategoryHero from '@/components/category-hero'
import { getVehiclesByCategory, vehicleToProduct, getVehicleSubcategory } from '@/lib/vehicles'
import { CATEGORY_SUBCATEGORIES } from '@/config/subcategories'
import { getTranslations } from 'next-intl/server'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function MinicarPage() {
	const t = await getTranslations()
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
				title={t('vehicles.categories.minicar')}
				description="City car elettriche compatte: pratiche, sicure e pensate per la mobilita di ogni giorno."
				iconName="Car"
				totalProducts={products.length}
				backgroundImage="/immagini/asya_autoelettrica.jpg"
			/>
			<VehicleCategoryLayout
				title={t('vehicles.categories.minicar')}
				description={t('vehicles.categoryDescriptions.minicar')}
				products={products}
				subcategories={subcategories}
				categorySlug="minicar"
				badgeColor="bg-brand/10 text-brand hover:bg-brand/20"
				primaryColor="brand"
			/>
		</>
	)
}
