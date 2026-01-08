# Guida alla Localizzazione dei Dati dal Database

Questa guida spiega come gestire le traduzioni per i dati dei veicoli che vengono da Supabase.

## Struttura del Database

La tabella `vehicles` ora include colonne JSONB per le traduzioni:

- `name_translations` - Traduzioni del nome del veicolo
- `description_translations` - Traduzioni della descrizione
- `category_translations` - Traduzioni della categoria

## Formato delle Traduzioni

Le colonne JSONB devono contenere oggetti con le chiavi delle lingue:

```json
{
  "it": "Testo in italiano",
  "en": "English text"
}
```

## Esempio di Aggiornamento

### Via SQL (Supabase Dashboard)

```sql
-- Aggiorna le traduzioni per un veicolo
UPDATE vehicles
SET 
  name_translations = '{"it": "FAT-02 DB - Fat Bike Elettrica", "en": "FAT-02 DB - Electric Fat Bike"}'::jsonb,
  description_translations = '{"it": "Descrizione in italiano...", "en": "English description..."}'::jsonb,
  category_translations = '{"it": "Bicicletta Elettrica", "en": "Electric Bicycle"}'::jsonb
WHERE id = 'fat-02-db';
```

### Via Supabase Client (JavaScript/TypeScript)

```typescript
import { supabase } from './lib/supabase'

await supabase
  .from('vehicles')
  .update({
    name_translations: {
      it: 'FAT-02 DB - Fat Bike Elettrica',
      en: 'FAT-02 DB - Electric Fat Bike'
    },
    description_translations: {
      it: 'Descrizione in italiano...',
      en: 'English description...'
    },
    category_translations: {
      it: 'Bicicletta Elettrica',
      en: 'Electric Bicycle'
    }
  })
  .eq('id', 'fat-02-db')
```

## Fallback Automatico

Il sistema implementa un fallback automatico:

1. **Prima**: Cerca la traduzione nella lingua richiesta (es. `en`)
2. **Se non trovata**: Usa la traduzione italiana (`it`)
3. **Se non trovata**: Usa il valore del campo originale (es. `name`, `description`)

Questo significa che:
- I dati esistenti continuano a funzionare senza modifiche
- Puoi aggiungere traduzioni gradualmente
- Non è necessario tradurre tutto subito

## Come Funziona nel Codice

Le funzioni in `src/lib/vehicles.ts` ora usano automaticamente la locale corrente:

```typescript
// La funzione getVehicles() rileva automaticamente la lingua
const vehicles = await getVehicles() // Usa la locale dalla richiesta

// Le funzioni sono già localizzate:
- getVehicles()
- getVehicleById(id)
- getVehiclesByCategory(categorySlug)
- getFeaturedVehicles(limit)
```

## Migrazione dei Dati Esistenti

Per migrare i dati esistenti, puoi creare uno script SQL:

```sql
-- Copia i valori esistenti nelle traduzioni italiane
UPDATE vehicles
SET 
  name_translations = jsonb_build_object('it', name),
  description_translations = jsonb_build_object('it', description),
  category_translations = jsonb_build_object('it', category)
WHERE name_translations IS NULL;
```

## Aggiungere Nuove Lingue

Per aggiungere una nuova lingua (es. `fr` per francese):

1. Aggiungi la lingua in `src/i18n/routing.ts`:
```typescript
locales: ['it', 'en', 'fr']
```

2. Crea il file `messages/fr.json`

3. Aggiungi le traduzioni nel database:
```sql
UPDATE vehicles
SET name_translations = name_translations || '{"fr": "Nom en français"}'::jsonb
WHERE id = 'vehicle-id';
```

Il sistema gestirà automaticamente la nuova lingua!

## Note Importanti

- I campi originali (`name`, `description`, `category`) rimangono come fallback
- Le traduzioni sono opzionali - se mancano, viene usato il fallback
- Le colonne JSONB sono indicizzate per performance ottimali
- Puoi aggiornare le traduzioni senza modificare il codice

