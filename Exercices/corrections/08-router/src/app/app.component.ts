import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
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
  directives: [MenuComponent, ROUTER_DIRECTIVES]
})
export class AppComponent {

  
}
