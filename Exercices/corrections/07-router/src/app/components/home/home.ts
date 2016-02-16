import {Component} from 'angular2/core';
import {OrderBy} from '../../pipes/order-by/order-by';
import {ProductComponent} from "../../components/product/product"
import {Product} from "../../model/product"
import {ProductService} from "../../service/ProductService"
import {CustomerService} from "../../service/CustomerService"

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  directives: [ProductComponent],
  pipes: [OrderBy]
})
export class Home {

  public products:Product[];

  constructor(private productService:ProductService, private customerService:CustomerService, public title:String){
      this.productService.getProducts().subscribe(result => this.products = result);
      this.customerService.getBasket().subscribe();
  }

  getTotal():number {
      return this.customerService.getTotal();
  }

  addToBasket(event){
      this.customerService.addProduct(event)
        .subscribe(_ => this.productService.decreaseStock(event.title));

  }

  isTheLast(title:string):boolean{
    return this.productService.isTheLast(title);
  }

  isNotAvailable(title:string):boolean{
    return this.productService.isNotAvailable(title);
  }

}
