import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  cart:ShoppingCart;
  // checkOutForm:FormGroup;
  // userId;
  // subscription2:Subscription;
  subscription1:Subscription;

  constructor(
    private router:Router,
    private authService:AuthService,
    private shoppingCartService:ShoppingCartService,
    private orderService:OrderService
    ) { }

  // async ngOnInit(){
  //   this.checkOutForm=new FormGroup({
  //     'name':new FormControl(null,Validators.required),
  //     'addressLine1': new FormControl(null,Validators.required),
  //     'addressLine2':new FormControl(null,Validators.required),
  //     'city':new FormControl(null,Validators.required)
  //   });
  //   let cart$= (await this.shoppingCartService.getCart()).valueChanges();
  //   this.subscription1=cart$.subscribe(cart=>this.cart=cart)
  //   this.subscription2=this.authService.userDetails$.subscribe(user=>this.userId=user.uid);
  // }

  // ngOnDestroy(){
  //   this.subscription1.unsubscribe();
  //   this.subscription2.unsubscribe();
  // }

}
