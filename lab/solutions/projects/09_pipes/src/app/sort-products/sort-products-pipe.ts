import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product/product-types';
import { ProductKey } from '../select-product-key/product-key-types';

@Pipe({
  name: 'sortProducts',
  pure: false,
})
export class SortProductsPipe implements PipeTransform {
  transform(products: Product[] | null | undefined, key?: ProductKey): Product[] {
    if (!key) {
      return products ?? [];
    }
    return [...(products ?? [])].sort((productA, productB) => productA[key] - productB[key]);
  }
}
