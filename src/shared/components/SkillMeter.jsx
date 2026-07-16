import { useId } from 'react';
import { motion } from 'framer-motion';
import Counter from './Counter';
import './SkillMeter.css';

const R = 30;
const C = 2 * Math.PI * R;

// Medidor radial de habilidad: anillo con trazo de gradiente que se dibuja al
// entrar en viewport y porcentaje con count-up. `inProgress` muestra el estado
// "En proceso" con un anillo indeterminado en lugar del porcentaje.
const SkillMeter = ({ name, level, accent = 'var(--section-accent)', delay = 0, inProgress = false }) => {
  const uid = useId().replace(/:/g, '');
  const gid = `sm-grad-${uid}`;
  const offset = C * (1 - level / 100);

  return (
    <div className={`skillmeter${inProgress ? ' is-wip' : ''}`} style={{ '--accent': accent }}>
      <div className="skillmeter__ring">
        <svg viewBox="0 0 72 72" className="skillmeter__svg" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="color-mix(in srgb, var(--accent) 55%, #ffffff)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
          <circle className="skillmeter__track-c" cx="36" cy="36" r={R} />
          {inProgress ? (
            <circle
              className="skillmeter__wip-c"
              cx="36"
              cy="36"
              r={R}
              stroke={`url(#${gid})`}
              strokeDasharray={`${C * 0.28} ${C}`}
            />
          ) : (
            <motion.circle
              className="skillmeter__fill-c"
              cx="36"
              cy="36"
              r={R}
              stroke={`url(#${gid})`}
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              whileInView={{ strokeDashoffset: offset }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </svg>
        <div className="skillmeter__center">
          {inProgress ? (
            <span className="skillmeter__wip-dot" aria-hidden="true" />
          ) : (
            <span className="skillmeter__pct">
              <Counter to={level} suffix="%" duration={1.4} />
            </span>
          )}
        </div>
      </div>
      <div className="skillmeter__meta">
        <span className="skillmeter__name">{name}</span>
        <span className="skillmeter__state mono">{inProgress ? 'En proceso' : 'Dominio'}</span>
      </div>
    </div>
  );
};

export default SkillMeter;
