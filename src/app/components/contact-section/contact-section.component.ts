import { Component } from '@angular/core';
import { ScrollRevealComponent } from '../shared/scroll-reveal/scroll-reveal.component';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ScrollRevealComponent],
  templateUrl: './contact-section.component.html'
})
export class ContactSectionComponent {}
