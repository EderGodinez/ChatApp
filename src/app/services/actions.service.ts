import { Injectable } from '@angular/core';
import { MessageProperties } from '../interfaces/MessageProperties.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ActionsService {
  constructor() { }
  private _message = new BehaviorSubject<MessageProperties>({
  Content:"",
  ImageUrl:"",
  Issue:""}
  ); // Valor inicial: cadena vacía
  message$ = this._message.asObservable();

  set message(value: MessageProperties) {
    this._message.next(value);
  }

  get message(): MessageProperties {
    return this._message.value;
  }

}
