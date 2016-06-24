import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product.model';

@Pipe({
  name: 'productSort'
})
export class ProductSortPipe implements PipeTransform {

  transform(value: Product[], name: string = 'title'): Product[] {
    return value.sort(function (previous, next) {
      if (previous[name] > next[name]) {
        return 1;
      }
      else if (previous[name] < next[name]) {
        return -1;
      }
      return 0;
    });
  }

}
