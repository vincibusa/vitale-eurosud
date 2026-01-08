import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Facebook,
	Instagram,
	Youtube,
	Phone,
	Mail,
	MapPin,
	Clock,
	Send
} from 'lucide-react'

function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="bg-gray-900 text-white">
			{/* Main footer content - 6 columns */}
			<div className="container mx-auto px-4 py-12 md:py-16">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
					{/* Column 1: Brand */}
					<div className="sm:col-span-2 lg:col-span-1">
						<Link href="/" className="inline-block mb-4">
							<Image
								src="/images/vitale-logo.png"
								alt="Vitale Logo Footer"
								width={140}
								height={45}
								className="h-8 w-auto invert"
							/>
						</Link>
						<p className="text-sm text-gray-400 mb-4 leading-relaxed">
							Leader nella fornitura di veicoli elettrici di qualità superiore per una mobilità sostenibile.
						</p>
						<div className="flex items-start gap-2 text-sm text-gray-400">
							<MapPin size={16} strokeWidth={1.5} className="mt-0.5 text-brand-light flex-shrink-0" />
							<span>Via Messina Montagne, 6<br />90121 Palermo (PA)</span>
						</div>
					</div>

					{/* Column 2: Contatti */}
					<div className="lg:col-span-1">
						<h3 className="text-base font-semibold mb-4 text-white">Contatti</h3>
						<div className="space-y-3">
							<a
								href="tel:0916145377"
								className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-light transition-colors"
							>
								<Phone size={14} strokeWidth={1.5} className="flex-shrink-0" />
								<span>0916145377</span>
							</a>
							<a
								href="mailto:info@vitale-eu.it"
								className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-light transition-colors"
							>
								<Mail size={14} strokeWidth={1.5} className="flex-shrink-0" />
								<span className="break-words">info@vitale-eu.it</span>
							</a>
							<div className="flex items-center gap-2 text-sm text-gray-400">
								<Phone size={14} strokeWidth={1.5} className="flex-shrink-0" />
								<span>Fax: 0916145372</span>
							</div>
							<div className="pt-2 border-t border-gray-800">
								<div className="flex items-start gap-2 text-xs text-gray-500">
									<Clock size={14} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
									<div>
										<p>Lun-Ven: 09:00-13:00<br />15:30-19:00</p>
										<p>Sab: 09:00-13:00</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Column 3: Veicoli */}
					<div className="lg:col-span-1">
						<h3 className="text-base font-semibold mb-4 text-white">Veicoli</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/biciclette"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Biciclette Elettriche
								</Link>
							</li>
							<li>
								<Link
									href="/monopattini"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Monopattini
								</Link>
							</li>
							<li>
								<Link
									href="/scooter"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Scooter Elettrici
								</Link>
							</li>
							<li>
								<Link
									href="/minicar"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Minicar
								</Link>
							</li>
							<li>
								<Link
									href="/quad"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Quad Elettrici
								</Link>
							</li>
							<li>
								<Link
									href="/veicoli-commerciali"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Veicoli Commerciali
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 4: Servizi */}
					<div className="lg:col-span-1">
						<h3 className="text-base font-semibold mb-4 text-white">Servizi</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/contatti"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Assistenza e Manutenzione
								</Link>
							</li>
							<li>
								<Link
									href="/contatti"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Ricambi Originali
								</Link>
							</li>
							<li>
								<Link
									href="/contatti"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Garanzie
								</Link>
							</li>
							<li>
								<Link
									href="/contatti"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Ecobonus e Incentivi
								</Link>
							</li>
							<li>
								<Link
									href="/mobilita-disabili"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Mobilità Disabili
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 5: Azienda */}
					<div className="lg:col-span-1">
						<h3 className="text-base font-semibold mb-4 text-white">Azienda</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/contatti"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Chi Siamo
								</Link>
							</li>
							<li>
								<Link
									href="/contatti"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Diventa Partner
								</Link>
							</li>
							<li>
								<Link
									href="/contatti"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Lavora con Noi
								</Link>
							</li>
							<li>
								<Link
									href="/contatti"
									className="text-sm text-gray-400 hover:text-brand-light transition-colors inline-block"
								>
									Contatti
								</Link>
							</li>
							<li>
								<p className="text-xs text-gray-500 pt-2">
									EUROSUD S.R.L.<br />
									PIVA 04165720824
								</p>
							</li>
						</ul>
					</div>

					{/* Column 6: Social & Newsletter */}
					<div className="lg:col-span-1">
						<h3 className="text-base font-semibold mb-4 text-white">Seguici</h3>
						<div className="flex gap-3 mb-6">
							<Link
								href="https://www.facebook.com/vitalescooter/"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-none bg-gray-800 hover:bg-brand flex items-center justify-center transition-colors duration-300"
								aria-label="Facebook"
							>
								<Facebook size={18} strokeWidth={1.5} />
							</Link>
							<Link
								href="https://www.instagram.com/vitale_eu/"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-none bg-gray-800 hover:bg-brand flex items-center justify-center transition-colors duration-300"
								aria-label="Instagram"
							>
								<Instagram size={18} strokeWidth={1.5} />
							</Link>
							<Link
								href="#"
								className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand flex items-center justify-center transition-colors duration-300 opacity-50 cursor-not-allowed"
								aria-label="YouTube"
							>
								<Youtube size={18} strokeWidth={1.5} />
							</Link>
						</div>

						<div>
							<h4 className="text-sm font-semibold mb-2 text-white">Newsletter</h4>
							<p className="text-xs text-gray-400 mb-3">
								Iscriviti per ricevere offerte e novità
							</p>
							<form className="flex gap-2">
								<Input
									type="email"
									placeholder="La tua email"
									className="h-9 text-sm bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-brand"
								/>
								<Button
									type="submit"
									size="icon"
									className="h-9 w-9 bg-brand hover:bg-brand-dark flex-shrink-0"
								>
									<Send size={16} strokeWidth={1.5} />
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>

			<Separator className="bg-gray-800" />

			{/* Bottom bar */}
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
					{/* Copyright */}
					<div className="text-center md:text-left">
						<p>© {currentYear} Vitale - Tutti i diritti riservati</p>
						<p className="text-xs mt-1">
							<strong>VITALE</strong> è un marchio registrato al Ministero dello Sviluppo Economico
						</p>
					</div>

					{/* Legal links */}
					<div className="flex flex-wrap justify-center gap-4 text-xs">
						<Link href="#" className="hover:text-brand-light transition-colors">
							Privacy Policy
						</Link>
						<span className="text-gray-700">•</span>
						<Link href="#" className="hover:text-brand-light transition-colors">
							Cookie Policy
						</Link>
						<span className="text-gray-700">•</span>
						<Link href="#" className="hover:text-brand-light transition-colors">
							Termini e Condizioni
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
