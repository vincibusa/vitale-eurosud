/**
 * Configurazione base URL per le API
 * In produzione usa l'URL del CRM deployato, in sviluppo usa localhost
 */
export const getApiBaseUrl = (): string => {
	// Se siamo in produzione (deployato), usa l'URL del CRM
	if (process.env.NODE_ENV === 'production') {
		return 'https://vitale-crm--vitale-crm.europe-west4.hosted.app'
	}
	
	// In sviluppo, usa localhost
	return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
}

