import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  userId

  constructor(
    private db:AngularFireDatabase,
    private shoppingCartService:ShoppingCartService,
    private authService:AuthService
    ) { }

  async placeOrder(order){
    let result=await this.db.list('/orders/').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(){
    return this.db.list('/orders');
  }

  async getOrdersByUser(){
    // setTimeout(()=>{
    //   this.authService.userDetails$.subscribe(user=>{
    //     console.log(user);

    //     this.userId=user.uid
    //   });
    // },3000)
    this.userId=this.authService.uid
    // if(!this.userId) this.userId="y6mZfWGU2dP4E9DwpBNavYMgdyC2"
    return this.db.list('/orders',ref=>ref.orderByChild('userId').equalTo(this.userId));
  }

}
