import { Component, model } from '@angular/core';
import { SelectProductKey } from './select-product-key.types';

@Component({
  selector: 'app-select-product-key',
  templateUrl: './select-product-key.component.html',
})
export class SelectProductKeyComponent {
  static uid = 1;

  readonly productKey = model<SelectProductKey>();

  protected name = `select-product-key-${SelectProductKeyComponent.uid++}`;

  protected inputs: { key: SelectProductKey; label: string }[] = [
    { key: 'price', label: 'Prix' },
    { key: 'stock', label: 'Stock' },
  ];

  protected onClick(newProductKey: SelectProductKey) {
    this.productKey.update((oldProductKey) => (newProductKey !== oldProductKey ? newProductKey : undefined));
  }
}
