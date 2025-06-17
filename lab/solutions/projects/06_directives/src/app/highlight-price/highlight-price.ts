import { Directive, input, numberAttribute } from '@angular/core';

@Directive({
  selector: '[appHighlightPrice]',
  host: {
    '[class]': 'highlightClass',
    '[style.transition]': '"color 200ms ease"',
  },
})
export class HighlightPrice {
  price = input(NaN, { alias: 'appHighlightPrice', transform: numberAttribute });

  get highlightClass() {
    const price = this.price();

    if (!price) {
      return 'text-body-tertiary fst-italic';
    }

    if (price < 50) {
      return 'text-body-secondary';
    }

    return 'text-body-emphasis';
  }
}
