import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Facebook, Instagram, Phone, Mail, MapPin, Clock } from 'lucide-react'

function Footer() {
	return (
		<footer className="bg-gray-900 text-white">
			{/* Main footer content */}
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Orari di apertura */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold flex items-center gap-2">
							<Clock size={20} />
							Orari di apertura
						</h3>
						<div className="space-y-2 text-gray-300">
							<div className="flex justify-between">
								<span>Lun – Ven:</span>
								<span>09:00 – 13:00 / 15:30 – 19:00</span>
							</div>
							<div className="flex justify-between">
								<span>Sabato:</span>
								<span>09:00 – 13:00</span>
							</div>
							<div className="flex justify-between">
								<span>Domenica:</span>
								<span className="text-red-400">CHIUSO</span>
							</div>
						</div>
					</div>

					{/* Recapiti Commerciali */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Recapiti Commerciali</h3>
						<div className="space-y-3 text-gray-300">
							<div>
								<p className="font-medium">EUROSUD S.R.L.</p>
								<p className="text-sm">PIVA 04165720824</p>
							</div>
							<div className="flex items-start gap-2">
								<MapPin size={16} className="mt-1 text-orange-500 flex-shrink-0" />
								<span>Via Messina Montagne, 6, 90121 Palermo (PA)</span>
							</div>
							<div className="flex items-center gap-2">
								<Mail size={16} className="text-orange-500" />
								<a href="mailto:info@vitale-eu.it" className="hover:text-orange-500 transition-colors">
									info@vitale-eu.it
								</a>
							</div>
							<div className="flex items-center gap-2">
								<Phone size={16} className="text-orange-500" />
								<a href="tel:0916145377" className="hover:text-orange-500 transition-colors">
									0916145377
								</a>
							</div>
							<div className="text-sm">
								<span>Fax: 0916145372</span>
							</div>
						</div>
					</div>

					{/* Tutti i diritti riservati */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Tutti i diritti riservati</h3>
						<div className="space-y-3 text-gray-300 text-sm">
							<p>
								<strong>VITALE</strong> è un marchio registrato al ministero dello sviluppo economico.
							</p>
							<p>
								È vietata la riproduzione anche parziale. Informazioni e condizioni soggette a variazioni senza preavviso.
							</p>
						</div>
					</div>
				</div>
			</div>

			<Separator className="bg-gray-700" />

			{/* Bottom footer */}
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					{/* Logo */}
					<Link href="/" className="flex items-center">
						<Image
							src="/images/vitale-logo-small.png"
							alt="Vitale - Fornitura Veicoli Elettrici"
							width={165}
							height={39}
							className="h-8 w-auto brightness-0 invert"
						/>
					</Link>

					{/* Copyright */}
					<div className="text-sm text-gray-400">
						<span>R.S. 2023 🔐</span>
					</div>

					{/* Social Links */}
					<div className="flex items-center gap-4">
						<span className="text-sm text-gray-400">Seguici su</span>
						<div className="flex gap-3">
							<Link 
								href="https://www.facebook.com/vitalescooter/"
								className="text-gray-400 hover:text-orange-500 transition-colors"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Facebook size={20} />
							</Link>
							<Link 
								href="https://www.instagram.com/vitale_eu/"
								className="text-gray-400 hover:text-orange-500 transition-colors"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Instagram size={20} />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
