import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortProducts' })
export class SortProductsStubPipe implements PipeTransform {
  transform<T>(value: T): T {
    return value;
  }
}
