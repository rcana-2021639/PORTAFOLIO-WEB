import { ArrowUp, Heart } from 'lucide-react';
import { profile } from '../../data/profile';
import { socials } from '../../data/socials';
import { sections } from '../../data/nav';
import { getIcon } from '../iconMap';
import { scrollToSection } from '../../utils/scroll';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__glow" aria-hidden="true" />
    <div className="container footer__inner">
      <div className="footer__brand">
        <span className="cosmic-logo footer__logo">
          <span className="cosmic-logo__orbit" />
          <span className="cosmic-logo__label">{profile.initials}</span>
        </span>
        <p className="footer__name">{profile.shortName}</p>
        <p className="footer__role muted">
          {profile.role} · {profile.roleAccent}
        </p>
      </div>

      <nav className="footer__nav" aria-label="Navegación del pie">
        {sections.map((s) => (
          <button key={s.id} className="footer__link" onClick={() => scrollToSection(s.id)}>
            {s.label}
          </button>
        ))}
      </nav>

      <div className="footer__socials">
        {socials.map((s) => {
          const Icon = getIcon(s.icon);
          return (
            <a
              key={s.id}
              href={s.url}
              className="footer__social"
              style={{ '--accent': s.accent }}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={s.label}
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </div>

    <div className="container footer__bottom">
      <p className="footer__copy mono">
        © {new Date().getFullYear()} {profile.name}. Hecho con
        <Heart size={13} className="footer__heart" /> y React.
      </p>
      <button className="footer__top" onClick={() => scrollToSection('inicio')} aria-label="Volver arriba">
        Volver arriba <ArrowUp size={15} />
      </button>
    </div>
  </footer>
);

export default Footer;
