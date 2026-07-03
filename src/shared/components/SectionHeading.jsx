import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';
import Reveal from './Reveal';
import './SectionHeading.css';

// Encabezado de sección reutilizable: eyebrow + título animado + subtítulo.
const SectionHeading = ({ eyebrow, title, highlight, subtitle, align = 'left', index }) => (
  <header className={`section-heading is-${align}`}>
    {eyebrow && (
      <Reveal direction="up" className="section-heading__eyebrow">
        <span className="eyebrow">
          {index && <span className="section-heading__num">{index}</span>}
          {eyebrow}
        </span>
      </Reveal>
    )}

    <AnimatedTitle as="h2" className="section-heading__title">
      {title} {highlight && <span className="gradient-text">{highlight}</span>}
    </AnimatedTitle>

    {/* Subrayado de degradado que se dibuja al entrar en viewport (escala en GPU) */}
    <motion.span
      className="section-heading__rule"
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    />

    {subtitle && (
      <Reveal direction="up" delay={0.1} className="section-heading__subtitle">
        <p>{subtitle}</p>
      </Reveal>
    )}
  </header>
);

export default SectionHeading;
