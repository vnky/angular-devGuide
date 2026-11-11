import { computed, Injectable, signal } from '@angular/core';

import { ProductCatalogService } from './product-catalog.service';
import { CartItem, CartLine } from './product';

const TAX_RATE = 0.1;

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = signal<CartItem[]>([
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
    { productId: 3, quantity: 1 },
  ]);

  readonly cartItems = this.items.asReadonly();

  readonly lines = computed<CartLine[]>(() =>
    this.items()
      .map((item) => {
        const product = this.catalog.getById(item.productId);
        if (!product || item.quantity <= 0) {
          return null;
        }
        return {
          product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter((line): line is CartLine => line !== null),
  );

  readonly itemCount = computed(() =>
    this.lines().reduce((sum, line) => sum + line.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this.lines().reduce((sum, line) => sum + line.lineTotal, 0),
  );

  readonly tax = computed(() => this.subtotal() * TAX_RATE);

  readonly total = computed(() => this.subtotal() + this.tax());

  constructor(private readonly catalog: ProductCatalogService) {}

  addItem(productId: number, quantity = 1): void {
    this.items.update((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { productId, quantity }];
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this.items.update((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  }

  removeItem(productId: number): void {
    this.items.update((current) => current.filter((item) => item.productId !== productId));
  }

  clearCart(): void {
    this.items.set([]);
  }
}
