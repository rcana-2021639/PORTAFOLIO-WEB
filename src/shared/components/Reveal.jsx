import { motion } from 'framer-motion';

// Wrapper de entrada al hacer scroll. Reutilizable en todas las secciones.
// direction: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'flip' | 'none'
const offsets = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
  scale: { x: 0, y: 24 },
  blur: { x: 0, y: 28 },
  flip: { x: 0, y: 40 },
  none: { x: 0, y: 0 },
};

const Reveal = ({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  amount = 0.3,
  once = true,
  className = '',
  ...props
}) => {
  const MotionTag = motion[as] ?? motion.div;
  const off = offsets[direction] ?? offsets.up;

  const initial = {
    opacity: 0,
    ...off,
    scale: direction === 'scale' ? 0.92 : 1,
    ...(direction === 'blur' ? { filter: 'blur(10px)' } : null),
    ...(direction === 'flip' ? { rotateX: -28 } : null),
  };

  const inView = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    ...(direction === 'blur' ? { filter: 'blur(0px)' } : null),
    ...(direction === 'flip' ? { rotateX: 0 } : null),
  };

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={inView}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={direction === 'flip' ? { transformPerspective: 1000 } : undefined}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
