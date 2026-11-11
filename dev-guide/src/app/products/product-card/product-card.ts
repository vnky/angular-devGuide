import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  private readonly cart = inject(CartService);

  readonly product = input.required<Product>();
  readonly addButtonLabel = input('Add to Cart');

  protected addToCart(): void {
    this.cart.addItem(this.product().id);
  }
}
