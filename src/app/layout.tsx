import { ReactNode } from 'react'
import './globals.css'

// Root layout - required by Next.js
export default function RootLayout({
	children
}: {
	children: ReactNode
}) {
	return (
		<html lang="it" className="overflow-x-hidden">
			<body className="overflow-x-hidden">{children}</body>
		</html>
	)
}
