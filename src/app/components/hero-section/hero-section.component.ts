import { Component } from '@angular/core';
import { TypewriterComponent } from '../shared/typewriter/typewriter.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [TypewriterComponent],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  readonly heroTitles = [
    'Junior Front-End Developer',
    'Angular Developer',
    'Passionate About UI',
    'Always Learning & Building',
  ];
}
