import { Component, HostListener, signal } from '@angular/core';

/**
 * Events are attached to the host element <app-host-event-zone>.
 * Compare with writing (click) on the tag in a parent template.
 */
@Component({
  selector: 'app-host-event-zone',
  template: `
    <p><strong>Interactive zone</strong> — click inside this box or press keys while it is focused.</p>
    <p class="meta">Host clicks: {{ clicks() }} · last key: <code>{{ lastKey() || '—' }}</code></p>
  `,
  styleUrl: './host-event-zone.css',
  host: {
    tabindex: '0',
    role: 'button',
    'aria-label': 'Host listener demo zone',
  },
})
export class HostEventZone {
  protected readonly clicks = signal(0);
  protected readonly lastKey = signal('');

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent): void {
    event.stopPropagation();
    this.clicks.update((n) => n + 1);
  }

  @HostListener('keydown', ['$event'])
  onHostKeydown(event: KeyboardEvent): void {
    this.lastKey.set(event.key);
  }
}
