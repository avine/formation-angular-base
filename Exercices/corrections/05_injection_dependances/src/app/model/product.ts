export class Product {

	title:string;
	description: string;
	photo: string;
	price: number;
	stock: number;

	constructor(title, description, photo, price, stock){
		this.title = title;
		this.description = description;
		this.photo = photo;
		this.price = price;
		this.stock = stock;
	}

}
