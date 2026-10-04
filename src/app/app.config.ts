import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideFileText,
  lucideSun,
  lucideMoon,
  lucideExternalLink,
  lucideChevronUp,
  lucideChevronDown,
  lucideArrowUp,
  lucideMenu,
  lucideX,
  lucideGitGraph,
  lucideCopy,
  lucideCheck,
  lucidePalette,
  lucideStar,
  lucideSearch,
  lucideTerminal,
  lucideCommand,
} from '@ng-icons/lucide';
import { bootstrapGithub, bootstrapLinkedin } from '@ng-icons/bootstrap-icons';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideIcons({
      bootstrapGithub,
      bootstrapLinkedin,
      lucideMail,
      lucideFileText,
      lucideSun,
      lucideMoon,
      lucideExternalLink,
      lucideChevronUp,
      lucideChevronDown,
      lucideArrowUp,
      lucideMenu,
      lucideX,
      lucideGitGraph,
      lucideCopy,
      lucideCheck,
      lucidePalette,
      lucideStar,
      lucideSearch,
      lucideTerminal,
      lucideCommand,
    }),
  ],
};

