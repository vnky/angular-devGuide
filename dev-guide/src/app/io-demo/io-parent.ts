import { Component, signal } from '@angular/core';

import { IoChild } from './io-child';

@Component({
  selector: 'app-io-parent',
  imports: [IoChild],
  templateUrl: './io-parent.html',
  styleUrl: './io-parent.css',
})
export class IoParent {
  /** State owned by the parent; passed down via property binding */
  protected readonly title = signal('venkatesh');
  protected readonly score = signal(0);
  protected readonly lastEvent = signal('Waiting for @Output events…');

  onScoreChange(value: number): void {
    this.score.set(value);
  }

  onLiked(message: string): void {
    this.lastEvent.set(message);
    this.title.set('suresh');
  }
}
