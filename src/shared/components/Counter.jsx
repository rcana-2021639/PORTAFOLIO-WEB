import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

// Contador que cuenta hacia arriba cuando entra en viewport.
const Counter = ({ to = 0, suffix = '', duration = 1.8 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

export default Counter;
