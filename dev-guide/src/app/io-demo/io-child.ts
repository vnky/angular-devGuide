import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-io-child',
  templateUrl: './io-child.html',
  styleUrl: './io-child.css',
})
export class IoChild {
  /** Parent → child: bound with [title] and [score] */
  @Input({ required: true }) title!: string;
  @Input() score = 0;

  /** Child → parent: bound with (scoreChange) and (liked) */
  @Output() scoreChange = new EventEmitter<number>();
  @Output() liked = new EventEmitter<string>();

  increment(): void {
    this.scoreChange.emit(this.score + 1);
  }

  sendLike(): void {
    this.liked.emit(`Child liked "${this.title}"`);
  }
}
