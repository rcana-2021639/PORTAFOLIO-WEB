import { createElement, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '../../../shared/components/SectionHeading';
import Reveal from '../../../shared/components/Reveal';
import Parallax from '../../../shared/components/Parallax';
import TiltCard from '../../../shared/components/TiltCard';
import SkillBar from '../../../shared/components/SkillBar';
import { skillGroups } from '../../../shared/data/skills';
import { getIcon } from '../../../shared/components/iconMap';
import './Skills.css';

const Skills = () => {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];

  return (
    <section id="skills" className="section skills">
      <Parallax as="span" speed={70} className="blob skills__blob is-parallax" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          index="02 /"
          eyebrow="Habilidades"
          title="Diseño +"
          highlight="stack completo"
          subtitle="Mi fuerte es el diseño de interfaces y la experiencia de usuario, pero me muevo en toda la pila: frontend, backend, bases de datos y las herramientas para llevar un producto de la idea al deploy."
        />

        {/* Filtro por categorías */}
        <Reveal direction="up" className="skills__tabs" role="tablist" aria-label="Categorías de habilidades">
          {skillGroups.map((group) => {
            const Icon = getIcon(group.icon);
            const isActive = group.id === activeId;
            return (
              <button
                key={group.id}
                role="tab"
                aria-selected={isActive}
                className={`skills__tab${isActive ? ' is-active' : ''}`}
                style={{ '--accent': group.accent }}
                onClick={() => setActiveId(group.id)}
              >
                {isActive && (
                  <motion.span layoutId="skills-tab-bg" className="skills__tab-bg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <Icon size={17} />
                <span>{group.title}</span>
              </button>
            );
          })}
        </Reveal>

        {/* Panel de la categoría activa */}
        <TiltCard className="skills__panel" max={4} glare>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="skills__panel-inner"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="skills__panel-head">
                <span className="skills__icon" style={{ '--accent': active.accent }}>
                  {createElement(getIcon(active.icon), { size: 24 })}
                </span>
                <div>
                  <h3 className="skills__panel-title">{active.title}</h3>
                  <p className="skills__panel-blurb">{active.blurb}</p>
                </div>
                <span className="skills__panel-count mono" style={{ '--accent': active.accent }}>
                  {active.skills.length} skills
                </span>
              </header>

              <div className="skills__bars">
                {active.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    accent={active.accent}
                    delay={si * 0.05}
                    inProgress={skill.inProgress}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </TiltCard>
      </div>
    </section>
  );
};

export default Skills;
