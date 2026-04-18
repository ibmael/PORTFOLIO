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

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'E-commerce App',
    description:
      'A production-style Angular storefront with user auth, product browsing, cart/wishlist management, and checkout flows built for responsive mobile and desktop experiences.',
    features: [
      'User authentication + protected routes',
      'Category, brand, and product browsing',
      'Checkout flow with order review',
      'Responsive, accessible UI optimized for keyboard interaction',
      'Local persistence for a smooth shopping experience',
      'Wishlist and cart management with real-time counts',
      'Order history and profile management',
      'Server-side rendering with client hydration',
      'Lazy-loaded standalone route components',
      'Toast notifications and loading indicators for UX polish',
    ],
    tech: [
      'Angular',
      'TypeScript',
      'Tailwind CSS',
      'RxJS',
      'Angular Signals',
      'HTTP API integration',
      'Flowbite',
      'NgxSpinner',
      'NgxToastr',
      'Swiper',
      'NgxPagination',
    ],
    why: 'Shows core front-end skills recruiters expect: state-driven UI with Angular Signals, reusable standalone components, lazy-loaded route-based architecture, SSR hydration, authenticated e-commerce flows, API-driven cart/wishlist interactions, and polished UX with loading states and toast feedback.',

    liveUrl: 'https://e-commerceroute.vercel.app/',
    githubUrl: 'https://github.com/ibmael/e-commerce-route',
    cover: './assets/ecommerce.png',
    tier: 'essential',
  },
  {
    title: '3dsa',
    description:
      'Professional photography portfolio and blog platform with curated articles, artist showcases, and community engagement features. Built with modern Angular architecture featuring lazy-loaded components and responsive design.',
    features: [
      'Dynamic blog system with rich article content, metadata, and categorization',
      'Author profiles with avatars and role information',
      'Featured articles showcase and latest updates carousel',
      'Responsive design supporting Arabic (RTL) and English languages',
      'Smooth page transitions with Angular view animations',
      'Newsletter subscription integration',
      'Image-optimized portfolio gallery with metadata display',
      'Team and testimonials sections with structured layout',
    ],
    tech: ['Angular', 'Tailwind CSS', 'Bootstrap 5', 'RxJS', 'TypeScript', 'Font Awesome Icons'],
    why: 'Demonstrates modern Angular best practices with standalone components, lazy loading for performance, complex component composition for content-rich websites, and internationalization support for bilingual content. Shows proficiency in building scalable, maintainable SPAs with professional UI/UX patterns.',
    liveUrl: 'https://3dsa-photography.vercel.app',
    githubUrl: 'https://github.com/ibmael/3dsa',
    cover: './assets/3dsa.png',
    tier: 'essential',
  },
  {
    title: 'Social App',
    description:
      'A social app built with Angular, featuring authentication, guarded main routes, and a feed/profile experience.',
    features: [
      'Authentication flow with login, register, and password recovery pages',
      'Protected main app routes for feed, profile, and detail views',
      'Route guards that redirect guests to login and authenticated users to the feed',
      'Global loading spinner and toast notifications via HTTP interceptors',
      'Lazy-loaded feature components for better performance',
      'Responsive, accessible UI optimized for keyboard interaction',
    ],
    tech: [
      'Angular',
      'TypeScript',
      'Angular Router',
      'Tailwind CSS',
      'LocalStorage',
      'HttpClient with Fetch support',
      'NgxSpinner',
      'ngx-toastr',
    ],
    why: 'Demonstrates real-world social app structure with auth gating, lazy routing, and API-based session handling Shows key front-end skills: route protection, modular pages, UX feedback with loaders/toasts, and persistent login state Helps recruiters see familiarity with Angular standalone components, router config, and interceptor-driven HTTP workflows',
    liveUrl: '#',
    githubUrl: 'https://github.com/ibmael/ROUTE-SOCIAL-APP',
    cover: './assets/socialapp.png',
    tier: 'standout',
  },
  {
    title: 'Portfolio Site (This One!)',
    description:
      'A fast and accessible single-page portfolio built to present projects, process, and product thinking.',
    features: [
      'Semantic structure and SEO-friendly sections',
      'Dark and light theme support',
      'Smooth section reveal animation',
      'Responsive layout across breakpoints',
    ],
    tech: ['Angular', 'Tailwind v4', 'Flowbite', 'TypeScript'],
    why: 'Your portfolio is a real product and proves execution quality, design taste, and delivery mindset.',
    liveUrl: '#',
    githubUrl: 'https://github.com/your-username/portfolio',
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=340&fit=crop',
    tier: 'standout',
  },
];
