import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  User:any={
    _id:"1"
    
  }
}
