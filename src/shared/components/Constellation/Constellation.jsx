import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Constellation.css';

// Paleta cosmos: morados/magenta con toques cian, sobre la nebulosa Aurora.
const DEFAULT_COLORS = ['#b026ff', '#d946ef', '#a855f7', '#7c3aed', '#22d3ee'];

/**
 * Fondo de constelaciones en canvas 2D. Muy liviano:
 * - Pausa cuando no está en pantalla (IntersectionObserver) o la pestaña está oculta.
 * - Limita FPS y DPR; baja densidad en móvil.
 * - Respeta prefers-reduced-motion (pinta un frame estático, sin rAF).
 */
export default function Constellation({
  interactive = false,
  density = 1,
  linkDistance,
  colors = DEFAULT_COLORS,
  speed = 1,
}) {
  const ctnRef = useRef(null);
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctn = ctnRef.current;
    const canvas = canvasRef.current;
    if (!ctn || !canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isMobileUA =
      typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmall = typeof window !== 'undefined' && window.innerWidth <= 980;
    const lowPower = isMobileUA || isSmall;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, lowPower ? 1 : 1.5);
    const targetFPS = lowPower ? 30 : 40;
    const frameInterval = 1000 / targetFPS;

    const rand = (a, b) => a + Math.random() * (b - a);
    const toRgb = (hex) => {
      const h = hex.replace('#', '');
      const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
      const n = parseInt(full, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const rgbColors = colors.map(toRgb);

    let width = 0;
    let height = 0;
    let link = 0;
    let stars = [];
    let shooters = [];

    function build() {
      width = ctn.offsetWidth;
      height = ctn.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const base = Math.round(((width * height) / 16000) * density);
      const count = Math.max(24, Math.min(base, lowPower ? 45 : 72));
      link = linkDistance ?? (lowPower ? 120 : 150);

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-0.14, 0.14) * speed,
        vy: rand(-0.14, 0.14) * speed,
        r: rand(0.6, 1.9),
        rgb: rgbColors[(Math.random() * rgbColors.length) | 0],
        tw: Math.random() * Math.PI * 2,
        twSpeed: rand(0.6, 1.6),
      }));
    }

    // Cursor (relativo al contenedor). Escuchamos en window porque la capa de
    // estrellas es pointer-events:none y no recibe eventos directamente.
    const pointer = { x: -9999, y: -9999, active: false };
    let lastMove = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - lastMove < 24) return;
      lastMove = now;
      const r = ctn.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) {
        pointer.active = false;
        return;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    };

    let nextShoot = performance.now() + rand(2500, 5000);
    function spawnShooter() {
      const ang = rand(Math.PI * 0.12, Math.PI * 0.28);
      const spd = rand(6, 10);
      shooters.push({
        x: rand(0, width * 0.7),
        y: rand(0, height * 0.4),
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        life: 0,
        max: rand(45, 80),
        rgb: rgbColors[(Math.random() * rgbColors.length) | 0],
      });
    }

    function drawLinks() {
      const linkSq = link * link;
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkSq) {
            const alpha = (1 - Math.sqrt(d2) / link) * 0.22;
            ctx.strokeStyle = `rgba(${a.rgb[0]},${a.rgb[1]},${a.rgb[2]},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      drawLinks();
      for (const s of stars) {
        ctx.fillStyle = `rgba(${s.rgb[0]},${s.rgb[1]},${s.rgb[2]},0.8)`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let rafId = 0;
    let last = 0;
    let isVisible = true;
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { rootMargin: '150px' })
        : null;
    io?.observe(ctn);

    const frame = (t) => {
      rafId = requestAnimationFrame(frame);
      if (!isVisible || (typeof document !== 'undefined' && document.hidden)) return;
      if (t - last < frameInterval) return;
      const dt = Math.min((t - last) / 16.67, 2);
      last = t;

      ctx.clearRect(0, 0, width, height);

      // Movimiento + atracción sutil al cursor.
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.x < -10) s.x = width + 10;
        else if (s.x > width + 10) s.x = -10;
        if (s.y < -10) s.y = height + 10;
        else if (s.y > height + 10) s.y = -10;

        if (interactive && pointer.active) {
          const dx = pointer.x - s.x;
          const dy = pointer.y - s.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140 && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = ((1 - d / 140) * 0.35) / d;
            s.x += dx * f * dt;
            s.y += dy * f * dt;
          }
        }
      }

      drawLinks();

      // Líneas del cursor a las estrellas cercanas (más brillantes).
      if (interactive && pointer.active) {
        const cLink = link * 1.1;
        const cLinkSq = cLink * cLink;
        for (const s of stars) {
          const dx = pointer.x - s.x;
          const dy = pointer.y - s.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < cLinkSq) {
            const alpha = (1 - Math.sqrt(d2) / cLink) * 0.5;
            ctx.strokeStyle = `rgba(${s.rgb[0]},${s.rgb[1]},${s.rgb[2]},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(s.x, s.y);
            ctx.stroke();
          }
        }
      }

      // Estrellas con twinkle.
      for (const s of stars) {
        s.tw += 0.02 * s.twSpeed * dt;
        const a = 0.55 + Math.sin(s.tw) * 0.35;
        ctx.fillStyle = `rgba(${s.rgb[0]},${s.rgb[1]},${s.rgb[2]},${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Estrellas fugaces ocasionales.
      if (t > nextShoot) {
        spawnShooter();
        nextShoot = t + rand(3500, 7000);
      }
      for (let k = shooters.length - 1; k >= 0; k--) {
        const sh = shooters[k];
        sh.life += dt;
        sh.x += sh.vx * dt;
        sh.y += sh.vy * dt;
        const p = sh.life / sh.max;
        if (p >= 1 || sh.x > width + 60 || sh.y > height + 60) {
          shooters.splice(k, 1);
          continue;
        }
        const fade = Math.sin(p * Math.PI);
        const tailX = sh.x - sh.vx * 6;
        const tailY = sh.y - sh.vy * 6;
        const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
        grad.addColorStop(0, `rgba(${sh.rgb[0]},${sh.rgb[1]},${sh.rgb[2]},${0.9 * fade})`);
        grad.addColorStop(1, `rgba(${sh.rgb[0]},${sh.rgb[1]},${sh.rgb[2]},0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
    };

    build();

    if (reduced) {
      drawStatic();
    } else {
      rafId = requestAnimationFrame(frame);
      if (interactive) {
        window.addEventListener('mousemove', onMove, { passive: true });
      }
    }

    const onResize = () => {
      build();
      if (reduced) drawStatic();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      io?.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [reduced, interactive, density, linkDistance, colors, speed]);

  return (
    <div ref={ctnRef} className="constellation" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
