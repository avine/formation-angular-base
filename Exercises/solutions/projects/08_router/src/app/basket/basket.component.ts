import { Component, OnInit } from '@angular/core';

import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
})
export class BasketComponent implements OnInit {
  protected items$ = this.basketService.items$;

  protected total$ = this.basketService.total$;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.dispatchItems().subscribe();
  }
}
