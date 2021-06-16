import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {

  // @Input('cart') cart:ShoppingCart
  cart:ShoppingCart
  subscription1:Subscription
  cart$

  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit(){
    this.cart$= (await this.shoppingCartService.getCart()).valueChanges()
    .pipe(map((x:any)=>new ShoppingCart(x.items)));
    // this.subscription1=cart$.subscribe(cart=>this.cart=cart)
    // console.log(this.cart);
  }


}
