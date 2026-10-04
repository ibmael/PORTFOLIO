import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealComponent } from '../../../../shared/components/scroll-reveal/scroll-reveal.component';
import { DecryptTextDirective } from '../../../../shared/directives/decrypt-text.directive';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [ScrollRevealComponent, DecryptTextDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css',
})
export class AboutSectionComponent {}
