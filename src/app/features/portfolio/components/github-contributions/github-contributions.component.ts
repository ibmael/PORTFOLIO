import {
  Component,
  ChangeDetectionStrategy,
  signal,
  afterNextRender,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ScrollRevealComponent } from '../../../../shared/components/scroll-reveal/scroll-reveal.component';
import { DecryptTextDirective } from '../../../../shared/directives/decrypt-text.directive';

// ── Types ────────────────────────────────────────────────────

interface ContributionDay {
  date: string;   // 'YYYY-MM-DD'
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

// ── Constants ────────────────────────────────────────────────

const GITHUB_USERNAME = 'ibmael';
const GITHUB_URL = 'https://github.com/ibmael';
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** Converts JS day-of-week (0=Sun) to ISO (0=Mon). */
function toIsoDay(jsDay: number): number {
  return (jsDay + 6) % 7;
}

/**
 * Builds a 53-column × 7-row calendar grid (ISO weeks, Mon–Sun)
 * from the flat contributions array returned by the API.
 *
 * Column 0 = oldest week, column 52 = current week.
 * Row 0 = Monday, Row 6 = Sunday.
 */
function buildCalendarGrid(contributions: ContributionDay[]): number[][] {
  // Build a fast lookup: date-string → level
  const levelMap = new Map<string, number>();
  for (const day of contributions) {
    levelMap.set(day.date, day.level);
  }

  // Anchor: Monday of the current week
  const today = new Date();
  const anchorMonday = new Date(today);
  anchorMonday.setDate(today.getDate() - toIsoDay(today.getDay()));
  anchorMonday.setHours(0, 0, 0, 0);

  // Start date: 52 full weeks before the current Monday
  const start = new Date(anchorMonday);
  start.setDate(start.getDate() - 52 * 7);

  return Array.from({ length: 53 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      // Avoid UTC drift — format manually
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return levelMap.get(`${yyyy}-${mm}-${dd}`) ?? 0;
    }),
  );
}

/** Sum all contribution counts across the returned range. */
function sumContributions(contributions: ContributionDay[]): number {
  return contributions.reduce((acc, c) => acc + c.count, 0);
}

// ── Component ────────────────────────────────────────────────

@Component({
  selector: 'app-github-contributions',
  standalone: true,
  imports: [ScrollRevealComponent, DecryptTextDirective, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './github-contributions.component.html',
  styleUrl: './github-contributions.component.css',
})
export class GithubContributionsComponent {
  readonly githubUrl = GITHUB_URL;
  readonly username = GITHUB_USERNAME;
  readonly months = MONTHS;

  /** Calendar grid — starts as empty placeholder, replaced with real data on load. */
  readonly weeks = signal<number[][]>(
    Array.from({ length: 53 }, () => Array.from({ length: 7 }, () => 0)),
  );

  /** Null = not yet loaded; 0+ = real count. */
  readonly totalContributions = signal<number | null>(null);

  /** True while the fetch is in flight. */
  readonly isLoading = signal(true);

  constructor() {
    // afterNextRender only fires in the browser, never during SSR.
    afterNextRender(() => {
      void this.loadContributions();
    });
  }

  private async loadContributions(): Promise<void> {
    try {
      const response = await fetch(API_URL, {
        signal: AbortSignal.timeout(8_000),
      });

      if (!response.ok) {
        // Server returned a non-2xx status — fall back silently.
        return;
      }

      const data: ContributionsResponse = await response.json() as ContributionsResponse;
      this.weeks.set(buildCalendarGrid(data.contributions));
      this.totalContributions.set(sumContributions(data.contributions));
    } catch {
      // Network error or timeout — fall back to empty grid silently.
      // No error message is shown to portfolio visitors.
    } finally {
      this.isLoading.set(false);
    }
  }

  /** Maps a contribution level (0–4) to a CSS modifier class. */
  cellClass(level: number): string {
    if (level >= 4) return 'gh-cell--l4';
    if (level === 3) return 'gh-cell--l3';
    if (level === 2) return 'gh-cell--l2';
    if (level === 1) return 'gh-cell--l1';
    return 'gh-cell--l0';
  }

  /** Formats a contribution count with locale-aware thousand separators. */
  formatCount(n: number): string {
    return n.toLocaleString();
  }
}
