import { motion } from 'framer-motion';
import './SkillBar.css';

// Barra de habilidad que crece al entrar en viewport, con porcentaje.
// `inProgress` muestra el estado "En proceso" en lugar del porcentaje.
const SkillBar = ({ name, level, accent = 'var(--purple)', delay = 0, inProgress = false }) => (
  <div className={`skillbar${inProgress ? ' is-wip' : ''}`} style={{ '--accent': accent }}>
    <div className="skillbar__top">
      <span className="skillbar__name">{name}</span>
      {inProgress ? (
        <span className="skillbar__pct skillbar__pct--wip mono">En proceso</span>
      ) : (
        <span className="skillbar__pct mono">{level}%</span>
      )}
    </div>
    <div className="skillbar__track">
      <motion.div
        className="skillbar__fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="skillbar__sheen" aria-hidden="true" />
        <span className="skillbar__spark" />
      </motion.div>
    </div>
  </div>
);

export default SkillBar;
