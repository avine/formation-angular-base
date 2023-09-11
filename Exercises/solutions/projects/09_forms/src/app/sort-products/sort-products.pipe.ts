import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../product/product.types';

@Pipe({
  name: 'sortProducts',
  pure: false,
})
export class SortProductsPipe implements PipeTransform {
  transform(products: Product[], key: keyof Product = 'price'): Product[] {
    return [...products].sort((productA, productB) => {
      if (productA[key] > productB[key]) {
        return 1;
      }
      if (productA[key] < productB[key]) {
        return -1;
      }
      return 0;
    });
  }
}
