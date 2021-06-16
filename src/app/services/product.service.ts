import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAllProducts():AngularFireList<any>{
    return this.db.list('/products')
    // .valueChanges();
  }

  getProduct(productKey){
    // return this.db.list('/products',ref=>ref.orderByChild('title').equalTo("hlo"));
    return this.db.object('/products/'+productKey);
  }

  getAProduct(productTitle){
    return this.db.list('/products',ref=>ref.orderByChild('title').equalTo("hlo"));
  }

  updateProduct(productKey,product){
    return this.db.object('/products/'+productKey).update(product);
  }

  deleteProduct(productKey){
    return this.db.object('/products/'+productKey).remove();
  }

}
