import {Product} from "../model/product";

export class CustomerService {
	
	public products:Product[] = new Array<Product>();
	
	addProduct(product:Product):void{
		this.products.push(product);
	}
	
	
	getTotal():number{
		return this.products.reduce((previous, next) => previous + next.price, 0)
	}
	
}
