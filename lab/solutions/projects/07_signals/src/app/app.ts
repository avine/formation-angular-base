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
    this.products.update((products) =>
      products.map((product) => {
        if (product.id === id) {
          return { ...product, stock: product.stock - 1 };
        }
        return product;
      }),
    );

    this.total.update((total) => total + price);
  }
}
