// Scroll suave hacia una sección por id, respetando la altura del nav.
export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

  // Actualiza el hash sin salto brusco
  if (history.replaceState) history.replaceState(null, '', `#${id}`);
};
