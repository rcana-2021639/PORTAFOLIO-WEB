import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Card con inclinación 3D según el cursor + brillo que sigue al puntero.
const TiltCard = ({ children, className = '', max = 10, glare = true, ...props }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 220, damping: 18 });
  const rotY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 220, damping: 18 });
  const glareX = useTransform(px, [0, 1], ['0%', '100%']);
  const glareY = useTransform(py, [0, 1], ['0%', '100%']);
  // Hook llamado siempre (nunca condicional) para respetar las reglas de hooks.
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(220px circle at ${x} ${y}, rgba(217,70,239,0.22), transparent 60%)`,
  );

  const handleMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`neon-card ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduced ? undefined : { rotateX: rotX, rotateY: rotY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      {...props}
    >
      {glare && !reduced && (
        <motion.span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: glareBg,
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default TiltCard;
