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
    'Front-End Developer',
    'Angular & React Developer',
    'Building Fast & Responsive Applications',
    'Transforming Designs Into Interactive Experiences',
    'Building Modern Digital Solutions',
  ];
}
