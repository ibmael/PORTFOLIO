import { Component } from '@angular/core';
import { ScrollRevealComponent } from '../shared/scroll-reveal/scroll-reveal.component';
import { skillGroups } from '../../data/skills';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [ScrollRevealComponent],
  templateUrl: './skills-section.component.html'
})
export class SkillsSectionComponent {
  readonly groups = skillGroups;
}
