import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {map,take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // return this.authService.userDetails$.map(user=>{
    //   if (user) return true;
    //   this.router.createUrlTree(['/login']);
    // })
    return this.authService.userDetails$.pipe(
        take(1),
        map(user => {
          const isAuth = !!user;
          if (isAuth) {
            // this.router.navigate(['/']);
            return true;
          }
          return this.router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url}});
        })
      );
  }


}
