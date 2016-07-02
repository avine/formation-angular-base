import { Component } from '@angular/core';
import {MenuComponent} from './menu';
import {FooterComponent} from './footer';
import {ProductComponent} from './product';
import {Product} from './model/product.model';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'], 
  directives: [MenuComponent, FooterComponent, ProductComponent]
})
export class AppComponent {

  total:number;
  products: Product[];

  title = 'app works!';
  helloMsg:string = 'This is my first component';

  constructor(){
    this.total = 0;

    
    this.products = [
        new Product('Product 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 10, 5),
        new Product('Product 2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 20, 0),
        new Product('Product 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 30, 1),
        new Product('Product 4', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 40, 5)];
  }


  updateTotal(data:Product){
    this.total += data.price;
  }
}
