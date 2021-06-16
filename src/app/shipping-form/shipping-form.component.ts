import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  userId;
  cart:ShoppingCart;
  subscription1:Subscription;
  subscription2:Subscription;
  checkOutForm:FormGroup;

  constructor(
    private router:Router,
    private authService:AuthService,
    private shoppingCartService:ShoppingCartService,
    private orderService:OrderService,
    private _snackBar: MatSnackBar
  ) { }

  async ngOnInit(){
    this.checkOutForm=new FormGroup({
      'name':new FormControl(null,Validators.required),
      'addressLine1': new FormControl(null,Validators.required),
      'addressLine2':new FormControl(null,Validators.required),
      'city':new FormControl(null,[Validators.required,Validators.min(7000000000)])
    });
    let cart$= (await this.shoppingCartService.getCart()).valueChanges();
    this.subscription1=cart$.subscribe(cart=>this.cart=cart)
    this.subscription2=this.authService.userDetails$.subscribe(user=>this.userId=user.uid);
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  openSnackBar() {
    this._snackBar.open('Order placed successfully!!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  async placeOrder() {

    // let x=new Order(this.userId,this.checkOutForm.value,this.cart)
    // this.orderService.storeOrder(x)
    console.log(this.cart.items);
    let itemsArray=[]

    for(let i in this.cart.items){
      if(this.cart.items[i].quantity){
        itemsArray.push({
          product:{
            title:this.cart.items[i].title,
            imageUrl:this.cart.items[i].imageUrl,
            price:this.cart.items[i].price
          },
          quantity:this.cart.items[i].quantity,
          totalPrice:this.cart.items[i].price*this.cart.items[i].quantity
        }
      )
      }
    }
    console.log(itemsArray);




    let order={
      userId:this.userId,
      datePlaced:new Date().getTime(),
      shipping:this.checkOutForm.value,
      items:itemsArray
    };
    console.log(order);

    let result=await this.orderService.placeOrder(order);
    console.log(result.key);
    this.openSnackBar();
    this.router.navigate(['/my/orders'])
  }

}
