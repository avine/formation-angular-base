import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'menu',
  template: `
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Zenika Ecommerce</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li>
                    <a [routerLink]="['/basket']">Voir mon Panier</a>
                </li>
            </ul>
        </div>
    </div>
  </nav>
  `,
  styleUrls: ['menu.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class MenuComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
