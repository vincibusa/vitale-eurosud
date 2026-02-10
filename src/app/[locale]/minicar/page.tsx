import { getVehiclesByCategory } from '@/lib/vehicles'
import CategoryHero from '@/components/category-hero'
import BMWVehicleGrid from '@/components/vehicles/bmw-vehicle-grid'
import type { BMWVehicle } from '@/components/vehicles/bmw-vehicle-card'
import { getTranslations } from 'next-intl/server'

export const revalidate = 60

// Parse autonomy value for filtering
function parseAutonomy(autonomyStr: string): number {
	const match = autonomyStr.match(/(\d+)/)
	return match ? parseInt(match[1]) : 0
}

export default async function MinicarPage({
	params
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const t = await getTranslations()
	const vehiclesData = await getVehiclesByCategory('minicar')

	// Transform vehicles to BMW format
	const bmwVehicles: BMWVehicle[] = vehiclesData.map(vehicle => ({
		id: vehicle.id,
		name: vehicle.name,
		model: vehicle.model,
		category: vehicle.subcategory || vehicle.category,
		image: vehicle.images[0] || '/images/placeholder.jpg',
		href: `/${locale}/prodotti/${vehicle.id}`,
		isNew: vehicle.isNew,
		specs: {
			autonomy: vehicle.specs.autonomia,
			power: vehicle.specs.potenza,
			speed: vehicle.specs.velocitaMassima,
			chargingTime: vehicle.specs.tempoRicarica
		}
	}))

	// Calculate subcategory counts
	const subcategoryCounts = vehiclesData.reduce((acc, v) => {
		const sub = v.subcategory || 'Altro'
		acc[sub] = (acc[sub] || 0) + 1
		return acc
	}, {} as Record<string, number>)

	const autonomyRanges = {
		under50: 0,
		'50to100': 0,
		over100: 0
	}

	vehiclesData.forEach(v => {
		const autonomy = parseAutonomy(v.specs.autonomia)
		if (autonomy < 50) autonomyRanges.under50++
		else if (autonomy <= 100) autonomyRanges['50to100']++
		else autonomyRanges.over100++
	})

	// Define filter sections
	const filterSections = [
		{
			id: 'subcategory',
			label: 'Sottocategorie',
			type: 'checkbox' as const,
			options: Object.entries(subcategoryCounts).map(([label, count]) => ({
				label,
				value: label,
				count
			}))
		},
		{
			id: 'autonomy',
			label: 'Autonomia',
			type: 'radio' as const,
			options: [
				{ label: 'Meno di 50 KM', value: 'under50', count: autonomyRanges.under50 },
				{ label: '50 - 100 KM', value: '50to100', count: autonomyRanges['50to100'] },
				{ label: 'Più di 100 KM', value: 'over100', count: autonomyRanges.over100 }
			]
		}
	]

	// Hero section component
	const heroSection = (
		<CategoryHero
			title={t('vehicles.categories.minicar')}
			description="City car elettriche compatte: pratiche, sicure e pensate per la mobilita di ogni giorno."
			iconName="Car"
			totalProducts={bmwVehicles.length}
			backgroundImage="/immagini/asya_autoelettrica.jpg"
		/>
	)

	return (
		<BMWVehicleGrid
			vehicles={bmwVehicles}
			filterSections={filterSections}
			heroSection={heroSection}
		/>
	)
}
