import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeroSectionComponent } from './features/portfolio/components/hero-section/hero-section.component';
import { SkillsSectionComponent } from './features/portfolio/components/skills-section/skills-section.component';
import { ProjectsSectionComponent } from './features/portfolio/components/projects-section/projects-section.component';
import { AboutSectionComponent } from './features/portfolio/components/about-section/about-section.component';
import { ContactSectionComponent } from './features/portfolio/components/contact-section/contact-section.component';
import { ExperienceSectionComponent } from './features/portfolio/components/experience-section/experience-section.component';
import { GithubContributionsComponent } from './features/portfolio/components/github-contributions/github-contributions.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';
import { TechMarqueeComponent } from './shared/components/tech-marquee/tech-marquee.component';
import { CommandPaletteComponent } from './shared/components/command-palette/command-palette.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    TechMarqueeComponent,
    SkillsSectionComponent,
    ProjectsSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    GithubContributionsComponent,
    ContactSectionComponent,
    FooterComponent,
    ScrollToTopComponent,
    CommandPaletteComponent,
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.css',
})
export class App {}
