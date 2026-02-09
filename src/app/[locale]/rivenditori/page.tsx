'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Mail, MapPin, Phone } from 'lucide-react'

const fadeInUp = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function RivenditoriPage() {
	return (
		<div className="w-full pt-20 md:pt-24">
			<section className="bg-white py-16 md:py-24 border-b border-gray-200">
				<div className="container mx-auto px-4">
					<motion.div className="max-w-3xl text-gray-900" initial="hidden" animate="visible" variants={fadeInUp}>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
							Sei un rivenditore?
						</h1>
						<p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl">
							Vitale ti offre un&apos;opportunità unica di collaborazione: entra a far parte della nostra rete,
							promuovi i tuoi veicoli su una piattaforma di fiducia e raggiungi nuovi clienti interessati a
							soluzioni di mobilità innovativa.
							<span className="block mt-3 font-bold">
								Unisciti a noi per far crescere il tuo business con supporto, visibilità e prefossionalità!
							</span>
						</p>
					</motion.div>
				</div>
			</section>

			<section className="py-12 md:py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<motion.div
							className="lg:col-span-2"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={fadeInUp}
						>
							<Card className="border border-gray-200">
								<CardHeader>
									<CardTitle className="text-2xl text-gray-900">Vuoi saperne di più?</CardTitle>
									<p className="text-gray-600">
										Contattaci per ricevere informazioni dettagliate o richiedi il preventivo su misura per te.
									</p>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
												<input id="nome" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
											</div>
											<div>
												<label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-2">Cognome</label>
												<input id="cognome" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
												<input id="email" type="email" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
											</div>
											<div>
												<label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
												<input id="telefono" type="tel" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label htmlFor="ragione-sociale" className="block text-sm font-medium text-gray-700 mb-2">Reg. sociale</label>
												<input id="ragione-sociale" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
											</div>
											<div>
												<label htmlFor="piva" className="block text-sm font-medium text-gray-700 mb-2">P.IVA</label>
												<input id="piva" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
											</div>
										</div>

										<div>
											<label htmlFor="comune" className="block text-sm font-medium text-gray-700 mb-2">Comune</label>
											<input id="comune" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
										</div>

										<div>
											<label htmlFor="messaggio" className="block text-sm font-medium text-gray-700 mb-2">Messaggio</label>
											<textarea
												id="messaggio"
												rows={5}
												className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand"
											/>
										</div>

										<div className="flex items-start gap-2">
											<input id="privacy" type="checkbox" className="mt-1" required />
											<label htmlFor="privacy" className="text-sm text-gray-600">
												Accetto l&apos;informativa sulla{' '}
												<Link href="/privacy-policy" className="text-brand hover:text-brand-dark underline">
													privacy policy
												</Link>
												.
											</label>
										</div>

										<Button type="submit" size="lg" className="w-full bg-brand hover:bg-brand-dark text-white font-semibold">
											Invia
										</Button>
									</form>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
							<Card className="border border-gray-200">
								<CardHeader>
									<CardTitle className="text-xl text-gray-900">Recapiti</CardTitle>
								</CardHeader>
								<CardContent className="space-y-5">
									<div className="flex items-start gap-3">
										<MapPin className="text-brand mt-0.5" size={20} />
										<div>
											<p className="font-medium text-gray-900">Via Messina Montagne, 6</p>
											<p className="text-sm text-gray-600">90121 Palermo (PA)</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Phone className="text-brand" size={20} />
										<a href="tel:0916145377" className="text-gray-900 hover:text-brand transition-colors">
											091 6145377
										</a>
									</div>
									<div className="flex items-center gap-3">
										<Mail className="text-brand" size={20} />
										<a href="mailto:info@vitale-eu.it" className="text-gray-900 hover:text-brand transition-colors">
											info@vitale-eu.it
										</a>
									</div>
									<div className="flex items-start gap-3">
										<Building2 className="text-brand mt-0.5" size={20} />
										<div className="text-sm text-gray-600">
											<p><span className="font-medium text-gray-900">EUROSUD S.R.L.</span></p>
											<p>P.IVA 04165720824</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	)
}
