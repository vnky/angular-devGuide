import { Component } from '@angular/core';

import { IoParent } from '../io-demo/io-parent';
import { LoadingModal } from '../loading-modal/loading-modal';

@Component({
  selector: 'app-home',
  imports: [IoParent, LoadingModal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
