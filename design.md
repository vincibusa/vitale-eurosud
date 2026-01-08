# Design System - Vitale Veicoli Elettrici

## 📋 Indice
- [Panoramica](#panoramica)
- [Struttura Layout](#struttura-layout)
- [Componenti UI](#componenti-ui)
- [Sistema Colori](#sistema-colori)
- [Tipografia](#tipografia)
- [Animazioni](#animazioni)
- [Responsive Design](#responsive-design)
- [Immagini e Media](#immagini-e-media)
- [Accessibilità](#accessibilità)
- [Pattern di Layout](#pattern-di-layout)

---

## 🎯 Panoramica

Il design system di Vitale segue un approccio **mobile-first** e **minimal** utilizzando Shadcn UI per garantire consistenza, accessibilità e performance ottimali.

### Stack Tecnologico
- **Next.js 15** (App Router)
- **Tailwind CSS v4** (Utility-first styling)
- **Shadcn UI** (Component library)
- **Framer Motion** (Animazioni fluide)
- **Lucide React** (Icon system)
- **TypeScript** (Type safety)

---

## 🏗️ Struttura Layout

### Layout Principale
```tsx
<Header />
<main className="min-h-screen">
  {children}
</main>
<Footer />
```

### Container Pattern
```tsx
<div className="container mx-auto px-4">
  {/* Contenuto */}
</div>
```

### Sezioni Standard
```tsx
<section className="py-12 md:py-16 [bg-gray-50]">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

---

## 🧩 Componenti UI

### Importazioni Standard
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
```

### Vehicle Category Layout Component

**Componente riutilizzabile per tutte le pagine categorie veicoli**

```tsx
import VehicleCategoryLayout, { VehicleProduct, VehicleFilter } from '@/components/vehicles/vehicle-category-layout'
import { IconComponent } from 'lucide-react'

// Definire prodotti
const products: VehicleProduct[] = [
  {
    id: 1,
    name: "Nome Prodotto",
    type: "Tipo Veicolo",
    power: "250W",
    battery: "Litio 36V - 10AH",
    speed: "25KM/H",
    image: "/images/product.png",
    href: "/prodotti/slug",
    isNew: false // opzionale
  }
]

// Definire filtri
const filters: VehicleFilter[] = [
  { name: "Marca", key: "marca", options: ["Vitale", "Altri"] },
  { name: "Batteria", key: "batteria", options: ["Litio", "Piombo"] }
]

// Utilizzo
<VehicleCategoryLayout
  title="Nome Categoria"
  description="Descrizione categoria"
  icon={IconComponent}
  products={products}
  filters={filters}
  heroGradient="bg-gradient-to-r from-green-500 to-green-600"
  badgeColor="bg-green-100 text-green-700 hover:bg-green-200"
  primaryColor="green"
/>
```

**Funzionalità:**
- **Ricerca**: Filtra prodotti per nome e tipo in tempo reale
- **Filtri**: Sistema di filtri multipli con contatore filtri attivi
- **Mobile-First**: Sheet drawer per filtri su mobile, sidebar sticky su desktop
- **Responsive**: Griglia adattiva da 1 colonna (mobile) a 3 colonne (desktop)
- **Animazioni**: Framer Motion per transizioni fluide
- **Reset**: Bottone per resettare tutti i filtri

### Button Variants

#### Primary Button
```tsx
<Button 
  size="lg" 
  className="bg-brand hover:bg-brand-dark text-white rounded-none w-full md:w-auto"
>
  Testo Bottone
</Button>
```

#### Secondary Button (Outline)
```tsx
<Button 
  size="lg" 
  className="border-2 border-brand text-brand bg-white hover:bg-blue-50 rounded-none w-full md:w-auto"
>
  Testo Bottone
</Button>
```

#### CTA Button (White on Dark background)
```tsx
<Button 
  size="lg" 
  className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 md:px-8 rounded-none"
>
  Testo Bottone
</Button>
```

### Card Pattern
```tsx
<Card className="text-center p-6 md:p-8 hover:shadow-2xl transition-all duration-300 h-full border-0 group">
  <CardHeader>
    <div className="mx-auto mb-4 w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-brand transition-colors">
      <IconComponent className="text-brand group-hover:text-white transition-colors" size={28} />
    </div>
    <CardTitle className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-brand transition-colors">
      Titolo Card
    </CardTitle>
  </CardHeader>
  <CardContent>
    <CardDescription className="text-sm md:text-base text-gray-600 font-light">
      Descrizione del contenuto
    </CardDescription>
  </CardContent>
</Card>
```

### Badge System
```tsx
{/* Badge Premium Style */}
<Badge className="mb-3 md:mb-4 bg-brand hover:bg-brand-dark text-white">Novità</Badge>
<Badge className="mb-3 md:mb-4 bg-blue-50 text-brand hover:bg-blue-100">Categoria</Badge>
```

---

## 🎨 Sistema Colori

### Palette Principale (BMW Premium Style)
- **Primary Blue**: `#1C69D4` (brand-primary)
- **Primary Blue Light**: `#4A90E2` (brand-light)
- **Primary Blue Dark**: `#0653B6` (brand-dark)
- **Secondary Orange**: `#F97316` (orange-500) - Usato come accento

### Colori di Testo
- **Heading**: `text-gray-900`
- **Body Text**: `text-gray-600`
- **Muted Text**: `text-gray-400`
- **Link**: `text-primary hover:text-brand-dark`

### Background
- **Primary**: `bg-white`
- **Alternate**: `bg-gray-50`
- **Dark**: `bg-gray-900` (Footer)

---

## 📝 Tipografia

### Font System
Utilizziamo **Inter** configurato per emulare il look premium di *BMW Type Next*.
- **Pesi usati**: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
- **Settings**: `letter-spacing: -0.015em`, `text-rendering: optimizeLegibility`

### Heading System (Mobile-First)
```tsx
{/* H1 - Hero Titles */}
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">

{/* H2 - Section Titles */}
<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">

{/* H3 - Card/Subsection Titles */}
<h3 className="text-lg md:text-xl font-bold text-gray-900">
```

### Body Text
```tsx
{/* Paragrafi standard */}
<p className="text-sm md:text-base text-gray-600 mb-4">

{/* Testo lead */}
<p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-gray-600">
```

---

## ✨ Animazioni

### Import e Setup
```tsx
import { motion } from 'framer-motion'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}
```

### Pattern di Uso
```tsx
{/* Animazione su scroll */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInUp}
>

{/* Container con stagger */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainer}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={scaleIn}>
      {/* Item content */}
    </motion.div>
  ))}
</motion.div>

{/* Hover animations */}
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
>
```

---

## 📱 Responsive Design

### Breakpoints System
- **Mobile**: `0px` (default)
- **Tablet**: `md:` (768px+)  
- **Desktop**: `lg:` (1024px+)
- **Large Desktop**: `xl:` (1280px+)

### Grid Patterns
```tsx
{/* 2-col mobile, 3-col tablet, 6-col desktop */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">

{/* 1-col mobile, 2-col desktop */}  
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

{/* Stacked mobile, side-by-side desktop */}
<div className="flex flex-col sm:flex-row gap-3 md:gap-4">
```

### Spacing System
```tsx
{/* Padding responsive */}
className="p-4 md:p-6"
className="px-4 md:px-6"
className="py-12 md:py-16"

{/* Gap responsive */}  
className="gap-3 md:gap-4"
className="gap-6 md:gap-8 lg:gap-12"

{/* Margin responsive */}
className="mb-4 md:mb-6"
className="mb-6 md:mb-8"
```

---

## 🖼️ Immagini e Media

### Next.js Image Component
```tsx
import Image from 'next/image'

{/* Hero/Banner Images */}
<Image
  src="/images/hero-banner.png"
  alt="Descrizione accessibile"
  fill
  className="object-cover object-center"
  priority
/>

{/* Product Images */}
<Image
  src="/images/product-name.jpg"
  alt="Nome Prodotto - Descrizione"
  fill
  className="object-cover object-center"
/>

{/* Logo Images */}
<Image
  src="/images/vitale-logo.png"
  alt="Vitale - Fornitura Veicoli Elettrici"
  width={120}
  height={40}
  className="h-8 md:h-10 w-auto"
  priority
/>
```

### Container Immagini
```tsx
{/* Standard product image container */}
<div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
  <Image 
    src="/images/product.jpg"
    alt="Product Name"
    fill
    className="object-cover object-center"
  />
</div>
```

### Nomenclatura File
- **Logo principale**: `vitale-logo.png`
- **Logo piccolo**: `vitale-logo-small.png` 
- **Hero banner**: `hero-banner.png`
- **Prodotti**: `product-name.jpg/png`
- **Icone/Loghi**: `icon-name-logo.png`

---

## ♿ Accessibilità

### Immagini
```tsx
{/* Sempre fornire alt text descrittivi */}
<Image 
  src="/images/asya-auto.jpeg"
  alt="ASYA Auto Elettrica - Veicolo a due posti con autonomia 150km"
  fill
/>
```

### Contrasti
```tsx
{/* Assicurarsi di contrasti sufficienti */}
className="text-gray-900"  // Testo scuro su sfondo chiaro
className="text-white"     // Testo bianco su sfondo scuro
className="bg-brand text-white hover:bg-brand-dark"
```

### Focus States
```tsx
{/* Links con stati focus visibili */}
<Link 
  href="/prodotti"
  className="text-gray-700 hover:text-brand transition-colors duration-200 relative group"
>
  Prodotti
  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-200 group-hover:w-full" />
</Link>
```

### Semantic HTML
```tsx
{/* Usare elementi semantici appropriati */}
<header>, <main>, <section>, <article>, <nav>, <footer>
<h1>, <h2>, <h3> (gerarchia corretta)
<button>, <a> (per interazioni appropriate)
```

---

## 🎯 Pattern di Layout

### Sezione Hero
```tsx
<section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
  <motion.div initial="hidden" animate="visible" variants={fadeIn}>
    <Image src="/images/hero-banner.png" alt="Hero" fill className="object-cover object-center" priority />
  </motion.div>
  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />
  <div className="relative container mx-auto px-4 h-full flex items-center">
    <motion.div className="text-white max-w-2xl" initial="hidden" animate="visible" variants={fadeInUp}>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
        Titolo Hero
      </h1>
      <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/90 font-light">
        Sottotitolo descrittivo
      </p>
      <Button size="lg" className="bg-brand hover:bg-brand-dark text-white rounded-none">
        Call to Action
      </Button>
    </motion.div>
  </div>
</section>
```

### Sezione Prodotto (Alternata)
```tsx
<section className="py-12 md:py-16 [bg-gray-50]">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
      {/* Immagine (order-2 lg:order-1 per alternare) */}
      <motion.div 
        className="order-2 lg:order-1"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideInLeft}
      >
        <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
          <Image src="/images/product.jpg" alt="Product" fill className="object-cover object-center" />
        </div>
      </motion.div>

      {/* Contenuto (order-1 lg:order-2 per alternare) */}
      <motion.div 
        className="order-1 lg:order-2"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideInRight}
      >
        <Badge className="mb-3 md:mb-4 bg-blue-50 text-brand hover:bg-blue-100">Categoria</Badge>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
          Titolo Prodotto
        </h2>
        <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 mb-6 md:mb-8 font-light">
          <p>Descrizione prodotto...</p>
        </div>
        <Button size="lg" className="bg-brand hover:bg-brand-dark text-white rounded-none w-full md:w-auto">
          Scopri di più
        </Button>
      </motion.div>
    </div>
  </div>
</section>
```

### Griglia Categorie/Cards
```tsx
<section className="py-12 md:py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <motion.div 
      className="text-center mb-8 md:mb-12"
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
        Titolo Sezione
      </h2>
      <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
        Descrizione sezione
      </p>
    </motion.div>

    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={scaleIn}>
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
            {/* Card content */}
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
```

---

## 📐 Checklist per Nuove Pagine

### ✅ Setup Base
- [ ] Import dei componenti UI necessari
- [ ] Import di Framer Motion per animazioni  
- [ ] Import di Next.js Image per media
- [ ] Struttura base con sezioni appropriate

### ✅ Design System
- [ ] Utilizzo color scheme Vitale (BMW Premium Blue)
- [ ] Tipografia premium (Inter con tracking e feature settings)
- [ ] Spaziatura consistente (py-12 md:py-16)
- [ ] Container pattern (container mx-auto px-4)

### ✅ Componenti
- [ ] Button variants appropriati
- [ ] Card pattern per contenuti strutturati  
- [ ] Badge per categorizzazione
- [ ] Separator per divisori

### ✅ Animazioni
- [ ] Variants appropriati per il contenuto
- [ ] whileInView con viewport once: true
- [ ] Margin -100px per trigger anticipato
- [ ] Stagger per elementi multipli

### ✅ Responsive  
- [ ] Layout mobile-first
- [ ] Breakpoints md: e lg: appropriati
- [ ] Grid responsive per layout
- [ ] Text sizing responsive

### ✅ Accessibilità
- [ ] Alt text descrittivi per immagini
- [ ] Contrasti sufficienti nei colori
- [ ] Semantic HTML appropriato
- [ ] Focus states visibili

### ✅ Performance
- [ ] Next.js Image con lazy loading
- [ ] Priority per immagini above-fold
- [ ] Ottimizzazione delle animazioni
- [ ] Tree shaking dei componenti

---

## 🔄 Versionamento

**Versione**: 1.0.0  
**Data**: 2024-10-15  
**Autore**: Sistema di Design Vitale

### Changelog
- **v1.0.0**: Design system iniziale basato sulla homepage implementata

---

*Questo documento è in continua evoluzione. Aggiornare sempre dopo modifiche significative al design system.*
