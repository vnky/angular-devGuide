import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-cart',
  imports: [
    CurrencyPipe,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './product-cart.html',
  styleUrl: './product-cart.css',
})
export class ProductCart {
  protected readonly cart = inject(CartService);

  protected onQuantityChange(productId: number, value: string): void {
    const quantity = Number.parseInt(value, 10);
    if (Number.isNaN(quantity)) {
      return;
    }
    this.cart.updateQuantity(productId, quantity);
  }
}
