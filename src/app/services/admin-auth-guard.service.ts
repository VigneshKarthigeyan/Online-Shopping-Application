import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map,switchMap,take} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router,private userService:UserService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error('Method not implemented.');
    // return this.authService.userDetails$.pipe(
    //   switchMap(user=>this.userService.getUser(user.uid).valueChanges()),
    //   map(appUser=>appUser.isAdmin)
    // )
    return this.authService.appUser$.pipe(
      map(appUser=>appUser.isAdmin)
      )
  }
}
