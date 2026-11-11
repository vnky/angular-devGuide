import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ProductCatalogService } from '../product-catalog.service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-grid',
  imports: [ProductCard, MatIconModule, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css',
})
export class ProductGrid {
  private readonly catalog = inject(ProductCatalogService);

  protected readonly searchTerm = signal('');

  protected readonly filteredProducts = computed(() => {
    const term = this.searchTerm().toLocaleLowerCase().trim();
    const products = this.catalog.products();
    if (!term) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLocaleLowerCase().includes(term) ||
        product.description.toLocaleLowerCase().includes(term),
    );
  });
}
