'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface ComparisonContextType {
	items: string[] // vehicle IDs
	addItem: (id: string) => void
	removeItem: (id: string) => void
	clearAll: () => void
	isInComparison: (id: string) => boolean
	maxItems: number
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

const STORAGE_KEY = 'vitale-comparison'
const MAX_ITEMS = 4

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<string[]>([])

	// Load from localStorage on mount
	useEffect(() => {
		if (typeof window === 'undefined') return

		try {
			const stored = localStorage.getItem(STORAGE_KEY)
			if (stored) {
				const parsed = JSON.parse(stored)
				if (Array.isArray(parsed) && parsed.length > 0) {
					setItems(parsed.slice(0, MAX_ITEMS))
				}
			}
		} catch (error) {
			console.error('Error loading comparison from localStorage:', error)
		}
	}, [])

	// Save to localStorage whenever items change
	useEffect(() => {
		if (typeof window === 'undefined') return

		try {
			if (items.length > 0) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
			} else {
				localStorage.removeItem(STORAGE_KEY)
			}
		} catch (error) {
			console.error('Error saving comparison to localStorage:', error)
		}
	}, [items])

	const addItem = useCallback((id: string) => {
		setItems((prev) => {
			// Don't add if already in list
			if (prev.includes(id)) return prev

			// Don't add if at max capacity
			if (prev.length >= MAX_ITEMS) {
				// Optionally show a toast/notification here
				return prev
			}

			return [...prev, id]
		})
	}, [])

	const removeItem = useCallback((id: string) => {
		setItems((prev) => prev.filter((item) => item !== id))
	}, [])

	const clearAll = useCallback(() => {
		setItems([])
	}, [])

	const isInComparison = useCallback(
		(id: string) => items.includes(id),
		[items]
	)

	return (
		<ComparisonContext.Provider
			value={{
				items,
				addItem,
				removeItem,
				clearAll,
				isInComparison,
				maxItems: MAX_ITEMS
			}}
		>
			{children}
		</ComparisonContext.Provider>
	)
}

export function useComparison() {
	const context = useContext(ComparisonContext)
	if (context === undefined) {
		throw new Error('useComparison must be used within a ComparisonProvider')
	}
	return context
}

