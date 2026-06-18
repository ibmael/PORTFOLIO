import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  template: `
    @if (visible()) {
      <button
        type="button"
        class="fixed bottom-6 right-6 z-50 rounded-full bg-[#24be5d] p-3 text-[#0b101a] shadow-lg transition hover:opacity-90"
        aria-label="Scroll to top"
        (click)="scrollToTop()"
      >
        ↑
      </button>
    }
  `
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  readonly visible = signal(false);

  private onScroll = () => this.visible.set(window.scrollY > 300);

  ngOnInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.removeEventListener('scroll', this.onScroll);
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
