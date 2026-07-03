# Portafolio — Rhandy Estuardo Caná Subuyuj

Portafolio personal de desarrollador construido **desde cero** con React 19 + Vite. Estética
*dark + neón morado* futurista, con animaciones de scroll (framer-motion), títulos animados
(GSAP SplitText) y fondos WebGL (OGL / Three.js). One-page con navegación por scroll.

## 🚀 Scripts

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo  → http://localhost:5173
npm run build   # build de producción     → dist/
npm run preview # previsualizar el build
npm run lint    # linter
```

> También funciona con `pnpm` o `yarn`.

## 🧱 Arquitectura (feature-based)

```
src/
├─ app/        → main.jsx, App.jsx (ensambla todo)
├─ features/   → una carpeta por sección (hero, about, skills, experience, gallery, projects, contact)
├─ shared/
│  ├─ components/  → UI reutilizable (Navbar, Aurora, AnimatedTitle, TiltCard, NeonButton, ...)
│  ├─ hooks/       → useScrollSpy, useReducedMotion
│  ├─ data/        → CONTENIDO editable (perfil, skills, experiencia, proyectos, redes)
│  └─ utils/       → helpers (cn, scroll)
└─ styles/     → tokens.css (paleta), animations.css (keyframes), index.css
```

## ✏️ Cómo editar mi información

Todo el contenido está centralizado en **`src/shared/data/`** y marcado con `// TODO: reemplazar`:

| Archivo | Qué editar |
|---|---|
| `profile.js`    | Nombre, rol, frase, bio, datos generales (edad, email, teléfono, ubicación) |
| `skills.js`     | Habilidades y porcentajes |
| `experience.js` | Educación y experiencia (timeline) |
| `projects.js`   | Proyectos: título, descripción, skills, link de GitHub, capturas |
| `socials.js`    | LinkedIn, CompuTrabajo, GitHub, email |

Las imágenes placeholder están en `public/images/` — reemplázalas por las reales
manteniendo el mismo nombre (o actualiza la ruta en `projects.js`).

## 🌐 Despliegue

`npm run build` genera `dist/`, lista para subir a Vercel, Netlify o GitHub Pages.
