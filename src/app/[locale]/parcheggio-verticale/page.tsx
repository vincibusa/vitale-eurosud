import Image from 'next/image'
import {
	Building2,
	Clock3,
	ShieldCheck,
	Sparkles,
	Zap,
	Phone,
	Ruler,
	Settings,
	Shield
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const revalidate = 3600

const benefits = [
	{
		title: 'Massima ottimizzazione spazi',
		description: 'Aumenta i posti auto disponibili riducendo l\'ingombro a terra in aree urbane e private.',
		icon: Building2
	},
	{
		title: 'Installazione rapida',
		description: 'Progetto modulare con tempi di implementazione ridotti e integrazione semplificata.',
		icon: Clock3
	},
	{
		title: 'Sicurezza operativa',
		description: 'Sistemi di controllo e protezione dedicati per cicli di utilizzo frequenti e affidabili.',
		icon: ShieldCheck
	},
	{
		title: 'Esperienza premium',
		description: 'Soluzione ideale per hotel, residenze, retail e strutture corporate con standard elevati.',
		icon: Sparkles
	}
]

const quickSpecs = [
	{ label: 'Capacita indicativa', value: 'Fino a 10+ auto', icon: Building2 },
	{ label: 'Ingombro ridotto', value: 'Sviluppo verticale', icon: Ruler },
	{ label: 'Gestione accessi', value: 'Controllo automatizzato', icon: Settings },
	{ label: 'Sicurezza impianto', value: 'Protezioni multilivello', icon: Shield }
]

export default function ParcheggioVerticalePage() {
	return (
		<div className="w-full min-h-screen bg-white pt-20 md:pt-24">
			<section className="relative bg-gradient-to-b from-gray-50 to-white">
				<div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
					<div className="container mx-auto px-4 py-3">
						<nav className="flex items-center gap-2 text-sm text-gray-500">
							<Link href="/" className="hover:text-gray-900 transition-colors">
								Home
							</Link>
							<span>/</span>
							<Link href="/catalogo-veicoli" className="hover:text-gray-900 transition-colors">
								Catalogo
							</Link>
							<span>/</span>
							<span className="text-gray-900 font-medium">Parcheggio verticale</span>
						</nav>
					</div>
				</div>

				<div className="container mx-auto px-4 pt-16 pb-12 md:pb-16">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
						<div className="lg:col-span-8">
							<div className="relative aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
								<Image
									src="/parcheggio-verticale.png"
									alt="Parcheggio verticale automatico"
									fill
									priority
									sizes="(max-width: 1024px) 100vw, 66vw"
									className="object-cover"
								/>
								<div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 text-sm font-medium backdrop-blur-sm">
									Soluzione infrastrutturale premium
								</div>
							</div>

							<div className="mt-6 bg-white border border-gray-100 p-6 md:p-8">
								<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
									Ottimizzazione intelligente della sosta
								</h2>
								<p className="text-gray-700 leading-relaxed">
									Il sistema di parcheggio verticale e pensato per aumentare la capacita disponibile in aree con
									spazio limitato, mantenendo fluidita operativa, sicurezza e una user experience moderna.
								</p>
							</div>
						</div>

						<div className="lg:col-span-4">
							<div className="lg:sticky lg:top-24 bg-white shadow-xl border border-gray-100 overflow-hidden">
								<div className="p-6 border-b border-gray-100">
									<Badge className="bg-brand/10 text-brand text-xs mb-3">Linea Infrastrutture</Badge>
									<h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-2">
										Parcheggio verticale
									</h1>
									<p className="text-gray-500">Configurazione su misura per siti pubblici e privati</p>
								</div>

								<div className="p-6 border-b border-gray-100">
									<h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
										Specifiche rapide
									</h3>
									<div className="grid grid-cols-2 gap-4">
										{quickSpecs.map((item) => {
											const Icon = item.icon
											return (
												<div key={item.label} className="text-center p-3 bg-gray-50">
													<Icon size={20} strokeWidth={1.5} className="mx-auto mb-2 text-brand" />
													<p className="text-xs text-gray-500 mb-1">{item.label}</p>
													<p className="font-bold text-gray-900 text-xs md:text-sm">{item.value}</p>
												</div>
											)
										})}
									</div>
								</div>

								<div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
									<p className="text-sm text-gray-600">
										<span className="text-gray-400">Codice soluzione:</span>{' '}
										<span className="font-mono font-medium text-gray-900">PARK-VRT-01</span>
									</p>
									<p className="text-xs text-gray-500 mt-2">
										Dimensionamento, layout e accessi sono personalizzabili in base al sito.
									</p>
								</div>

								<div className="p-6 space-y-3">
									<Link href="/contatti">
										<Button
											size="lg"
											className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-6 text-base shadow-md hover:shadow-lg transition-all"
										>
											Richiedi preventivo
										</Button>
									</Link>
									<Button
										size="lg"
										variant="outline"
										className="w-full border-2 border-brand text-brand hover:bg-brand/5 font-semibold py-5"
										asChild
									>
										<a href="tel:0916145377">
											<Phone size={18} strokeWidth={1.5} className="mr-2" />
											Chiama 091 614 5377
										</a>
									</Button>
									<Link href="/rivenditori">
										<Button
											size="lg"
											variant="outline"
											className="w-full border-2 border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold py-5"
										>
											Diventa partner
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{benefits.map((benefit) => {
							const Icon = benefit.icon
							return (
								<div key={benefit.title} className="bg-gray-50 border border-gray-100 p-5">
									<div className="flex items-center gap-3 mb-4">
										<div className="p-2 bg-white text-brand border border-gray-200">
											<Icon size={20} />
										</div>
										<h3 className="font-semibold text-gray-900">{benefit.title}</h3>
									</div>
									<p className="text-sm text-gray-700">{benefit.description}</p>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			<section className="py-12 md:py-16 border-t border-gray-200">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Specifiche tecniche indicative
							</h2>
							<p className="text-gray-700 mb-6">
								La configurazione finale dipende dalla geometria del sito, dai volumi di traffico e dai requisiti
								di accesso. Il team tecnico definisce la soluzione migliore in fase di analisi preliminare.
							</p>
							<ul className="space-y-3 text-gray-700">
								<li className="flex items-start gap-3">
									<Zap size={18} className="text-brand mt-0.5 flex-shrink-0" />
									<span>Controllo automatico dei cicli di sollevamento e posizionamento</span>
								</li>
								<li className="flex items-start gap-3">
									<Shield size={18} className="text-brand mt-0.5 flex-shrink-0" />
									<span>Sistemi di blocco e protezione per ogni livello di stoccaggio</span>
								</li>
								<li className="flex items-start gap-3">
									<Ruler size={18} className="text-brand mt-0.5 flex-shrink-0" />
									<span>Moduli espandibili in altezza e in capacita operativa</span>
								</li>
							</ul>
						</div>

						<div className="bg-white border border-gray-100 p-6 md:p-8">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Progetto su misura</h3>
							<p className="text-gray-700 mb-8">
								Dalla valutazione iniziale fino alla messa in esercizio, offriamo supporto commerciale e tecnico
								per integrare il parcheggio verticale nel tuo contesto operativo.
							</p>
							<div className="flex flex-col gap-3 sm:flex-row">
								<Link href="/contatti">
									<Button
										size="lg"
										className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 h-14 min-w-[220px]"
									>
										Parla con un consulente
									</Button>
								</Link>
								<Link href="/catalogo-veicoli">
									<Button
										size="lg"
										variant="outline"
										className="border-2 border-neutral-900 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-white font-semibold px-8 h-14 min-w-[220px]"
									>
										Torna al catalogo
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
