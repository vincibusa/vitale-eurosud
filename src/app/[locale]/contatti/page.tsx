'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Mail, MapPin, Phone } from 'lucide-react'

const fadeInUp = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

type ContactType = '' | 'rivenditore' | 'privato'

const exclusiveBenefits = [
	{
		iconSrc: '/immagini/Icone/VITALE_SITO WEB-01.png',
		title: 'Assistenza dedicata',
		description: 'Ti guidiamo nella scelta della soluzione più adatta.'
	},
	{
		iconSrc: '/immagini/Icone/VITALE_SITO WEB-03.png',
		title: 'Risposte rapide',
		description: 'Supporto tempestivo su richieste commerciali e tecniche.'
	},
	{
		iconSrc: '/immagini/Icone/VITALE_SITO WEB-04.png',
		title: 'Proposte su misura',
		description: 'Percorsi personalizzati in base alle tue esigenze reali.'
	}
]

export default function ContattiPage() {
	const [contactType, setContactType] = useState<ContactType>('')

	return (
		<div className="w-full pt-20 md:pt-24">
			<section className="bg-white py-16 md:py-24 border-b border-gray-200">
				<div className="container mx-auto px-4">
					<motion.div
						className="max-w-4xl text-gray-900"
						initial="hidden"
						animate="visible"
						variants={fadeInUp}
					>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
							Sempre connessi con Vitale
						</h1>
						<p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl">
							Desideriamo che la tua esperienza nel mondo Vitale sia sempre in linea con le tue esigenze.
							<span className="block">Siamo pronti per rispondere a ogni tua domanda.</span>
						</p>
					</motion.div>
				</div>
			</section>

			<section className="py-12 md:py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
						<motion.div
							className="xl:col-span-3"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={fadeInUp}
						>
							<Card className="border border-gray-200">
								<CardHeader>
									<CardTitle className="text-2xl font-bold text-gray-900">Contatti</CardTitle>
									<p className="text-gray-600">
										Compila i campi per inviare la tua richiesta. La proposta verrà inviata all&apos;indirizzo di riferimento.
									</p>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label htmlFor="tipo-cliente" className="block text-sm font-medium text-gray-700 mb-2">
													Tipo cliente
												</label>
												<select
													id="tipo-cliente"
													value={contactType}
													onChange={(e) => setContactType(e.target.value as ContactType)}
													className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand bg-white"
												>
													<option value="">Seleziona</option>
													<option value="rivenditore">Rivenditore</option>
													<option value="privato">Privato</option>
												</select>
											</div>
										</div>

										{contactType === 'rivenditore' && (
											<>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div>
														<label htmlFor="nome-riv" className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
														<input id="nome-riv" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
													<div>
														<label htmlFor="cognome-riv" className="block text-sm font-medium text-gray-700 mb-2">Cognome</label>
														<input id="cognome-riv" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
												</div>

												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div>
														<label htmlFor="email-riv" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
														<input id="email-riv" type="email" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
													<div>
														<label htmlFor="telefono-riv" className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
														<input id="telefono-riv" type="tel" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
												</div>

												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div>
														<label htmlFor="ragione-sociale-riv" className="block text-sm font-medium text-gray-700 mb-2">Reg. sociale</label>
														<input id="ragione-sociale-riv" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
													<div>
														<label htmlFor="piva-riv" className="block text-sm font-medium text-gray-700 mb-2">P.IVA</label>
														<input id="piva-riv" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
												</div>

												<div>
													<label htmlFor="comune-riv" className="block text-sm font-medium text-gray-700 mb-2">Comune</label>
													<input id="comune-riv" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
												</div>

												<div>
													<label htmlFor="messaggio-riv" className="block text-sm font-medium text-gray-700 mb-2">Messaggio</label>
													<textarea
														id="messaggio-riv"
														rows={5}
														className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand"
													/>
												</div>
											</>
										)}

										{contactType === 'privato' && (
											<>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div>
														<label htmlFor="nome-priv" className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
														<input id="nome-priv" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
													<div>
														<label htmlFor="cognome-priv" className="block text-sm font-medium text-gray-700 mb-2">Cognome</label>
														<input id="cognome-priv" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
												</div>

												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div>
														<label htmlFor="email-priv" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
														<input id="email-priv" type="email" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
													<div>
														<label htmlFor="telefono-priv" className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
														<input id="telefono-priv" type="tel" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
												</div>

												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div>
														<label htmlFor="citta-priv" className="block text-sm font-medium text-gray-700 mb-2">Città</label>
														<input id="citta-priv" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
													<div>
														<label htmlFor="cap-priv" className="block text-sm font-medium text-gray-700 mb-2">CAP</label>
														<input id="cap-priv" type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand" />
													</div>
												</div>
											</>
										)}

										{contactType !== '' && (
											<>
												<div className="flex items-start gap-2">
													<input id="privacy-contatti" type="checkbox" className="mt-1" required />
													<label htmlFor="privacy-contatti" className="text-sm text-gray-600">
														Accetto l&apos;informativa sulla{' '}
														<Link href="/privacy-policy" className="text-brand hover:text-brand-dark underline">
															privacy policy
														</Link>
														.
													</label>
												</div>

												<div className="flex justify-center md:justify-start">
													<Button
														type="submit"
														size="lg"
														className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 text-lg h-14 min-w-[200px] w-full sm:w-auto rounded-none transition-all"
													>
														Invia
													</Button>
												</div>
											</>
										)}
									</form>

									<div className="mt-8 pt-6 border-t border-gray-200">
										<p className="text-sm md:text-base font-light text-gray-600 mb-4">
											Vuoi una consulenza gratuita e senza impegno?
										</p>
										<Button
											asChild
											size="lg"
											className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 text-lg h-14 min-w-[200px] w-full sm:w-auto rounded-none transition-all"
										>
											<a href="tel:0916145377">Chiama ora</a>
										</Button>
									</div>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							className="xl:col-span-2"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={fadeInUp}
						>
							<div className="space-y-6">
								<Card className="border border-gray-200">
									<CardHeader>
										<CardTitle className="text-xl text-gray-900">Vantaggi esclusivi</CardTitle>
									</CardHeader>
									<CardContent className="space-y-5">
										{exclusiveBenefits.map((benefit, index) => (
											<div key={index} className="flex items-start gap-4">
												<div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden">
													<Image
														src={benefit.iconSrc}
														alt={benefit.title}
														width={80}
														height={80}
														className="w-12 h-12 md:w-14 md:h-14 object-contain"
													/>
												</div>
												<div>
													<h3 className="text-base md:text-lg font-light text-gray-900">{benefit.title}</h3>
													<p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
												</div>
											</div>
										))}
									</CardContent>
								</Card>

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
										<div className="pt-2 border-t border-gray-200 text-sm text-gray-600 space-y-1">
											<p><span className="font-semibold text-gray-900">Lun/Ven:</span> 09:00-13:00 / 15:30-19:00</p>
											<p><span className="font-semibold text-gray-900">Sabato:</span> 09:00-13:00</p>
											<p><span className="font-semibold text-gray-900">Domenica:</span> Chiusi</p>
										</div>
									</CardContent>
								</Card>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	)
}
