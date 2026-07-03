import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, FileDown, FolderGit2, Sparkles } from 'lucide-react';
import Aurora from '../../../shared/components/Aurora/Aurora';
import Constellation from '../../../shared/components/Constellation/Constellation';
import AnimatedTitle from '../../../shared/components/AnimatedTitle';
import Typewriter from '../../../shared/components/Typewriter';
import NeonButton from '../../../shared/components/NeonButton';
import MagneticButton from '../../../shared/components/MagneticButton';
import Counter from '../../../shared/components/Counter';
import TechMarquee from '../../../shared/components/TechMarquee';
import { profile } from '../../../shared/data/profile';
import { socials } from '../../../shared/data/socials';
import { techMarquee } from '../../../shared/data/skills';
import { getIcon } from '../../../shared/components/iconMap';
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion';
import { scrollToSection } from '../../../shared/utils/scroll';
import './Hero.css';

// Estrellas grandes con destellos (diffraction spikes), estilo telescopio.
// Solo se animan opacidad/escala → compuestas en GPU, no afectan el scroll.
const sparkStars = [
  { id: 1, top: '16%', left: '11%', size: 30, delay: 0 },
  { id: 2, top: '24%', left: '84%', size: 40, delay: 1.4 },
  { id: 3, top: '52%', left: '70%', size: 22, delay: 0.7 },
  { id: 4, top: '13%', left: '52%', size: 24, delay: 2.2 },
  { id: 5, top: '62%', left: '20%', size: 32, delay: 1.7 },
  { id: 6, top: '38%', left: '92%', size: 18, delay: 0.4 },
];

const Hero = () => {
  const reduced = useReducedMotion();

  const heroRef = useRef(null);

  // Disolución al hacer scroll: el contenido se eleva y se desvanece al salir.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Parallax por cursor: dos capas a distinta profundidad (suavizado con springs).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.4 });
  const smy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.4 });
  const blobX = useTransform(smx, [-0.5, 0.5], [30, -30]);
  const blobY = useTransform(smy, [-0.5, 0.5], [24, -24]);
  const glowX = useTransform(smx, [-0.5, 0.5], [-14, 14]);
  const glowY = useTransform(smy, [-0.5, 0.5], [-10, 10]);

  const handleMouse = (e) => {
    if (reduced || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetMouse = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="inicio" className="hero" ref={heroRef} onMouseMove={handleMouse} onMouseLeave={resetMouse}>
      {/* Fondos — escena espacial / nebulosa en tonos morados */}
      <div className="hero__bg" aria-hidden="true">
        <motion.div className="hero__layer" style={reduced ? undefined : { x: glowX, y: glowY }}>
          <div className="hero__aurora">
            <Aurora colorStops={['#7c3aed', '#c026d3', '#4f46e5']} amplitude={1.25} blend={0.5} speed={0.8} />
          </div>
          <div className="hero__nebula" />
          <div className="grid-bg" />
          <div className="hero__stars">
            <Constellation interactive density={1.25} />
          </div>
          <div className="hero__sparks">
            {sparkStars.map((s) => (
              <span
                key={s.id}
                className="hero__spark"
                style={{ top: s.top, left: s.left, '--size': `${s.size}px`, '--delay': `${s.delay}s` }}
              />
            ))}
          </div>
        </motion.div>
        <motion.div className="hero__layer" style={reduced ? undefined : { x: blobX, y: blobY }}>
          <span className="blob hero__blob-1" />
          <span className="blob hero__blob-2" />
          <span className="blob hero__blob-3" />
        </motion.div>
      </div>

      <motion.div
        className="container hero__inner"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.span
          className="eyebrow hero__status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="dot" /> {profile.details.availability}
        </motion.span>

        <p className="hero__greet">
          <Sparkles size={16} /> Hola, soy
        </p>

        <div className="hero__name-wrap">
          <AnimatedTitle as="h1" className="hero__name" delay={0.12}>
            {profile.heroFirst} <span className="gradient-text">{profile.heroLast}</span>
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
          <MagneticButton>
            <NeonButton variant="ghost" icon={FileDown} href={profile.cvUrl} download>
              Descargar CV
            </NeonButton>
          </MagneticButton>
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

        <motion.ul
          className="hero__stats"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          {profile.stats.map((stat) => (
            <li key={stat.label} className="hero__stat">
              <strong className="hero__stat-value">
                <Counter to={stat.value} suffix={stat.suffix} />
              </strong>
              <span className="hero__stat-label">{stat.label}</span>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <div className="hero__marquee">
        <TechMarquee items={techMarquee} />
      </div>

      <button className="hero__scroll" onClick={() => scrollToSection('sobre-mi')} aria-label="Bajar">
        <span className="mono">scroll</span>
        <ArrowDown size={16} />
      </button>
    </section>
  );
};

export default Hero;
