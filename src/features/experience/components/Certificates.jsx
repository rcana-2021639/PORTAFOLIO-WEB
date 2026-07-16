import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Award, X, ZoomIn } from 'lucide-react';
import Reveal from '../../../shared/components/Reveal';
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion';
import { certificates } from '../../../shared/data/experience';
import './Certificates.css';

const PLACEHOLDER = '/images/cert-placeholder.svg';

// Sustituye la imagen por un marcador si aún no subiste la foto del diploma.
const handleImgError = (e) => {
  if (!e.currentTarget.dataset.fallback) {
    e.currentTarget.dataset.fallback = '1';
    e.currentTarget.src = PLACEHOLDER;
  }
};

const tiltSpring = { stiffness: 200, damping: 20, mass: 0.4 };

// Tarjeta de certificado con interacción avanzada de cursor:
// inclinación 3D, brillo holográfico que sigue al puntero y parallax del sello.
const CertCard = ({ cert, index, onOpen }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const active = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), tiltSpring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), tiltSpring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(200px circle at ${glareX} ${glareY}, rgba(255,255,255,0.32), transparent 62%)`;
  const sheen = useMotionTemplate`linear-gradient(105deg, transparent 40%, color-mix(in srgb, var(--section-accent, var(--purple)) 40%, transparent) ${glareX}, transparent 60%)`;
  const glareOpacity = useSpring(active, { stiffness: 200, damping: 26 });

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
    <Reveal as="div" direction="up" delay={index * 0.05} className="certs__cardwrap">
      <motion.button
        ref={ref}
        type="button"
        className="certs__card"
        onClick={() => onOpen(cert)}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, transformPerspective: 800, transformStyle: 'preserve-3d' }
        }
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        aria-label={`Ver certificado: ${cert.title}`}
      >
        <span className="certs__thumb">
          <motion.img
            src={cert.image}
            onError={handleImgError}
            loading="lazy"
            alt={`Certificado: ${cert.title}`}
            style={reduced ? undefined : { translateZ: 26 }}
          />
          {/* Barrido diagonal con el acento de sección */}
          <motion.span
            className="certs__sheen"
            aria-hidden="true"
            style={reduced ? undefined : { background: sheen, opacity: glareOpacity }}
          />
          {/* Brillo holográfico que sigue al cursor */}
          <motion.span
            className="certs__glare"
            aria-hidden="true"
            style={reduced ? undefined : { background: glare, opacity: glareOpacity }}
          />
          <span className="certs__zoom">
            <ZoomIn size={18} />
          </span>
        </span>
        <span className="certs__meta">
          <span className="certs__issuer mono">
            {cert.issuer} · {cert.year}
          </span>
          <span className="certs__title">{cert.title}</span>
        </span>
      </motion.button>
    </Reveal>
  );
};

const Certificates = () => {
  const [active, setActive] = useState(null);

  // Cierra con Escape y bloquea el scroll del fondo mientras el visor está abierto.
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <div className="certs">
      <Reveal direction="up" className="certs__head">
        <span className="certs__head-icon">
          <Award size={18} />
        </span>
        <div>
          <h3 className="certs__head-title">Certificados &amp; diplomas</h3>
          <p className="certs__head-hint">Haz clic en cualquiera para verlo en grande.</p>
        </div>
      </Reveal>

      <div className="certs__grid">
        {certificates.map((c, i) => (
          <CertCard key={c.id} cert={c} index={i} onOpen={setActive} />
        ))}
      </div>

      {/* Visor a pantalla completa */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="certs__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <button className="certs__close" onClick={() => setActive(null)} aria-label="Cerrar">
              <X size={22} />
            </button>
            <motion.figure
              className="certs__lightbox-inner"
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={active.image} onError={handleImgError} alt={`Certificado: ${active.title}`} />
              <figcaption className="certs__caption">
                <span className="certs__caption-title">{active.title}</span>
                <span className="certs__caption-sub mono">
                  {active.issuer} · {active.year}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;
