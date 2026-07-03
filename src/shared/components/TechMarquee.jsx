import './TechMarquee.css';

// Cinta infinita de tecnologías (se duplica el contenido para loop continuo).
const TechMarquee = ({ items = [], reverse = false }) => (
  <div className="marquee" aria-hidden="true">
    <div className={`marquee__track ${reverse ? 'is-reverse' : ''}`}>
      {[...items, ...items].map((item, i) => (
        <span className="marquee__item" key={`${item}-${i}`}>
          {item}
          <span className="marquee__dot" />
        </span>
      ))}
    </div>
  </div>
);

export default TechMarquee;
