import {Component} from "angular2/core"
import {RouterLink} from 'angular2/router';

@Component({
  selector: "menu",
  template: `<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                        <a class="navbar-brand" [routerLink]="['Home']">Zenika Ecommerce</a>
                    </div>
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li>
                                <a [routerLink]="['Basket']">Voir mon Panier</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>`,
  directives: [RouterLink]
})
export class MenuComponent {
}
