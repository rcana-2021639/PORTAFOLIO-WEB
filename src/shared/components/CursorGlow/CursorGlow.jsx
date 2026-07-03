import { useEffect, useRef } from 'react';
import './CursorGlow.css';

// Brillo sutil que sigue al cursor (solo punteros finos / desktop).
// Actualiza variables CSS con throttle por rAF: un solo listener pasivo y
// cero re-renders de React. Se desactiva en táctil y con reduced-motion.
const CursorGlow = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return undefined;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let pending = false;

    const apply = () => {
      pending = false;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = '1';
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(apply);
      }
    };
    const onLeave = () => { el.style.opacity = '0'; };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
};

export default CursorGlow;
