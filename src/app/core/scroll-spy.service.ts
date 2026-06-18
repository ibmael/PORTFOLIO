import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollSpyService {
  readonly activeSection = signal<string>('home');

  constructor() {
    // Only initialize in the browser
    if (typeof window !== 'undefined') {
      // Use setTimeout to ensure elements are rendered
      setTimeout(() => this.initObserver(), 500);
    }
  }

  private initObserver() {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          this.activeSection.set(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px', // More balanced viewport focus
        threshold: 0,
      }
    );

    const sectionIds = ['home', 'skills', 'projects', 'about', 'contact'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    // Fallback scroll listener for the very bottom of the page
    window.addEventListener('scroll', () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isBottom) {
        this.activeSection.set('contact');
      }
    }, { passive: true });
  }
}
