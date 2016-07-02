import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {MenuComponent} from './menu';
import {FooterComponent} from './footer';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MenuComponent, ROUTER_DIRECTIVES, FooterComponent]
})
export class AppComponent {


}
