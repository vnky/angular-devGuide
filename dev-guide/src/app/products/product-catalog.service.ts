import { Injectable, signal } from '@angular/core';

import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class ProductCatalogService {
  private readonly catalog = signal<Product[]>([
    {
      id: 1,
      name: 'Wireless Keyboard & Mouse Set',
      description: 'Ergonomic keyboard and mouse combo with wireless connectivity.',
      price: 79.99,
      imageUrl: 'https://picsum.photos/seed/keyboard/160/160',
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      description: 'Track your fitness goals with heart rate monitoring and GPS.',
      price: 299.99,
      imageUrl: 'https://picsum.photos/seed/watch/160/160',
    },
    {
      id: 3,
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation.',
      price: 199.99,
      originalPrice: 249.99,
      imageUrl: 'https://picsum.photos/seed/headphones/160/160',
    },
    {
      id: 4,
      name: 'Portable Bluetooth Speaker',
      description: 'Compact speaker with powerful bass and 12-hour battery life.',
      price: 79.99,
      originalPrice: 99.99,
      imageUrl: 'https://picsum.photos/seed/speaker/160/160',
    },
  ]);

  readonly products = this.catalog.asReadonly();

  getById(id: number): Product | undefined {
    return this.catalog().find((product) => product.id === id);
  }
}
