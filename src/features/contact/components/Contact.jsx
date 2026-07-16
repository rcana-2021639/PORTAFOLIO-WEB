import { ArrowUpRight, Mail, MapPin, Phone, Send } from 'lucide-react';
import AnimatedTitle from '../../../shared/components/AnimatedTitle';
import Reveal from '../../../shared/components/Reveal';
import NeonButton from '../../../shared/components/NeonButton';
import MagneticButton from '../../../shared/components/MagneticButton';
import Aurora from '../../../shared/components/Aurora/Aurora';
import CurvedInput from '../../../shared/components/reactbits/CurvedInput/CurvedInput';
import { socials, contactInfo } from '../../../shared/data/socials';
import { getIcon } from '../../../shared/components/iconMap';
import './Contact.css';

const handleQuickMail = (value) => {
  const email = (value || '').trim();
  const subject = encodeURIComponent('Contacto desde el portafolio');
  const body = encodeURIComponent(
    email ? `¡Hola Rhandy! Me gustaría contactarte. Mi correo es ${email}.` : ''
  );
  window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
};

const Contact = () => (
  <section id="contacto" className="section contact">
    <div className="contact__aurora" aria-hidden="true">
      <Aurora colorStops={['#6366f1', '#b026ff', '#ff5fe1']} amplitude={0.9} blend={0.6} speed={0.6} />
    </div>

    <div className="container contact__inner">
      <Reveal direction="up" className="contact__eyebrow">
        <span className="eyebrow"><span className="dot" /> 06 / Contacto</span>
      </Reveal>

      <AnimatedTitle as="h2" className="contact__title">
        ¿Construimos algo <span className="gradient-text">juntos?</span>
      </AnimatedTitle>

      <Reveal direction="up" delay={0.1} className="contact__lead">
        <p>
          Estoy disponible para prácticas, proyectos y nuevas oportunidades. Conectemos en
          LinkedIn o escríbeme directo — respondo rápido.
        </p>
      </Reveal>

      <Reveal direction="up" delay={0.18} className="contact__cta">
        <MagneticButton>
          <NeonButton href={`mailto:${contactInfo.email}`} icon={Send}>
            Enviar un mensaje
          </NeonButton>
        </MagneticButton>
      </Reveal>

      {/* Captura rápida de correo — input curvo (React Bits) */}
      <Reveal direction="up" delay={0.24} className="contact__curved">
        <span className="contact__curved-hint mono">o déjame tu correo y te escribo</span>
        <CurvedInput
          theme="dark"
          type="email"
          placeholder="tu@correo.com"
          buttonText="Escríbeme"
          width="100%"
          bend={26}
          height={62}
          buttonColor="#d946ef"
          backgroundColor="#160d2c"
          borderColor="#392e4e"
          onSubmit={handleQuickMail}
        />
      </Reveal>

      {/* Redes */}
      <div className="contact__socials">
        {socials.map((s, i) => {
          const Icon = getIcon(s.icon);
          return (
            <Reveal
              key={s.id}
              direction="up"
              delay={0.05 * i}
              as="a"
              href={s.url}
              className="contact__social neon-card"
              style={{ '--accent': s.accent }}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
            >
              <span className="contact__social-icon">
                <Icon size={22} />
              </span>
              <div className="contact__social-text">
                <span className="contact__social-label">{s.label}</span>
                <span className="contact__social-handle mono">{s.handle}</span>
              </div>
              <ArrowUpRight size={18} className="contact__social-arrow" />
            </Reveal>
          );
        })}
      </div>

      {/* Datos directos */}
      <Reveal direction="up" delay={0.2} className="contact__info">
        <a href={`mailto:${contactInfo.email}`} className="contact__info-item">
          <Mail size={16} /> {contactInfo.email}
        </a>
        <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="contact__info-item">
          <Phone size={16} /> {contactInfo.phone}
        </a>
        <span className="contact__info-item">
          <MapPin size={16} /> {contactInfo.location}
        </span>
      </Reveal>
    </div>
  </section>
);

export default Contact;
