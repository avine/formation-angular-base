import { firstValueFrom } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { CustomerService } from '../services/customer.service';

@Injectable({
  providedIn: 'root',
})
export class BasketGuard implements CanActivate {
  constructor(private custormerServer: CustomerService) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const basket = await firstValueFrom(this.custormerServer.getBasket());
    return basket.length > 0;
  }
}
