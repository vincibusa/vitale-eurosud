/**
 * Helper functions for localizing vehicle data from Supabase
 * 
 * This module provides utilities to extract localized content from vehicle records.
 * It supports both JSONB translation columns and fallback to Italian fields.
 */

import type { Vehicle, VehicleSpecs } from '@/types/vehicle'

type Locale = 'it' | 'en'

/**
 * Extract localized text from a translation object or fallback to Italian
 * 
 * @param translations - JSONB object with translations (e.g., { it: "...", en: "..." })
 * @param locale - Target locale
 * @param fallback - Fallback value if translation doesn't exist
 * @returns Localized text
 */
export function getLocalizedText(
	translations: Record<string, string> | null | undefined,
	locale: Locale,
	fallback: string
): string {
	if (!translations || typeof translations !== 'object') {
		return fallback
	}

	// Try to get the translation for the requested locale
	const translated = translations[locale]
	if (translated && typeof translated === 'string') {
		return translated
	}

	// Fallback to Italian if available
	if (locale !== 'it' && translations.it && typeof translations.it === 'string') {
		return translations.it
	}

	// Final fallback
	return fallback
}

/**
 * Localize a vehicle object based on the current locale
 * 
 * @param vehicle - Vehicle data from Supabase
 * @param locale - Target locale
 * @returns Localized vehicle object
 */
export function localizeVehicle(vehicle: any, locale: Locale): Vehicle {
	// Extract localized fields from JSONB columns or use fallback
	const name = getLocalizedText(
		vehicle.name_translations,
		locale,
		vehicle.name || ''
	)

	const description = getLocalizedText(
		vehicle.description_translations,
		locale,
		vehicle.description || ''
	)

	const category = getLocalizedText(
		vehicle.category_translations,
		locale,
		vehicle.category || ''
	)

	// Localize optional features if they have translations
	const optionalFeatures = vehicle.optional_features || []
	const localizedFeatures = optionalFeatures.map((feature: string | Record<string, string>) => {
		if (typeof feature === 'string') {
			return feature
		}
		return getLocalizedText(feature, locale, feature.it || feature.en || '')
	})

	// Localize specs if they have translations
	const specs = vehicle.specs || {}
	const localizedSpecs: Partial<VehicleSpecs> & Record<string, string> = {
		batteria: '',
		autonomia: '',
		tempoRicarica: '',
		ruote: '',
		potenza: '',
		velocitaMassima: '',
		trazione: '',
		telaio: '',
		freni: '',
		pendenza: '',
		peso: ''
	}
	
	for (const [key, value] of Object.entries(specs)) {
		if (typeof value === 'object' && value !== null) {
			// If the spec value is an object with translations
			localizedSpecs[key] = getLocalizedText(
				value as Record<string, string>,
				locale,
				(value as any).it || (value as any).en || ''
			)
		} else {
			// If it's a plain string, use it as is
			localizedSpecs[key] = value as string
		}
	}

	return {
		id: vehicle.id,
		name,
		model: vehicle.model || '',
		brand: vehicle.brand || '',
		year: vehicle.year || '',
		productCode: vehicle.product_code || '',
		category,
		categorySlug: vehicle.category_slug || '',
		categoryHref: `/${vehicle.category_slug}`,
		images: vehicle.images || [],
		specs: localizedSpecs as VehicleSpecs,
		description,
		specialBadges: vehicle.special_badges || [],
		descriptionImages: vehicle.description_images || [],
		optionalFeatures: localizedFeatures,
		primaryColor: vehicle.primary_color || 'gray',
		badgeColor: vehicle.badge_color || 'bg-gray-100 text-gray-700 hover:bg-gray-200',
		isNew: vehicle.is_new || false,
		model3d: vehicle.model_3d || undefined
	}
}

