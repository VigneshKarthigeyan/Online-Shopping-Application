import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { map, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products=[];
  filteredProducts=[];
  category;
  // cart;
  cartSubscription:Subscription;
  cart$:Observable<ShoppingCart>;

  constructor(private productService:ProductService,private route:ActivatedRoute,private shoppingCartService:ShoppingCartService) {

    // productService.getAllProducts().valueChanges()
    // .subscribe(p=>{
    //   this.products=p;
    //   console.log(this.products);
    //   route.queryParamMap.subscribe(params=>{
    //     console.log("param subscribe");

    //     this.category=params.get('category');
    //     this.filteredProducts= (this.category)?this.products.filter(p=>p.category===this.category):this.products;
    //     console.log(this.filteredProducts);

    //   })
    // })


   }

  async ngOnInit(){
    this.cart$=(await this.shoppingCartService.getCart()).valueChanges()
    // .subscribe(cart=>{
    //   this.cart=cart
    // })
    this.populateProducts();
  }

  private populateProducts(){
    this.productService.getAllProducts()
    .snapshotChanges()
    .pipe(
      // take(1),
      map(changes =>
        changes.map(c =>
          ({ $key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.products=data;
      this.route.queryParamMap.subscribe(params=>{
        console.log("param subscribe");

        this.category=params.get('category');
        this.applyFilter()
        console.log(this.filteredProducts);

      })

    });
  }

  applyFilter(){
    this.filteredProducts= (this.category)?
      this.products.filter(p=>p.category===this.category):this.products;
  }


  // ngOnDestroy(){
  //   this.cartSubscription.unsubscribe();
  // }

}
