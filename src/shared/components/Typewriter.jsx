import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Typewriter.css';

// Escribe y borra frases en bucle. Con reduced-motion muestra la primera fija.
const Typewriter = ({ words = [], typeSpeed = 70, deleteSpeed = 40, pause = 1600 }) => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || !words.length) return undefined;
    const current = words[index % words.length];

    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      // Pasa a la siguiente palabra en el próximo tick (evita setState síncrono
      // dentro del efecto, que dispara renders en cascada).
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 0);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
          );
        },
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, reduced]);

  if (reduced) {
    return <span className="typewriter">{words[0]}</span>;
  }

  return (
    <span className="typewriter">
      {text}
      <span className="typewriter__caret" />
    </span>
  );
};

export default Typewriter;
