import { cn } from '../utils/cn';

// Botón/enlace con estilo neón reutilizable.
// variant: 'solid' | 'ghost'  ·  renderiza <a> si recibe href, si no <button>.
const NeonButton = ({
  children,
  href,
  variant = 'solid',
  icon: Icon,
  iconRight: IconRight,
  className = '',
  ...props
}) => {
  const classes = cn('neon-btn', variant === 'ghost' && 'ghost', className);
  const content = (
    <>
      {Icon && <Icon size={18} strokeWidth={2.2} />}
      <span>{children}</span>
      {IconRight && <IconRight size={18} strokeWidth={2.2} />}
    </>
  );

  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
};

export default NeonButton;
