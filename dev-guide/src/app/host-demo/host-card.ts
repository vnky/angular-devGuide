import { Component, HostBinding, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-host-card',
  template: `
    <p class="label">I am the component template (inside the host).</p>
    <p class="hint">Events below are handled on the host via @HostListener.</p>
    <p>Clicks on this card: <strong>{{ clicks() }}</strong></p>
  `,
  styleUrl: './host-card.css',
})
export class HostCard {
  protected readonly clicks = signal(0);

  /** @HostBinding — writes to the host element (<app-host-card>), not inner HTML. */
  @HostBinding('class.is-hovered')
  isHovered = false;

  @HostBinding('class.is-pressed')
  isPressed = false;

  @HostBinding('attr.aria-label')
  ariaLabel = 'Host demo card';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
    this.isPressed = false;
  }

  @HostListener('mousedown')
  onMouseDown(): void {
    this.isPressed = true;
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isPressed = false;
  }

  @HostListener('click')
  onClick(): void {
    this.clicks.update((count) => count + 1);
  }
}
