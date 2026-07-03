// Une clases condicionalmente (ignora falsy). Alternativa ligera a clsx.
export const cn = (...classes) => classes.filter(Boolean).join(' ');
