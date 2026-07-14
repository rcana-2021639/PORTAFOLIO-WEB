import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './SceneBackground.css';

// Cada zona es una "malla" de gradientes radiales con un tono dominante distinto.
// Al hacer scroll, las capas se funden entre sí (crossfade) para que el fondo
// evolucione: morado → índigo → magenta → violeta-azul → púrpura profundo.
const ZONES = [
  // Inicio / Sobre mí — morado + magenta
  `radial-gradient(1100px 700px at 78% -8%, rgba(124,58,237,0.30), transparent 60%),
   radial-gradient(900px 600px at 6% 18%, rgba(217,70,239,0.16), transparent 58%),
   radial-gradient(1200px 900px at 50% 116%, rgba(99,102,241,0.16), transparent 62%)`,
  // Skills — índigo / azul
  `radial-gradient(1000px 720px at 12% 6%, rgba(99,102,241,0.30), transparent 60%),
   radial-gradient(900px 620px at 88% 40%, rgba(124,58,237,0.22), transparent 60%),
   radial-gradient(1100px 800px at 50% 120%, rgba(34,211,238,0.10), transparent 64%)`,
  // Experiencia — magenta / rosa
  `radial-gradient(1000px 700px at 82% 8%, rgba(217,70,239,0.28), transparent 58%),
   radial-gradient(920px 640px at 8% 60%, rgba(176,38,255,0.22), transparent 60%),
   radial-gradient(1200px 820px at 50% 118%, rgba(255,95,225,0.12), transparent 62%)`,
  // Galería — violeta profundo + cian
  `radial-gradient(980px 700px at 20% 10%, rgba(76,29,149,0.42), transparent 62%),
   radial-gradient(900px 640px at 92% 52%, rgba(34,211,238,0.14), transparent 58%),
   radial-gradient(1200px 860px at 46% 120%, rgba(124,58,237,0.22), transparent 64%)`,
  // Proyectos — púrpura vivo
  `radial-gradient(1020px 720px at 84% 6%, rgba(168,85,247,0.30), transparent 60%),
   radial-gradient(900px 620px at 10% 46%, rgba(99,102,241,0.18), transparent 58%),
   radial-gradient(1200px 860px at 50% 122%, rgba(217,70,239,0.16), transparent 64%)`,
  // Contacto — violeta muy profundo
  `radial-gradient(1000px 760px at 26% 4%, rgba(59,17,120,0.55), transparent 64%),
   radial-gradient(920px 640px at 88% 48%, rgba(176,38,255,0.22), transparent 60%),
   radial-gradient(1300px 900px at 50% 118%, rgba(76,29,149,0.4), transparent 66%)`,
];

const SceneLayer = ({ progress, index, count, gradient }) => {
  const step = 1 / (count - 1);
  const center = index * step;

  // IMPORTANTE: framer-motion acelera las animaciones ligadas al scroll con la
  // Web Animations API y usa este array de entrada como "offsets" de keyframes,
  // que DEBEN estar dentro de [0,1] y ser crecientes. Por eso recortamos los
  // extremos (la primera y la última capa usan solo 2 puntos).
  let input;
  let output;
  if (index === 0) {
    input = [0, step];
    output = [1, 0];
  } else if (index === count - 1) {
    input = [1 - step, 1];
    output = [0, 1];
  } else {
    input = [center - step, center, center + step];
    output = [0, 1, 0];
  }

  const opacity = useTransform(progress, input, output);
  return <motion.div className="scene__layer" style={{ backgroundImage: gradient, opacity }} />;
};

const SceneBackground = () => {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduced) {
    return (
      <div className="scene" aria-hidden="true">
        <div className="scene__layer" style={{ backgroundImage: ZONES[0], opacity: 1 }} />
      </div>
    );
  }

  return (
    <div className="scene" aria-hidden="true">
      {ZONES.map((gradient, i) => (
        <SceneLayer key={i} progress={scrollYProgress} index={i} count={ZONES.length} gradient={gradient} />
      ))}
    </div>
  );
};

export default SceneBackground;
