import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealComponent } from '../shared/scroll-reveal/scroll-reveal.component';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ScrollRevealComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {}
