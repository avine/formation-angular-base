import { Component, Inject } from '@angular/core';
import { Product } from './model/product';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public products:Product[];

  constructor(private productService:ProductService, private customerService:CustomerService, @Inject('welcomeMsg') public title:string){
      this.products = productService.getProducts();
  }

  getTotal(): number {
      return this.customerService.getTotal();
  }

  updatePrice(event) {
      this.customerService.addProduct(event);
      this.productService.decreaseStock(event.title);
  }

  isAvailable(title: string): boolean {
    return this.productService.isAvailable(title);
  }
}
