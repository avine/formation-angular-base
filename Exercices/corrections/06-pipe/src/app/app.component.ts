import { Component } from '@angular/core';
import {MenuComponent} from './menu';
import {FooterComponent} from './footer';
import {ProductComponent} from './product';
import {Product} from './model/product.model';
import {CustomerService} from './service/customer.service';
import {ProductService} from './service/product.service';
import {ProductSortPipe} from './pipe/product-sort.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'], 
  directives: [MenuComponent, FooterComponent, ProductComponent], 
  pipes: [ProductSortPipe]
})
export class AppComponent {

  public products:Product[];

  constructor(private productService:ProductService, private customerService:CustomerService, public title:String){
      this.products = this.productService.getProducts();
  }

  getTotal(): number {
      return this.customerService.getTotal();
  }

  updateTotal(event) {
      this.customerService.addProduct(event);
      this.productService.decreaseStock(event.title);
  }

  isTheLast(title: string): boolean {
    return this.productService.isTheLast(title);
  }

  isNotAvailable(title: string): boolean {
    return this.productService.isNotAvailable(title);
  }
}
