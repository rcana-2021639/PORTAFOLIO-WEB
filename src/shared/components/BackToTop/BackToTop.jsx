import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import './BackToTop.css';

// Botón flotante "volver arriba": aparece tras bajar un poco y vuelve al inicio.
// Lleva un anillo que refleja el progreso de scroll de la página.
// Anima solo opacity/transform/pathLength (compuesto en GPU) y respeta reduced-motion.
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const ring = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="back-to-top"
          onClick={toTop}
          aria-label="Volver arriba"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
        >
          <svg className="back-to-top__ring" viewBox="0 0 48 48" aria-hidden="true">
            <defs>
              <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#ff5fe1" />
              </linearGradient>
            </defs>
            <circle className="back-to-top__ring-track" cx="24" cy="24" r="22" />
            <motion.circle
              className="back-to-top__ring-fill"
              cx="24"
              cy="24"
              r="22"
              style={{ pathLength: ring }}
            />
          </svg>
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
