import {Component} from "angular2/core"
import {bootstrap} from "angular2/platform/browser";
import {MenuComponent} from "./components/menu/menu"
import {ProductComponent} from "./components/product/product"
import {FooterComponent} from "./components/footer/footer"
import {Product} from "./model/product"

@Component({
  selector: "app",
  template: `
      <menu></menu>
      <div class="container">


        <header class="jumbotron hero-spacer">
            <h1>Bienvenue sur Zenika Ecommerce</h1>
            <p>Votre panier s'élève à {{total}}€</p>
            <p><a class="btn btn-primary btn-large">Voir mon panier</a></p>
        </header>

        <hr>

        <div class="row">
            <div class="col-lg-12">
                <h3>Derniers Produits</h3>
            </div>
        </div>

        <div class="row text-center">
          <template ngFor #product [ngForOf]="products">
              <product *ngIf="product.stock > 0" [data]="product" (addToBasket)="addToBasket($event)" [ngClass]="{'last': product.stock === 1}"></product>
          </template>
        </div>

        <hr>

        <footer>
            Copyright &copy; Your Website 2014
        </footer>

    </div>

  `,
  directives: [MenuComponent , ProductComponent, FooterComponent]
})
export class Application {
    public total:number;
    public products:Product[];

    constructor(){
        this.total = 0;

        this.products = new Array<Product>();

        this.products.push(new Product('Product 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 10, 2));
        this.products.push(new Product('Product 2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500' ,20, 2));
        this.products.push(new Product('Product 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 30, 2));
        this.products.push(new Product('Product 4', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 40, 2));
    }

    addToBasket(event){
        this.total += event.price;
    }
}
