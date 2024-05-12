import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/env/environments';
import { CreateUser } from '../interfaces/CreateUser.interface';
import { Request, User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private httpClient: HttpClient) {

  }
  User:User={
    displayName:"",
    photoURL:"",
    FriendshipRequest:[],
    Friends:[],
    IsActive:false,
    uid:""
}

  private Url=environments.API_URL
  GetUserinfoById(id:string):Observable<User>{
   return this.httpClient.get<User>(`${this.Url}/users/${id}`)
  }
  GetFullInfoUserById(uid:string):Observable<User>{
    console.log(`${this.Url}/users/full/${uid}`)
    return this.httpClient.get<User>(`${this.Url}/users/full/${uid}`)
  }
  RegisterUser(user:CreateUser):Observable<User>{
    return this.httpClient.post<User>(`${this.Url}/users`,user)
  }
  GetusersList(query:string):Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.Url}/users/list?search=${query}&except=${this.User.uid}`)
  }

    ResetUser(){
    this.User={
      displayName:"",
      Friends:[],
      FriendshipRequest:[],
      IsActive:false,
      photoURL:"",
      uid:"",
  }
  }


}
