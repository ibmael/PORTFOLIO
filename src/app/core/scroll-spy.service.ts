import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollSpyService {
  readonly activeSection = signal<string>('home');
  private readonly sectionVisibility = new Map<string, number>();

  constructor() {
    if (typeof window !== 'undefined') {
      setTimeout(() => this.initObserver(), 500);
    }
  }

  private initObserver() {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.sectionVisibility.set(entry.target.id, entry.intersectionRatio);
          } else {
            this.sectionVisibility.delete(entry.target.id);
          }
        });

        this.updateActiveSection();
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    const sectionIds = ['home', 'skills', 'projects', 'about', 'contact'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    window.addEventListener(
      'scroll',
      () => {
        const isBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
        if (isBottom) {
          this.activeSection.set('contact');
          return;
        }

        this.updateActiveSection();
      },
      { passive: true },
    );
  }

  private updateActiveSection(): void {
    if (this.sectionVisibility.size === 0) {
      return;
    }

    let activeId = 'home';
    let maxRatio = -1;

    this.sectionVisibility.forEach((ratio, id) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        activeId = id;
      }
    });

    this.activeSection.set(activeId);
  }
}
