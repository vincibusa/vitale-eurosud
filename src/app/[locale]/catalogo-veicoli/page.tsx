import { getVehicles } from '@/lib/vehicles'
import BMWVehicleGrid from '@/components/vehicles/bmw-vehicle-grid'
import type { BMWVehicle } from '@/components/vehicles/bmw-vehicle-card'

export const revalidate = 60

// Category display names mapping
const categoryLabels: Record<string, string> = {
	'biciclette': 'Biciclette',
	'monopattini': 'Monopattini',
	'scooter': 'Scooter',
	'minicar': 'Minicar',
	'quad': 'Quad',
	'veicoli-commerciali': 'Veicoli Commerciali',
	'mobilita-disabili': 'Mobilità Disabili'
}

// Parse autonomy value for filtering
function parseAutonomy(autonomyStr: string): number {
	const match = autonomyStr.match(/(\d+)/)
	return match ? parseInt(match[1]) : 0
}

export default async function CatalogoVeicoliPage({
	params
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const vehiclesData = await getVehicles()

	// Transform vehicles to BMW format
	const bmwVehicles: BMWVehicle[] = vehiclesData.map(vehicle => ({
		id: vehicle.id,
		name: vehicle.name,
		model: vehicle.model,
		category: categoryLabels[vehicle.categorySlug] || vehicle.category,
		price: undefined, // Can be added to vehicle data later
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

	// Calculate filter counts
	const categoryCounts = vehiclesData.reduce((acc, v) => {
		const label = categoryLabels[v.categorySlug] || v.category
		acc[label] = (acc[label] || 0) + 1
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
			id: 'category',
			label: 'Categoria',
			type: 'checkbox' as const,
			options: Object.entries(categoryLabels).map(([slug, label]) => ({
				label,
				value: label,
				count: categoryCounts[label] || 0
			})).filter(o => o.count > 0)
		},
		{
			id: 'autonomy',
			label: 'Autonomia',
			type: 'radio' as const,
			options: [
				{ label: 'Tutte', value: 'all', count: vehiclesData.length },
				{ label: 'Meno di 50 KM', value: 'under50', count: autonomyRanges.under50 },
				{ label: '50 - 100 KM', value: '50to100', count: autonomyRanges['50to100'] },
				{ label: 'Più di 100 KM', value: 'over100', count: autonomyRanges.over100 }
			]
		}
	]

	return (
		<div className="w-full pt-20 md:pt-24">
			<section className="bg-white py-16 md:py-24 border-b border-gray-200">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl text-gray-900">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
							Scopri tutti i modelli Vitale
						</h1>
						<p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl">
							Dai modelli classici alle ultime novità, con funzioni innovative pensate per le tue esigenze.
							<span className="block">
								Leader nella fornitura di veicoli elettrici di alta qualità. Scopri la nostra gamma completa e vivi una mobilità sostenibile e all&apos;avanguardia.
							</span>
						</p>
					</div>
				</div>
			</section>

			{/* Vehicle Grid with Sidebar */}
			<BMWVehicleGrid
				vehicles={bmwVehicles}
				filterSections={filterSections}
			/>

			{/* CTA Section */}
			<section className="bg-white py-16 md:py-24 border-t border-gray-200">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">
						Non hai trovato quello che cerchi?
					</h2>
					<p className="text-base md:text-lg text-[#6E6E73] max-w-2xl mx-auto mb-8">
						Contattaci per ricevere informazioni personalizzate sui nostri veicoli elettrici
					</p>
					<a
						href="/contatti"
						className="inline-flex items-center justify-center px-8 py-4 bg-[#1C69D4] hover:bg-[#0653B6] text-white font-semibold rounded-none transition-all duration-300 hover:shadow-xl hover:shadow-[#1C69D4]/20"
					>
						Contattaci
					</a>
				</div>
			</section>
		</div>
	)
}
