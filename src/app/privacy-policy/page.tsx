'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Shield } from 'lucide-react'

const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.2 }
	}
}

export default function PrivacyPolicyPage() {
	return (
		<div className="w-full">
			{/* Hero Section */}
			<section className="relative py-16 md:py-20 bg-gradient-to-r from-gray-700 to-gray-800 text-white">
				<div className="absolute inset-0 bg-black/10" />
				<div className="relative container mx-auto px-4">
					<motion.div 
						className="text-center max-w-3xl mx-auto"
						initial="hidden"
						animate="visible"
						variants={fadeInUp}
					>
						<div className="mx-auto mb-6 w-20 h-20 bg-white/20 rounded-none flex items-center justify-center">
							<Shield className="text-white" size={40} />
						</div>
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
							Informativa sulla Privacy
						</h1>
						<p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/95">
							La tua privacy è importante per noi. Scopri come trattiamo i tuoi dati personali.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Content Section */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
					>
						<Card className="p-6 md:p-8 max-w-4xl mx-auto">
							<CardContent className="px-0 pb-0 space-y-6 text-gray-700">
								<motion.section variants={fadeInUp}>
									<h2 className="text-2xl font-bold text-gray-900 mb-4">1. Titolare del Trattamento</h2>
									<p className="mb-4">
										Il Titolare del trattamento dei dati è <strong>EUROSUD S.R.L.</strong>, con sede legale in Via Messina Montagne, 6, 90121 Palermo (PA), P.IVA 04165720824.
									</p>
									<p>
										Per qualsiasi informazione relativa al trattamento dei dati personali, è possibile contattare il Titolare all'indirizzo email: <a href="mailto:info@vitale-eu.it" className="text-brand hover:underline">info@vitale-eu.it</a>
									</p>
								</motion.section>

								<motion.section variants={fadeInUp}>
									<h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dati Personali Raccolti</h2>
									<p className="mb-4">
										I dati personali raccolti attraverso il nostro sito web includono:
									</p>
									<ul className="list-disc list-inside space-y-2 ml-4">
										<li><strong>Dati di navigazione:</strong> Indirizzi IP, tipo di browser, sistema operativo, pagine visitate e timestamp.</li>
										<li><strong>Dati forniti volontariamente:</strong> Nome, cognome, indirizzo email, numero di telefono e qualsiasi altra informazione fornita tramite i moduli di contatto presenti sul sito.</li>
									</ul>
								</motion.section>

								<motion.section variants={fadeInUp}>
									<h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalità e Base Giuridica del Trattamento</h2>
									<p className="mb-4">
										I dati personali sono trattati per le seguenti finalità:
									</p>
									<ul className="list-disc list-inside space-y-2 ml-4">
										<li><strong>Gestione delle richieste:</strong> Rispondere a richieste di informazioni, preventivi o assistenza inviate tramite i moduli di contatto (base giuridica: esecuzione di misure precontrattuali su richiesta dell'interessato).</li>
										<li><strong>Adempimenti di legge:</strong> Rispetto degli obblighi normativi e fiscali (base giuridica: obbligo legale).</li>
										<li><strong>Miglioramento del servizio:</strong> Analisi statistiche anonime per migliorare l'esperienza utente sul sito (base giuridica: legittimo interesse del Titolare).</li>
										<li><strong>Marketing diretto:</strong> Invio di comunicazioni commerciali e newsletter, previo consenso esplicito (base giuridica: consenso dell'interessato).</li>
									</ul>
								</motion.section>

								<motion.section variants={fadeInUp}>
									<h2 className="text-2xl font-bold text-gray-900 mb-4">4. Modalità del Trattamento</h2>
									<p>
										Il trattamento dei dati personali è effettuato mediante strumenti informatici e/o telematici, con modalità organizzative e logiche strettamente correlate alle finalità indicate. I dati sono protetti mediante misure di sicurezza tecniche e organizzative adeguate a prevenire accessi non autorizzati, divulgazione, modifica o distruzione non autorizzata dei dati.
									</p>
								</motion.section>

								<motion.section variants={fadeInUp}>
									<h2 className="text-2xl font-bold text-gray-900 mb-4">5. Periodo di Conservazione</h2>
									<p className="mb-4">
										I dati personali saranno conservati per il tempo strettamente necessario al conseguimento delle finalità per cui sono stati raccolti:
									</p>
									<ul className="list-disc list-inside space-y-2 ml-4">
										<li>Dati di contatto: fino a 24 mesi dalla raccolta o fino alla revoca del consenso.</li>
										<li>Dati per adempimenti fiscali: 10 anni, in conformità alle normative vigenti.</li>
										<li>Dati di navigazione: massimo 7 giorni.</li>
									</ul>
								</motion.section>

								<motion.section variants={fadeInUp}>
									<h2 className="text-2xl font-bold text-gray-900 mb-4">6. Destinatari dei Dati</h2>
									<p className="mb-4">
										I dati personali potranno essere comunicati a:
									</p>
									<ul className="list-disc list-inside space-y-2 ml-4">
										<li>Fornitori di servizi IT e hosting del sito web, in qualità di Responsabili del trattamento.</li>
										<li>Consulenti fiscali e legali per adempimenti normativi.</li>
										<li>Autorità pubbliche, ove richiesto dalla legge.</li>
									</ul>
									<p className="mt-4">
										I dati non saranno diffusi a terzi non autorizzati senza il consenso esplicito dell'interessato.
									</p>
								</motion.section>

								<motion.section variants={fadeInUp}>
									<h2 className="text-2xl font-bold text-gray-900 mb-4">7. Trasferimento dei Dati</h2>
									<p>
										I dati personali sono trattati e conservati su server ubicati all'interno dell'Unione Europea. In caso di trasferimento dei dati al di fuori dell'UE, il Titolare garantisce l'adozione di adeguate garanzie contrattuali conformi al GDPR.
									</p>
								</motion.section>

								<motion.section variants={fadeInUp}>
									<h2 className="text-2xl font-bold text-gray-900 mb-4">8. Diritti dell'Interessato</h2>
									<p className="mb-4">
										In qualità di interessato, hai il diritto di:
									</p>
									<ul className="list-disc list-inside space-y-2 ml-4">
										<li>Accedere ai tuoi dati personali e ottenere una copia degli stessi.</li>
										<li>Richiedere la rettifica o l'aggiornamento dei dati inesatti.</li>
										<li>Richiedere la cancellazione dei dati (diritto all'oblio), salvo obblighi di legge.</li>
										<li>Richiedere la limitazione del trattamento dei dati.</li>
										<li>Opporti al trattamento dei dati per finalità di marketing.</li>
										<li>Revocare il consenso in qualsiasi momento, senza pregiudizio per la liceità del trattamento basato sul consenso prestato prima della revoca.</li>
										<li>Richiedere la portabilità dei dati in formato strutturato e leggibile.</li>
										<li>Proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali.</li>
									</ul>
									<p className="mt-4">
										Per esercitare i tuoi diritti, scrivi a: <a href="mailto:info@vitale-eu.it" className="text-brand hover:underline">info@vitale-eu.it</a>
									</p>
								</motion.section>

								<motion.section variants={fadeInUp}>
									<h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookie</h2>
									<p>
										Il sito utilizza cookie tecnici necessari per il corretto funzionamento del sito. Per maggiori informazioni, consulta la nostra Cookie Policy.
									</p>
								</motion.section>

								<motion.section variants={fadeInUp}>
									<h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifiche alla Privacy Policy</h2>
									<p>
										Il Titolare si riserva il diritto di modificare o aggiornare la presente informativa in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina e, se significative, saranno comunicate via email agli utenti registrati.
									</p>
									<p className="mt-4">
										<strong>Ultimo aggiornamento:</strong> Ottobre 2025
									</p>
								</motion.section>

								<motion.section variants={fadeInUp} className="mt-8 p-4 bg-gray-100 rounded-none">
									<p className="text-sm text-gray-600">
										Per qualsiasi domanda o chiarimento sulla presente Informativa Privacy, non esitare a contattarci all'indirizzo <a href="mailto:info@vitale-eu.it" className="text-brand hover:underline">info@vitale-eu.it</a> o tramite la <Link href="/contatti" className="text-brand hover:underline">pagina Contatti</Link>.
									</p>
								</motion.section>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</section>
		</div>
	)
}

