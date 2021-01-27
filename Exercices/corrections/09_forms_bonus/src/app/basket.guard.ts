import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomerService } from './services/customer.service'

@Injectable({
  providedIn: 'root'
})
export class BasketGuard implements CanActivate {
  constructor(private custormerServer : CustomerService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const basket = await this.custormerServer.getBasket().toPromise()
    return basket.length > 0;
  }
}
