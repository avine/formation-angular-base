import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product/product.types';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {
  protected product?: Product;

  protected hasError = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
  ) {
    const productId = this.activatedRoute.snapshot.params[PRODUCT_DETAILS_PARAM_KEY];
    this.httpClient.get<Product>(`http://localhost:8080/api/products/${productId}`).subscribe({
      next: (product) => (this.product = product),
      error: () => (this.hasError = true),
    });
  }
}
