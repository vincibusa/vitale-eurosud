import { supabase } from './supabase'
import type { Vehicle } from '@/types/vehicle'
import { localizeVehicle } from './vehicles-i18n'
import { getLocale } from 'next-intl/server'

/**
 * NOTA: Per aggiungere modelli 3D ai veicoli:
 * 
 * 1. Carica il file .glb/.gltf su Supabase Storage (bucket 'vehicle-images' o simile)
 * 2. Aggiungi l'URL pubblico del modello nella colonna `model_3d` della tabella `vehicles`
 * 
 * Esempio URL: https://[project].supabase.co/storage/v1/object/public/vehicle-images/model.glb
 * 
 * I modelli 3D verranno visualizzati automaticamente nella pagina di dettaglio prodotto
 * solo per i veicoli che hanno il campo `model_3d` valorizzato.
 */

export async function getVehicles(): Promise<Vehicle[]> {
	const locale = (await getLocale()) as 'it' | 'en'
	
	const { data, error } = await supabase
		.from('vehicles')
		.select('*')
		.order('category_slug, name')

	if (error) {
		return []
	}

	return data.map(vehicle => localizeVehicle(vehicle, locale))
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
	const locale = (await getLocale()) as 'it' | 'en'
	
	const { data, error } = await supabase
		.from('vehicles')
		.select('*')
		.eq('id', id)
		.single()

	if (error) {
		return null
	}

	if (!data) return null

	return localizeVehicle(data, locale)
}

export async function getVehiclesByCategory(categorySlug: string): Promise<Vehicle[]> {
	const locale = (await getLocale()) as 'it' | 'en'
	
	const { data, error } = await supabase
		.from('vehicles')
		.select('*')
		.eq('category_slug', categorySlug)
		.order('name')

	if (error) {
		return []
	}

	return data.map(vehicle => localizeVehicle(vehicle, locale))
}

export async function getAllVehicleSlugs(): Promise<string[]> {
	const { data, error } = await supabase
		.from('vehicles')
		.select('id')

	if (error) {
		return []
	}

	return data.map(vehicle => vehicle.id)
}

export async function getRelatedVehicles(vehicleId: string, limit: number = 3): Promise<Vehicle[]> {
	const currentVehicle = await getVehicleById(vehicleId)
	if (!currentVehicle) return []

	const allVehicles = await getVehicles()
	
	// Filtra veicoli della stessa categoria (escluso quello corrente)
	const relatedByCategory = allVehicles.filter(
		v => v.categorySlug === currentVehicle.categorySlug && v.id !== vehicleId
	)

	// Se non ci sono abbastanza veicoli nella stessa categoria, aggiungi altri veicoli
	if (relatedByCategory.length < limit) {
		const otherVehicles = allVehicles.filter(
			v => v.categorySlug !== currentVehicle.categorySlug && !relatedByCategory.find(r => r.id === v.id)
		)
		return [...relatedByCategory, ...otherVehicles].slice(0, limit)
	}

	return relatedByCategory.slice(0, limit)
}

// Helper function to convert Vehicle to VehicleProduct for category pages
export function vehicleToProduct(vehicle: Vehicle, locale: string = 'it') {
	return {
		id: vehicle.id,
		name: vehicle.name,
		type: vehicle.model,
		power: vehicle.specs.potenza,
		battery: vehicle.specs.batteria,
		speed: vehicle.specs.velocitaMassima,
		autonomy: vehicle.specs.autonomia,
		chargingTime: vehicle.specs.tempoRicarica,
		image: vehicle.images[0] || '/images/placeholder.jpg',
		href: `/${locale}/prodotti/${vehicle.id}`,
		isNew: vehicle.isNew || false,
		subcategory: vehicle.subcategory,
		optionalFeatures: vehicle.optionalFeatures || [],
		specs: vehicle.specs
	}
}

// Get featured vehicles (new vehicles)
export async function getFeaturedVehicles(limit: number = 6): Promise<Vehicle[]> {
	const locale = (await getLocale()) as 'it' | 'en'
	
	const { data, error } = await supabase
		.from('vehicles')
		.select('*')
		.eq('is_new', true)
		.order('name')
		.limit(limit)

	if (error) {
		return []
	}

	return data.map(vehicle => localizeVehicle(vehicle, locale))
}

// Derive subcategory from vehicle properties for BMW-style tab filtering
export function getVehicleSubcategory(vehicle: Vehicle): string {
	const category = vehicle.categorySlug
	const nameLower = vehicle.name.toLowerCase()
	const modelLower = vehicle.model?.toLowerCase() || ''

	switch (category) {
		case 'biciclette':
			if (nameLower.includes('fat') || modelLower.includes('mountain')) return 'mountain'
			if (nameLower.includes('cargo') || modelLower.includes('cargo')) return 'cargo'
			return 'city'

		case 'monopattini':
			// Performance if power >= 500W
			const power = vehicle.specs.potenza ? parseInt(vehicle.specs.potenza) : 0
			return power >= 500 ? 'performance' : 'urbano'

		case 'scooter':
			return nameLower.includes('tre ruote') || modelLower.includes('tre ruote')
				? 'tre-ruote'
				: 'due-ruote'

		case 'veicoli-commerciali':
			return nameLower.includes('passeggeri') ||
			       nameLower.includes('italy') ||
			       modelLower.includes('passeggeri')
				? 'passeggeri'
				: 'merci'

		case 'mobilita-disabili':
			return nameLower.includes('cabinato') ||
			       nameLower.includes('mob') ||
			       modelLower.includes('cabinato')
				? 'cabinato'
				: 'scooter'

		default:
			return 'all'
	}
}