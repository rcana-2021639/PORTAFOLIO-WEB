import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, FileDown, FolderGit2 } from 'lucide-react';
import AnimatedTitle from '../../../shared/components/AnimatedTitle';
import Typewriter from '../../../shared/components/Typewriter';
import NeonButton from '../../../shared/components/NeonButton';
import MagneticButton from '../../../shared/components/MagneticButton';
import Particles from '../../../shared/components/reactbits/Particles/Particles';
import LogoLoop from '../../../shared/components/reactbits/LogoLoop/LogoLoop';
import Folder from '../../../shared/components/reactbits/Folder/Folder';
import { profile } from '../../../shared/data/profile';
import { socials } from '../../../shared/data/socials';
import { techLogos } from '../../../shared/data/techLogos';
import { getIcon } from '../../../shared/components/iconMap';
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion';
import { scrollToSection } from '../../../shared/utils/scroll';
import './Hero.css';

// Varias tonalidades de morado para que el campo no se vea de un solo tono.
const PARTICLE_COLORS = ['#a855f7', '#c084fc', '#8b5cf6', '#d946ef', '#6366f1', '#e879f9'];

const Hero = () => {
  const reduced = useReducedMotion();
  const heroRef = useRef(null);

  // Disolución al hacer scroll: el contenido se eleva y se desvanece al salir.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Parallax por cursor.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.4 });
  const smy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.4 });

  // Spotlight que sigue el cursor detrás del nombre.
  const spotX = useTransform(smx, [0, 1], ['20%', '80%']);
  const spotY = useTransform(smy, [0, 1], ['12%', '78%']);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${spotX} ${spotY}, rgba(176,38,255,0.28), transparent 60%)`;

  const handleMouse = (e) => {
    if (reduced || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const resetMouse = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <section id="inicio" className="hero" ref={heroRef} onMouseMove={handleMouse} onMouseLeave={resetMouse}>
      {/* Fondo — campo de partículas moradas + nebulosa sutil */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__particles">
          <Particles
            particleColors={PARTICLE_COLORS}
            particleCount={reduced ? 120 : 600}
            particleSpread={10}
            speed={reduced ? 0 : 0.1}
            particleBaseSize={100}
            sizeRandomness={1}
            moveParticlesOnHover={!reduced}
            particleHoverFactor={1.4}
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
          />
        </div>
        <div className="hero__nebula" />
        {!reduced && <motion.div className="hero__spotlight" style={{ background: spotlight }} />}
      </div>

      <motion.div
        className="container hero__inner"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Contenido editorial — una sola columna centrada */}
        <div className="hero__lead">
          <motion.span
            className="eyebrow hero__status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="dot" /> {profile.details.availability}
          </motion.span>

          <div className="hero__name-wrap">
            <AnimatedTitle as="h1" className="hero__name" delay={0.12}>
              <span className="hero__name-line">Rhandy</span>
              <span className="hero__name-line">Estuardo</span>
              <span className="hero__name-line gradient-text">Caná</span>
              <span className="hero__name-line gradient-text">Subuyuj</span>
            </AnimatedTitle>
          </div>

          <div className="hero__role">
            <span className="hero__role-prefix mono">&lt;/&gt;</span>
            <Typewriter words={profile.typewriter} />
          </div>

          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
          >
            <MagneticButton>
              <NeonButton icon={FolderGit2} onClick={() => scrollToSection('proyectos')}>
                Ver proyectos
              </NeonButton>
            </MagneticButton>

            {/* Descargar CV — carpeta animada (React Bits Folder) */}
            <div className="hero__cv">
              <Folder
                color="#a855f7"
                size={0.62}
                items={[
                  <a
                    key="cv"
                    className="hero__cv-paper"
                    href={profile.cvUrl}
                    download
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Descargar currículum en PDF"
                  >
                    <FileDown size={18} />
                    <span>CV</span>
                  </a>,
                  <span key="pdf" className="hero__cv-paper hero__cv-paper--mini">PDF</span>,
                  <span key="dot" className="hero__cv-paper hero__cv-paper--mini">·</span>,
                ]}
              />
              <span className="hero__cv-label mono">Descargar CV</span>
            </div>
          </motion.div>

          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            {socials.map((s) => {
              const Icon = getIcon(s.icon);
              return (
                <a
                  key={s.id}
                  href={s.url}
                  className="hero__social"
                  style={{ '--accent': s.accent }}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                >
                  <Icon size={19} />
                </a>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      <button className="hero__scroll" onClick={() => scrollToSection('sobre-mi')} aria-label="Bajar">
        <span className="mono">scroll</span>
        <ArrowDown size={16} />
      </button>

      {/* Cinta de tecnologías — LogoLoop con logos de marca */}
      <div className="hero__marquee">
        <LogoLoop
          logos={techLogos}
          speed={70}
          direction="left"
          logoHeight={40}
          gap={52}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#0a0512"
          ariaLabel="Tecnologías que manejo"
        />
      </div>
    </section>
  );
};

export default Hero;
