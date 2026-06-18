import { Injectable, effect, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<ThemeMode>('dark');

  constructor() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const stored =
      typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'light' || stored === 'dark') {
      this.theme.set(stored);
    } else if (typeof window.matchMedia === 'function') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark' : 'light');
    }

    effect(() => {
      const mode = this.theme();
      document.documentElement.classList.toggle('dark', mode === 'dark');
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', mode);
      }
    });
  }

  toggleTheme(): void {
    this.theme.update((mode) => (mode === 'dark' ? 'light' : 'dark'));
  }
}
