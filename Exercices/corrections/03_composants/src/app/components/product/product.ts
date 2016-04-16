import {Component, EventEmitter, Input, Output} from "angular2/core";
import {Product} from "../../model/product";

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
            </div>`
})
export class ProductComponent {
    @Input() data:Product
    @Output('add-to-basket') addToBasket = new EventEmitter();

    clickHandler() {
        this.addToBasket.next(this.data);
    }
}
