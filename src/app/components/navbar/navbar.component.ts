import { Component, OnDestroy, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { ScrollSpyService } from '../../core/scroll-spy.service';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnDestroy {
  readonly scrollSpyService = inject(ScrollSpyService);
  readonly activeSection = this.scrollSpyService.activeSection;

  readonly open = signal(false);
  readonly links: NavLink[] = [
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  constructor(readonly themeService: ThemeService) {}

  toggleMenu(): void {
    this.open.update((value) => {
      const next = !value;
      this.setBodyScroll(next);
      return next;
    });
  }

  closeMenu(): void {
    this.open.set(false);
    this.setBodyScroll(false);
  }

  ngOnDestroy(): void {
    this.setBodyScroll(false);
  }

  private setBodyScroll(locked: boolean): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.style.overflow = locked ? 'hidden' : '';
  }
}
