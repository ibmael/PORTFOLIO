import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealComponent } from '../shared/scroll-reveal/scroll-reveal.component';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [ScrollRevealComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './about-section.component.html',
})
export class AboutSectionComponent {
  readonly stats = [
    { label: 'Projects Built', value: '10+' },
    { label: 'GitHub Commits', value: '30+' },
    { label: 'Coffee Consumed', value: '∞' },
  ];
}
