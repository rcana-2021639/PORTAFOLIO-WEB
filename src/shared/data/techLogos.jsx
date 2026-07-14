// ============================================================
// LOGOS DE TECNOLOGÍAS — cinta LogoLoop del Hero.
// Iconos de marca reales (react-icons) con su color oficial.
// ============================================================
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiSpringboot,
  SiFigma,
  SiSharp,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

export const techLogos = [
  { node: <SiReact style={{ color: '#61DAFB' }} />, title: 'React', href: 'https://react.dev' },
  { node: <SiJavascript style={{ color: '#F7DF1E' }} />, title: 'JavaScript', href: 'https://developer.mozilla.org/docs/Web/JavaScript' },
  { node: <SiHtml5 style={{ color: '#E34F26' }} />, title: 'HTML5', href: 'https://developer.mozilla.org/docs/Web/HTML' },
  { node: <SiCss style={{ color: '#663399' }} />, title: 'CSS', href: 'https://developer.mozilla.org/docs/Web/CSS' },
  { node: <SiTailwindcss style={{ color: '#38BDF8' }} />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <FaJava style={{ color: '#EA2D2E' }} />, title: 'Java', href: 'https://www.java.com' },
  { node: <SiSpringboot style={{ color: '#6DB33F' }} />, title: 'Spring Boot', href: 'https://spring.io/projects/spring-boot' },
  { node: <SiNodedotjs style={{ color: '#5FA04E' }} />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiMysql style={{ color: '#4479A1' }} />, title: 'MySQL', href: 'https://www.mysql.com' },
  { node: <SiPostgresql style={{ color: '#4169E1' }} />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
  { node: <SiMongodb style={{ color: '#47A248' }} />, title: 'MongoDB', href: 'https://www.mongodb.com' },
  { node: <SiDocker style={{ color: '#2496ED' }} />, title: 'Docker', href: 'https://www.docker.com' },
  { node: <SiGit style={{ color: '#F05032' }} />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiSharp style={{ color: '#9B4F96' }} />, title: 'C#', href: 'https://learn.microsoft.com/dotnet/csharp/' },
  { node: <SiFigma style={{ color: '#F24E1E' }} />, title: 'Figma', href: 'https://figma.com' },
];
