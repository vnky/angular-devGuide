import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CartService } from '../products/cart.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly cart = inject(CartService);
}
