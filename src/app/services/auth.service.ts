import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import { Observable,of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDetails$:Observable<firebase.User>;
  uid

  constructor( private afAuth:AngularFireAuth,private route:ActivatedRoute,private userService:UserService) {
    this.userDetails$=afAuth.authState;
  }

  googleLogin(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl')||'/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    // this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$():Observable<AppUser>{
    return this.userDetails$.pipe(
      switchMap(user=>{
        if(user){
          this.uid=user.uid;
          return this.userService.getUser(user.uid).valueChanges();
        }
        return of(null);
      })
    )
  }

  emailPasswordLogin(email_id,password){
    this.afAuth.signInWithEmailAndPassword(email_id,password)
  }

  emailPasswordSignUp(email_id,password){
    this.afAuth.createUserWithEmailAndPassword(email_id,password)
    // console.log(this.userDetails$);

  }

}
