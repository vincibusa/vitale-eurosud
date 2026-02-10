import type { Vehicle } from '@/types/vehicle'

/**
 * Tipo per il veicolo dal database con campi di traduzione JSONB
 */
interface VehicleFromDB {
	id: string
	name: string
	model: string
	brand: string
	year: string
	product_code: string
	category: string
	category_slug: string
	category_href: string
	images: string[]
	specs: Vehicle['specs']
	description: string
	special_badges?: string[]
	description_images?: string[]
	optional_features: string[]
	primary_color: string
	badge_color: string
	is_new?: boolean
	availability?: 'in-stock' | 'limited' | 'out-of-stock' | 'pre-order'
	subcategory?: string
	model_3d?: string
	// Campi di traduzione JSONB
	name_translations?: { it?: string; en?: string; [key: string]: string | undefined }
	description_translations?: { it?: string; en?: string; [key: string]: string | undefined }
	category_translations?: { it?: string; en?: string; [key: string]: string | undefined }
}

/**
 * Helper per ottenere una traduzione con fallback
 */
function getTranslation(
	translations: { it?: string; en?: string; [key: string]: string | undefined } | null | undefined,
	locale: 'it' | 'en',
	fallback: string
): string {
	if (!translations) return fallback
	
	// 1. Cerca la traduzione nella lingua richiesta
	if (translations[locale]) {
		return translations[locale]!
	}
	
	// 2. Se non trovata, usa la traduzione italiana
	if (locale !== 'it' && translations.it) {
		return translations.it
	}
	
	// 3. Se non trovata, usa il valore di fallback
	return fallback
}

/**
 * Localizza un veicolo dal database in base alla locale
 * 
 * Implementa il sistema di fallback:
 * 1. Cerca la traduzione nella lingua richiesta (es. `en`)
 * 2. Se non trovata: Usa la traduzione italiana (`it`)
 * 3. Se non trovata: Usa il valore del campo originale
 */
export function localizeVehicle(vehicle: VehicleFromDB, locale: 'it' | 'en'): Vehicle {
	return {
		id: vehicle.id,
		name: getTranslation(vehicle.name_translations, locale, vehicle.name),
		model: vehicle.model,
		brand: vehicle.brand,
		year: vehicle.year,
		productCode: vehicle.product_code,
		category: getTranslation(vehicle.category_translations, locale, vehicle.category),
		categorySlug: vehicle.category_slug,
		categoryHref: vehicle.category_href,
		images: vehicle.images || [],
		specs: vehicle.specs,
		description: getTranslation(vehicle.description_translations, locale, vehicle.description),
		specialBadges: vehicle.special_badges,
		descriptionImages: vehicle.description_images,
		optionalFeatures: vehicle.optional_features || [],
		primaryColor: vehicle.primary_color,
		badgeColor: vehicle.badge_color,
		isNew: vehicle.is_new,
		availability: vehicle.availability || 'in-stock',
		subcategory: vehicle.subcategory,
		model3d: vehicle.model_3d
	}
}
