import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { getVehicleById } from '@/lib/vehicles'
import { vehicleToProduct } from '@/lib/vehicles'
import type { VehicleProduct } from '@/components/vehicles/bmw-style-product-card'

export const metadata: Metadata = {
	title: 'Confronta Veicoli | Vitale',
	description: 'Confronta le specifiche e le caratteristiche dei veicoli elettrici Vitale'
}

interface ComparisonPageProps {
	searchParams: Promise<{ ids?: string }>
}

export default async function ComparisonPage({ searchParams }: ComparisonPageProps) {
	const params = await searchParams
	const idsParam = params.ids

	if (!idsParam) {
		redirect('/')
	}

	const ids = idsParam.split(',').filter(Boolean)

	if (ids.length < 2) {
		redirect('/')
	}

	// Fetch vehicles
	const vehicles = await Promise.all(
		ids.map((id) => getVehicleById(id))
	)

	const validVehicles = vehicles.filter((v): v is NonNullable<typeof v> => v !== null)

	if (validVehicles.length < 2) {
		redirect('/')
	}

	const products: VehicleProduct[] = validVehicles.map((vehicle) => vehicleToProduct(vehicle))

	// Define comparison specs to show
	const specKeys = [
		{ key: 'batteria', label: 'Batteria' },
		{ key: 'autonomia', label: 'Autonomia' },
		{ key: 'potenza', label: 'Potenza' },
		{ key: 'velocitaMassima', label: 'Velocità Max' },
		{ key: 'peso', label: 'Peso' },
		{ key: 'tempoRicarica', label: 'Tempo Ricarica' }
	]

	// Get all unique optional features across all vehicles
	const allFeatures = Array.from(
		new Set(products.flatMap((p) => p.optionalFeatures || []))
	).sort()

	// Calculate responsive grid columns
	// Mobile: 110px label (more space for text) + 140px min per product
	// Desktop: 200px label + 250px min per product
	const gridColumnsMobile = `110px repeat(${products.length}, minmax(140px, 1fr))`
	const gridColumnsDesktop = `200px repeat(${products.length}, minmax(250px, 1fr))`

	return (
		<div className="container mx-auto px-2 md:px-4 pt-24 md:pt-28 pb-6 md:pb-12">
			{/* Header */}
			<div className="mb-6 md:mb-8">
				<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
					Confronta Veicoli
				</h1>
				<p className="text-sm md:text-base text-gray-600">
					Confronta {products.length} veicoli selezionati
				</p>
			</div>

			{/* Comparison Table */}
			<div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
				<style dangerouslySetInnerHTML={{ __html: `
					.comparison-grid {
						grid-template-columns: ${gridColumnsMobile};
					}
					@media (min-width: 768px) {
						.comparison-grid {
							grid-template-columns: ${gridColumnsDesktop};
						}
					}
				` }} />
				{/* Mobile: Horizontal Scroll */}
				<div className="overflow-x-auto -mx-2 md:mx-0">
					<div className="inline-block min-w-full">
						{/* Table Header */}
						<div className="comparison-grid grid border-b border-gray-200 bg-gray-50"
						>
							<div className="px-3 py-2 md:p-4 font-semibold text-xs md:text-sm text-gray-900 sticky left-0 bg-gray-50 z-10 border-r border-gray-200 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
								Specifiche
							</div>
							{products.map((product) => (
								<div key={product.id} className="p-2 md:p-4 border-l border-gray-200">
									<div className="relative h-24 md:h-32 lg:h-40 mb-2 md:mb-3 bg-gray-100 rounded-none overflow-hidden">
										<Image
											src={product.image}
											alt={product.name}
											fill
											className="object-contain p-1 md:p-2"
										/>
									</div>
									<h3 className="font-bold text-sm md:text-base lg:text-lg text-gray-900 mb-1 line-clamp-2">
										{product.name}
									</h3>
									<p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">{product.type}</p>
									<Button asChild className="w-full text-xs md:text-sm py-1.5 md:py-2 bg-brand hover:bg-brand-dark">
										<Link href={product.href}>
											Scopri
										</Link>
									</Button>
								</div>
							))}
						</div>

						{/* Specs Section */}
						<div className="divide-y divide-gray-200">
							{specKeys.map((spec) => (
								<div
									key={spec.key}
									className="comparison-grid grid border-b border-gray-100 hover:bg-gray-50 transition-colors"
								>
									<div className="px-3 py-2 md:p-4 font-medium text-xs md:text-sm text-gray-700 sticky left-0 bg-white z-10 border-r border-gray-200 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
										{spec.label}
									</div>
									{products.map((product) => (
										<div
											key={`${product.id}-${spec.key}`}
											className="p-2 md:p-4 border-l border-gray-200 text-xs md:text-sm text-gray-900"
										>
											{product.specs?.[spec.key] || 'N/D'}
										</div>
									))}
								</div>
							))}
						</div>

						{/* Optional Features Section */}
						{allFeatures.length > 0 && (
							<div className="border-t border-gray-200 bg-gray-50">
								<div className="comparison-grid grid"
								>
									<div className="px-3 py-2 md:p-4 font-semibold text-xs md:text-sm text-gray-900 sticky left-0 bg-gray-50 z-10 border-r border-gray-200 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
										Caratteristiche
									</div>
									{products.map((product) => (
										<div
											key={`${product.id}-features`}
											className="p-2 md:p-4 border-l border-gray-200"
										>
											<ul className="space-y-1 md:space-y-2">
												{allFeatures.map((feature) => {
													const hasFeature = product.optionalFeatures?.includes(feature)
													return (
														<li
															key={feature}
															className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm"
														>
															{hasFeature ? (
																<Check className="w-3 h-3 md:w-4 md:h-4 text-green-600 flex-shrink-0" />
															) : (
																<X className="w-3 h-3 md:w-4 md:h-4 text-gray-300 flex-shrink-0" />
															)}
															<span className={hasFeature ? 'text-gray-900' : 'text-gray-400'}>
																{feature}
															</span>
														</li>
													)
												})}
											</ul>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Actions */}
			<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
				<Button
					variant="outline"
					asChild
					className="w-full sm:w-auto sm:min-w-[200px]"
				>
					<Link href="/">
						Torna al Catalogo
					</Link>
				</Button>
				<Button
					asChild
					className="w-full sm:w-auto bg-brand hover:bg-brand-dark sm:min-w-[200px]"
				>
					<Link href="/contatti">
						Richiedi Preventivo
					</Link>
				</Button>
			</div>
		</div>
	)
}
