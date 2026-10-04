import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { ThemeService } from '../../../core/services/theme.service';

export interface CommandItem {
  id: string;
  title: string;
  keywords: string[];
  category: 'Navigation' | 'Actions' | 'Social';
  hint: string;
  icon: string;
  action: () => void;
}

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.css',
})
export class CommandPaletteComponent implements OnDestroy {
  readonly commandPaletteService = inject(CommandPaletteService);
  readonly themeService = inject(ThemeService);

  readonly isOpen = this.commandPaletteService.isOpen;
  readonly query = signal('');
  readonly selectedIndex = signal(0);
  readonly emailCopied = signal(false);

  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly resultsList = viewChild<ElementRef<HTMLElement>>('resultsList');

  readonly isMac =
    typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);

  readonly commands: CommandItem[] = [
    {
      id: 'nav-skills',
      title: 'Go to Skills',
      keywords: ['skills', 'tech', 'stack', 'technologies', 'tools', 'languages'],
      category: 'Navigation',
      hint: '#skills',
      icon: 'lucideTerminal',
      action: () => this.scrollToSection('skills'),
    },
    {
      id: 'nav-projects',
      title: 'Go to Projects',
      keywords: ['projects', 'work', 'featured', 'portfolio', 'apps'],
      category: 'Navigation',
      hint: '#projects',
      icon: 'lucideStar',
      action: () => this.scrollToSection('projects'),
    },
    {
      id: 'nav-about',
      title: 'Go to About',
      keywords: ['about', 'bio', 'me', 'developer', 'profile'],
      category: 'Navigation',
      hint: '#about',
      icon: 'lucideTerminal',
      action: () => this.scrollToSection('about'),
    },
    {
      id: 'nav-experience',
      title: 'Go to Experience',
      keywords: ['experience', 'work', 'iti', 'training', 'credentials', 'jobs'],
      category: 'Navigation',
      hint: '#experience',
      icon: 'lucideFileText',
      action: () => this.scrollToSection('experience'),
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact',
      keywords: ['contact', 'email', 'message', 'reach', 'connect'],
      category: 'Navigation',
      hint: '#contact',
      icon: 'lucideMail',
      action: () => this.scrollToSection('contact'),
    },
    {
      id: 'act-theme',
      title: 'Toggle Theme',
      keywords: ['theme', 'dark', 'light', 'mode', 'color', 'switch'],
      category: 'Actions',
      hint: 'theme',
      icon: 'lucideSun',
      action: () => {
        this.themeService.toggleTheme();
        this.close();
      },
    },
    {
      id: 'act-cv',
      title: 'Download CV',
      keywords: ['cv', 'resume', 'pdf', 'download', 'curriculum'],
      category: 'Actions',
      hint: 'PDF',
      icon: 'lucideFileText',
      action: () => {
        if (typeof window !== 'undefined') {
          const a = document.createElement('a');
          a.href = '/IbrahimElghandourCV.pdf';
          a.download = 'IbrahimElghandourCV.pdf';
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        this.close();
      },
    },
    {
      id: 'copy-email',
      title: 'Copy Email',
      keywords: ['email', 'copy', 'mail', 'gmail', 'contact', 'address'],
      category: 'Actions',
      hint: 'copy',
      icon: 'lucideCopy',
      action: () => {
        const email = 'ibrahimmahmoudelghandour@gmail.com';
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          void navigator.clipboard.writeText(email);
          this.emailCopied.set(true);
          setTimeout(() => {
            this.emailCopied.set(false);
            this.close();
          }, 900);
        } else {
          this.close();
        }
      },
    },
    {
      id: 'soc-github',
      title: 'Open GitHub',
      keywords: ['github', 'git', 'repo', 'code', 'profile', 'ibmael'],
      category: 'Social',
      hint: '↗',
      icon: 'bootstrapGithub',
      action: () => {
        if (typeof window !== 'undefined') {
          window.open('https://github.com/ibmael', '_blank', 'noopener,noreferrer');
        }
        this.close();
      },
    },
    {
      id: 'soc-linkedin',
      title: 'Open LinkedIn',
      keywords: ['linkedin', 'social', 'network', 'profile', 'connect'],
      category: 'Social',
      hint: '↗',
      icon: 'bootstrapLinkedin',
      action: () => {
        if (typeof window !== 'undefined') {
          window.open('https://www.linkedin.com/in/ibrahimelghandour', '_blank', 'noopener,noreferrer');
        }
        this.close();
      },
    },
  ];

  readonly filteredCommands = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.commands;
    return this.commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(q) ||
        cmd.keywords.some((k) => k.toLowerCase().includes(q)),
    );
  });

  constructor() {
    effect(() => {
      const open = this.isOpen();
      if (typeof document !== 'undefined') {
        document.body.style.overflow = open ? 'hidden' : '';
      }
      if (open) {
        this.query.set('');
        this.selectedIndex.set(0);
        setTimeout(() => {
          this.searchInput()?.nativeElement.focus();
        }, 30);
      }
    });
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  @HostListener('window:keydown', ['$event'])
  onGlobalKeyDown(event: KeyboardEvent): void {
    // Desktop keyboard shortcut: Ctrl+K or Cmd+K
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.commandPaletteService.toggle();
      return;
    }

    if (!this.isOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectNext();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectPrevious();
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.executeSelected();
      return;
    }
  }

  close(): void {
    this.commandPaletteService.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('palette-overlay')) {
      this.close();
    }
  }

  onQueryInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.selectedIndex.set(0);
  }

  selectNext(): void {
    const list = this.filteredCommands();
    if (list.length === 0) return;
    this.selectedIndex.update((i) => (i + 1) % list.length);
    this.scrollActiveIntoView();
  }

  selectPrevious(): void {
    const list = this.filteredCommands();
    if (list.length === 0) return;
    this.selectedIndex.update((i) => (i - 1 + list.length) % list.length);
    this.scrollActiveIntoView();
  }

  setSelectedIndex(index: number): void {
    this.selectedIndex.set(index);
  }

  executeSelected(): void {
    const list = this.filteredCommands();
    const item = list[this.selectedIndex()];
    if (item) {
      item.action();
    }
  }

  executeItem(item: CommandItem): void {
    item.action();
  }

  private scrollToSection(id: string): void {
    this.close();
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${id}`);
      }
    }
  }

  private scrollActiveIntoView(): void {
    if (typeof window === 'undefined') return;
    setTimeout(() => {
      const container = this.resultsList()?.nativeElement;
      const activeEl = container?.querySelector('.command-row--active') as HTMLElement | null;
      if (container && activeEl) {
        const top = activeEl.offsetTop;
        const bottom = top + activeEl.offsetHeight;
        const cTop = container.scrollTop;
        const cBottom = cTop + container.offsetHeight;

        if (top < cTop) {
          container.scrollTop = top;
        } else if (bottom > cBottom) {
          container.scrollTop = bottom - container.offsetHeight;
        }
      }
    }, 10);
  }
}
