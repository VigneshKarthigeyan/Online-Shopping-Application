import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // title = 'ecommerce-app';
  constructor(private auth:AuthService,private router:Router,private userService:UserService){

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.auth.userDetails$.subscribe(user=>{
      if(user){
        this.userService.saveUser(user);
        let returnUrl=localStorage.getItem('returnUrl');
        console.log(user);
        console.log(returnUrl);
        this.router.navigateByUrl(returnUrl);
      }
    })
  }

}
