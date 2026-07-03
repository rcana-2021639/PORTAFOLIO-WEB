// ============================================================
// HABILIDADES — Full-Stack con enfoque en diseño (UI/UX).
// Los porcentajes son una autovaloración; puedes ajustarlos cuando quieras.
// Usa `inProgress: true` para marcar algo que estás aprendiendo ("En proceso").
// ============================================================

export const skillGroups = [
  {
    id: 'diseno',
    title: 'Diseño & Experiencia',
    icon: 'PenTool',
    accent: '#d946ef',
    blurb: 'Mi terreno favorito: interfaces con carácter y buen UX.',
    skills: [
      { name: 'Diseño de interfaces (UI)', level: 88 },
      { name: 'Experiencia de usuario (UX)', level: 80 },
      { name: 'Diseño responsive', level: 85 },
      { name: 'Animación & micro-interacciones', level: 78 },
      { name: 'Prototipado & wireframes', level: 72 },
      { name: 'Scene Builder (JavaFX)', level: 76 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'Code2',
    accent: '#a855f7',
    blurb: 'Donde el diseño se vuelve código vivo.',
    skills: [
      { name: 'HTML5 & CSS3', level: 86 },
      { name: 'JavaScript', level: 66 },
      { name: 'React', level: 64 },
      { name: 'Tailwind CSS', level: 62 },
      { name: 'Bootstrap', level: 55 },
      { name: 'JavaFX / FXML', level: 58 },
      { name: 'React Native', level: 22, inProgress: true },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Nube',
    icon: 'Server',
    accent: '#6366f1',
    blurb: 'Servicios, APIs y bases de datos que sostienen el producto.',
    skills: [
      { name: 'Java Web', level: 70 },
      { name: 'Spring Boot', level: 52 },
      { name: 'Node.js', level: 50 },
      { name: 'MySQL', level: 78 },
      { name: 'PostgreSQL', level: 64 },
      { name: 'MongoDB', level: 54 },
      { name: 'GlassFish', level: 48 },
      { name: 'Maven', level: 45 },
      { name: 'Docker', level: 42 },
      { name: '.NET', level: 30 },
    ],
  },
  {
    id: 'lenguajes',
    title: 'Lenguajes',
    icon: 'Terminal',
    accent: '#22d3ee',
    blurb: 'Lenguajes con los que resuelvo día a día.',
    skills: [
      { name: 'Java', level: 72 },
      { name: 'SQL', level: 74 },
      { name: 'JavaScript', level: 66 },
      { name: 'C#', level: 40 },
    ],
  },
  {
    id: 'herramientas',
    title: 'Herramientas & Flujo',
    icon: 'Wrench',
    accent: '#ff5fe1',
    blurb: 'IDEs, control de versiones y metodología de trabajo.',
    skills: [
      { name: 'Git & GitHub', level: 76 },
      { name: 'Visual Studio Code', level: 84 },
      { name: 'Postman', level: 80 },
      { name: 'GitKraken', level: 68 },
      { name: 'NetBeans IDE', level: 58 },
      { name: 'IntelliJ IDEA', level: 46 },
      { name: 'MySQL Workbench', level: 62 },
      { name: 'Metodología Scrum', level: 66 },
      { name: 'Android Studio', level: 20, inProgress: true },
    ],
  },
];

// Cinta de tecnologías (marquee) — sección Hero/Skills
export const techMarquee = [
  'UI / UX', 'React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind',
  'Java', 'Spring Boot', 'Node.js', 'MySQL', 'PostgreSQL', 'MongoDB',
  'Docker', 'Git', 'Figma-style UI', 'Animación', 'Responsive',
];
