export class Product {
	
	title:string;
	description: string;
	photo: string;
	price: number;
	
	constructor(title, description, photo, price){
		this.title = title;
		this.description = description;
		this.photo = photo;
		this.price = price;
	}
	
}