import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HostEventZone } from './host-event-zone';
import { WindowScrollBadge } from './window-scroll-badge';

@Component({
  selector: 'app-host-listener-demo',
  imports: [HostEventZone, WindowScrollBadge, RouterLink],
  templateUrl: './host-listener-demo.html',
  styleUrl: './host-listener-demo.css',
})
export class HostListenerDemo {}
