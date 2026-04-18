import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
import { ScrollSpyService } from '../../core/scroll-spy.service';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
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
    this.open.update((value) => !value);
  }

  closeMenu(): void {
    this.open.set(false);
  }
}
