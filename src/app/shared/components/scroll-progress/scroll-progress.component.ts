import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

/**
 * Thin reading-progress bar fixed at the top of the viewport.
 * Uses native scroll events + a Signal for OnPush compat.
 * No external dependencies.
 */
@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      data-print-hide
      aria-hidden="true"
      class="progress-bar"
      [style.transform]="'scaleX(' + progress() + ')'"
    ></div>
  `,
  styles: [`
    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--clr-primary);
      transform-origin: left;
      z-index: 60;
      box-shadow: 0 0 8px var(--clr-primary);
      pointer-events: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .progress-bar {
        transition: none;
      }
    }
  `],
})
export class ScrollProgressComponent implements OnInit, OnDestroy {
  readonly progress = signal(0);

  private onScroll = (): void => {
    const el = document.documentElement;
    const scrolled = el.scrollTop || document.body.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    this.progress.set(total > 0 ? scrolled / total : 0);
  };

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.onScroll);
  }
}
