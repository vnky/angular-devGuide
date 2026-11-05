import { Component } from '@angular/core';

import { HostCard } from './host-card';

@Component({
  selector: 'app-host-demo',
  imports: [HostCard],
  templateUrl: './host-demo.html',
  styleUrl: './host-demo.css',
})
export class HostDemo {}
