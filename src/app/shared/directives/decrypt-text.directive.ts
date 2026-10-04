import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

const CHARS = '!<>-_\\/[]{}—=+*^?#01';

/**
 * Terminal-style "decrypt" reveal: scrambles characters, then locks them
 * in left-to-right the first time the element scrolls into view.
 * Respects prefers-reduced-motion.
 *
 * Usage: <span appDecryptText>// section</span>
 */
@Directive({
  selector: '[appDecryptText]',
  standalone: true,
})
export class DecryptTextDirective implements OnInit, OnDestroy {
  /** Characters per frame to scramble (lower = slower reveal) */
  @Input() decryptSpeed = 35;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;
  private timer?: number;
  private started = false;

  ngOnInit(): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduced) return;

    const target = this.el.nativeElement as HTMLElement;
    const originalText = target.textContent ?? '';

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.started) {
          this.started = true;
          this.observer?.disconnect();
          this.run(target, originalText);
        }
      },
      { threshold: 0.4 },
    );

    this.observer.observe(target);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.timer !== undefined) {
      window.clearInterval(this.timer);
    }
  }

  private run(target: HTMLElement, text: string): void {
    let frame = 0;

    this.timer = window.setInterval(() => {
      const locked = Math.floor(frame / 2);
      const output = text
        .split('')
        .map((ch, i) => {
          if (i < locked || ch === ' ') return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      this.renderer.setProperty(target, 'textContent', output);
      frame++;

      if (locked >= text.length) {
        window.clearInterval(this.timer);
        this.timer = undefined;
        this.renderer.setProperty(target, 'textContent', text);
      }
    }, this.decryptSpeed);
  }
}
