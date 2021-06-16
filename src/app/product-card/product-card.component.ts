import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product;
  @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart:ShoppingCart;

  constructor(private cartService:ShoppingCartService) { }

  ngOnInit(): void {
    console.log(this.shoppingCart);
    console.log(this.product);
    // let a=this.shoppingCart.getQuantity(this.product);
    // console.log(a);


  }

  addToCart(){
    this.cartService.addToCart(this.product);

  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    if("items" in this.shoppingCart){
      let item = this.shoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
    }
    return 0
    // if(this.shoppingCart.items){
    //   let item = this.shoppingCart.items[this.product.$key];
    //   return item.quantity
    // }
    // else return 0;
    // console.log(this.shoppingCart);

    // let item = this.shoppingCart.items[this.product.$key];
    // return item ? item.quantity : 0;
  }

}
