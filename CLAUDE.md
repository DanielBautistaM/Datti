# datti-landing — Memoria del Proyecto

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Fuentes: Inter (body) + Playfair Display (display/headings)

## Decisiones de diseño

### Paleta actual — Electric Violet (v2)
- **Acento principal:** `#5C4DFF` (violeta eléctrico) — light mode
- **Acento secundario:** `#9B4DFF` (violeta profundo) — para gradientes
- **Dark mode acento:** `#7B6FFF`
- Fondo light: `#F5F5FA` (off-white con tinte violeta sutil)
- Fondo dark: `#080710` (near-black)
- **NO usar verde ni teal** — paleta anterior fue descartada

### Logo
- Marca: 3 barras verticales de altura variable (histogram/bar chart) en SVG puro
- Wordmark: "datti" minúscula, font-display, tracking -0.04em
- Sin ™ ni elementos decorativos extra

### Estructura de secciones (orden en page.tsx)
```
Navbar → Hero → Problem → Services → Process → WhyDatti → CTA → Footer
```
- **TitleBanner fue eliminada** (estaba entre Hero y Problem)

## Precios (COP)
- Formato: `$XXXK` (sin los 3 últimos ceros, en pesos colombianos)
- Esencial: $900K/mes
- Control: $2.500K/mes (plan popular)
- Dominio: $7.500K/mes
- Elite: A convenir

## Números de contacto
- WhatsApp: actualizar `WA_NUMBER` en `components/Services.tsx` y `components/CTA.tsx`
- Email: `team@datti.co`

## Deploy
- Ver `DEPLOY.md` para instrucciones de Vercel + dominio `datti.co`
- Formulario de contacto: actualmente simula envío — conectar Formspree (ver DEPLOY.md)

## Contexto del negocio
- Empresa colombiana de ingeniería y análisis de datos para PyMEs
- Mercado: Colombia (precios en COP)
- Propuesta: infraestructura + análisis de datos, con ownership total del cliente
