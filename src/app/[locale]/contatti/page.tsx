'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const fadeInUp = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.12, delayChildren: 0.15 }
	}
}

export default function ContattiPage() {
	return (
		<div className="w-full bg-gray-50">
			<section className="relative overflow-hidden bg-gradient-to-r from-brand to-brand-dark text-white">
				<div className="absolute inset-0 bg-black/10 pointer-events-none" />
				<div className="relative container mx-auto px-4 py-16 md:py-20">
					<motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl">
						<Badge className="mb-4 bg-white/15 text-white hover:bg-white/20">Contatti</Badge>
						<h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
							Scegli il tuo percorso
						</h1>
						<p className="text-base md:text-xl text-white/90">
							Seleziona l&apos;area piu adatta a te per ricevere assistenza e proposte dedicate.
						</p>
					</motion.div>
				</div>
			</section>

			<section className="py-16 md:py-20 bg-white">
				<div className="container mx-auto px-4">
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-80px' }}
						variants={staggerContainer}
					>
						<motion.div variants={fadeInUp}>
							<Link href="/rivenditori">
								<div className="group relative aspect-square overflow-hidden cursor-pointer">
									<Image
										src="/immagini/rivenditore-privato-10.png"
										alt="Diventa Rivenditore"
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
									<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
										<Button size="lg" className="w-full bg-brand hover:bg-brand-dark text-white font-semibold">
											Diventa Rivenditore
										</Button>
									</div>
								</div>
							</Link>
						</motion.div>

						<motion.div variants={fadeInUp}>
							<Link href="/privati">
								<div className="group relative aspect-square overflow-hidden cursor-pointer">
									<Image
										src="/immagini/rivenditore-privato-11.png"
										alt="Per Privati"
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
									<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
										<Button
											size="lg"
											variant="outline"
											className="w-full border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black font-semibold"
										>
											Scopri per Privati
										</Button>
									</div>
								</div>
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</section>
		</div>
	)
}
