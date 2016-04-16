import {Component} from 'angular2/core';
import {CustomerService} from '../../service/CustomerService';
import {Product} from '../../model/product';

@Component({
  selector: 'basket',
  templateUrl: 'app/components/basket/basket.html'
})
export class Basket {

  products:Product[];
  constructor(private customerService:CustomerService) {
    this.customerService.getBasket().subscribe(products => this.products = products);
  }

}
