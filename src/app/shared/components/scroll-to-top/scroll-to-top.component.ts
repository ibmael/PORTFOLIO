import { Component, OnDestroy, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css',
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
