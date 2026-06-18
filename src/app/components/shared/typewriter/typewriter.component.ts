import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  template: ` <span> {{ displayText() }}<span class="cursor-blink">|</span> </span> `,
  styles: `
    :host {
      display: inline-block;
      white-space: nowrap;
    }
    .cursor-blink {
      animation: blink 1s steps(1, end) infinite;
      margin-left: 2px;
    }
    @keyframes blink {
      50% {
        opacity: 0;
      }
    }
  `,
})
export class TypewriterComponent implements OnInit, OnDestroy {
  @Input({ required: true }) texts: string[] = [];
  @Input() speed = 80;
  @Input() deleteSpeed = 40;
  @Input() pauseTime = 2000;

  readonly displayText = signal('');

  private textIndex = 0;
  private isDeleting = false;
  private timeoutId?: number;

  ngOnInit(): void {
    this.tick();
  }

  ngOnDestroy(): void {
    if (this.timeoutId !== undefined && typeof window !== 'undefined') {
      window.clearTimeout(this.timeoutId);
    }
  }

  private tick(): void {
    if (this.texts.length === 0) return;

    const current = this.texts[this.textIndex];
    const value = this.displayText();

    if (!this.isDeleting) {
      this.displayText.set(current.slice(0, value.length + 1));
      if (value.length + 1 === current.length) {
        this.timeoutId = window.setTimeout(() => {
          this.isDeleting = true;
          this.tick();
        }, this.pauseTime);
        return;
      }
    } else {
      this.displayText.set(current.slice(0, Math.max(0, value.length - 1)));
      if (value.length <= 1) {
        this.isDeleting = false;
        this.textIndex = (this.textIndex + 1) % this.texts.length;
      }
    }

    this.timeoutId = window.setTimeout(
      () => this.tick(),
      this.isDeleting ? this.deleteSpeed : this.speed,
    );
  }
}
