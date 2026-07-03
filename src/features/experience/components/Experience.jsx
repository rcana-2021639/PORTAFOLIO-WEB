import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BookOpen, Briefcase, GraduationCap, MapPin } from 'lucide-react';
import SectionHeading from '../../../shared/components/SectionHeading';
import Reveal from '../../../shared/components/Reveal';
import Certificates from './Certificates';
import { timeline } from '../../../shared/data/experience';
import './Experience.css';

const typeMeta = {
  education: { icon: GraduationCap, label: 'Educación' },
  experience: { icon: Briefcase, label: 'Experiencia' },
  course: { icon: BookOpen, label: 'Curso' },
};

const Experience = () => {
  const listRef = useRef(null);
  // La línea de la trayectoria se "dibuja" conforme avanza el scroll por la lista.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 60%'],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.3 });

  return (
    <section id="trayectoria" className="section experience">
      <div className="container">
        <SectionHeading
          index="03 /"
          eyebrow="Trayectoria"
          title="Educación &"
          highlight="cursos"
          subtitle="Mi formación como Perito en Informática, los cursos con los que refuerzo mis bases técnicas y los certificados que lo respaldan."
        />

        <ol className="timeline" ref={listRef}>
          <motion.span
            className="timeline__progress"
            aria-hidden="true"
            style={{ scaleY: drawn }}
          />
          {timeline.map((item, i) => {
            const meta = typeMeta[item.type] ?? typeMeta.experience;
            const Icon = meta.icon;
            return (
              <Reveal as="li" key={item.id} direction="up" delay={i * 0.06} className="timeline__item">
                <motion.span
                  className="timeline__node"
                  initial={{ scale: 0.3, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Icon size={16} />
                </motion.span>

                <div className="timeline__card neon-card">
                  <div className="timeline__top">
                    <span className={`timeline__tag is-${item.type}`}>{meta.label}</span>
                    <span className="timeline__period mono">{item.period}</span>
                  </div>

                  <h3 className="timeline__title">{item.title}</h3>
                  <p className="timeline__org">
                    {item.org} <span className="timeline__loc"><MapPin size={13} /> {item.location}</span>
                  </p>
                  <p className="timeline__desc">{item.description}</p>

                  <div className="timeline__tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="chip">{tag}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Certificates />
      </div>
    </section>
  );
};

export default Experience;
