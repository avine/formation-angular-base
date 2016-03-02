import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {CustomerService} from '../../service/CustomerService';
import {Product} from '../../model/product';
import {Customer} from "../../model/customer";
import {PatternValidator} from './pattern-validator';

@Component({
    selector: 'confirmation',
    directives:[PatternValidator],
    templateUrl: 'app/components/confirmation/confirmation.html'
})
export class Confirmation {

    products:Product[];
    customer:Customer;

    constructor( private router: Router, private customerService:CustomerService) {
        this.customer = new Customer("", "", "");
        this.customerService.getBasket().subscribe(products => this.products = products);
    }

    validate(customer:Customer) {
        this.customerService.validate(customer).subscribe(_ => this.router.navigate(['Home']));
    }

}
