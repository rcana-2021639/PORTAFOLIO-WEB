// ============================================================
// PROYECTOS — portafolio técnico.
// Cada proyecto: título, descripción, skills aprendidas, repo y capturas.
// TODO: reemplazar enlaces de GitHub y capturas por los reales.
// ============================================================

export const projects = [
  {
    id: 'sistema-bancario',
    title: 'Sistema Bancario Web',
    subtitle: 'Plataforma full-stack',
    featured: true,
    year: '2024',
    description:
      'Banca en línea completa con dashboards para administrador y cliente: cuentas, tarjetas, transacciones, préstamos y estados de cuenta. Interfaz con animaciones avanzadas y fondos WebGL.',
    learned: [
      'Arquitectura por features y componentes reutilizables',
      'Animaciones con framer-motion y GSAP',
      'Consumo de microservicios y manejo de estado',
    ],
    tags: ['React', 'Vite', 'Framer Motion', 'Zustand', 'WebGL'],
    image: '/images/project-banco.svg',
    repo: 'https://github.com/rcana-2021639', // TODO: enlace al repo real
    demo: '', // TODO: opcional, URL del despliegue
  },
  {
    id: 'app-movil',
    title: 'App Móvil Bancaria',
    subtitle: 'Aplicación móvil',
    featured: true,
    year: '2024',
    description:
      'Versión móvil del sistema bancario construida con React Native y Expo. Login seguro, recuperación de contraseña, dashboard de cuentas y movimientos con un diseño nativo y fluido.',
    learned: [
      'Desarrollo móvil con React Native + Expo',
      'Navegación y flujos de autenticación',
      'Diseño responsive en pantallas pequeñas',
    ],
    tags: ['React Native', 'Expo', 'Zustand', 'JavaScript'],
    image: '/images/project-mobile.svg',
    repo: 'https://github.com/rcana-2021639', // TODO: enlace al repo real
    demo: '',
  },
  {
    id: 'auth-service',
    title: 'Backend de Microservicios',
    subtitle: 'API & autenticación',
    featured: false,
    year: '2024',
    description:
      'Servicio de autenticación y microservicios en Node.js + Express con JWT, validaciones, manejo de errores y seguridad (helmet, cors). Base del ecosistema bancario.',
    learned: [
      'APIs REST seguras con Express',
      'Autenticación con JWT y middlewares',
      'Arquitectura de microservicios',
    ],
    tags: ['Node.js', 'Express', 'JWT', 'MongoDB'],
    image: '/images/project-api.svg',
    repo: 'https://github.com/rcana-2021639', // TODO: enlace al repo real
    demo: '',
  },
  {
    id: 'portafolio',
    title: 'Este Portafolio',
    subtitle: 'Sitio personal',
    featured: false,
    year: '2025',
    description:
      'Portafolio one-page con estética neón futurista: títulos animados con GSAP, reveals al scroll, fondos WebGL (Aurora) y componentes 100% reutilizables. Diseñado y codificado desde cero.',
    learned: [
      'Sistema de diseño con tokens y CSS modular',
      'Animaciones de scroll e interacción avanzada',
      'Rendimiento y accesibilidad (reduced-motion)',
    ],
    tags: ['React', 'GSAP', 'OGL / WebGL', 'CSS'],
    image: '/images/project-portfolio.svg',
    repo: 'https://github.com/rcana-2021639', // TODO: enlace al repo real
    demo: '',
  },
];
