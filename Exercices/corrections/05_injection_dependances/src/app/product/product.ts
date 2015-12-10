import {Component, EventEmitter} from "angular2/angular2";
import {Product} from "../model/product";

@Component({
  selector: "product",
  template: `<div class="col-md-3 col-sm-6 hero-feature">
                <div class="thumbnail">
                    <img [src]="data.photo" alt="">
                    <div class="caption">
                        <h3>{{data.title}} - {{data.price}}€</h3>
                        <p>{{data.description}}</p>
                        <p>
                            <button class="btn btn-primary" (click)="clickHandler()">Ajoutez au panier</button>
                        </p>
                    </div>
                </div>
            </div>`,
   inputs: ['data'],
   outputs: ['addToBasket']
})
export class ProductComponent {
    data:Product
    addToBasket = new EventEmitter();
    
    clickHandler(){
        this.addToBasket.next(this.data);
    }
}


