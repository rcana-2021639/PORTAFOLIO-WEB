import SectionHeading from '../../../shared/components/SectionHeading';
import Reveal from '../../../shared/components/Reveal';
import Parallax from '../../../shared/components/Parallax';
import TiltCard from '../../../shared/components/TiltCard';
import SkillBar from '../../../shared/components/SkillBar';
import { skillGroups } from '../../../shared/data/skills';
import { getIcon } from '../../../shared/components/iconMap';
import './Skills.css';

const Skills = () => (
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

      <div className="skills__grid">
        {skillGroups.map((group, gi) => {
          const Icon = getIcon(group.icon);
          return (
            <Reveal key={group.id} direction="up" delay={0.08 * gi} className="skills__cell">
              <TiltCard className="skills__card" max={7} glare={false}>
                <header className="skills__card-head">
                  <span className="skills__icon" style={{ '--accent': group.accent }}>
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="skills__card-title">{group.title}</h3>
                    <p className="skills__card-blurb">{group.blurb}</p>
                  </div>
                </header>

                <div className="skills__bars">
                  {group.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      accent={group.accent}
                      delay={si * 0.06}
                      inProgress={skill.inProgress}
                    />
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Skills;
