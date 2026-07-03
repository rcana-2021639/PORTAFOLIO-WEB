import { motion } from 'framer-motion';

// Título con revelado suave (opacidad + desplazamiento).
//
// Importante: NO parte el texto en caracteres. Antes se usaba GSAP SplitText,
// que envolvía cada letra en su propio <span>; eso rompía los textos con
// degradado (.gradient-text con background-clip: text), dejándolos transparentes
// y "sin color" (solo visibles al seleccionarlos). Al animar el elemento completo,
// el degradado se conserva intacto en todos los dispositivos y es mucho más ligero.
const AnimatedTitle = ({ as = 'h1', children, className = '', delay = 0, ...props }) => {
  const MotionTag = motion[as] ?? motion.h2;

  return (
    <MotionTag
      className={`animated-title ${className}`.trim()}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default AnimatedTitle;
