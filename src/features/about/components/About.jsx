import { motion } from 'framer-motion';
import {
  Award,
  CalendarDays,
  Clock3,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Target,
} from 'lucide-react';
import SectionHeading from '../../../shared/components/SectionHeading';
import Reveal from '../../../shared/components/Reveal';
import SpotlightCard from '../../../shared/components/SpotlightCard';
import { profile } from '../../../shared/data/profile';
import './About.css';

// Cada tarjeta lleva su propio matiz morado para que la rejilla no se vea plana.
const detailItems = [
  { icon: CalendarDays, label: 'Edad', value: profile.details.age, accent: 'var(--grape)' },
  { icon: MapPin, label: 'Ubicación', value: profile.details.location, accent: 'var(--indigo)' },
  { icon: Mail, label: 'Email', value: profile.details.email, accent: 'var(--purple)' },
  { icon: Phone, label: 'Teléfono', value: profile.details.phone, accent: 'var(--orchid)' },
  { icon: Clock3, label: 'Experiencia', value: profile.details.experience, accent: 'var(--magenta)' },
  { icon: GraduationCap, label: 'Formación', value: profile.details.studying, accent: 'var(--violet)' },
  { icon: Languages, label: 'Idiomas', value: profile.details.languages, accent: 'var(--fuchsia)' },
];

const About = () => (
  <section id="sobre-mi" className="section about">
    <div className="container">
      <SectionHeading
        index="01 /"
        eyebrow="Sobre mí"
        title="Desarrollador que"
        highlight="diseña con código"
        subtitle="Mezclo ingeniería y diseño para construir productos digitales rápidos, accesibles y con personalidad."
      />

      <div className="about__grid">
        {/* Columna visual */}
        <Reveal direction="right" className="about__visual">
          <div className="about__avatar-wrap">
            <span className="about__avatar-glow" aria-hidden="true" />
            <div className="about__avatar conic-border">
              <img
                src={profile.avatar}
                alt={`Foto de ${profile.name}`}
                onError={(e) => {
                  // Fallback mientras no exista la foto real (avatar.jpg).
                  if (!e.currentTarget.dataset.fallback) {
                    e.currentTarget.dataset.fallback = '1';
                    e.currentTarget.src = '/images/avatar.svg';
                  }
                }}
              />
            </div>
            <motion.span
              className="about__float-badge glass"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="dot" /> {profile.details.experience}
            </motion.span>
          </div>
        </Reveal>

        {/* Columna texto */}
        <div className="about__content">
          {profile.bio.map((paragraph, i) => (
            <Reveal key={i} direction="up" delay={0.05 * i} className="about__bio">
              <p>{paragraph}</p>
            </Reveal>
          ))}

          <Reveal direction="up" delay={0.1} className="about__goals">
            <span className="about__goals-title">
              <Target size={16} /> Mis metas
            </span>
            <ul>
              {profile.goals.map((goal) => (
                <li key={goal} className="about__goal">
                  {goal}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="up" delay={0.15} className="about__competencies">
            <span className="about__goals-title">
              <Award size={16} /> Competencias
            </span>
            <div className="about__chips">
              {profile.competencies.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Datos generales */}
      <div className="about__details">
        {detailItems.map((item, i) => (
          <Reveal key={item.label} direction="up" delay={0.04 * i}>
            <SpotlightCard className="about__detail" accent={item.accent}>
              <span className="about__detail-icon">
                <item.icon size={18} />
              </span>
              <span className="about__detail-label">{item.label}</span>
              <strong className="about__detail-value">{item.value}</strong>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
