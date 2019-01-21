import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  private id: string
  public product: Product;
  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.id = params.id;
      this.product = await this.productService.getProduct(params.id).toPromise()
    })
  }

}
