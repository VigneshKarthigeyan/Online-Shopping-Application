import { Product } from './product';

export class ShoppingCartItem {
  $key: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  // product;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }
  // constructor(product:Product,quantity:number){}

  get totalPrice() {
    console.log(this.price);
    console.log(this.quantity);
    return this.price * this.quantity; }
}
