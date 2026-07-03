// Genera un CV PDF placeholder válido (con xref correcto) en /public.
// Reemplaza public/cv-rhandy.pdf por tu CV real cuando lo tengas.
const fs = require('fs');
const path = require('path');

const objs = [];
objs.push('<< /Type /Catalog /Pages 2 0 R >>');
objs.push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
objs.push(
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
);
const stream = [
  'BT /F1 26 Tf 60 770 Td (Rhandy Estuardo Cana Subuyuj) Tj ET',
  'BT /F1 14 Tf 60 740 Td (Desarrollador Full-Stack - Frontend y UI/UX) Tj ET',
  'BT /F1 12 Tf 60 700 Td (CV de ejemplo. Reemplazar por el real en public/cv-rhandy.pdf) Tj ET',
].join('\n');
objs.push(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
objs.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

let pdf = '%PDF-1.4\n';
const offsets = [];
objs.forEach((o, i) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
});
const xrefOffset = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
offsets.forEach((off) => {
  pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

const out = path.join(__dirname, '..', 'public', 'cv-rhandy.pdf');
fs.writeFileSync(out, pdf, 'latin1');
console.log('CV placeholder generado en', out);
