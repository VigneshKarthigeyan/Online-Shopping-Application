// import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit  {

  cart$;

  constructor(private shoppingCartService:ShoppingCartService){}

  async ngOnInit(){

    this.cart$=(await this.shoppingCartService.getCart()).valueChanges()
    .pipe(map((x:any)=>new ShoppingCart(x.items)))

    // cart$.valueChanges().subscribe((cart:any)=>{
    //   this.shoppingCartItemCount=0;
    //   for(let id in cart.items){
    //     this.shoppingCartItemCount+=cart.items[id].quantity
    //   }
    // })
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

  addToCart(product){
    this.shoppingCartService.addToCart(product);

  }

  removeFromCart(product){
    this.shoppingCartService.removeFromCart(product);
  }

}
