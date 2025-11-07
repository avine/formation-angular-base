import { Component, computed, signal } from '@angular/core';
import { HighlightPrice } from './highlight-price/highlight-price';
import { Menu } from './menu/menu';
import { ProductCard } from './product/product-card';
import { Product } from './product/product-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [HighlightPrice, Menu, ProductCard],
})
export class App {
  products = signal<Product[]>([
    {
      id: 'welsch',
      title: 'Coding the welsch',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-welsch.jpg',
      price: 20,
      stock: 2,
    },
    {
      id: 'world',
      title: 'Coding the world',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-world.jpg',
      price: 18,
      stock: 1,
    },
    {
      id: 'vador',
      title: 'Duck Vador',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-stars.jpg',
      price: 21,
      stock: 2,
    },
    {
      id: 'snow',
      title: 'Coding the snow',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-snow.jpg',
      price: 19,
      stock: 2,
    },
  ]);

  productsInStock = computed<Product[]>(() => this.products().filter(({ stock }) => stock > 0));

  total = signal(0);

  addToBasket({ id, price }: Product) {
    // Option 1)
    // Modern JavaScript Syntax
    this.products.update((products) =>
      products.map((product) => {
        if (product.id === id) {
          return { ...product, stock: product.stock - 1 };
        }
        return product;
      }),
    );

    // Option 2)
    // If the syntax above is too difficult to understand,
    // here is an alternative implementation that uses a more classic JavaScript syntax.
    /*this.products.update((products) => {
      const newProducts: Product[] = [];
      for (const product of products) {
        if (product.id === id) {
          const newProduct = Object.assign({}, product);
          newProduct.stock -= 1;
          newProducts.push(newProduct);
        } else {
          newProducts.push(product);
        }
      }
      return newProducts;
    });*/

    this.total.update((total) => total + price);
  }
}
