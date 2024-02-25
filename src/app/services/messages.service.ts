import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/env/environments';
import { Message } from '../interfaces/Message.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MessagesService {
  constructor(private httpClient: HttpClient) { }
  private API_URL=environments.API_URL
  getMessages(chatid:string):Observable<Message[]>{
    return this.httpClient.get<Message[]>(`${this.API_URL}/messages/${chatid}`,{headers:this.Headers})
  }
  getLastMessage(chatid:string){
    return this.httpClient.get<Message>(`${this.API_URL}/messages/last/${chatid}`,{headers:this.Headers})
  }
  UpdateMessageStatus(chatid:string){
    return this.httpClient.patch<Message>(`${this.API_URL}/messages/${chatid}`,{headers:this.Headers})
  }
  get Headers(){
    const a=localStorage.getItem('user')
let User:any=''
if (a) {
  User=JSON.parse(a)
}
const currentUserToken =User.stsTokenManager.accessToken
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': currentUserToken
    }
    return headers
  }
}
