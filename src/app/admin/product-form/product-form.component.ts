import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product;
  productKey;
  // =[{"title":undefined,"category":undefined,"price":undefined,"imageUrl":undefined}]
  productForm:FormGroup;
  urlRegex = "((http|https)://)(www.)?" +
             "[a-zA-Z0-9@:%._\\+~#?&//=]" +
             "{2,256}\\.[a-z]" +
             "{2,6}\\b([-a-zA-Z0-9@:%" +
             "._\\+~#?&//=]*)"

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private categoryService:CategoryService,
    private productService:ProductService
  ){
    this.categories$=categoryService.getCategories().valueChanges();
    console.log(this.categories$);
    this.productKey=route.snapshot.paramMap.get('id');
    console.log(this.productKey);

    if(this.productKey){
      console.log("if clause");

      this.productService.getProduct(this.productKey).valueChanges().subscribe(p=>{
        console.log("inside subscribe");

        console.log(p);
        // this.product=[];
        this.product=p;
      });


      // productService.getAProduct(productId).snapshotChanges()
      // .pipe(
      //   map(changes =>
      //     changes.map(c =>
      //       ({ key: c.payload.key, ...c.payload.val() })
      //     )
      //   )
      // ).subscribe(data => {
      //   this.product = data;
      // });

    }
   }

  ngOnInit(): void {
    this.product={"title":undefined,"category":undefined,"price":undefined,"imageUrl":undefined};
    this.productForm=new FormGroup({
      'title':new FormControl(null,Validators.required),
      'price': new FormControl(null,[Validators.required,Validators.min(1)]),
      'category':new FormControl(null,Validators.required),
      'imageUrl':new FormControl(null,[Validators.required,Validators.pattern(this.urlRegex)])
    })
  }

  // save(product){
  //   console.log(product);
  //   this.productService.create(product);
  // }

  save1(){
    if(this.productKey){
      this.productService.updateProduct(this.productKey,this.productForm.value)
    }
    else{this.productService.create(this.productForm.value);}

    this.router.navigate(['admin/products/']);
    // console.log(this.productForm.value);
    // console.log(this.productForm.value.title);
    // console.log(this.productForm.controls.imageUrl.errors.pattern);
  }

  delete(){
    if(confirm("Are you sure want to delete this item?")){
      console.log("qwerty");

    }
    this.productService.deleteProduct(this.productKey);
    this.router.navigate(['admin/products/']);

  }


}
