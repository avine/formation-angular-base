import {Component, bootstrap, provide} from "angular2/angular2"
import {MenuComponent} from "./menu/menu"
import {ProductComponent} from "./product/product"
import {ProductService} from "./service/ProductService"
import {CustomerService} from "./service/CustomerService"
import {Product} from "./model/product"

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
            <template ng-for #product [ng-for-of]="products">
                <product *ng-if="!isNotAvailable(product.title)" [data]="product" (add-to-basket)="addToBasket($event)" [ng-class]="{'last': isTheLast(product.title)}"></product>
            </template>
        </div>

        <hr>

        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; Your Website 2014</p>
                </div>
            </div>
        </footer>

    </div>
  
  `,
  directives: [MenuComponent , ProductComponent]
})
class AppComponent {
    public total:number;
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

bootstrap(AppComponent, [ProductService, CustomerService, provide(String, {useValue: 'Bienvenue sur Zenika Ecommerce'})]);
