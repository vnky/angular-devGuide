import { Component, HostListener, signal } from '@angular/core';

/**
 * Global target: listens on window (not the component host).
 */
@Component({
  selector: 'app-window-scroll-badge',
  template: `<p>Window scroll events (while this page is open): <strong>{{ scrollCount() }}</strong></p>`,
  styles: `
    :host {
      display: block;
      font-size: 0.9rem;
      color: #4b5563;
    }
    p {
      margin: 0;
    }
  `,
})
export class WindowScrollBadge {
  protected readonly scrollCount = signal(0);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrollCount.update((n) => n + 1);
  }
}
