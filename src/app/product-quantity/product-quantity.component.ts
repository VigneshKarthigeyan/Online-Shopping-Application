import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product;
  @Input('shopping-cart') shoppingCart:ShoppingCart;

  constructor(private cartService:ShoppingCartService) { }

  ngOnInit(): void {
    console.log(this.shoppingCart);

  }

  addToCart(){
    this.cartService.addToCart(this.product);

  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }



  getQuantity(){
    // console.log(this.product);
    if(!this.shoppingCart) return 0;
    if("items" in this.shoppingCart){
      let item = this.shoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
    }
    return 0

    // if(!this.shoppingCart) return 0;
    // let item = this.shoppingCart.items[this.product.$key];
    // return item ? item.quantity : 0;
  }

}
