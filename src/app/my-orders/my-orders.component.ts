import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$
  userId
  subscription:Subscription

  constructor(
    private orderService:OrderService,
    private authService:AuthService
  ) {

  }

  async ngOnInit(){

    this.orders$=(await this.orderService.getOrdersByUser()).valueChanges();
    console.log(this.orders$);

  }

}
