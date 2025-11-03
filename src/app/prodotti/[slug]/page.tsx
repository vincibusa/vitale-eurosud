import { notFound } from 'next/navigation'
import ProductDetailLayout from '@/components/products/product-detail-layout'
import { getVehicleById, getRelatedVehicles, getAllVehicleSlugs } from '@/lib/vehicles'
import type { Metadata } from 'next'

export const revalidate = 60 // Revalidate every 60 seconds

// Genera i paths statici per tutti i veicoli
export async function generateStaticParams() {
	const slugs = await getAllVehicleSlugs()
	return slugs.map((slug) => ({
		slug: slug,
	}))
}

// Genera metadata dinamici per SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params
	const vehicle = await getVehicleById(slug)
	
	if (!vehicle) {
		return {
			title: 'Prodotto Non Trovato - Vitale',
		}
	}

	return {
		title: `${vehicle.name} - Vitale`,
		description: `${vehicle.name} - ${vehicle.category}. ${vehicle.specs.potenza} di potenza, autonomia fino a ${vehicle.specs.autonomia}, velocità massima ${vehicle.specs.velocitaMassima}. Scopri tutti i dettagli.`,
	}
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const vehicle = await getVehicleById(slug)

	// Se il veicolo non esiste, mostra 404
	if (!vehicle) {
		notFound()
	}

	// Ottieni veicoli correlati
	const relatedVehicles = (await getRelatedVehicles(slug, 3)).map(v => ({
		id: v.id,
		name: v.name,
		category: v.category,
		power: v.specs.potenza,
		battery: v.specs.batteria,
		speed: v.specs.velocitaMassima,
		image: v.images[0],
		href: `/prodotti/${v.id}`
	}))

	return (
		<ProductDetailLayout
			name={vehicle.name}
			model={vehicle.model}
			brand={vehicle.brand}
			year={vehicle.year}
			productCode={vehicle.productCode}
			category={vehicle.category}
			categorySlug={vehicle.categorySlug}
			categoryHref={vehicle.categoryHref}
			images={vehicle.images}
			specs={vehicle.specs}
			description={vehicle.description}
			specialBadges={vehicle.specialBadges}
			descriptionImages={vehicle.descriptionImages}
			optionalFeatures={vehicle.optionalFeatures}
			relatedProducts={relatedVehicles}
			primaryColor={vehicle.primaryColor}
			badgeColor={vehicle.badgeColor}
		/>
	)
}

