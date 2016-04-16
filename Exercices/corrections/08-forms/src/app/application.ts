import {Component} from "angular2/core"
import {bootstrap} from "angular2/platform/browser";
import {MenuComponent} from "./components/menu/menu"
import {FooterComponent} from "./components/footer/footer"
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {Home} from "./components/home/home"
import {Basket} from "./components/basket/basket"
import {Confirmation} from "./components/confirmation/confirmation";

@RouteConfig([
    {path: '/', component: Home, name: 'Home'},
    {path: '/basket', component: Basket, name: 'Basket'},
    {path: '/confirmation', component: Confirmation, name: 'Confirmation'}
])
@Component({
    selector: `app`,
    template: `
      <menu></menu>
      <div class="container">


        <router-outlet></router-outlet>

        <hr>

        <footer>
            Copyright &copy; Your Website 2014
        </footer>

    </div>

  `,
    directives: [MenuComponent, FooterComponent, RouterOutlet]
})
export class Application {

}
