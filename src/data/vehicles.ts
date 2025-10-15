// Dataset completo di tutti i veicoli Vitale
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
}

export const vehicles: Record<string, Vehicle> = {
	// ========== BICICLETTE ELETTRICHE ==========
	'fat-02-db': {
		id: 'fat-02-db',
		name: 'FAT-02 DB - Fat Bike Elettrica Telaio Dritto',
		model: 'FAT-02 DB',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24101',
		category: 'Bicicletta Elettrica',
		categorySlug: 'biciclette',
		categoryHref: '/biciclette',
		images: ['/images/fat-bike-db.png'],
		specs: {
			batteria: 'Litio 36V - 10AH',
			autonomia: '35-40 KM',
			tempoRicarica: '4-6 Ore',
			ruote: '20" x 4.0 Fat',
			potenza: '250W',
			velocitaMassima: '25KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Alluminio Dritto',
			freni: 'A Disco Meccanici',
			pendenza: '15%',
			peso: '28 KG'
		},
		description: `## FAT-02 DB - Fat Bike Elettrica Telaio Dritto

Robustezza e stile per ogni terreno.

La FAT-02 DB è la fat bike elettrica perfetta per chi cerca un mix di performance, comfort e design robusto. Con le sue ruote larghe da 20" x 4.0, è ideale per affrontare terreni difficili, sabbia, neve o semplicemente per una pedalata confortevole in città.

 Perché scegliere la FAT-02 DB?

Ruote Fat per massima stabilità  -  Le ruote larghe offrono eccellente grip e assorbimento delle vibrazioni, perfette per ogni superficie.

Telaio dritto in alluminio  -  Design robusto e leggero che garantisce durata e facilità di guida.

Batteria al litio removibile  -  36V 10Ah per un'autonomia fino a 40 km, ricaricabile comodamente a casa.

Motore brushless da 250W  -  Assistenza alla pedalata fluida e silenziosa fino a 25 km/h, conforme alle normative europee.

 Caratteristiche principali:

Freni a disco meccanici anteriori e posteriori
Display LCD con indicatore batteria e velocità
Luci LED anteriori e posteriori
Cambio Shimano a 7 velocità
Sella ergonomica regolabile
Portapacchi posteriore incluso`,
		optionalFeatures: [
			'Batteria Removibile',
			'Caricabatterie Incluso',
			'Cambio Shimano 7 Velocità',
			'Display LCD',
			'Freni A Disco',
			'Luci LED',
			'Portapacchi Posteriore',
			'Sella Ergonomica'
		],
		primaryColor: 'green',
		badgeColor: 'bg-green-100 text-green-700 hover:bg-green-200'
	},

	'fat-02-cb': {
		id: 'fat-02-cb',
		name: 'FAT-02 CB - Fat Bike Elettrica Telaio Curvo',
		model: 'FAT-02 CB',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24102',
		category: 'Bicicletta Elettrica',
		categorySlug: 'biciclette',
		categoryHref: '/biciclette',
		images: ['/images/fat-bike-cb.png'],
		specs: {
			batteria: 'Litio 36V - 10AH',
			autonomia: '35-40 KM',
			tempoRicarica: '4-6 Ore',
			ruote: '20" x 4.0 Fat',
			potenza: '250W',
			velocitaMassima: '25KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Alluminio Curvo',
			freni: 'A Disco Meccanici',
			pendenza: '15%',
			peso: '28 KG'
		},
		description: `## FAT-02 CB - Fat Bike Elettrica Telaio Curvo

Comfort e accessibilità con stile fat bike.

La FAT-02 CB condivide tutte le caratteristiche vincenti della FAT-02 DB, ma con un telaio curvo che facilita la salita e discesa dalla bici. Perfetta per chi cerca massimo comfort senza rinunciare alle prestazioni delle ruote fat.

 Perché scegliere la FAT-02 CB?

Telaio curvo low-step  -  Design accessibile che rende la bici ideale per tutti, anche per chi ha problemi di mobilità.

Ruote Fat 20" x 4.0  -  Stabilità superiore e comfort su ogni tipo di terreno.

Batteria al litio 36V 10Ah  -  Autonomia fino a 40 km con batteria estraibile per ricarica comoda.

Assistenza pedalata 250W  -  Motore brushless conforme alle normative, per una guida sicura e legale.

 Caratteristiche principali:

Telaio low-step per facile accesso
Freni a disco meccanici
Display LCD multifunzione
Cambio Shimano 7 velocità
Luci LED integrate
Portapacchi posteriore
Parafanghi anteriori e posteriori`,
		optionalFeatures: [
			'Batteria Removibile',
			'Caricabatterie Incluso',
			'Cambio Shimano 7 Velocità',
			'Display LCD',
			'Freni A Disco',
			'Luci LED',
			'Parafanghi',
			'Portapacchi Posteriore',
			'Sella Ergonomica',
			'Telaio Low-Step'
		],
		primaryColor: 'green',
		badgeColor: 'bg-green-100 text-green-700 hover:bg-green-200'
	},

	'njt007': {
		id: 'njt007',
		name: 'NJT007 - Bicicletta Elettrica',
		model: 'NJT007',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24103',
		category: 'Bicicletta Elettrica',
		categorySlug: 'biciclette',
		categoryHref: '/biciclette',
		images: ['/images/njt007-bike.png'],
		specs: {
			batteria: 'Piombo 48V - 20AH',
			autonomia: '40-50 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '26"',
			potenza: '250W',
			velocitaMassima: '25KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio Rinforzato',
			freni: 'V-Brake',
			pendenza: '12%',
			peso: '32 KG'
		},
		description: `## NJT007 - Bicicletta Elettrica

Robustezza e affidabilità per la mobilità quotidiana.

La NJT007 è una bicicletta elettrica dal design classico e robusto, perfetta per gli spostamenti urbani ed extraurbani. Con batteria al piombo ad alta capacità, offre un'ottima autonomia a un prezzo competitivo.

 Perché scegliere la NJT007?

Batteria al piombo 48V 20Ah  -  Grande capacità per autonomie fino a 50 km, ideale per percorrenze quotidiane.

Motore 250W affidabile  -  Assistenza alla pedalata costante e silenziosa, conforme alle normative europee.

Telaio in acciaio rinforzato  -  Costruzione solida che garantisce durata nel tempo.

Ruote da 26"  -  Dimensione classica per comfort e stabilità di marcia.

 Caratteristiche principali:

Ottimo rapporto qualità/prezzo
Freni V-Brake affidabili
Cambio meccanico
Portapacchi posteriore
Parafanghi inclusi
Cavalletto centrale
Luci anteriori e posteriori`,
		optionalFeatures: [
			'Batteria Integrata',
			'Caricabatterie Incluso',
			'Cambio Meccanico',
			'Cavalletto Centrale',
			'Freni V-Brake',
			'Luci LED',
			'Parafanghi',
			'Portapacchi Posteriore',
			'Sella Comfort'
		],
		primaryColor: 'green',
		badgeColor: 'bg-green-100 text-green-700 hover:bg-green-200'
	},

	// ========== SCOOTER ELETTRICI ==========
	'vitale-v28': {
		id: 'vitale-v28',
		name: 'Vitale V28  -  Scooter Elettrico a Tre Ruote',
		model: 'V28',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24436',
		category: 'Scooter Elettrico',
		categorySlug: 'scooter',
		categoryHref: '/scooter',
		images: ['/images/v28-scooter.png'],
		specs: {
			batteria: 'Litio 72V - 40AH',
			autonomia: '100 KM',
			tempoRicarica: '4-8 Ore',
			ruote: 'Ant 100/60 - 12" | Post 100/70 - 12"',
			potenza: '2.000W',
			velocitaMassima: '45KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Lega Metallica',
			freni: 'A Disco',
			pendenza: '15%',
			peso: '97.5 KG'
		},
		description: `## Vitale V28  -  Scooter Elettrico a Tre Ruote

Comfort, sicurezza e autonomia. Tutto in un unico mezzo.

Il Vitale V28 è il nuovo punto di riferimento per chi cerca uno scooter elettrico a tre ruote sicuro, potente e stabile. Pensato per la mobilità urbana e periurbana, è perfetto per adulti, senior o chi desidera un'alternativa green all'auto o allo scooter tradizionale.

 Perché scegliere il Vitale V28?

Autonomia fino a 100 km  -  Grazie alla batteria al litio da 72V 40Ah, puoi percorrere distanze considerevoli con una sola carica, ideale per gli spostamenti quotidiani senza pensieri.

Potenza e velocità  -  Il motore brushless da 2000W ti garantisce prestazioni brillanti fino a 45 km/h, permettendoti di muoverti agilmente nel traffico cittadino.

Stabilità su tre ruote  -  La configurazione a tre ruote offre equilibrio e sicurezza superiori, perfetta anche per chi ha poca esperienza o cerca maggiore stabilità.

Comfort e praticità  -  Sella ergonomica, pedana antiscivolo, batteria estraibile e un ampio vano portaoggetti rendono ogni viaggio confortevole.

Tecnologia avanzata  -  Display digitale, centralina intelligente, luci LED complete, sistema MLS e modalità sport per un'esperienza di guida moderna e sicura.

 Caratteristiche principali:

Omologato per l'uso stradale
Freni a disco anteriori e posteriori per massima sicurezza
Cerchi in lega leggeri per prestazioni ottimali
Sistema di allarme integrato
Retromarcia assistita per manovre facili
Doppio set di chiavi incluso`,
		optionalFeatures: [
			'Allarme',
			'Batteria Estraibile',
			'Caricabatterie',
			'Centralina Intelligente',
			'Cerchi In Lega Leggeri',
			'Display Digitale',
			'Doppie Chiavi',
			'Frecce Led',
			'Freni A Disco',
			'Freno A Mano',
			'Luci LED',
			'Modalità Sport',
			'Pedana Antiscivolo',
			'Retromarcia Assistita',
			'Sistema MLS',
			'Stop Posteriore LED'
		],
		primaryColor: 'blue',
		badgeColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
	},

	'ecozone-max': {
		id: 'ecozone-max',
		name: 'ECOZONE MAX - Scooter Elettrico',
		model: 'ECOZONE MAX',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24437',
		category: 'Scooter Elettrico',
		categorySlug: 'scooter',
		categoryHref: '/scooter',
		images: ['/images/ecozone-max-scooter.jpg'],
		specs: {
			batteria: 'Litio 72V - 40AH',
			autonomia: '90 KM',
			tempoRicarica: '4-8 Ore',
			ruote: 'Ant 90/90 - 12" | Post 100/90 - 12"',
			potenza: '2.000W',
			velocitaMassima: '45KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Lega Metallica Rinforzata',
			freni: 'A Disco Idraulici',
			pendenza: '18%',
			peso: '92 KG'
		},
		description: `## ECOZONE MAX - Scooter Elettrico

Potenza massima e design sportivo.

L'ECOZONE MAX è lo scooter elettrico per chi non vuole compromessi. Design sportivo, tecnologia all'avanguardia e prestazioni da primato lo rendono la scelta ideale per gli amanti della guida dinamica e sostenibile.

 Perché scegliere l'ECOZONE MAX?

Prestazioni superiori  -  Motore da 2000W e batteria al litio da 72V 40Ah per autonomia fino a 90 km e velocità massima di 45 km/h.

Tecnologia avanzata  -  Freni a disco idraulici, display digitale TFT a colori, connettività Bluetooth e app dedicata per monitoraggio in tempo reale.

Design sportivo  -  Linee aggressive, luci LED full, cerchi in lega sportivi e colorazioni vivaci per distinguerti in strada.

Massimo comfort  -  Sella premium, sospensioni regolabili, doppio vano portaoggetti e presa USB per ricaricare i tuoi dispositivi.

 Caratteristiche principali:

Display TFT a colori con connettività Bluetooth
Freni a disco idraulici ad alte prestazioni
Sistema di recupero energia in frenata
Batteria estraibile con sistema di sicurezza
Luci LED full (faro, stop, frecce, luce di posizione)
Modalità ECO e SPORT selezionabili
Sistema antifurto con allarme volumetrico`,
		optionalFeatures: [
			'Allarme Volumetrico',
			'App Bluetooth',
			'Batteria Estraibile',
			'Caricabatterie Rapido',
			'Cerchi In Lega Sportivi',
			'Display TFT A Colori',
			'Doppio Vano Portaoggetti',
			'Freni Idraulici',
			'Luci LED Full',
			'Modalità ECO/SPORT',
			'Presa USB',
			'Recupero Energia',
			'Sella Premium',
			'Sistema Antifurto',
			'Sospensioni Regolabili'
		],
		primaryColor: 'blue',
		badgeColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
		isNew: true
	},

	'ecozone': {
		id: 'ecozone',
		name: 'Ecozone - Scooter Elettrico (Targabile)',
		model: 'ECOZONE',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24438',
		category: 'Scooter Elettrico',
		categorySlug: 'scooter',
		categoryHref: '/scooter',
		images: ['/images/ecozone-scooter.png'],
		specs: {
			batteria: 'Piombo 48V - 20AH / Optional Litio 60V - 20AH',
			autonomia: '50-60 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '10"',
			potenza: '500W',
			velocitaMassima: '25KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio',
			freni: 'A Tamburo',
			pendenza: '10%',
			peso: '65 KG'
		},
		description: `## Ecozone - Scooter Elettrico (Targabile)

Mobilità urbana economica e affidabile.

L'Ecozone è lo scooter elettrico targabile perfetto per chi cerca una soluzione economica e pratica per gli spostamenti in città. Conforme alle normative, può essere immatricolato e guidato con patente AM.

 Perché scegliere l'Ecozone?

Targabile e conforme  -  Omologato per l'uso stradale, può essere immatricolato e assicurato come un ciclomotore tradizionale.

Due opzioni di batteria  -  Disponibile con batteria al piombo (economica) o al litio (più leggera e performante).

Economico e affidabile  -  Costi di gestione ridotti al minimo, manutenzione semplice e zero emissioni.

Pratico e versatile  -  Ideale per gli spostamenti quotidiani casa-lavoro, università o commissioni in città.

 Caratteristiche principali:

Omologato come ciclomotore
Portapacchi posteriore integrato
Luci anteriori e posteriori
Specchietti retrovisori
Cavalletto centrale
Vano portaoggetti sotto sella
Disponibile upgrade batteria al litio`,
		optionalFeatures: [
			'Caricabatterie Incluso',
			'Cavalletto Centrale',
			'Freni A Tamburo',
			'Luci Anteriori/Posteriori',
			'Omologazione Ciclomotore',
			'Portapacchi',
			'Specchietti Retrovisori',
			'Upgrade Batteria Litio (Optional)',
			'Vano Portaoggetti'
		],
		primaryColor: 'blue',
		badgeColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
	},

	'sct001': {
		id: 'sct001',
		name: 'SCT001 - Scooter Elettrico (Uso Privato)',
		model: 'SCT001',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24439',
		category: 'Scooter Elettrico',
		categorySlug: 'scooter',
		categoryHref: '/scooter',
		images: ['/images/sct001-scooter.png'],
		specs: {
			batteria: 'Piombo 48V - 20AH',
			autonomia: '45-55 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '10"',
			potenza: '500W',
			velocitaMassima: '25KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio',
			freni: 'A Tamburo',
			pendenza: '10%',
			peso: '60 KG'
		},
		description: `## SCT001 - Scooter Elettrico (Uso Privato)

Soluzione entry-level per la mobilità privata.

Lo SCT001 è lo scooter elettrico ideale per chi cerca una soluzione economica per muoversi in aree private come ville, campeggi, resort o grandi proprietà. Non omologato per uso stradale, ma perfetto per spostamenti in sicurezza in spazi privati.

 Perché scegliere lo SCT001?

Prezzo accessibile  -  La soluzione più economica per la mobilità elettrica in aree private.

Semplice e affidabile  -  Design essenziale, manutenzione minima e facilità d'uso per tutti.

Batteria al piombo  -  Economica e affidabile, con autonomia fino a 55 km.

Perfetto per aree private  -  Ideale per ville, campeggi, strutture turistiche, aziende agricole.

 Caratteristiche principali:

Design semplice ed essenziale
Manutenzione ridotta al minimo
Luci anteriori e posteriori
Cavalletto laterale
Vano portaoggetti
Ottimo rapporto qualità/prezzo`,
		optionalFeatures: [
			'Caricabatterie Incluso',
			'Cavalletto Laterale',
			'Freni A Tamburo',
			'Luci Anteriori/Posteriori',
			'Vano Portaoggetti'
		],
		primaryColor: 'blue',
		badgeColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
	},

	// ========== MONOPATTINI ELETTRICI ==========
	'me750': {
		id: 'me750',
		name: 'ME750 - Monopattino Elettrico (Targabile)',
		model: 'ME750',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24201',
		category: 'Monopattino Elettrico',
		categorySlug: 'monopattini',
		categoryHref: '/monopattini',
		images: ['/images/me750-monopattino.jpg'],
		specs: {
			batteria: 'Piombo 48V - 20AH / Optional Litio 60V - 20AH',
			autonomia: '40-50 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '10"',
			potenza: '500W',
			velocitaMassima: '25KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio Rinforzato',
			freni: 'A Tamburo',
			pendenza: '12%',
			peso: '55 KG'
		},
		description: `## ME750 - Monopattino Elettrico (Targabile)

Praticità e agilità per la città.

Il ME750 è il monopattino elettrico targabile perfetto per chi cerca la massima praticità negli spostamenti urbani. Compatto, agile e conforme alle normative, può essere immatricolato come ciclomotore.

 Perché scegliere il ME750?

Targabile e omologato  -  Può essere immatricolato e guidato con patente AM, perfetto per uso stradale.

Compatto e maneggevole  -  Design snello che facilita il parcheggio e la manovrabilità nel traffico cittadino.

Due opzioni di batteria  -  Disponibile con batteria al piombo (economica) o upgrade al litio (più leggera).

Economico da gestire  -  Costi di ricarica minimi, zero emissioni, manutenzione ridotta.

 Caratteristiche principali:

Omologato come ciclomotore
Seduta comoda per lunghi tragitti
Portapacchi posteriore
Luci LED anteriori e posteriori
Specchietti retrovisori
Display digitale
Vano portaoggetti`,
		optionalFeatures: [
			'Caricabatterie Incluso',
			'Display Digitale',
			'Freni A Tamburo',
			'Luci LED',
			'Omologazione Ciclomotore',
			'Portapacchi',
			'Seduta Comfort',
			'Specchietti Retrovisori',
			'Upgrade Batteria Litio (Optional)',
			'Vano Portaoggetti'
		],
		primaryColor: 'purple',
		badgeColor: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
	},

	// ========== MINICAR ELETTRICHE ==========
	'mia-minicar': {
		id: 'mia-minicar',
		name: 'MIA - Minicar Elettrica',
		model: 'MIA',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24301',
		category: 'Minicar Elettrica',
		categorySlug: 'minicar',
		categoryHref: '/minicar',
		images: ['/images/mia-minicar.jpg'],
		specs: {
			batteria: 'Litio 72V - 70AH',
			autonomia: '80-100 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '12"',
			potenza: '5.000W',
			velocitaMassima: '45KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Telaio Rinforzato',
			freni: 'A Disco',
			pendenza: '20%',
			peso: '380 KG'
		},
		description: `## MIA - Minicar Elettrica

La minicar che unisce comfort, stile e sostenibilità.

La MIA è la minicar elettrica perfetta per chi cerca un'alternativa green all'auto tradizionale senza rinunciare a comfort e protezione. Con carrozzeria chiusa, può essere guidata anche con patente AM.

 Perché scegliere la MIA?

Carrozzeria chiusa  -  Protezione dagli agenti atmosferici, perfetta per ogni stagione.

Autonomia fino a 100 km  -  Batteria al litio da 72V 70Ah per percorrenze quotidiane senza pensieri.

Potenza 5000W  -  Prestazioni brillanti e partenze scattanti anche in salita fino al 20%.

Guidabile con patente AM  -  Accessibile dai 14 anni, perfetta per giovani e adulti.

Comfort come in auto  -  Sedili ergonomici, aria calda/fredda, radio Bluetooth, tergicristalli.

 Caratteristiche principali:

Carrozzeria chiusa con porte
Posti a sedere per 2 persone
Aria calda e fredda
Radio Bluetooth
Luci LED complete
Tergicristalli anteriore
Retrocamera
Portabagagli posteriore`,
		optionalFeatures: [
			'Allarme',
			'Aria Calda/Fredda',
			'Batteria Litio',
			'Caricabatterie',
			'Carrozzeria Chiusa',
			'Display Digitale',
			'Freni A Disco',
			'Luci LED Complete',
			'Portabagagli',
			'Radio Bluetooth',
			'Retrocamera',
			'Sedili Ergonomici',
			'Tergicristalli',
			'Vetri Elettrici'
		],
		primaryColor: 'red',
		badgeColor: 'bg-red-100 text-red-700 hover:bg-red-200'
	},

	'asya-auto': {
		id: 'asya-auto',
		name: 'ASYA - Auto Elettrica',
		model: 'ASYA',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24302',
		category: 'Auto Elettrica',
		categorySlug: 'minicar',
		categoryHref: '/minicar',
		images: ['/images/asya-minicar.jpg'],
		specs: {
			batteria: 'Litio 72V - 100AH',
			autonomia: '120-150 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '13"',
			potenza: '4.000W',
			velocitaMassima: '70KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Telaio Auto Rinforzato',
			freni: 'A Disco Idraulici',
			pendenza: '25%',
			peso: '450 KG'
		},
		description: `## ASYA - Auto Elettrica

L'auto elettrica compatta per la città del futuro.

ASYA è la city car elettrica che rivoluziona la mobilità urbana. Design moderno, tecnologia avanzata e prestazioni da vera auto in un formato compatto e accessibile.

 Perché scegliere ASYA?

Autonomia eccezionale  -  Fino a 150 km con una singola carica grazie alla batteria al litio da 72V 100Ah.

Velocità massima 70 km/h  -  Prestazioni da vera auto, perfetta anche per percorsi extraurbani.

Comfort premium  -  Sedili in ecopelle, climatizzatore, display touchscreen, retrocamera.

Sicurezza  -  Freni a disco idraulici, ABS, airbag (optional), carrozzeria omologata.

Zero emissioni  -  Risparmio totale su carburante, bollo ridotto, accesso ZTL.

 Caratteristiche principali:

Omologata come quadriciclo L7e
4 posti a sedere
Climatizzatore automatico
Display touchscreen 10"
Retrocamera e sensori parcheggio
Connettività Bluetooth
Sedili in ecopelle
Chiusura centralizzata
Vetri elettrici
ABS e controllo trazione`,
		optionalFeatures: [
			'ABS',
			'Airbag (Optional)',
			'Caricabatterie Rapido',
			'Chiusura Centralizzata',
			'Climatizzatore',
			'Connettività Bluetooth',
			'Display Touchscreen 10"',
			'Freni Idraulici',
			'Luci LED Full',
			'Retrocamera',
			'Sedili Ecopelle',
			'Sensori Parcheggio',
			'Sistema Antifurto',
			'Vetri Elettrici'
		],
		primaryColor: 'red',
		badgeColor: 'bg-red-100 text-red-700 hover:bg-red-200',
		isNew: true
	},

	// ========== QUAD ELETTRICI ==========
	'quad-elettrico': {
		id: 'quad-elettrico',
		name: 'Vitale Q3000 - Quad Elettrico a 4 Ruote',
		model: 'Q3000',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24401',
		category: 'Quad Elettrico',
		categorySlug: 'quad',
		categoryHref: '/quad',
		images: ['/images/quad-elettrico.jpg'],
		specs: {
			batteria: 'Piombo 72V - 52AH',
			autonomia: '70-80 KM',
			tempoRicarica: '8-10 Ore',
			ruote: '18"',
			potenza: '3.000W',
			velocitaMassima: '45KM/H',
			trazione: 'Integrale 4x4',
			telaio: 'Acciaio Rinforzato Tubolare',
			freni: 'A Disco 4 Ruote',
			pendenza: '30%',
			peso: '220 KG'
		},
		description: `## Vitale Q3000 - Quad Elettrico a 4 Ruote

Potenza e avventura in formato elettrico.

Il Vitale Q3000 è il quad elettrico a 4 ruote perfetto per chi cerca emozioni forti nel rispetto dell'ambiente. Con trazione integrale 4x4, è ideale per percorsi off-road, sterrati e terreni accidentati.

 Perché scegliere il Vitale Q3000?

Trazione integrale 4x4  -  Potenza distribuita su tutte e quattro le ruote per massima aderenza e controllo su ogni terreno.

Motore da 3000W  -  Prestazioni brillanti e coppia elevata per affrontare pendenze fino al 30%.

Autonomia 70-80 km  -  Batteria al piombo da 72V 52Ah per lunghe escursioni senza pensieri.

Freni a disco su 4 ruote  -  Massima sicurezza in frenata anche su terreni difficili.

Telaio tubolare rinforzato  -  Costruzione robusta e affidabile per resistere agli utilizzi più intensi.

 Caratteristiche principali:

Trazione integrale 4x4
Sospensioni anteriori e posteriori
Ruote da 18" fuoristrada
Freni a disco anteriori e posteriori
Faro LED anteriore
Display digitale
Seduta biposto
Portapacchi anteriore e posteriore`,
		optionalFeatures: [
			'Caricabatterie Incluso',
			'Display Digitale',
			'Faro LED',
			'Freni A Disco 4 Ruote',
			'Portapacchi',
			'Seduta Biposto',
			'Sospensioni Ammortizzate',
			'Telaio Tubolare Rinforzato',
			'Trazione 4x4'
		],
		primaryColor: 'yellow',
		badgeColor: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
	},

	// ========== VEICOLI COMMERCIALI ==========
	'vitale-yodo': {
		id: 'vitale-yodo',
		name: 'Vitale Yodo - Furgone Elettrico',
		model: 'YODO',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24501',
		category: 'Veicolo Commerciale',
		categorySlug: 'veicoli-commerciali',
		categoryHref: '/veicoli-commerciali',
		images: ['/images/yodo-commerciale.jpg'],
		specs: {
			batteria: 'Litio 96V - 100AH',
			autonomia: '150 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '14"',
			potenza: '13.000W',
			velocitaMassima: '80KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Telaio Commerciale Rinforzato',
			freni: 'A Disco Idraulici',
			pendenza: '20%',
			peso: '850 KG',
			capacitaCarico: '500 KG',
			volumeCarico: '3.5 m³'
		},
		description: `## Vitale Yodo - Furgone Elettrico

Il furgone elettrico professionale per le consegne urbane.

Il Vitale Yodo è il furgone elettrico di nuova generazione progettato per le aziende che vogliono ridurre i costi operativi e le emissioni senza compromettere le prestazioni. Perfetto per consegne, logistica urbana e servizi commerciali.

 Perché scegliere il Vitale Yodo?

Autonomia fino a 150 km  -  Batteria al litio da 96V 100Ah per coprire l'intera giornata lavorativa.

Potenza 13.000W  -  Prestazioni da vero veicolo commerciale, velocità massima 80 km/h.

Capacità di carico 500 kg  -  Vano di carico da 3.5 m³ per trasportare merci di ogni tipo.

Zero emissioni  -  Accesso libero alle ZTL, incentivi fiscali, costi di gestione ridotti.

Comfort e tecnologia  -  Cabina ergonomica, climatizzatore, display touchscreen, retrocamera.

 Caratteristiche principali:

Omologato N1 (veicolo commerciale)
Vano di carico 3.5 m³
Portata utile 500 kg
Climatizzatore
Display touchscreen
Retrocamera e sensori
Chiusura centralizzata
Sedili ergonomici
Freni ABS`,
		optionalFeatures: [
			'ABS',
			'Caricabatterie Rapido',
			'Chiusura Centralizzata',
			'Climatizzatore',
			'Display Touchscreen',
			'Freni Idraulici',
			'Portata 500 KG',
			'Retrocamera',
			'Sedili Ergonomici',
			'Sensori Parcheggio',
			'Vano Carico 3.5 m³'
		],
		primaryColor: 'amber',
		badgeColor: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
		isNew: true
	},

	'vitale-italy': {
		id: 'vitale-italy',
		name: 'Italy - Tre Ruote Elettrico Per Trasporto Passeggeri',
		model: 'ITALY',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24502',
		category: 'Veicolo Commerciale',
		categorySlug: 'veicoli-commerciali',
		categoryHref: '/veicoli-commerciali',
		images: ['/images/italy-commerciale.jpg'],
		specs: {
			batteria: 'Litio 60V - 120AH',
			autonomia: '100 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '12"',
			potenza: '4.000W',
			velocitaMassima: '45KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Telaio Commerciale',
			freni: 'A Disco',
			pendenza: '15%',
			peso: '350 KG',
			postiSedere: '4 Passeggeri'
		},
		description: `## Italy - Tre Ruote Elettrico Per Trasporto Passeggeri

Il veicolo elettrico perfetto per il trasporto turistico e commerciale.

Italy è il tre ruote elettrico progettato per il trasporto di passeggeri in ambito turistico, hoteliero e commerciale. Con carrozzeria chiusa e 4 posti a sedere, è la soluzione ideale per servizi navetta, tour guidati e trasporto urbano.

 Perché scegliere Italy?

4 posti a sedere  -  Trasporta comodamente fino a 4 passeggeri in totale comfort.

Carrozzeria chiusa  -  Protezione completa dagli agenti atmosferici per un servizio premium.

Autonomia 100 km  -  Batteria al litio da 60V 120Ah per un'intera giornata di servizio.

Design italiano  -  Estetica curata e riconoscibile, perfetta per servizi turistici di qualità.

Zero emissioni  -  Accesso libero alle ZTL, riduzione costi operativi, immagine green.

 Caratteristiche principali:

4 posti a sedere confortevoli
Carrozzeria chiusa con porte
Aria calda e fredda
Sedili in similpelle
Vetri panoramici
Luci LED complete
Display digitale
Sistema audio`,
		optionalFeatures: [
			'Aria Calda/Fredda',
			'Caricabatterie',
			'Carrozzeria Chiusa',
			'Display Digitale',
			'Freni A Disco',
			'Luci LED',
			'Posti 4 Passeggeri',
			'Sedili Similpelle',
			'Sistema Audio',
			'Vetri Panoramici'
		],
		primaryColor: 'amber',
		badgeColor: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
		isNew: true
	},

	'vitale-italy-mini': {
		id: 'vitale-italy-mini',
		name: 'Italy Mini - Tre Ruote Elettrico Per Trasporto Passeggeri',
		model: 'ITALY MINI',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24503',
		category: 'Veicolo Commerciale',
		categorySlug: 'veicoli-commerciali',
		categoryHref: '/veicoli-commerciali',
		images: ['/images/italy-mini-commerciale.jpg'],
		specs: {
			batteria: 'Litio 60V - 120AH',
			autonomia: '100 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '12"',
			potenza: '4.000W',
			velocitaMassima: '45KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Telaio Commerciale Compatto',
			freni: 'A Disco',
			pendenza: '15%',
			peso: '320 KG',
			postiSedere: '2 Passeggeri'
		},
		description: `## Italy Mini - Tre Ruote Elettrico Per Trasporto Passeggeri

Compatto, agile e perfetto per i centri storici.

Italy Mini è la versione compatta del tre ruote Italy, progettata per il trasporto di 2 passeggeri in aree urbane ristrette. Ideale per servizi navetta in centri storici, hotel, strutture turistiche e resort.

 Perché scegliere Italy Mini?

Dimensioni compatte  -  Design ridotto per massima manovrabilità nelle strade strette dei centri storici.

2 posti a sedere  -  Perfetto per servizi personalizzati e trasporto VIP.

Autonomia 100 km  -  Batteria al litio da 60V 120Ah per coprire l'intera giornata lavorativa.

Carrozzeria chiusa  -  Comfort e protezione per i passeggeri in ogni condizione meteo.

Facilità di guida  -  Maneggevole come uno scooter ma con il comfort di un'auto.

 Caratteristiche principali:

2 posti a sedere confortevoli
Carrozzeria chiusa
Dimensioni compatte
Aria calda e fredda
Sedili imbottiti
Luci LED
Display digitale
Vetri laterali`,
		optionalFeatures: [
			'Aria Calda/Fredda',
			'Caricabatterie',
			'Carrozzeria Chiusa',
			'Dimensioni Compatte',
			'Display Digitale',
			'Freni A Disco',
			'Luci LED',
			'Posti 2 Passeggeri',
			'Sedili Imbottiti',
			'Vetri Laterali'
		],
		primaryColor: 'amber',
		badgeColor: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
		isNew: true
	},

	'vitale-ego': {
		id: 'vitale-ego',
		name: 'E-GO - Furgone Elettrico',
		model: 'E-GO',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24504',
		category: 'Veicolo Commerciale',
		categorySlug: 'veicoli-commerciali',
		categoryHref: '/veicoli-commerciali',
		images: ['/images/ego-commerciale.jpg'],
		specs: {
			batteria: 'Litio 72V - 70AH',
			autonomia: '80 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '13"',
			potenza: '3.000W',
			velocitaMassima: '45KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Telaio Commerciale',
			freni: 'A Disco',
			pendenza: '18%',
			peso: '450 KG',
			capacitaCarico: '300 KG',
			volumeCarico: '2 m³'
		},
		description: `## E-GO - Furgone Elettrico

Il furgone compatto per le consegne dell'ultimo miglio.

E-GO è il furgone elettrico compatto ideale per consegne urbane, corrieri e piccoli trasporti commerciali. Dimensioni contenute e grande praticità lo rendono perfetto per muoversi agilmente nel traffico cittadino.

 Perché scegliere E-GO?

Compatto e agile  -  Dimensioni ridotte per parcheggiare ovunque e muoversi facilmente in città.

Capacità di carico 300 kg  -  Vano di carico da 2 m³ per trasportare merci e pacchi.

Autonomia 80 km  -  Sufficiente per coprire la giornata lavorativa in ambito urbano.

Zero emissioni  -  Accesso libero alle ZTL, costi di gestione ridotti al minimo.

Economico  -  Prezzo contenuto e costi di manutenzione minimi rispetto ai furgoni tradizionali.

 Caratteristiche principali:

Vano di carico 2 m³
Portata utile 300 kg
Porta laterale scorrevole
Retrocamera
Display digitale
Sedili ergonomici
Luci LED
Freni a disco`,
		optionalFeatures: [
			'Caricabatterie',
			'Display Digitale',
			'Freni A Disco',
			'Luci LED',
			'Porta Scorrevole',
			'Portata 300 KG',
			'Retrocamera',
			'Sedili Ergonomici',
			'Vano Carico 2 m³'
		],
		primaryColor: 'amber',
		badgeColor: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
		isNew: true
	},

	'e-truck': {
		id: 'e-truck',
		name: 'E-Truck - Furgone Elettrico',
		model: 'E-TRUCK',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24505',
		category: 'Veicolo Commerciale',
		categorySlug: 'veicoli-commerciali',
		categoryHref: '/veicoli-commerciali',
		images: ['/images/e-truck-commerciale.jpg'],
		specs: {
			batteria: 'Litio 72V - 50AH',
			autonomia: '60-70 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '12"',
			potenza: '2.500W',
			velocitaMassima: '45KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Telaio Commerciale Leggero',
			freni: 'A Disco',
			pendenza: '15%',
			peso: '380 KG',
			capacitaCarico: '250 KG',
			volumeCarico: '1.5 m³'
		},
		description: `## E-Truck - Furgone Elettrico

La soluzione entry-level per il trasporto commerciale elettrico.

E-Truck è il furgone elettrico economico perfetto per piccole attività commerciali, artigiani e servizi di consegna a domicilio. Compatto, leggero e facile da guidare, è la porta d'ingresso alla mobilità commerciale elettrica.

 Perché scegliere E-Truck?

Prezzo accessibile  -  La soluzione più economica per iniziare con un veicolo commerciale elettrico.

Facile da guidare  -  Dimensioni compatte e manovrabilità simile a uno scooter.

Capacità di carico 250 kg  -  Sufficiente per consegne a domicilio, piccoli trasporti, servizi.

Bassi costi di gestione  -  Ricarica economica, manutenzione ridotta, zero carburante.

Ideale per PMI  -  Perfetto per piccole imprese, artigiani, servizi locali.

 Caratteristiche principali:

Vano di carico 1.5 m³
Portata utile 250 kg
Porta posteriore basculante
Display digitale
Sedile conducente comfort
Luci LED
Freni a disco`,
		optionalFeatures: [
			'Caricabatterie',
			'Display Digitale',
			'Freni A Disco',
			'Luci LED',
			'Porta Basculante',
			'Portata 250 KG',
			'Sedile Comfort',
			'Vano Carico 1.5 m³'
		],
		primaryColor: 'amber',
		badgeColor: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
		isNew: true
	},

	// ========== MOBILITÀ ELETTRICA PER DISABILI ==========
	'dk03': {
		id: 'dk03',
		name: 'DK03 - Scooter Elettrico Per Disabili Tre Ruote',
		model: 'DK03',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24601',
		category: 'Mobilità Disabili',
		categorySlug: 'mobilita-disabili',
		categoryHref: '/mobilita-disabili',
		images: ['/images/dk03-disabili.jpg'],
		specs: {
			batteria: 'Piombo 60V - 20AH',
			autonomia: '40-50 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '12"',
			potenza: '1.000W',
			velocitaMassima: '20KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio Rinforzato',
			freni: 'A Disco',
			pendenza: '12%',
			peso: '95 KG',
			capacitaCarico: '150 KG'
		},
		description: `## DK03 - Scooter Elettrico Per Disabili Tre Ruote

Autonomia e comfort per la mobilità personale.

Il DK03 è lo scooter elettrico a tre ruote progettato per garantire massima autonomia e indipendenza a persone con disabilità o anziani. Con design ergonomico e controlli intuitivi, è la soluzione ideale per spostamenti quotidiani sicuri e confortevoli.

 Perché scegliere il DK03?

Potenza 1000W  -  Prestazioni superiori rispetto agli scooter standard, per affrontare anche leggere pendenze.

Tre ruote per stabilità  -  Configurazione a tre ruote che offre equilibrio e sicurezza superiori.

Autonomia fino a 50 km  -  Batteria da 60V 20Ah per coprire le esigenze quotidiane.

Comfort ergonomico  -  Sedile regolabile, braccioli imbottiti, controlli facili da usare.

Sicurezza  -  Freni a disco, luci LED, specchietti retrovisori.

 Caratteristiche principali:

Sedile girevole e regolabile
Braccioli imbottiti ribaltabili
Cestino portaoggetti anteriore
Freni a disco anteriore e posteriore
Luci LED e frecce direzionali
Specchietti retrovisori
Display digitale
Clacson`,
		optionalFeatures: [
			'Braccioli Imbottiti',
			'Caricabatterie Incluso',
			'Cestino Portaoggetti',
			'Clacson',
			'Display Digitale',
			'Freni A Disco',
			'Frecce Direzionali',
			'Luci LED',
			'Sedile Girevole',
			'Specchietti Retrovisori'
		],
		primaryColor: 'teal',
		badgeColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200',
		isNew: true
	},

	'mob50': {
		id: 'mob50',
		name: 'MOB50 - Cabinato Elettrico Per Disabili',
		model: 'MOB50',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24602',
		category: 'Mobilità Disabili',
		categorySlug: 'mobilita-disabili',
		categoryHref: '/mobilita-disabili',
		images: ['/images/mob50-disabili.jpg'],
		specs: {
			batteria: 'Piombo 60V - 58AH',
			autonomia: '60-70 KM',
			tempoRicarica: '8-10 Ore',
			ruote: '12"',
			potenza: '1.200W',
			velocitaMassima: '20KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio con Cabina',
			freni: 'A Disco',
			pendenza: '15%',
			peso: '180 KG',
			capacitaCarico: '150 KG'
		},
		description: `## MOB50 - Cabinato Elettrico Per Disabili

Protezione totale e massimo comfort in ogni condizione.

Il MOB50 è il cabinato elettrico che offre protezione completa dagli agenti atmosferici mantenendo autonomia e indipendenza. Perfetto per chi cerca il massimo comfort senza rinunciare alla mobilità personale.

 Perché scegliere il MOB50?

Cabina chiusa  -  Protezione totale da pioggia, vento e freddo per muoversi in ogni stagione.

Autonomia fino a 70 km  -  Batteria ad alta capacità da 60V 58Ah per lunghe percorrenze.

Potenza 1200W  -  Prestazioni elevate per affrontare pendenze fino al 15%.

Comfort premium  -  Sedile ergonomico, aria calda, vetri panoramici, spazio interno confortevole.

Sicurezza  -  Freni a disco, luci LED, specchietti retrovisori, tergicristallo.

 Caratteristiche principali:

Cabina chiusa con porta
Aria calda integrata
Vetri panoramici
Tergicristallo anteriore
Sedile regolabile
Freni a disco
Luci LED complete
Specchietti retrovisori
Display digitale`,
		optionalFeatures: [
			'Aria Calda',
			'Cabina Chiusa',
			'Caricabatterie Incluso',
			'Display Digitale',
			'Freni A Disco',
			'Luci LED',
			'Sedile Regolabile',
			'Specchietti',
			'Tergicristallo',
			'Vetri Panoramici'
		],
		primaryColor: 'teal',
		badgeColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200',
		isNew: true
	},

	'mob26': {
		id: 'mob26',
		name: 'MOB26 - Cabinato Elettrico Per Disabili',
		model: 'MOB26',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24603',
		category: 'Mobilità Disabili',
		categorySlug: 'mobilita-disabili',
		categoryHref: '/mobilita-disabili',
		images: ['/images/mob26-disabili.jpg'],
		specs: {
			batteria: 'Piombo 60V - 50AH',
			autonomia: '55-65 KM',
			tempoRicarica: '8-10 Ore',
			ruote: '12"',
			potenza: '1.500W',
			velocitaMassima: '20KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio con Cabina',
			freni: 'A Disco',
			pendenza: '18%',
			peso: '175 KG',
			capacitaCarico: '150 KG'
		},
		description: `## MOB26 - Cabinato Elettrico Per Disabili

Potenza e protezione per la massima libertà.

Il MOB26 è il cabinato elettrico ad alte prestazioni, con motore potenziato da 1500W per affrontare pendenze importanti mantenendo comfort e protezione completa.

 Perché scegliere il MOB26?

Potenza 1500W  -  Il più potente della categoria per affrontare pendenze fino al 18%.

Cabina protettiva  -  Protezione completa dagli agenti atmosferici con aria calda integrata.

Autonomia 55-65 km  -  Batteria da 60V 50Ah per coprire le esigenze quotidiane.

Prestazioni superiori  -  Ideale per chi vive in zone collinari o necessita di prestazioni elevate.

Comfort totale  -  Sedile ergonomico, spazio interno confortevole, controlli intuitivi.

 Caratteristiche principali:

Motore potenziato 1500W
Cabina chiusa con porta
Aria calda
Vetri panoramici
Tergicristallo
Sedile ergonomico
Freni a disco
Luci LED`,
		optionalFeatures: [
			'Aria Calda',
			'Cabina Chiusa',
			'Caricabatterie',
			'Freni A Disco',
			'Luci LED',
			'Motore 1500W',
			'Sedile Ergonomico',
			'Tergicristallo',
			'Vetri Panoramici'
		],
		primaryColor: 'teal',
		badgeColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200'
	},

	'mob20': {
		id: 'mob20',
		name: 'MOB20 - Cabinato Elettrico Per Disabili',
		model: 'MOB20',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24604',
		category: 'Mobilità Disabili',
		categorySlug: 'mobilita-disabili',
		categoryHref: '/mobilita-disabili',
		images: ['/images/mob20-disabili.jpg'],
		specs: {
			batteria: 'Piombo 60V - 58AH',
			autonomia: '60-70 KM',
			tempoRicarica: '8-10 Ore',
			ruote: '12"',
			potenza: '1.500W',
			velocitaMassima: '20KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio con Cabina',
			freni: 'A Disco',
			pendenza: '18%',
			peso: '185 KG',
			capacitaCarico: '150 KG'
		},
		description: `## MOB20 - Cabinato Elettrico Per Disabili

Il top di gamma per autonomia e prestazioni.

Il MOB20 combina la potenza del motore da 1500W con l'autonomia della batteria da 58Ah, offrendo il massimo delle prestazioni in un cabinato elettrico per disabili.

 Perché scegliere il MOB20?

Massima autonomia  -  Fino a 70 km con batteria da 60V 58Ah.

Potenza 1500W  -  Prestazioni elevate per ogni tipo di percorso.

Cabina comfort  -  Protezione completa con aria calda, vetri panoramici, sedile ergonomico.

Affidabilità  -  Costruzione robusta e componenti di qualità per lunga durata.

Versatilità  -  Perfetto per uso quotidiano urbano ed extraurbano.

 Caratteristiche principali:

Autonomia fino a 70 km
Motore 1500W
Cabina chiusa
Aria calda
Vetri panoramici
Tergicristallo
Sedile comfort
Freni a disco`,
		optionalFeatures: [
			'Aria Calda',
			'Cabina Chiusa',
			'Caricabatterie',
			'Freni A Disco',
			'Luci LED',
			'Motore 1500W',
			'Sedile Comfort',
			'Tergicristallo',
			'Vetri Panoramici'
		],
		primaryColor: 'teal',
		badgeColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200'
	},

	'mob30a': {
		id: 'mob30a',
		name: 'MOB30A - Cabinato Elettrico Per Disabili',
		model: 'MOB30A',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24605',
		category: 'Mobilità Disabili',
		categorySlug: 'mobilita-disabili',
		categoryHref: '/mobilita-disabili',
		images: ['/images/mob30a-disabili.jpg'],
		specs: {
			batteria: 'Piombo 60V - 45AH',
			autonomia: '50-60 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '12"',
			potenza: '1.200W',
			velocitaMassima: '20KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio con Cabina',
			freni: 'A Disco',
			pendenza: '15%',
			peso: '170 KG',
			capacitaCarico: '150 KG'
		},
		description: `## MOB30A - Cabinato Elettrico Per Disabili

Design moderno e protezione completa.

Il MOB30A è il cabinato elettrico dal design moderno e accattivante, perfetto per chi cerca stile senza rinunciare a protezione e comfort.

 Perché scegliere il MOB30A?

Design moderno  -  Linee contemporanee e estetica curata per un look distintivo.

Cabina protettiva  -  Protezione completa dagli agenti atmosferici con aria calda.

Autonomia 50-60 km  -  Batteria da 60V 45Ah per le esigenze quotidiane.

Comfort  -  Sedile ergonomico, spazio interno confortevole, controlli intuitivi.

Praticità  -  Facile da guidare e parcheggiare, ideale per uso urbano.

 Caratteristiche principali:

Design moderno
Cabina chiusa
Aria calda
Vetri panoramici
Sedile ergonomico
Freni a disco
Luci LED`,
		optionalFeatures: [
			'Aria Calda',
			'Cabina Chiusa',
			'Caricabatterie',
			'Design Moderno',
			'Freni A Disco',
			'Luci LED',
			'Sedile Ergonomico',
			'Vetri Panoramici'
		],
		primaryColor: 'teal',
		badgeColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200'
	},

	'dk02': {
		id: 'dk02',
		name: 'DK02 - Scooter Elettrico Per Disabili Quattro Ruote',
		model: 'DK02',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24606',
		category: 'Mobilità Disabili',
		categorySlug: 'mobilita-disabili',
		categoryHref: '/mobilita-disabili',
		images: ['/images/dk02-disabili.jpg'],
		specs: {
			batteria: 'Piombo 48V - 20AH',
			autonomia: '35-45 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '10"',
			potenza: '500W',
			velocitaMassima: '20KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio',
			freni: 'A Tamburo',
			pendenza: '10%',
			peso: '85 KG',
			capacitaCarico: '130 KG'
		},
		description: `## DK02 - Scooter Elettrico Per Disabili Quattro Ruote

Massima stabilità con quattro ruote.

Il DK02 è lo scooter a quattro ruote che offre la massima stabilità e sicurezza, ideale per chi cerca un mezzo affidabile per gli spostamenti quotidiani.

 Perché scegliere il DK02?

Quattro ruote  -  Massima stabilità e sicurezza, perfetto per chi ha bisogno di maggiore equilibrio.

Facile da usare  -  Controlli intuitivi e guida semplice per tutti.

Autonomia affidabile  -  Fino a 45 km con batteria da 48V 20Ah.

Comfort  -  Sedile imbottito, braccioli, cestino portaoggetti.

Economico  -  Prezzo accessibile e bassi costi di gestione.

 Caratteristiche principali:

Quattro ruote per massima stabilità
Sedile girevole
Braccioli imbottiti
Cestino portaoggetti
Luci LED
Specchietti`,
		optionalFeatures: [
			'Braccioli Imbottiti',
			'Caricabatterie',
			'Cestino Portaoggetti',
			'Luci LED',
			'Quattro Ruote',
			'Sedile Girevole',
			'Specchietti'
		],
		primaryColor: 'teal',
		badgeColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200'
	},

	'dk01': {
		id: 'dk01',
		name: 'DK01 - Scooter Elettrico Per Disabili Tre Ruote',
		model: 'DK01',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24607',
		category: 'Mobilità Disabili',
		categorySlug: 'mobilita-disabili',
		categoryHref: '/mobilita-disabili',
		images: ['/images/dk01-disabili.jpg'],
		specs: {
			batteria: 'Piombo 48V - 20AH',
			autonomia: '35-45 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '10"',
			potenza: '500W',
			velocitaMassima: '20KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio',
			freni: 'A Tamburo',
			pendenza: '10%',
			peso: '80 KG',
			capacitaCarico: '130 KG'
		},
		description: `## DK01 - Scooter Elettrico Per Disabili Tre Ruote

Compatto e maneggevole per uso quotidiano.

Il DK01 è lo scooter a tre ruote compatto perfetto per chi cerca un mezzo agile e facile da usare per gli spostamenti in spazi ristretti.

 Perché scegliere il DK01?

Compatto  -  Dimensioni ridotte per facilità di manovra e parcheggio.

Tre ruote  -  Buon compromesso tra stabilità e manovrabilità.

Autonomia adeguata  -  Fino a 45 km per coprire le esigenze quotidiane.

Facile da usare  -  Controlli semplici e intuitivi.

Economico  -  Prezzo accessibile e gestione economica.

 Caratteristiche principali:

Design compatto
Tre ruote stabili
Sedile imbottito
Cestino anteriore
Luci LED
Facile da guidare`,
		optionalFeatures: [
			'Caricabatterie',
			'Cestino Anteriore',
			'Design Compatto',
			'Luci LED',
			'Sedile Imbottito',
			'Tre Ruote'
		],
		primaryColor: 'teal',
		badgeColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200'
	},

	'mob01': {
		id: 'mob01',
		name: 'MOB01 - Scooter Elettrico Per Disabili Tre Ruote',
		model: 'MOB01',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24608',
		category: 'Mobilità Disabili',
		categorySlug: 'mobilita-disabili',
		categoryHref: '/mobilita-disabili',
		images: ['/images/mob01-disabili.jpg'],
		specs: {
			batteria: 'Piombo 60V - 20AH',
			autonomia: '40-50 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '10"',
			potenza: '500W',
			velocitaMassima: '20KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio',
			freni: 'A Tamburo',
			pendenza: '10%',
			peso: '82 KG',
			capacitaCarico: '130 KG'
		},
		description: `## MOB01 - Scooter Elettrico Per Disabili Tre Ruote

Affidabilità e comfort per la mobilità quotidiana.

Il MOB01 è lo scooter a tre ruote affidabile e confortevole, perfetto per chi cerca un mezzo solido e ben equipaggiato per gli spostamenti quotidiani.

 Perché scegliere il MOB01?

Batteria 60V  -  Tensione superiore per prestazioni migliori rispetto ai modelli 48V.

Comfort  -  Sedile ergonomico imbottito per lunghi tragitti.

Autonomia 40-50 km  -  Sufficiente per le esigenze quotidiane.

Affidabile  -  Costruzione solida e componenti di qualità.

Ben equipaggiato  -  Luci, cestino, specchietti e tutti i comfort necessari.

 Caratteristiche principali:

Batteria 60V
Sedile ergonomico
Cestino portaoggetti
Luci LED
Specchietti
Tre ruote stabili`,
		optionalFeatures: [
			'Batteria 60V',
			'Caricabatterie',
			'Cestino Portaoggetti',
			'Luci LED',
			'Sedile Ergonomico',
			'Specchietti',
			'Tre Ruote'
		],
		primaryColor: 'teal',
		badgeColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200'
	},

	'mob02': {
		id: 'mob02',
		name: 'MOB02 - Scooter Elettrico Per Disabili Quattro Ruote',
		model: 'MOB02',
		brand: 'Vitale',
		year: '2025',
		productCode: '#24609',
		category: 'Mobilità Disabili',
		categorySlug: 'mobilita-disabili',
		categoryHref: '/mobilita-disabili',
		images: ['/images/mob02-disabili.jpg'],
		specs: {
			batteria: 'Piombo 60V - 20AH',
			autonomia: '40-50 KM',
			tempoRicarica: '6-8 Ore',
			ruote: '10"',
			potenza: '500W',
			velocitaMassima: '20KM/H',
			trazione: 'Ruota Posteriore',
			telaio: 'Acciaio',
			freni: 'A Tamburo',
			pendenza: '10%',
			peso: '88 KG',
			capacitaCarico: '130 KG'
		},
		description: `## MOB02 - Scooter Elettrico Per Disabili Quattro Ruote

Massima stabilità e comfort superiore.

Il MOB02 combina la stabilità delle quattro ruote con la batteria da 60V per prestazioni superiori, comfort e affidabilità.

 Perché scegliere il MOB02?

Quattro ruote  -  Massima stabilità per sicurezza e tranquillità.

Batteria 60V  -  Prestazioni migliori rispetto ai modelli 48V standard.

Comfort  -  Sedile ergonomico imbottito, braccioli, spazio abbondante.

Autonomia 40-50 km  -  Adeguata per tutte le esigenze quotidiane.

Sicuro e affidabile  -  Costruzione robusta e stabile per massima sicurezza.

 Caratteristiche principali:

Quattro ruote per massima stabilità
Batteria 60V
Sedile ergonomico imbottito
Braccioli regolabili
Cestino portaoggetti
Luci LED
Specchietti`,
		optionalFeatures: [
			'Batteria 60V',
			'Braccioli Regolabili',
			'Caricabatterie',
			'Cestino Portaoggetti',
			'Luci LED',
			'Quattro Ruote',
			'Sedile Ergonomico',
			'Specchietti'
		],
		primaryColor: 'teal',
		badgeColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200'
	}
}

