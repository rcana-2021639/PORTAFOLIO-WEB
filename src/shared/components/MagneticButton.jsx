import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Envuelve cualquier elemento y lo atrae sutilmente hacia el cursor (efecto magnético).
const MagneticButton = ({ children, strength = 0.35, className = '', ...props }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 16 });
  const sy = useSpring(y, { stiffness: 260, damping: 16 });

  const handleMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduced ? { display: 'inline-flex' } : { x: sx, y: sy, display: 'inline-flex' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
