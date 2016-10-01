import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { CustomerService } from '../services/customer.service';
  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products:Product[];

  constructor(private productService:ProductService, private customerService:CustomerService, @Inject('welcomeMsg') public title:string){
      this.productService.getProducts().subscribe(products => this.products = products);
      this.customerService.getBasket().subscribe()
  }

  getTotal(): number {
      return this.customerService.getTotal();
  }

  updatePrice(event) {
      this.customerService.addProduct(event).subscribe(_ => {
        this.productService.decreaseStock(event.title);
      });
      
  }

  isAvailable(title: string): boolean {
    return this.productService.isAvailable(title);
  }

  ngOnInit() {
  }

}
