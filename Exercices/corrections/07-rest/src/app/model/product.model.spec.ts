/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {Product} from './product.model';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product('Titre', 'Description', 'Img', 10, 10)).toBeTruthy();
  });
});
