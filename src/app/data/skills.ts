export interface SkillGroup {
  category: string;
  items: string[];
}
export const skillGroups = [
  {
    category: 'Core Frontend',
    items: ['HTML5 (Semantic)', 'CSS3 (Flexbox, Grid)', 'JavaScript (ES6+)', 'TypeScript'],
  },
  {
    category: 'Frameworks',
    items: ['Angular', 'RxJS', 'React', 'Next.js', 'React Native', 'Flutter'],
  },
  {
    category: 'State & Data',
    items: [
      'Redux Toolkit',
      'Context API',
      'Services (Dependency Injection)',
      'Axios',
      'Angular Signals',
      'HttpClient',
      'Observables',
      'Cubit',
    ],
  },
  {
    category: 'UI & Styling',
    items: ['Tailwind CSS', 'Bootstrap', 'Responsive Design', 'Accessibility (a11y)'],
  },
  {
    category: 'Tools',
    items: ['Git & GitHub', 'Vite', 'Postman', 'Figma', 'Jira'],
  },
  {
    category: 'Practices',
    items: [
      'Component Architecture',
      'Performance Optimization',
      'Clean Code',
      'Scalable Structure',
    ],
  },
];
