import VehicleCategoryLayout, { VehicleProduct } from '@/components/vehicles/vehicle-category-layout'
import CategoryHero from '@/components/category-hero'
import { getVehiclesByCategory, vehicleToProduct, getVehicleSubcategory } from '@/lib/vehicles'
import { CATEGORY_SUBCATEGORIES } from '@/config/subcategories'
import { getTranslations } from 'next-intl/server'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function MobilitaDisabiliPage() {
	const t = await getTranslations()
	const vehicles = await getVehiclesByCategory('mobilita-disabili')

	// Enrich vehicles with subcategory
	const enrichedVehicles = vehicles.map((v) => ({
		...v,
		subcategory: getVehicleSubcategory(v)
	}))

	const products: VehicleProduct[] = enrichedVehicles.map(vehicleToProduct)
	const subcategories = CATEGORY_SUBCATEGORIES['mobilita-disabili']

	return (
		<>
			<CategoryHero
				title="Mobilità"
				titleAccent="disabili"
				titleBreakBeforeAccent
				titleAccentClassName="text-brand-light"
				description="Veicoli elettrici per una prestazione eccellente"
				titleClassName="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
				descriptionClassName="text-xl md:text-2xl text-white/90 mb-6 font-light max-w-2xl"
				iconName="Users"
				gradient="bg-gradient-to-r from-black/65 via-black/40 to-transparent md:from-black/80 md:via-black/50"
				bottomGradientClassName="bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-black/60"
				totalProducts={products.length}
				backgroundImage="/immagini/veicoli_elettrici.jpg"
			/>
			<VehicleCategoryLayout
				title={t('vehicles.categories.mobilita-disabili')}
				description={t('vehicles.categoryDescriptions.mobilita-disabili')}
				products={products}
				subcategories={subcategories}
				categorySlug="mobilita-disabili"
				badgeColor="bg-brand/10 text-brand hover:bg-brand/20"
				primaryColor="brand"
			/>
		</>
	)
}
