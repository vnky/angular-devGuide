import { Routes } from '@angular/router';

import { HostDemo } from './host-demo/host-demo';
import { HostListenerDemo } from './host-listener-demo/host-listener-demo';
import { ProductCart } from './products/product-cart/product-cart';
import { ProductGrid } from './products/product-grid/product-grid';
import { LifecycleDemo } from './lifecycle/lifecycle-demo';
import { SignalCounter } from './signal-demo/signal-counter';

export const routes: Routes = [
    { path: '', component: ProductGrid, title: 'Products' },
    { path: 'cart', component: ProductCart, title: 'Shopping Cart' },
    { path: 'lifecycle', component: LifecycleDemo, title: 'Lifecycle' },
    { path: 'host', component: HostDemo, title: 'HostListener & HostBinding' },
    { path: 'host-listener', component: HostListenerDemo, title: '@HostListener' },
    { path: 'signal', component: SignalCounter, title: 'Signals' },
    { path: '**', redirectTo: '' },
];
