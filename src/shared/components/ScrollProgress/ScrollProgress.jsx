import { motion, useScroll, useSpring } from 'framer-motion';
import './ScrollProgress.css';

// Barra fina de progreso de scroll en el borde superior.
// Solo anima scaleX (GPU-friendly, no dispara reflow).
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
