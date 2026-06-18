import { Component, computed, signal } from '@angular/core';
import { ScrollRevealComponent } from '../shared/scroll-reveal/scroll-reveal.component';
import { PortfolioProject, portfolioProjects } from '../../data/projects';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [ScrollRevealComponent],
  templateUrl: './projects-section.component.html'
})
export class ProjectsSectionComponent {
  private readonly showAll = signal(false);
  readonly projects = portfolioProjects;
  readonly visibleProjects = computed(() =>
    this.showAll() ? this.projects : this.projects.slice(0, 2)
  );
  readonly totalCount = this.projects.length;
  readonly visibleCount = computed(() => this.visibleProjects().length);

  tierColor(tier: PortfolioProject['tier']): string {
    if (tier === 'standout') return 'text-amber-400';
    if (tier === 'advanced') return 'text-sky-400';
    return 'text-[#24be5d]';
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
    this.showAll.update((value) => !value);
  }

  isExpanded(): boolean {
    return this.showAll();
  }
}
