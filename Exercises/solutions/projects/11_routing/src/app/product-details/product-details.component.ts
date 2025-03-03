import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../catalog/product/product.types';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  imports: [CurrencyPipe, UpperCasePipe],
})
export class ProductDetailsComponent {
  private activatedRoute = inject(ActivatedRoute);

  private httpClient = inject(HttpClient);

  protected product = signal<Product | undefined>(undefined);

  protected hasError = signal(false);

  constructor() {
    const productId = this.activatedRoute.snapshot.params[PRODUCT_DETAILS_PARAM_KEY];

    this.httpClient.get<Product>(`http://localhost:8080/api/products/${productId}`).subscribe({
      next: (product) => this.product.set(product),
      error: () => this.hasError.set(true),
    });
  }
}

export default ProductDetailsComponent;
