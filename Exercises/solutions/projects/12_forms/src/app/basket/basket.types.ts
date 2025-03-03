export interface BasketItem {
  id: string;
  title: string;
  price: number;
}

export interface CheckoutDetails {
  name: string;
  address: string;
  creditCard: string;
}

export interface CheckoutOrder {
  orderNumber: number;
}
