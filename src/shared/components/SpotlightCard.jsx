import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './SpotlightCard.css';

const spring = { stiffness: 180, damping: 18, mass: 0.5 };

/**
 * Tarjeta con interacción avanzada de cursor:
 *  - spotlight radial que sigue el puntero dentro de la tarjeta
 *  - tilt 3D suave + parallax del contenido a distinta profundidad
 *  - borde luminoso que reacciona a la posición del cursor
 *  - lift + glow al pasar por encima
 * `accent` acepta cualquier color/variable CSS (por defecto el acento de sección).
 */
const SpotlightCard = ({
  children,
  className = '',
  accent = 'var(--section-accent, var(--purple))',
  style,
  ...rest
}) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const active = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), spring);
  const tx = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);
  const ty = useSpring(useTransform(py, [0, 1], [-7, 7]), spring);

  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, color-mix(in srgb, ${accent} 45%, transparent), transparent 68%)`;
  const borderGlow = useMotionTemplate`radial-gradient(360px circle at ${glowX} ${glowY}, color-mix(in srgb, ${accent} 85%, transparent), transparent 60%)`;
  const glowOpacity = useSpring(active, { stiffness: 200, damping: 26 });

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onEnter = () => !reduced && active.set(1);
  const onLeave = () => {
    active.set(0);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`spotlight-card ${className}`}
      style={
        reduced
          ? { '--sc-accent': accent, ...style }
          : {
              rotateX,
              rotateY,
              transformPerspective: 900,
              transformStyle: 'preserve-3d',
              '--sc-accent': accent,
              ...style,
            }
      }
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      whileHover={reduced ? undefined : { y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      {...rest}
    >
      {/* Borde luminoso que sigue al cursor */}
      <motion.span
        className="spotlight-card__border"
        aria-hidden="true"
        style={reduced ? undefined : { background: borderGlow, opacity: glowOpacity }}
      />
      {/* Spotlight radial */}
      <motion.span
        className="spotlight-card__glow"
        aria-hidden="true"
        style={reduced ? undefined : { background: spotlight, opacity: glowOpacity }}
      />
      <motion.div
        className="spotlight-card__content"
        style={reduced ? undefined : { x: tx, y: ty, transform: 'translateZ(40px)' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default SpotlightCard;
