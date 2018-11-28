import { Component, Inject } from '@angular/core';

import { Product } from './model/product';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';
import { TestService } from './services/Test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: Product[];

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private testService : TestService ,
    @Inject('welcomeMsg') public title: string
  ) {
    this.products = productService.getProducts();
    console.log(testService.getTest());
  }

  getTotal(): number {
    return this.customerService.getTotal();
  }

  updatePrice(event) {
    this.customerService.addProduct(event);
    this.productService.decreaseStock(event);
  }

  isAvailable(product: Product): boolean {
    return this.productService.isAvailable(product);
  }
}
