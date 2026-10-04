import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { TypewriterComponent } from '../../../../shared/components/typewriter/typewriter.component';
import { AvailabilityBadgeComponent } from '../../../../shared/components/availability-badge/availability-badge.component';
import { socialLinks } from '../../data/socials.data';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [TypewriterComponent, AvailabilityBadgeComponent, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
  readonly socials = socialLinks;
  readonly heroTitles = [
    'Front-End Developer',
    'Angular & React Developer',
    'Fast & Responsive Apps',
    'Interactive UI Builder',
    'Modern Web Solutions',
  ];
}
