import {Product} from "../model/product"
import {UpperCasePipe} from 'angular2/common';
import {Injectable} from 'angular2/core'

@Injectable()
export class ProductService {

	private products:Product[];

	constructor(uppercase:UpperCasePipe){
		this.products = new Array<Product>();
		this.products.push(new Product('Z-Product 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 10, 2));
    this.products.push(new Product('B-Product 2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500' ,20, 2));
    this.products.push(new Product('C-Product 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 30, 2));
    this.products.push(new Product('D-Product 4', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 40, 2));

		this.products = this.products.map(function(product){
			product.title = uppercase.transform(product.title);
			return product;
		})
	}

	getProducts():Product[]{
		return this.products;
	}

	isTheLast(title:string):boolean{
		return this.products.find((product) => {return product.title === title}).stock === 1;
	}

	isNotAvailable(title:string):boolean{
		return this.products.find((product) => {return product.title === title}).stock === 0;
	}

	decreaseStock(title:string){
		this.products.find((product) => {return product.title === title}).stock -= 1;
	}
}
