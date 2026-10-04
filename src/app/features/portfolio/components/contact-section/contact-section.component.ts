import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ScrollRevealComponent } from '../../../../shared/components/scroll-reveal/scroll-reveal.component';
import { DecryptTextDirective } from '../../../../shared/directives/decrypt-text.directive';
import { socialLinks } from '../../data/socials.data';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ScrollRevealComponent, DecryptTextDirective, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css',
})
export class ContactSectionComponent {
  readonly email = 'ibrahimmahmoudelghandour@gmail.com';
  readonly copied = signal(false);

  // Social links (excluding email since it has its own primary button)
  readonly socialLinks = socialLinks.filter((s) => s.id !== 'email');

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.email).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      });
    }
  }
}
