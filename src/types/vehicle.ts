export interface VehicleSpecs {
	batteria: string
	autonomia: string
	tempoRicarica: string
	ruote: string
	potenza: string
	velocitaMassima: string
	trazione: string
	telaio: string
	freni: string
	pendenza: string
	peso: string
	[key: string]: string // Per permettere spec aggiuntive
}

export interface Vehicle {
	id: string
	name: string
	model: string
	brand: string
	year: string
	productCode: string
	category: string
	categorySlug: string
	categoryHref: string
	images: string[]
	specs: VehicleSpecs
	description: string
	specialBadges?: string[]
	descriptionImages?: string[]
	optionalFeatures: string[]
	primaryColor: string
	badgeColor: string
	isNew?: boolean
	subcategory?: string
	model3d?: string
}