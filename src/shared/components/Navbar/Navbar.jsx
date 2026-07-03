import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { sections } from '../../data/nav';
import { profile } from '../../data/profile';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { scrollToSection } from '../../utils/scroll';
import { cn } from '../../utils/cn';
import './Navbar.css';

const sectionIds = sections.map((s) => s.id);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      className={cn('navbar', scrolled && 'is-scrolled')}
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar__inner container">
        <button className="navbar__brand" onClick={() => go('inicio')} aria-label="Ir al inicio">
          <span className="cosmic-logo navbar__logo">
            <span className="cosmic-logo__orbit" />
            <span className="cosmic-logo__label">{profile.initials}</span>
          </span>
          <span className="navbar__brand-text">
            {profile.shortName}
            <span className="navbar__brand-role">{profile.roleAccent}</span>
          </span>
        </button>

        <nav className="navbar__links" aria-label="Navegación principal">
          {sections.map((s) => (
            <button
              key={s.id}
              className={cn('navbar__link', activeId === s.id && 'is-active')}
              onClick={() => go(s.id)}
            >
              {s.label}
              {activeId === s.id && (
                <motion.span layoutId="nav-underline" className="navbar__underline" />
              )}
            </button>
          ))}
        </nav>

        <a className="navbar__cta neon-btn" href={profile.cvUrl} download>
          Descargar CV
        </a>

        <button
          className="navbar__burger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Barra de progreso de scroll */}
      <motion.span className="navbar__progress" style={{ scaleX: progress }} aria-hidden="true" />

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="navbar__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Navegación móvil"
          >
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                className={cn('navbar__mobile-link', activeId === s.id && 'is-active')}
                onClick={() => go(s.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <span className="navbar__mobile-num mono">0{i + 1}</span>
                {s.label}
              </motion.button>
            ))}
            <a className="navbar__mobile-cta neon-btn" href={profile.cvUrl} download onClick={() => setOpen(false)}>
              Descargar CV
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
