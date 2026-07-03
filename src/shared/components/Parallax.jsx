import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Parallax por scroll: desplaza el elemento conforme atraviesa el viewport.
// Solo anima `transform` (compuesto en GPU, sin repintar) y respeta
// prefers-reduced-motion (en cuyo caso se queda estático).
//
//   speed  → píxeles de recorrido total; el signo invierte la dirección.
//   axis   → 'y' (por defecto) | 'x'.
//   offset → tramo de scroll que mapea el progreso 0→1 (ver framer-motion).
const Parallax = ({
  children,
  speed = 60,
  axis = 'y',
  as = 'div',
  className = '',
  offset = ['start end', 'end start'],
  style,
  ...props
}) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const move = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  const MotionTag = motion[as] ?? motion.div;
  const motionStyle = reduced
    ? style
    : {
        ...(axis === 'x' ? { x: move } : { y: move }),
        willChange: 'transform',
        ...style,
      };

  return (
    <MotionTag ref={ref} className={className} style={motionStyle} {...props}>
      {children}
    </MotionTag>
  );
};

export default Parallax;
