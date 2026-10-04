import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';

function formatCairoTime(): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Cairo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

/**
 * Availability badge showing a pulsing dot + status + live Cairo time.
 * Updates every 30 seconds. Cleans up interval on destroy.
 */
@Component({
  selector: 'app-availability-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="badge">
      <!-- Pulsing dot -->
      <span class="dot-wrapper" aria-hidden="true">
        @if (isOnline()) {
          <span class="dot-ping"></span>
        }
        <span class="dot" [class.dot--online]="isOnline()"></span>
      </span>

      <!-- Status text -->
      <span class="status" [class.status--online]="isOnline()">
        {{ isOnline() ? 'Available for work' : 'Offline — back soon' }}
      </span>

      <!-- Time -->
      <span class="time" aria-label="Cairo local time">
        · Cairo {{ time() }}
      </span>
    </div>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: 9999px;
      border: 1px solid var(--clr-border);
      background: hsl(var(--card) / 0.7);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      padding: 0.25rem 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
    }

    .dot-wrapper {
      position: relative;
      display: flex;
      width: 0.5rem;
      height: 0.5rem;
    }

    .dot-ping {
      position: absolute;
      display: inline-flex;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--clr-primary);
      opacity: 0.75;
      animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    .dot {
      position: relative;
      display: inline-flex;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: var(--clr-muted-fg);
    }

    .dot--online {
      background: var(--clr-primary);
    }

    .status {
      color: var(--clr-muted-fg);
    }

    .status--online {
      color: var(--clr-primary);
    }

    .time {
      color: var(--clr-muted-fg);
    }

    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .dot-ping {
        animation: none;
      }
    }
  `],
})
export class AvailabilityBadgeComponent implements OnInit, OnDestroy {
  readonly time = signal(formatCairoTime());
  readonly isOnline = signal(false);

  private intervalId?: number;

  ngOnInit(): void {
    this.update();
    if (typeof window !== 'undefined') {
      this.intervalId = window.setInterval(() => this.update(), 30_000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined && typeof window !== 'undefined') {
      window.clearInterval(this.intervalId);
    }
  }

  private update(): void {
    const t = formatCairoTime();
    this.time.set(t);
    const hour = Number(t.split(':')[0]);
    this.isOnline.set(hour >= 9 && hour < 23);
  }
}
