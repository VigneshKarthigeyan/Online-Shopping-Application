import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit,OnDestroy {

  isMenuCollapsed=true;
  appUser:AppUser;
  subs:Subscription;
  shoppingCartItemCount;
  // cart$:Observable<ShoppingCart>;
  cart$

  constructor(private authService:AuthService,private shoppingCartService:ShoppingCartService) {

  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.subs.unsubscribe();
  }

  async ngOnInit(){
    this.subs=this.authService.appUser$.subscribe(appUser=>this.appUser=appUser);
    this.cart$=(await this.shoppingCartService.getCart()).valueChanges()
    .pipe(map((x:any)=>new ShoppingCart(x.items)))
    // let cart$=(await this.shoppingCartService.getCart());
    // cart$.valueChanges().subscribe((cart:any)=>{
    //   this.shoppingCartItemCount=0;
    //   for(let id in cart.items){
    //     this.shoppingCartItemCount+=cart.items[id].quantity
    //   }
    // })

    console.log(this.appUser);

  }

  logout(){
    this.authService.logout();
  }

}
