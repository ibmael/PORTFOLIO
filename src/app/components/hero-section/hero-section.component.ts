import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TypewriterComponent } from '../shared/typewriter/typewriter.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [TypewriterComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  readonly heroTitles = [
    'Front-End Developer',
    'Angular & React Developer',
    'Fast & Responsive Apps',
    'Interactive UI Builder',
    'Modern Web Solutions',
  ];
}
