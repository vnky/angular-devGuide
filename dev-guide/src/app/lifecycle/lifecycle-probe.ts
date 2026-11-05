import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { LifecycleLogEntry } from './lifecycle-log.model';

@Component({
  selector: 'app-lifecycle-probe',
  template: `
    <div class="probe">
      <p>Probe child is active. @Input message: <strong>{{ message }}</strong></p>
      <ng-content />
    </div>
  `,
  styleUrl: './lifecycle-probe.css',
})
export class LifecycleProbe
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() message = '';

  @Output() hookLogged = new EventEmitter<LifecycleLogEntry>();

  private doCheckRuns = 0;
  private afterContentCheckedRuns = 0;
  private afterViewCheckedRuns = 0;

  ngOnChanges(changes: SimpleChanges): void {
    const messageChange = changes['message'];
    const detail = messageChange
      ? `message: "${messageChange.previousValue}" → "${messageChange.currentValue}"`
      : 'input bindings updated';
    this.emit('ngOnChanges', detail);
  }

  ngOnInit(): void {
    this.emit('ngOnInit', 'component initialized once');
  }

  ngDoCheck(): void {
    this.doCheckRuns++;
    if (this.doCheckRuns <= 2 || this.doCheckRuns % 25 === 0) {
      this.emit('ngDoCheck', `change detection run #${this.doCheckRuns}`);
    }
  }

  ngAfterContentInit(): void {
    this.emit('ngAfterContentInit', 'projected content ready');
  }

  ngAfterContentChecked(): void {
    this.afterContentCheckedRuns++;
    if (this.afterContentCheckedRuns <= 2 || this.afterContentCheckedRuns % 25 === 0) {
      this.emit('ngAfterContentChecked', `checked projected content #${this.afterContentCheckedRuns}`);
    }
  }

  ngAfterViewInit(): void {
    this.emit('ngAfterViewInit', 'component view ready');
  }

  ngAfterViewChecked(): void {
    this.afterViewCheckedRuns++;
    if (this.afterViewCheckedRuns <= 2 || this.afterViewCheckedRuns % 25 === 0) {
      this.emit('ngAfterViewChecked', `checked component view #${this.afterViewCheckedRuns}`);
    }
  }

  ngOnDestroy(): void {
    this.emit('ngOnDestroy', 'component destroyed (navigate away or toggle off)');
  }

  private emit(hook: string, detail: string): void {
    this.hookLogged.emit({
      source: 'LifecycleProbe (child)',
      hook,
      detail,
      time: new Date().toLocaleTimeString(),
    });
  }
}
