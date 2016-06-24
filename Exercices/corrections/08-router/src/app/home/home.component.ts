import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {FooterComponent} from '../footer';
import {ProductComponent} from '../product';
import {Product} from '../model/product.model';
import {CustomerService} from '../service/customer.service';
import {ProductService} from '../service/product.service';
import {ProductSortPipe} from '../pipe/product-sort.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [ROUTER_DIRECTIVES, FooterComponent, ProductComponent], 
  pipes: [ProductSortPipe]
})
export class HomeComponent  {

  public products:Product[];

  constructor(private productService:ProductService, private customerService:CustomerService, public title:String){
      this.productService.getProducts().subscribe(result => this.products = result);
      this.customerService.getBasket().subscribe();
  }
  
  getTotal(): number {
      return this.customerService.getTotal();
  }

  updateTotal(event) {
      this.customerService.addProduct(event)
        .subscribe(_ => this.productService.decreaseStock(event.title));
  }

  isTheLast(title: string): boolean {
    return this.productService.isTheLast(title);
  }

  isNotAvailable(title: string): boolean {
    return this.productService.isNotAvailable(title);
  }
}
