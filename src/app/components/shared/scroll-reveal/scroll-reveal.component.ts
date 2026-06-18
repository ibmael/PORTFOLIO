import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  inject
} from '@angular/core';

@Component({
  selector: 'app-scroll-reveal',
  standalone: true,
  template: `<div class="reveal h-full" [style.transition-delay.s]="delay"><ng-content /></div>`,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    .reveal {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.6s ease, transform 0.6s ease;
      will-change: opacity, transform;
    }
    .reveal.is-visible,
    .reveal.no-motion {
      opacity: 1;
      transform: translateY(0);
    }
  `
})
export class ScrollRevealComponent implements AfterViewInit, OnDestroy {
  @Input() delay = 0;

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const target = this.host.nativeElement.firstElementChild as HTMLElement | null;
    if (!target) return;

    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.renderer.addClass(target, 'no-motion');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(target, 'is-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );

    this.observer.observe(target);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
