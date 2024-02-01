import { Injectable, NgZone, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { auth,Googleprovider,Facebookprovider,Githubprovider } from '../firebase/firebase';
import { createUserWithEmailAndPassword,
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup ,signOut} from 'firebase/auth';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { environments } from 'src/env/environments';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private Http:HttpClient) { }
  private API_URL=environments.API_URL
  User:User={
      displayName:"",
      Friends:[],
      FriendshipRequest:[],
      IsActive:false,
      photoURL:"",
      providerId:"",
      uid:"",
  }
CreateUser(email:string,password:string){
return createUserWithEmailAndPassword(auth, email, password)
}
SignIn(email:string,password:string){
  return signInWithEmailAndPassword(auth, email, password)
}
LogOut(){
  this.ResetUser()
  signOut(auth)
  localStorage.removeItem('user')
}
ValidateUserSession(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem('user',JSON.stringify(user))
      return
    } else {
        this.LogOut()
        return
    return
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
ResetUser(){
  this.User={
    displayName:"",
    Friends:[],
    FriendshipRequest:[],
    IsActive:false,
    photoURL:"",
    providerId:"",
    uid:"",
}
}
getUserById(userId:string):Observable<User>{
  return this.Http.get<User>(`${this.API_URL}/users/${userId}`)
}
UserStatusChange(uid:string){
  return this.Http.patch<User>(`${this.API_URL}/status/${uid}`,{})
}
}
