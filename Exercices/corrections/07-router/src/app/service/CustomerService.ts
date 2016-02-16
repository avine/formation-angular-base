import {Product} from "../model/product";
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/core';

@Injectable()
export class CustomerService {

	private API = 'http://localhost:8080/rest/';

	products:Product[] = new Array<Product>();

	constructor(private http:Http){ }

	getBasket():Observable<Product[]>{
		if(false && this.products && this.products.length > 0){
			return Observable.from(this.products);
		}

		return this.http.get(this.API + 'basket')
					.map(result => result.json())
					.map(result => {
						this.products = result;
						return result;
					})
	}

	addProduct(product:Product):Observable<any>{
		let headers = new Headers();
		headers.set('Content-Type', 'application/json');
		return this.http.post(this.API + 'basket', JSON.stringify(product), {headers: headers})
			.map(_ => this.products.push(product));

	}


	getTotal():number{
		return this.products.reduce((previous, next) => previous + next.price, 0)
	}

}
