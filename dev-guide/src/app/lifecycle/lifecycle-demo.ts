import { Component, OnDestroy, OnInit, signal } from '@angular/core';

import { LifecycleLogEntry } from './lifecycle-log.model';
import { LifecycleProbe } from './lifecycle-probe';

@Component({
  selector: 'app-lifecycle-demo',
  imports: [LifecycleProbe],
  templateUrl: './lifecycle-demo.html',
  styleUrl: './lifecycle-demo.css',
})
export class LifecycleDemo implements OnInit, OnDestroy {
  protected readonly showProbe = signal(true);
  protected readonly message = signal('Angular lifecycle');
  protected readonly logs = signal<LifecycleLogEntry[]>([]);

  protected readonly hooksGuide = [
    {
      name: 'ngOnChanges',
      when: 'When @Input values change (before ngOnInit and on later updates).',
    },
    {
      name: 'ngOnInit',
      when: 'Once after first ngOnChanges; good place for setup logic.',
    },
    {
      name: 'ngDoCheck',
      when: 'Every change detection run; use for custom change detection.',
    },
    {
      name: 'ngAfterContentInit',
      when: 'Once after Angular projects external content (<ng-content>).',
    },
    {
      name: 'ngAfterContentChecked',
      when: 'After every check of projected content.',
    },
    {
      name: 'ngAfterViewInit',
      when: 'Once after component template and child views are initialized.',
    },
    {
      name: 'ngAfterViewChecked',
      when: 'After every check of component and child views.',
    },
    {
      name: 'ngOnDestroy',
      when: 'Just before destroy; unsubscribe and release resources.',
    },
  ] as const;

  ngOnInit(): void {
    this.addLog('LifecycleDemo (route)', 'ngOnInit', 'route component created');
  }

  ngOnDestroy(): void {
    console.info('[LifecycleDemo] ngOnDestroy — leaving /lifecycle route');
  }

  onHookLogged(entry: LifecycleLogEntry): void {
    this.logs.update((items) => [...items.slice(-79), entry]);
  }

  updateMessage(value: string): void {
    this.message.set(value);
  }

  toggleProbe(): void {
    this.showProbe.update((visible) => !visible);
  }

  clearLogs(): void {
    this.logs.set([]);
  }

  private addLog(source: string, hook: string, detail: string): void {
    this.logs.update((items) => [
      ...items.slice(-79),
      { source, hook, detail, time: new Date().toLocaleTimeString() },
    ]);
  }
}
