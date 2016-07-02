/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ProductSortPipe } from './product-sort.pipe';

describe('Pipe: ProductSort', () => {
  it('create an instance', () => {
    let pipe = new ProductSortPipe();
    expect(pipe).toBeTruthy();
  });
});
