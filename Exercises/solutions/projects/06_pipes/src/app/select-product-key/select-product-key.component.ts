import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SelectProductKey } from './select-product-key.types';

@Component({
  selector: 'app-select-product-key',
  templateUrl: './select-product-key.component.html',
})
export class SelectProductKeyComponent {
  static uid = 1;

  @Input() productKey: SelectProductKey = 'price';

  @Output() productKeyChange = new EventEmitter<SelectProductKey>();

  protected name = `select-product-key-${SelectProductKeyComponent.uid++}`;

  protected inputs: { key: SelectProductKey; label: string }[] = [
    { key: 'price', label: 'Prix' },
    { key: 'stock', label: 'Stock' },
  ];

  protected onChange(productKey: SelectProductKey) {
    this.productKey = productKey;
    this.productKeyChange.emit(this.productKey);
  }
}
