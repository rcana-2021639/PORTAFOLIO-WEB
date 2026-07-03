// ============================================================
// EDUCACIÓN Y CURSOS — timeline (datos reales del CV).
// type: 'education' | 'course'
// ============================================================

export const timeline = [
  {
    id: 'diversificado',
    type: 'education',
    period: '2024 — 2025',
    title: 'Perito en Informática',
    org: 'Centro Educativo Técnico Laboral Kinal',
    location: 'Guatemala',
    description:
      'Formación en el ciclo diversificado con enfoque en informática: desarrollo web básico, bases de datos, hardware, software y trabajo en equipo.',
    tags: ['Informática', 'Desarrollo web', 'Bases de datos'],
  },
  {
    id: 'intecap-bd',
    type: 'course',
    period: '2025',
    title: 'Introducción a Bases de Datos',
    org: 'INTECAP',
    location: 'Guatemala',
    description:
      'Curso sobre fundamentos de bases de datos relacionales, modelado y consultas con MySQL.',
    tags: ['MySQL', 'SQL', 'Modelado'],
  },
  {
    id: 'kinal-itessentials',
    type: 'course',
    period: '2024',
    title: 'IT Essentials: PC Hardware and Software',
    org: 'Centro Educativo Técnico Laboral KINAL',
    location: 'Guatemala',
    description:
      'Curso de fundamentos de hardware y software de PC: componentes, ensamblaje, sistemas operativos y nociones de redes.',
    tags: ['Hardware', 'Software', 'Redes'],
  },
  {
    id: 'basicos',
    type: 'education',
    period: 'Ciclo básico',
    title: 'Educación Básica',
    org: 'Centro Educativo Técnico Laboral Kinal',
    location: 'Guatemala',
    description: 'Ciclo básico con primer acercamiento al área técnica e informática.',
    tags: ['Formación general'],
  },
  {
    id: 'primaria',
    type: 'education',
    period: 'Primaria',
    title: 'Educación Primaria',
    org: 'Liceo Salesiano',
    location: 'Guatemala',
    description: 'Educación primaria, base de mi formación académica y de valores.',
    tags: ['Formación general'],
  },
];

// ============================================================
// CERTIFICADOS / DIPLOMAS — fotos de los certificados de tus cursos.
//
// CÓMO AGREGAR TUS FOTOS:
//   1. Guarda la foto/scan del diploma en:  public/images/certificados/
//      (crea la carpeta "certificados" si no existe).
//   2. Usa el nombre de archivo que pongas aquí en `image`.
//      Ej: public/images/certificados/bases-de-datos.jpg
//   3. Formatos recomendados: .jpg o .png (horizontal se ve mejor).
//   Mientras no exista la foto, se muestra un marcador de posición.
// ============================================================
export const certificates = [
  {
    id: 'cert-bases-datos',
    title: 'Introducción a Bases de Datos',
    issuer: 'INTECAP',
    year: '2025',
    image: '/images/certificados/bases-de-datos.jpg',
  },
  {
    id: 'cert-it-essentials',
    title: 'IT Essentials: PC Hardware and Software',
    issuer: 'Cisco Networking Academy · Kinal',
    year: '2024',
    image: '/images/certificados/it-essentials.jpg',
  },
  {
    id: 'cert-perito',
    title: 'Perito Técnico en Informática',
    issuer: 'Centro Educativo Técnico Laboral Kinal',
    year: '2025',
    image: '/images/certificados/perito-informatica.jpg',
  },
  {
    id: 'cert-ccna',
    title: 'Fundamentos de Redes (CCNA)',
    issuer: 'Cisco Networking Academy',
    year: '2024',
    image: '/images/certificados/ccna.jpg',
  },
];
