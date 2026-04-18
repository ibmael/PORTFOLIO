import { Injectable, effect, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<ThemeMode>('dark');

  constructor() {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      this.theme.set(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark' : 'light');
    }

    effect(() => {
      const mode = this.theme();
      document.documentElement.classList.toggle('dark', mode === 'dark');
      localStorage.setItem('theme', mode);
    });
  }

  toggleTheme(): void {
    this.theme.update((mode) => (mode === 'dark' ? 'light' : 'dark'));
  }
}
