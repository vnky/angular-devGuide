import { Routes } from '@angular/router';

import { HostDemo } from './host-demo/host-demo';
import { Home } from './home/home';
import { LifecycleDemo } from './lifecycle/lifecycle-demo';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'lifecycle', component: LifecycleDemo, title: 'Lifecycle' },
  { path: 'host', component: HostDemo, title: 'HostListener & HostBinding' },
  { path: '**', redirectTo: '' },
];
