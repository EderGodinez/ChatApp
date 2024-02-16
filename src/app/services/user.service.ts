import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/env/environments';
import { CreateUser } from '../interfaces/CreateUser.interface';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private httpClient: HttpClient) {

  }
  User:User={
    displayName:"",
    Friends:{},
    FriendshipRequest:[],
    IsActive:false,
    photoURL:"",
    uid:""
}
  private Url=environments.API_URL
AddFriend(uuid:string){
  this.User.Friends[uuid]=''
  console.log(this.User.Friends)
}
  GetUserinfoById(id:string):Observable<User>{
   return this.httpClient.get<User>(`${this.Url}/users/${id}`)
  }
  RegisterUser(user:CreateUser):Observable<User>{
    return this.httpClient.post<User>(`${this.Url}/users`,user)
  }
  GetusersList(query:string):Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.Url}/users/list?search=${query}&except=${this.User.uid}`)
  }
  //Enviar y cancelar peticiones de amistad
  DeleteFriendShipRequest():Observable<User>{
    return this.httpClient.put<User>(`${this.Url}/users/request`,this.User)
  }
  //Aceptar o eliminar peticiones
  ModifyFriendsList():Observable<User>{
    return this.httpClient.put<User>(`${this.Url}/users/friends`,this.User)
  }

    ResetUser(){
    this.User={
      displayName:"",
      Friends:{},
      FriendshipRequest:[],
      IsActive:false,
      photoURL:"",
      uid:"",
  }
  }


}
