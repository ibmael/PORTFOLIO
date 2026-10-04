import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ScrollRevealComponent } from '../../../../shared/components/scroll-reveal/scroll-reveal.component';
import { TiltCardDirective } from '../../../../shared/directives/tilt-card.directive';
import { DecryptTextDirective } from '../../../../shared/directives/decrypt-text.directive';
import { PortfolioProject } from '../../models/project.model';
import { portfolioProjects } from '../../data/projects.data';

/** Priority filters — only include a tag if at least one project uses it. */
const PRIORITY_TAGS = ['Angular', 'React', 'Three.js', 'GSAP', 'Redux Toolkit'];

function deriveFilters(projects: PortfolioProject[]): string[] {
  const allTags = new Set(projects.flatMap((p) => p.tech));
  return ['All', ...PRIORITY_TAGS.filter((t) => allTags.has(t))];
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [ScrollRevealComponent, TiltCardDirective, DecryptTextDirective, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css',
})
export class ProjectsSectionComponent {
  private readonly showAll = signal(false);
  readonly activeFilter = signal<string>('All');

  readonly projects = portfolioProjects;
  readonly filters = deriveFilters(portfolioProjects);

  /** Projects matching the active tech filter. */
  private readonly filteredByTag = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') return this.projects;
    return this.projects.filter((p) => p.tech.includes(filter));
  });

  /** Apply show-all/collapse on top of the filtered list. */
  readonly visibleProjects = computed(() => {
    const filtered = this.filteredByTag();
    return this.showAll() ? filtered : filtered.slice(0, 2);
  });

  readonly filteredCount = computed(() => this.filteredByTag().length);
  readonly visibleCount = computed(() => this.visibleProjects().length);
  readonly totalCount = this.projects.length;

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
    this.showAll.set(false); // reset collapse when filter changes
  }

  tierColor(tier: PortfolioProject['tier']): string {
    if (tier === 'standout') return 'text-amber-400';
    if (tier === 'advanced') return 'text-sky-400';
    return 'text-primary';
  }

  hasLiveDemo(project: PortfolioProject): boolean {
    return !!project.liveUrl && project.liveUrl !== '#';
  }

  visibleFeatures(project: PortfolioProject): string[] {
    return project.features.slice(0, 4);
  }

  hiddenFeatureCount(project: PortfolioProject): number {
    return Math.max(0, project.features.length - 4);
  }

  toggleShowAll(): void {
    this.showAll.update((v) => !v);
  }

  isExpanded(): boolean {
    return this.showAll();
  }

  openLiveDemo(project: PortfolioProject): void {
    if (this.hasLiveDemo(project)) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  }
}

