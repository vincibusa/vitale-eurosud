export interface SubcategoryConfig {
	label: string
	value: string
	description?: string
}

export const CATEGORY_SUBCATEGORIES: Record<string, SubcategoryConfig[]> = {
	'biciclette': [
		{ label: 'Tutte', value: 'all' },
		{ label: 'City', value: 'city' },
		{ label: 'Mountain', value: 'mountain' },
		{ label: 'Cargo', value: 'cargo' }
	],
	'monopattini': [
		{ label: 'Tutti', value: 'all' },
		{ label: 'Urbano', value: 'urbano' },
		{ label: 'Performance', value: 'performance' }
	],
	'scooter': [
		{ label: 'Tutti', value: 'all' },
		{ label: 'Due Ruote', value: 'due-ruote' },
		{ label: 'Tre Ruote', value: 'tre-ruote' }
	],
	'minicar': [
		{ label: 'Tutti i Modelli', value: 'all' }
	],
	'quad': [
		{ label: 'Tutti i Modelli', value: 'all' }
	],
	'veicoli-commerciali': [
		{ label: 'Tutti', value: 'all' },
		{ label: 'Trasporto Passeggeri', value: 'passeggeri' },
		{ label: 'Trasporto Merci', value: 'merci' }
	],
	'mobilita-disabili': [
		{ label: 'Tutti', value: 'all' },
		{ label: 'Scooter Elettrici', value: 'scooter' },
		{ label: 'Cabinati', value: 'cabinato' }
	]
}
