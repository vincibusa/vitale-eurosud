'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function ScrollToTopOnRouteChange() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual'
		}

		const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
		scrollToTop()
		const raf = window.requestAnimationFrame(scrollToTop)
		const timeout = window.setTimeout(scrollToTop, 60)

		return () => {
			window.cancelAnimationFrame(raf)
			window.clearTimeout(timeout)
		}
	}, [pathname, searchParams?.toString()])

	return null
}
