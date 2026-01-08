'use client'

/**
 * Model3DViewer Component
 * 
 * Visualizzatore 3D interattivo per modelli GLB/GLTF utilizzando Google Model Viewer.
 * 
 * Requisiti:
 * - Il file modello deve essere in formato .glb o .gltf
 * - L'URL deve essere accessibile pubblicamente (es. Supabase Storage)
 * 
 * Funzionalità:
 * - Rotazione automatica del modello
 * - Controlli camera (zoom, pan, rotazione manuale)
 * - Supporto Realtà Aumentata (AR) su dispositivi mobili iOS/Android
 * 
 * Esempio di utilizzo:
 * <Model3DViewer
 *   src="https://storage.example.com/models/vehicle.glb"
 *   poster="/images/vehicle-poster.jpg"
 *   alt="Modello 3D del veicolo"
 * />
 */

import { useRef, useState, useEffect } from 'react'
import { Maximize, Minimize } from 'lucide-react'
import '@google/model-viewer'

interface Model3DViewerProps {
	src: string
	poster?: string
	alt: string
	autoRotate?: boolean
	cameraControls?: boolean
	ar?: boolean
	shadowIntensity?: number
	className?: string
}

export default function Model3DViewer({
	src,
	poster,
	alt,
	autoRotate = true,
	cameraControls = true,
	ar = true,
	shadowIntensity = 1,
	className = ''
}: Model3DViewerProps) {
	const modelViewerRef = useRef<any>(null)
	const [isFullscreen, setIsFullscreen] = useState(false)

	// Gestisci l'evento fullscreen change
	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement)
		}

		document.addEventListener('fullscreenchange', handleFullscreenChange)
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
		document.addEventListener('mozfullscreenchange', handleFullscreenChange)
		document.addEventListener('MSFullscreenChange', handleFullscreenChange)

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange)
			document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
			document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
			document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
		}
	}, [])

	const handleFullscreen = async () => {
		const element = modelViewerRef.current

		if (!element) return

		try {
			if (!document.fullscreenElement) {
				// Entra in fullscreen
				if (element.requestFullscreen) {
					await element.requestFullscreen()
				} else if ((element as any).webkitRequestFullscreen) {
					await (element as any).webkitRequestFullscreen()
				} else if ((element as any).mozRequestFullScreen) {
					await (element as any).mozRequestFullScreen()
				} else if ((element as any).msRequestFullscreen) {
					await (element as any).msRequestFullscreen()
				}
			} else {
				// Esci dal fullscreen
				if (document.exitFullscreen) {
					await document.exitFullscreen()
				} else if ((document as any).webkitExitFullscreen) {
					await (document as any).webkitExitFullscreen()
				} else if ((document as any).mozCancelFullScreen) {
					await (document as any).mozCancelFullScreen()
				} else if ((document as any).msExitFullscreen) {
					await (document as any).msExitFullscreen()
				}
			}
		} catch (error) {
			console.error('Errore durante il cambio modalità fullscreen:', error)
		}
	}

	return (
		// @ts-expect-error - model-viewer è un custom element registrato da @google/model-viewer
		<model-viewer
			ref={modelViewerRef}
			src={src}
			poster={poster}
			alt={alt}
			auto-rotate={autoRotate ? 'true' : 'false'}
			camera-controls={cameraControls ? 'true' : 'false'}
			ar={ar ? 'true' : 'false'}
			ar-modes="webxr scene-viewer quick-look"
			shadow-intensity={shadowIntensity.toString()}
			environment-image="neutral"
			exposure="1"
			tone-mapping="commerce"
			interaction-policy="allow-when-focused"
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#f9fafb'
			}}
			className={className}
			loading="lazy"
		>
			{/* Pulsante Fullscreen */}
			<button
				onClick={handleFullscreen}
				style={{
					position: 'absolute',
					top: '16px',
					right: '16px',
					zIndex: 10,
					width: '44px',
					height: '44px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0.7)',
					color: 'white',
					border: 'none',
					borderRadius: '0',
					cursor: 'pointer',
					transition: 'background-color 0.2s',
					backdropFilter: 'blur(8px)'
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
				}}
				aria-label={isFullscreen ? 'Esci da schermo intero' : 'Visualizza a schermo intero'}
				title={isFullscreen ? 'Esci da schermo intero' : 'Visualizza a schermo intero'}
			>
				{isFullscreen ? (
					<Minimize size={20} strokeWidth={1.5} />
				) : (
					<Maximize size={20} strokeWidth={1.5} />
				)}
			</button>

			{/* Pulsante AR */}
			<div
				slot="ar-button"
				style={{
					position: 'absolute',
					bottom: '16px',
					right: '16px',
					zIndex: 10
				}}
			>
				<button
					style={{
						padding: '12px 16px',
						backgroundColor: '#1C69D4',
						color: 'white',
						border: 'none',
						borderRadius: '0',
						fontSize: '14px',
						fontWeight: '600',
						cursor: 'pointer',
						transition: 'background-color 0.2s'
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = '#0653B6'
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = '#1C69D4'
					}}
				>
					Visualizza in AR
				</button>
			</div>
			{/* @ts-expect-error - model-viewer è un custom element */}
		</model-viewer>
	)
}

