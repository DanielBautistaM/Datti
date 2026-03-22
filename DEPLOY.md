# Datti Landing — Deploy Guide

## 1. Instalar Node.js (solo una vez)

```bash
# Opción A: con nvm (ya tienes nvm instalado)
source ~/.nvm/nvm.sh
nvm install 20
nvm use 20

# Opción B: instalar directo desde brew
brew install node
```

## 2. Instalar dependencias y correr en local

```bash
cd ~/datti-landing
npm install
npm run dev
# Abre http://localhost:3000
```

## 3. Deploy GRATIS en Vercel

### Instalar Vercel CLI
```bash
npm i -g vercel
```

### Login y deploy
```bash
vercel login
vercel --prod
```

Vercel te pregunta:
- Project name: `datti`
- Framework: `Next.js` (auto-detecta)
- Root directory: `.` (enter)

Te da una URL como `https://datti.vercel.app` en ~30 segundos.

## 4. Conectar dominio datti.co

En Vercel Dashboard → tu proyecto → Settings → Domains:
1. Agrega `datti.co` y `www.datti.co`
2. Vercel te da los DNS records (A o CNAME)
3. En Spaceship (tu registrar) → apunta los DNS a los de Vercel
4. En ~10 min ya está live en datti.co

## 5. Formulario de contacto (opcional)

El form actual simula el envío. Para que funcione de verdad, agrega Formspree:
1. Crea cuenta gratis en formspree.io
2. En `components/CTA.tsx` línea del form, cambia el `handleSubmit`:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("sending");
  await fetch("https://formspree.io/f/TU_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  setStatus("sent");
};
```
