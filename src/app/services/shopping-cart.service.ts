import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { take,map } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  create(){
    return this.db.list('/shopping-carts').push({
      dateCreated:new Date().getTime()
    })
  }

  private getItem(cartId,productId){
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productId);
  }

  async getCart():Promise<AngularFireObject<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId);
    // .map(x=>new ShoppingCart);
  }


  // async getCart(): Promise<Observable<ShoppingCart>> {
  //   let cartId = await this.getOrCreateCartId();
  //   return this.db.object('/shopping-carts/' + cartId)
  //   .map(x => new ShoppingCart(x.items));
  // }

  private async getOrCreateCartId():Promise<string>{
    let cartId=localStorage.getItem("cartId");
    if(!cartId){
      let result= await this.create();
      localStorage.setItem("cartId",result.key);
      return result.key;
    }
    return cartId;
  }

  async addToCart(product){
    this.updateItem(product,1);
  }

  async removeFromCart(product){
    this.updateItem(product,-1);
  }

  async clearCart(){
    let cartId=await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }

  private async updateItem(product:Product,change:number){
    console.log(product)
    let cartId=await this.getOrCreateCartId();
    let items$=this.getItem(cartId,product.$key);
    // let items$=this.db.object('/shopping-carts/'+cartId+'/items/'+product.$key)
    items$.valueChanges().pipe(take(1))
    .subscribe((p:any)=>{
      console.log(p);
      if(p)items$.update({quantity:p.quantity+change})
      else{
        console.log(product);
        let copy={...product}
        delete copy.$key;
        console.log(product);
        items$.set({
          // product:copy,
          title:copy.title,
          imageUrl:copy.imageUrl,
          price:copy.price,
          quantity:1
        })
      }
    })
  }




}
