import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, X, ZoomIn } from 'lucide-react';
import Reveal from '../../../shared/components/Reveal';
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
          <Reveal
            as="button"
            type="button"
            key={c.id}
            direction="up"
            delay={i * 0.05}
            className="certs__card"
            onClick={() => setActive(c)}
            aria-label={`Ver certificado: ${c.title}`}
          >
            <span className="certs__thumb">
              <img src={c.image} onError={handleImgError} loading="lazy" alt={`Certificado: ${c.title}`} />
              <span className="certs__zoom">
                <ZoomIn size={18} />
              </span>
            </span>
            <span className="certs__meta">
              <span className="certs__issuer mono">
                {c.issuer} · {c.year}
              </span>
              <span className="certs__title">{c.title}</span>
            </span>
          </Reveal>
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
