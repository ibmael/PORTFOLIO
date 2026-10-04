import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ElementRef,
  signal,
  inject,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ScrollRevealComponent } from '../../../../shared/components/scroll-reveal/scroll-reveal.component';
import { DecryptTextDirective } from '../../../../shared/directives/decrypt-text.directive';

export interface SkillCardFile {
  category: string;
  filename: string;
  type: 'array' | 'json' | 'css' | 'list' | 'markdown';
  header: string;
  footer: string;
  items: (string | { key: string; val: string })[];
}

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [ScrollRevealComponent, DecryptTextDirective, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.css',
})
export class SkillsSectionComponent implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly inView = signal(false);
  private observer?: IntersectionObserver;

  readonly files: SkillCardFile[] = [
    {
      category: 'Core Frontend',
      filename: 'core.ts',
      type: 'array',
      header: 'const coreSkills = [',
      footer: '];',
      items: ['HTML5 (Semantic)', 'CSS3 (Flexbox, Grid)', 'JavaScript (ES6+)', 'TypeScript'],
    },
    {
      category: 'Frameworks',
      filename: 'frameworks.json',
      type: 'json',
      header: '{',
      footer: '}',
      items: [
        { key: '"primary"', val: '["Angular 22", "RxJS", "Signals"]' },
        { key: '"secondary"', val: '["React", "Next.js"]' },
        { key: '"mobile"', val: '["React Native", "Flutter"]' },
      ],
    },
    {
      category: 'State & Data',
      filename: 'state.ts',
      type: 'array',
      header: 'const stateData = [',
      footer: '];',
      items: [
        'Angular Signals',
        'RxJS Observables',
        'Redux Toolkit',
        'Services & DI',
        'HttpClient & Axios',
      ],
    },
    {
      category: 'UI & Styling',
      filename: 'styles.css',
      type: 'css',
      header: '/* styling engine */',
      footer: '',
      items: ['Tailwind CSS', 'Bootstrap', 'Responsive Design', 'Accessibility (a11y)'],
    },
    {
      category: 'Tools',
      filename: '~/tools',
      type: 'list',
      header: '$ ls -la tools/',
      footer: '',
      items: ['Git & GitHub', 'Vite & CLI', 'Postman', 'Figma', 'Jira'],
    },
    {
      category: 'Practices',
      filename: 'practices.md',
      type: 'markdown',
      header: '',
      footer: '',
      items: [
        'Component Architecture',
        'Performance Optimization',
        'Clean Code',
        'Scalable Structure',
      ],
    },
  ];

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    if (typeof IntersectionObserver === 'undefined') {
      this.inView.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.inView.set(true);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  asJsonItem(item: string | { key: string; val: string }): { key: string; val: string } {
    return item as { key: string; val: string };
  }
}
