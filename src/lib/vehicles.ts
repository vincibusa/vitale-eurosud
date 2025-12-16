import { supabase } from './supabase'
import type { Vehicle } from '@/types/vehicle'

export async function getVehicles(): Promise<Vehicle[]> {
	const { data, error } = await supabase
		.from('vehicles')
		.select('*')
		.order('category_slug, name')

	if (error) {
		return []
	}

	return data.map(vehicle => ({
		id: vehicle.id,
		name: vehicle.name,
		model: vehicle.model,
		brand: vehicle.brand,
		year: vehicle.year,
		productCode: vehicle.product_code,
		category: vehicle.category,
		categorySlug: vehicle.category_slug,
		categoryHref: `/${vehicle.category_slug}`,
		images: vehicle.images || [],
		specs: vehicle.specs || {},
		description: vehicle.description || '',
		specialBadges: vehicle.special_badges || [],
		descriptionImages: vehicle.description_images || [],
		optionalFeatures: vehicle.optional_features || [],
		primaryColor: vehicle.primary_color || 'gray',
		badgeColor: vehicle.badge_color || 'bg-gray-100 text-gray-700 hover:bg-gray-200',
		isNew: vehicle.is_new || false
	}))
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
	const { data, error } = await supabase
		.from('vehicles')
		.select('*')
		.eq('id', id)
		.single()

	if (error) {
		return null
	}

	if (!data) return null

	return {
		id: data.id,
		name: data.name,
		model: data.model,
		brand: data.brand,
		year: data.year,
		productCode: data.product_code,
		category: data.category,
		categorySlug: data.category_slug,
		categoryHref: `/${data.category_slug}`,
		images: data.images || [],
		specs: data.specs || {},
		description: data.description || '',
		specialBadges: data.special_badges || [],
		descriptionImages: data.description_images || [],
		optionalFeatures: data.optional_features || [],
		primaryColor: data.primary_color || 'gray',
		badgeColor: data.badge_color || 'bg-gray-100 text-gray-700 hover:bg-gray-200',
		isNew: data.is_new || false
	}
}

export async function getVehiclesByCategory(categorySlug: string): Promise<Vehicle[]> {
	const { data, error } = await supabase
		.from('vehicles')
		.select('*')
		.eq('category_slug', categorySlug)
		.order('name')

	if (error) {
		return []
	}

	return data.map(vehicle => ({
		id: vehicle.id,
		name: vehicle.name,
		model: vehicle.model,
		brand: vehicle.brand,
		year: vehicle.year,
		productCode: vehicle.product_code,
		category: vehicle.category,
		categorySlug: vehicle.category_slug,
		categoryHref: `/${vehicle.category_slug}`,
		images: vehicle.images || [],
		specs: vehicle.specs || {},
		description: vehicle.description || '',
		specialBadges: vehicle.special_badges || [],
		descriptionImages: vehicle.description_images || [],
		optionalFeatures: vehicle.optional_features || [],
		primaryColor: vehicle.primary_color || 'gray',
		badgeColor: vehicle.badge_color || 'bg-gray-100 text-gray-700 hover:bg-gray-200',
		isNew: vehicle.is_new || false
	}))
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
export function vehicleToProduct(vehicle: Vehicle) {
	return {
		id: vehicle.id,
		name: vehicle.name,
		type: vehicle.model,
		power: vehicle.specs.potenza,
		battery: vehicle.specs.batteria,
		speed: vehicle.specs.velocitaMassima,
		image: vehicle.images[0],
		href: `/prodotti/${vehicle.id}`,
		isNew: vehicle.isNew || false
	}
}

// Get featured vehicles (new vehicles)
export async function getFeaturedVehicles(limit: number = 6): Promise<Vehicle[]> {
	const { data, error } = await supabase
		.from('vehicles')
		.select('*')
		.eq('is_new', true)
		.order('name')
		.limit(limit)

	if (error) {
		return []
	}

	return data.map(vehicle => ({
		id: vehicle.id,
		name: vehicle.name,
		model: vehicle.model,
		brand: vehicle.brand,
		year: vehicle.year,
		productCode: vehicle.product_code,
		category: vehicle.category,
		categorySlug: vehicle.category_slug,
		categoryHref: `/${vehicle.category_slug}`,
		images: vehicle.images || [],
		specs: vehicle.specs || {},
		description: vehicle.description || '',
		specialBadges: vehicle.special_badges || [],
		descriptionImages: vehicle.description_images || [],
		optionalFeatures: vehicle.optional_features || [],
		primaryColor: vehicle.primary_color || 'gray',
		badgeColor: vehicle.badge_color || 'bg-gray-100 text-gray-700 hover:bg-gray-200',
		isNew: vehicle.is_new || false
	}))
}