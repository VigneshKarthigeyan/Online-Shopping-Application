import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {environment} from '../environments/environment';
import {MatTableModule} from '@angular/material/table';

// import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsComponent } from './products/products.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ShoppingCartService } from './services/shopping-cart.service';


@NgModule({
  declarations: [
    AppComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
    BsNavbarComponent,
    CheckOutComponent,
    HomeComponent,
    LoginComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductCardComponent,
    ProductsComponent,
    ProductQuantityComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent,
    ProductFilterComponent,
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
