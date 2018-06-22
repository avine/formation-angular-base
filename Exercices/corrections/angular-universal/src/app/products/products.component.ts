import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get<any[]>('http://localhost:8080/rest/products').subscribe(data => this.products = data);
  }

}