// Funzione helper per ottenere veicoli correlati
export function getRelatedVehicles(vehicleId: string, limit: number = 3): Vehicle[] {
	const currentVehicle = vehicles[vehicleId]
	if (!currentVehicle) return []

	// Filtra veicoli della stessa categoria (escluso quello corrente)
	const relatedByCategory = Object.values(vehicles).filter(
		v => v.categorySlug === currentVehicle.categorySlug && v.id !== vehicleId
	)

	// Se non ci sono abbastanza veicoli nella stessa categoria, aggiungi altri veicoli
	if (relatedByCategory.length < limit) {
		const otherVehicles = Object.values(vehicles).filter(
			v => v.categorySlug !== currentVehicle.categorySlug && !relatedByCategory.find(r => r.id === v.id)
		)
		return [...relatedByCategory, ...otherVehicles].slice(0, limit)
	}

	return relatedByCategory.slice(0, limit)
}

// Funzione per ottenere tutti i veicoli di una categoria
export function getVehiclesByCategory(categorySlug: string): Vehicle[] {
	return Object.values(vehicles).filter(v => v.categorySlug === categorySlug)
}

// Funzione per ottenere tutti gli slug dei veicoli (per generazione statica)
export function getAllVehicleSlugs(): string[] {
	return Object.keys(vehicles)
}

