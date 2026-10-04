export interface PortfolioProject {
  title: string;
  description: string;
  features: string[];
  tech: string[];
  why: string;
  liveUrl: string;
  githubUrl: string;
  cover: string;
  tier: 'essential' | 'standout' | 'advanced';
}
