import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      Built with Angular + TypeScript + Tailwind CSS + Flowbite - © {{ year }}
    </footer>
  `
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
