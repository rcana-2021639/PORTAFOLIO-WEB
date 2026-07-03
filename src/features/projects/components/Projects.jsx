import { Check, ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from '../../../shared/components/BrandIcons';
import SectionHeading from '../../../shared/components/SectionHeading';
import Reveal from '../../../shared/components/Reveal';
import Parallax from '../../../shared/components/Parallax';
import TiltCard from '../../../shared/components/TiltCard';
import { projects } from '../../../shared/data/projects';
import './Projects.css';

const Projects = () => (
  <section id="proyectos" className="section projects">
    <Parallax as="span" speed={80} className="blob projects__blob is-parallax" aria-hidden="true" />
    <div className="container">
      <SectionHeading
        index="05 /"
        eyebrow="Proyectos"
        title="Cosas que he"
        highlight="construido"
        subtitle="Proyectos donde apliqué lo aprendido. Código disponible en GitHub para que explores el detalle."
      />

      <div className="projects__grid">
        {projects.map((p, i) => (
          <Reveal
            key={p.id}
            direction="up"
            delay={i * 0.07}
            className={p.featured ? 'projects__cell is-featured' : 'projects__cell'}
          >
            <TiltCard className="project-card" max={6}>
              <div className="project-card__media">
                <img src={p.image} alt={`Vista de ${p.title}`} loading="lazy" />
                {p.featured && (
                  <span className="project-card__badge">
                    <Star size={13} /> Destacado
                  </span>
                )}
                <span className="project-card__year mono">{p.year}</span>
              </div>

              <div className="project-card__body">
                <span className="project-card__sub mono">{p.subtitle}</span>
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.description}</p>

                <ul className="project-card__learned">
                  {p.learned.map((point) => (
                    <li key={point}>
                      <Check size={15} /> {point}
                    </li>
                  ))}
                </ul>

                <div className="project-card__tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>

                <div className="project-card__actions">
                  <a className="neon-btn" href={p.repo} target="_blank" rel="noreferrer">
                    <GithubIcon size={18} /> Ver código
                  </a>
                  {p.demo && (
                    <a className="neon-btn ghost" href={p.demo} target="_blank" rel="noreferrer">
                      <ExternalLink size={18} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
