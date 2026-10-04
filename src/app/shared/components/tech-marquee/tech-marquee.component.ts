import { Component, ChangeDetectionStrategy } from '@angular/core';

// Ibrahim's real tech stack — no fabrications
const TECH_ITEMS = [
  'Angular',
  'TypeScript',
  'React',
  'React Native',
  'Flutter',
  'Tailwind CSS',
  'RxJS',
  'Angular Signals',
  'Redux Toolkit',
  'REST APIs',
  'Git & GitHub',
  'Figma',
  'Vite',
  'Next.js',
  'Accessibility',
];

/**
 * Continuously scrolling tech strip using CSS @keyframes marquee.
 * Items are doubled for seamless loop. Pauses on prefers-reduced-motion.
 */
@Component({
  selector: 'app-tech-marquee',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      data-print-hide
      class="marquee-wrapper"
      aria-label="Technologies I work with"
    >
      <!-- Left fade -->
      <div class="marquee-fade marquee-fade--left" aria-hidden="true"></div>
      <!-- Right fade -->
      <div class="marquee-fade marquee-fade--right" aria-hidden="true"></div>

      <!-- Scrolling track — items duplicated for seamless loop -->
      <div class="marquee-track" aria-hidden="true">
        @for (item of allItems; track $index) {
          <span class="marquee-item">
            <span class="marquee-slash">/</span> {{ item }}
          </span>
        }
      </div>
    </div>
  `,
  styles: [`
    .marquee-wrapper {
      position: relative;
      overflow: hidden;
      border-top: 1px solid var(--clr-border);
      border-bottom: 1px solid var(--clr-border);
      background: hsl(var(--background));
      padding-block: 0.875rem;
    }

    .marquee-fade {
      position: absolute;
      inset-block: 0;
      z-index: 10;
      width: 5rem;
      pointer-events: none;
    }

    .marquee-fade--left {
      left: 0;
      background: linear-gradient(to right, hsl(var(--background)), transparent);
    }

    .marquee-fade--right {
      right: 0;
      background: linear-gradient(to left, hsl(var(--background)), transparent);
    }

    .marquee-track {
      display: flex;
      width: max-content;
      gap: 2.5rem;
      animation: marquee 30s linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .marquee-track {
        animation: none;
      }
    }

    .marquee-item {
      white-space: nowrap;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8125rem;
      color: var(--clr-muted-fg);
    }

    .marquee-slash {
      color: var(--clr-primary);
      margin-right: 0.2rem;
    }

    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
  `],
})
export class TechMarqueeComponent {
  /** Items doubled so the track loops seamlessly */
  readonly allItems = [...TECH_ITEMS, ...TECH_ITEMS];
}
