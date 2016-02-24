import {Product} from "../model/product"
import {UpperCasePipe} from 'angular2/common';
import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class ProductService {

	private API = 'http://localhost:8082/rest/';

	private products:Product[];

	constructor(private http:Http, private uppercase:UpperCasePipe){ }

	getProducts():Observable<Product[]>{
		if(this.products && this.products.length > 0){
			return Observable.from(this.products);
		}

		return this.http.get(this.API + 'products')
						.map(result => result.json())
						.map((result:Product[]) => {
								this.products = result
								return result.map(product => {
									product.title = this.uppercase.transform(product.title);
									return product;
								});
						});
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
