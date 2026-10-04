import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';

/**
 * Subtle 3D tilt + radial light-follow effect on the host element.
 * Falls back gracefully for touch devices and prefers-reduced-motion users.
 *
 * Works entirely via CSS custom properties set on the host element —
 * no Framer Motion required.
 *
 * Usage:
 *   <article appTiltCard class="...">...</article>
 *
 * Required CSS on host or a descendant:
 *   transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
 */
@Directive({
  selector: '[appTiltCard]',
  standalone: true,
  host: {
    '[style.transition]': '"transform 0.1s ease"',
    '[style.will-change]': '"transform"',
  },
})
export class TiltCardDirective implements OnInit {
  private readonly el = inject(ElementRef<HTMLElement>);
  private reduced = false;
  /** Max tilt in degrees */
  private readonly intensity = 6;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (this.reduced) return;
    const el = this.el.nativeElement;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0→1
    const py = (e.clientY - rect.top) / rect.height;   // 0→1
    const rx = (py - 0.5) * this.intensity * 2;         // rotateX (+ = forward tilt)
    const ry = (px - 0.5) * this.intensity * -2;        // rotateY

    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty('--glow-x', `${px * 100}%`);
    el.style.setProperty('--glow-y', `${py * 100}%`);
    el.style.setProperty('--glow-opacity', '1');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    const el = this.el.nativeElement;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    el.style.setProperty('--glow-opacity', '0');
  }
}
