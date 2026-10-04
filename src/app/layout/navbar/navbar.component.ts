import { Component, OnDestroy, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ThemeService } from '../../core/services/theme.service';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { navLinks } from '../config/navigation';

import { ScrollProgressComponent } from '../../shared/components/scroll-progress/scroll-progress.component';
import { AccentPickerComponent } from '../../shared/components/accent-picker/accent-picker.component';
import { CommandPaletteService } from '../../core/services/command-palette.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIcon, ScrollProgressComponent, AccentPickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnDestroy {
  readonly themeService = inject(ThemeService);
  readonly scrollSpyService = inject(ScrollSpyService);
  readonly commandPaletteService = inject(CommandPaletteService);
  readonly activeSection = this.scrollSpyService.activeSection;

  readonly isMac =
    typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);

  readonly open = signal(false);
  readonly links = navLinks;

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
