import {Component} from "angular2/core"
import {bootstrap} from "angular2/platform/browser";
import {MenuComponent} from "./components/menu/menu"
import {ProductComponent} from "./components/product/product"
import {FooterComponent} from "./components/footer/footer"
import {Product} from "./model/product"
import {ProductService} from "./service/ProductService"
import {CustomerService} from "./service/CustomerService"
import {OrderBy} from './pipes/order-by/order-by';

@Component({
  selector: "app",
  template: `
      <menu></menu>
      <div class="container">


        <header class="jumbotron hero-spacer">
            <h1>{{title}}</h1>
            <p>Votre panier s'élève à {{getTotal()}}€</p>
            <p><a class="btn btn-primary btn-large">Voir mon panier</a></p>
        </header>

        <hr>

        <div class="row">
            <div class="col-lg-12">
                <h3>Derniers Produits</h3>
            </div>
        </div>

        <div class="row text-center">
          <template ngFor #product [ngForOf]="products | OrderBy">
              <product *ngIf="product.stock > 0" [data]="product" (addToBasket)="addToBasket($event)" [ngClass]="{'last': product.stock === 1}"></product>
          </template>
        </div>

        <hr>

        <footer>
            Copyright &copy; Your Website 2014
        </footer>

    </div>

  `,
  directives: [MenuComponent , ProductComponent, FooterComponent],
  pipes: [OrderBy]
})
export class Application {
  public products:Product[];

  constructor(private productService:ProductService, private customerService:CustomerService, public title:String){
      this.products = this.productService.getProducts();
  }

  getTotal():number {
      return this.customerService.getTotal();
  }

  addToBasket(event){
      this.customerService.addProduct(event);
      this.productService.decreaseStock(event.title);
  }

  isTheLast(title:string):boolean{
    return this.productService.isTheLast(title);
  }

  isNotAvailable(title:string):boolean{
    return this.productService.isNotAvailable(title);
  }
}
