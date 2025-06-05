import { Component, model } from '@angular/core';
import { ProductKey } from './product-key-types';

@Component({
  selector: 'app-select-product-key',
  templateUrl: './select-product-key.html',
})
export class SelectProductKey {
  static uid = 1;

  readonly productKey = model<ProductKey>();

  protected name = `select-product-key-${SelectProductKey.uid++}`;

  protected inputs: { key: ProductKey; label: string }[] = [
    { key: 'price', label: 'Prix' },
    { key: 'stock', label: 'Stock' },
  ];

  protected onClick(newProductKey: ProductKey) {
    this.productKey.update((oldProductKey) => (newProductKey !== oldProductKey ? newProductKey : undefined));
  }
}
