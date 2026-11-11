import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signal-counter',
  templateUrl: './signal-counter.html',
  styleUrl: './signal-counter.css',
})
export class SignalCounter {
  protected readonly count = signal(0);
  protected doubleCount = computed(() => this.count() * 2);
  protected tripleCount = computed(() => this.count() * 3);
  protected readonly label = computed(() =>
    this.count() === 0 ? 'zero' : this.count() > 0 ? 'positive' : 'negative',
  );

  /** Depends on `label` + `doubleCount` (which depends on `count`). */
  protected readonly summary = computed(
    () => `${this.label()} · double = ${this.doubleCount()}`,
  );

  /** Updated by `effect` when `count` changes (side effect, not for template math). */
  protected readonly effectMessage = signal('Waiting for count changes…');
  protected readonly effectRuns = signal(0);

  constructor() {
    effect(() => {
      const current = this.count();
      this.effectRuns.update((runs) => runs + 1);
      this.effectMessage.set(`effect saw count = ${current} (${this.label()})`);
      console.info('[SignalCounter effect]', current);
    });
  }

  increment(): void {
    this.count.update((value) => value + 1);
  }

  decrement(): void {
    this.count.update((value) => value - 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
