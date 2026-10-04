import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealComponent } from '../../../../shared/components/scroll-reveal/scroll-reveal.component';
import { DecryptTextDirective } from '../../../../shared/directives/decrypt-text.directive';
import { ExperienceEntry } from '../../models/experience.model';
import { experienceEntries } from '../../data/experience.data';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [ScrollRevealComponent, DecryptTextDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.css',
})
export class ExperienceSectionComponent {
  readonly entries: ExperienceEntry[] = experienceEntries;
}
