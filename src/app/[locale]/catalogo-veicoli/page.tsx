import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { getVehicles } from '@/lib/vehicles'
import { getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'

export const revalidate = 60

const CATEGORY_ORDER = [
	'biciclette',
	'monopattini',
	'scooter',
	'minicar',
	'quad',
	'veicoli-commerciali',
	'mobilita-disabili'
] as const

export default async function CatalogoVeicoliPage() {
	const t = await getTranslations()
	const vehicles = await getVehicles()

	const groupedCategories = CATEGORY_ORDER
		.map((slug) => ({
			slug,
			items: vehicles.filter((vehicle) => vehicle.categorySlug === slug)
		}))
		.filter((group) => group.items.length > 0)

	return (
		<div className="w-full bg-gray-50 pt-20 md:pt-24">
			<section className="py-14 md:py-20 bg-white border-b border-gray-200">
				<div className="container mx-auto px-4">
					<Badge className="mb-4 bg-brand/10 text-brand hover:bg-brand/20">Catalogo Veicoli</Badge>
					<h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
						Tutti i veicoli disponibili
					</h1>
					<p className="text-base md:text-lg text-gray-600 max-w-4xl">
						Esplora l&apos;intera gamma Vitale: modelli divisi per categoria con accesso diretto alla scheda dettaglio.
					</p>
				</div>
			</section>

			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4 space-y-12 md:space-y-14">
					{groupedCategories.length === 0 && (
						<div className="bg-white border border-gray-200 p-8 text-center text-gray-600">
							Nessun veicolo disponibile al momento.
						</div>
					)}

					{groupedCategories.map((group) => (
						<div key={group.slug}>
							<div className="flex items-center justify-between gap-4 mb-5 md:mb-6">
								<div>
									<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
										{t(`vehicles.categories.${group.slug}`)}
									</h2>
									<p className="text-sm md:text-base text-gray-600 mt-1">
										{t(`vehicles.categoryDescriptions.${group.slug}`)}
									</p>
								</div>
								<Link
									href={`/${group.slug}`}
									className="text-sm md:text-base font-semibold text-brand hover:text-brand-dark transition-colors"
								>
									Vai alla categoria
								</Link>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
								{group.items.map((vehicle) => (
									<Link
										key={vehicle.id}
										href={`/prodotti/${vehicle.id}`}
										className="group bg-white border border-gray-200 hover:border-brand transition-all duration-300 hover:shadow-md"
									>
										<div className="relative h-52 bg-gray-50 border-b border-gray-100 overflow-hidden">
											<Image
												src={vehicle.images[0] || '/images/placeholder.jpg'}
												alt={vehicle.name}
												fill
												className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
											/>
										</div>
										<div className="p-4 md:p-5">
											<h3 className="text-lg font-bold text-gray-900 group-hover:text-brand transition-colors line-clamp-2">
												{vehicle.name}
											</h3>
											<p className="text-sm text-gray-600 mt-2 line-clamp-2">{vehicle.model}</p>
											<div className="mt-3 text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
												<span>Potenza: {vehicle.specs.potenza}</span>
												<span>Autonomia: {vehicle.specs.autonomia}</span>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
