import { Maximize2 } from 'lucide-react';
import SectionHeading from '../../../shared/components/SectionHeading';
import Reveal from '../../../shared/components/Reveal';
import Parallax from '../../../shared/components/Parallax';
import { projects } from '../../../shared/data/projects';
import { scrollToSection } from '../../../shared/utils/scroll';
import './Gallery.css';

const Gallery = () => (
  <section id="galeria" className="section gallery">
    <div className="container">
      <SectionHeading
        index="04 /"
        eyebrow="Galería"
        title="Vistas de"
        highlight="mis proyectos"
        subtitle="Un vistazo a las interfaces que he construido. Cada captura cuenta una decisión de diseño."
      />

      <div className="gallery__grid">
        {projects.map((p, i) => (
          <Reveal
            as="figure"
            key={p.id}
            direction="scale"
            delay={i * 0.06}
            className={`gallery__item ${p.featured ? 'is-featured' : ''}`}
            onClick={() => scrollToSection('proyectos')}
          >
            <Parallax className="gallery__media" speed={28}>
              <img src={p.image} alt={`Captura de ${p.title}`} loading="lazy" />
            </Parallax>
            <figcaption className="gallery__overlay">
              <div className="gallery__meta">
                <span className="gallery__year mono">{p.year}</span>
                <h3 className="gallery__title">{p.title}</h3>
                <p className="gallery__sub">{p.subtitle}</p>
              </div>
              <span className="gallery__zoom">
                <Maximize2 size={18} />
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
