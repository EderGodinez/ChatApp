import { Injectable, NgZone, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { auth,Googleprovider,Facebookprovider,Githubprovider } from '../firebase/firebase';
import { createUserWithEmailAndPassword,
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup ,signOut} from 'firebase/auth';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { environments } from 'src/env/environments';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private Http:HttpClient,private UserService:UserService,private Router:Router) { }
  private API_URL=environments.API_URL

CreateUser(email:string,password:string){
return createUserWithEmailAndPassword(auth, email, password)
}
SignIn(email:string,password:string){
  return signInWithEmailAndPassword(auth, email, password)
}
async LogOut(){
  await signOut(auth)
  .then(()=>{
    this.UserService.ResetUser()
    localStorage.clear()
    setTimeout(() => {
      this.Router.navigateByUrl('/Inicio/login')
    }, 1000);
  })
  .catch((error)=>{
    console.error(error)
  })
}
   ValidateUserSession(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //Movimientos para un usuario que no inicio sesion con algun madio externo
      if (!user.displayName) {
        const a=localStorage.getItem('user')
        let User:any=''
        if (a) {
         User=JSON.parse(a)
        }
        localStorage.setItem('user',JSON.stringify({...user,...User}))
        return
      }else{
        localStorage.setItem('user',JSON.stringify(user))
      }
    } else {
        this.LogOut()
    }
  })

}
SignInWithGoogle(){
return  signInWithPopup(auth, Googleprovider)
}
SignInWithFacebook(){
  return  signInWithPopup(auth, Facebookprovider)
  }
  SignInWithGitHub(){
    return  signInWithPopup(auth, Githubprovider)
    }

getUserById(userId:string):Observable<User>{
  return this.Http.get<User>(`${this.API_URL}/users/${userId}`)
}
UserStatusChange(uid:string){
  return this.Http.patch<User>(`${this.API_URL}/status/${uid}`,{})
}
}
