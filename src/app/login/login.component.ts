import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode=true
  form:FormGroup;

  constructor( private authService:AuthService,private route:Router) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'email':new FormControl(null,Validators.required),
      'password': new FormControl(null,Validators.required)
    })
  }

  googleLogin(){
    this.authService.googleLogin();
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(){
    console.log("login function");
    console.log(this.form.value.email);
    if(this.isLoginMode){
      // console.log("login mode")
      this.authService.emailPasswordLogin(this.form.value.email,this.form.value.password);
    }
    else{
      console.log("signup mode");
      this.authService.emailPasswordSignUp(this.form.value.email,this.form.value.password);
    }

  }


}
