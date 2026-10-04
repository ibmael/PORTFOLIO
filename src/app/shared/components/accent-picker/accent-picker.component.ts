import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  signal,
  inject,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ThemeService } from '../../../core/services/theme.service';

interface AccentTheme {
  name: string;
  hue: number;
  label: string;
}

const THEMES: AccentTheme[] = [
  { name: 'matrix',   hue: 142, label: 'Matrix Green' },
  { name: 'cyan',     hue: 190, label: 'Terminal Cyan' },
  { name: 'violet',   hue: 265, label: 'Neon Violet' },
  { name: 'amber',    hue:  35, label: 'Amber CRT' },
  { name: 'magenta',  hue: 320, label: 'Hot Magenta' },
];

const STORAGE_KEY = 'accent-hue';

/**
 * Live accent colour picker — stored in localStorage, applied to :root CSS vars.
 * Re-applies on dark/light toggle so lightness stays readable in both modes.
 */
@Component({
  selector: 'app-accent-picker',
  standalone: true,
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="picker-wrapper">
      <button
        type="button"
        class="picker-trigger"
        (click)="toggle()"
        [attr.aria-expanded]="open()"
        aria-haspopup="true"
        aria-label="Change accent colour"
      >
        <ng-icon name="lucidePalette" size="1rem" />
      </button>

      @if (open()) {
        <!-- Backdrop to close on outside click -->
        <div class="picker-backdrop" (click)="close()" aria-hidden="true"></div>

        <div class="picker-menu" role="menu">
          <p class="picker-label">// accent theme</p>
          @for (theme of themes; track theme.name) {
            <button
              type="button"
              role="menuitem"
              class="picker-item"
              [class.picker-item--active]="currentHue() === theme.hue"
              (click)="select(theme.hue)"
            >
              <span
                class="picker-swatch"
                [style.background]="'hsl(' + theme.hue + ' 70% 50%)'"
              ></span>
              <span class="picker-item-label">{{ theme.label }}</span>
              @if (currentHue() === theme.hue) {
                <ng-icon name="lucideCheck" size="0.875rem" class="picker-check" />
              }
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .picker-wrapper {
      position: relative;
    }

    .picker-trigger {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.375rem;
      color: var(--clr-muted-fg);
      background: transparent;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .picker-trigger:hover {
      color: var(--clr-primary);
    }

    .picker-backdrop {
      position: fixed;
      inset: 0;
      z-index: 40;
    }

    .picker-menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      z-index: 50;
      min-width: 11rem;
      border-radius: 0.5rem;
      border: 1px solid var(--clr-border);
      background: hsl(var(--card));
      padding: 0.5rem;
      box-shadow: 0 8px 24px rgb(0 0 0 / 0.2);
    }

    .picker-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      color: var(--clr-muted-fg);
      margin: 0 0 0.375rem 0.25rem;
    }

    .picker-item {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      width: 100%;
      padding: 0.375rem 0.5rem;
      border: none;
      border-radius: 0.375rem;
      background: transparent;
      cursor: pointer;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: hsl(var(--foreground));
      transition: background 0.15s ease;
      text-align: left;
    }

    .picker-item:hover {
      background: hsl(var(--muted));
    }

    .picker-item--active {
      background: hsl(var(--muted));
    }

    .picker-swatch {
      display: block;
      width: 0.875rem;
      height: 0.875rem;
      border-radius: 50%;
      border: 1px solid var(--clr-border);
      flex-shrink: 0;
    }

    .picker-item-label {
      flex: 1;
    }

    .picker-check {
      color: var(--clr-primary);
    }
  `],
})
export class AccentPickerComponent implements OnInit, OnDestroy {
  readonly themes = THEMES;
  readonly open = signal(false);
  readonly currentHue = signal(142);

  private readonly themeService = inject(ThemeService);
  private mutationObserver?: MutationObserver;

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    let hue = 142;
    try {
      const stored = window.localStorage?.getItem(STORAGE_KEY);
      if (stored) hue = Number(stored);
    } catch {
      // localStorage may be restricted or unavailable
    }

    this.currentHue.set(hue);
    this.applyHue(hue);

    if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
      this.mutationObserver = new MutationObserver(() => this.applyHue(this.currentHue()));
      this.mutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }
  }

  ngOnDestroy(): void {
    this.mutationObserver?.disconnect();
  }

  toggle(): void {
    this.open.update(v => !v);
  }

  close(): void {
    this.open.set(false);
  }

  select(hue: number): void {
    this.currentHue.set(hue);
    this.applyHue(hue);
    try {
      window.localStorage?.setItem(STORAGE_KEY, String(hue));
    } catch {
      // ignore
    }
    this.close();
  }

  private applyHue(hue: number): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    const lit = isDark ? 50 : 38;
    const val = `${hue} 70% ${lit}%`;
    root.style.setProperty('--primary', val);
    root.style.setProperty('--accent', val);
    root.style.setProperty('--ring', val);
    root.style.setProperty('--hue-primary', String(hue));
    root.style.setProperty('--clr-primary', `hsl(${val})`);
  }
}
