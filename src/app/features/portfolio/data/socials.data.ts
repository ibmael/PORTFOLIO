import { SocialLink } from '../models/social.model';

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    displayLabel: 'github:me',
    url: 'https://github.com/ibmael',
    icon: 'bootstrapGithub',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    displayLabel: 'linkedin:me',
    url: 'https://www.linkedin.com/in/ibrahimelghandour',
    icon: 'bootstrapLinkedin',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    displayLabel: 'mail:me',
    url: 'mailto:ibrahimmahmoudelghandour@gmail.com',
    icon: 'lucideMail',
    external: false,
  },
  {
    id: 'resume',
    label: 'Resume',
    displayLabel: 'resume',
    url: '/IbrahimElghandourCV.pdf',
    icon: 'lucideFileText',
    download: true,
  },
];
