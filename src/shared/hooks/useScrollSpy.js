import { useEffect, useState } from 'react';

// Observa las secciones y devuelve el id de la que está activa en viewport.
export const useScrollSpy = (ids, options) => {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: options?.rootMargin ?? '-45% 0px -50% 0px',
        threshold: options?.threshold ?? [0, 0.25, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, options?.rootMargin, options?.threshold]);

  return activeId;
};
