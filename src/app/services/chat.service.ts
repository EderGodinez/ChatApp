import { UserService } from 'src/app/services/user.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, map } from 'rxjs';
import { ActionsService } from './actions.service';
import { NewFriend } from '../interfaces/NewFriend.initerface';
import { Message } from '../interfaces/Message.interface';
import { MessagesService } from './messages.service';

interface Chat{
  userId:string
  chatId:string
}
@Injectable({providedIn: 'root'})
export class  ChatService implements OnDestroy {
  constructor(private socket: Socket,private UserService:UserService,private Toast:ActionsService,private MessageService:MessagesService) {
    const a=localStorage.getItem('user')
    let User:any=''
    if (a) {
      User=JSON.parse(a)
    }
    const currentUserToken =User.stsTokenManager.accessToken
    this.socket.ioSocket.io.opts.extraHeaders = {
      Authorization: currentUserToken
    };
    this.socket.ioSocket.io.opts.query={
      token:currentUserToken
    }
    this.socket.emit('cliente_conectado', { User });
    socket.fromEvent('UserWelcome').subscribe((userInfo:any)=>{
      this.Toast.message={ImageUrl:userInfo.photoURL,Content:`Bienvenido ${userInfo.displayName}`,Issue:"Hola bienvenido :D"}
    })
    socket.fromEvent('new_message').subscribe((message:any) => {
      this.setNewMessage(message);
    });
    socket.fromEvent('on_notification').subscribe((resp:any)=>{
      this.Toast.message=resp
    })

    socket.fromEvent('disconnect').subscribe(() => {
      const lastRoom = this._room$.getValue();
      if (lastRoom) this.joinRooms([lastRoom.chatId]);
    });
  }
  ngOnDestroy(): void {
    console.log('se destruyo servicio de chat')
  }
  //Uno es el elemento que emitira valores y el otro unicamente estara recibiendo los valores
  //Encargado de los mensajes del chat visto
  private _messages$ = new BehaviorSubject<Message|null>(null);
  public messages$ = this._messages$.asObservable();
  ///Representa el usuario (uid) y el numero de mensajes pendientes por ver
  NoFocusMesages:Record<string,number>={}

  private _room$ = new BehaviorSubject<Chat>({chatId:"",userId:""});
  public room$=this._room$.asObservable()

  public SetCurrentChat(Chat:Chat){
    this._room$.next(Chat)
  }

  setNewMessage(messageObject:Message){
    this._messages$.next(messageObject)
  }
  //TODO Enviar mensaje desde el FRONT-> BACKEND

  sendMessage(payload: { chatId:string,emitterId:string,ReceptorId:string,Content:string }) {
    const roomCurrent = this._room$.getValue();
    if (roomCurrent) {
      payload = { ...payload, chatId: roomCurrent.chatId };
      this.socket.emit('sent_message', payload);
    }
  }
  SentNotification(to:string,from:NewFriend,issue:string){
    this.socket.emit('notify_message',{to,from,issue})
  }

  joinRooms(rooms: string[]): void {
    rooms.forEach((room)=>{
      this.socket.emit('event_join', room);
    })
  }
  leaveRooms(): void {
    const room = this._room$.getValue();
    this.socket.emit('event_leave', room);
  }
  OnlogOut(){
    this.socket.emit('logout',{userId:this.UserService.User.uid})
  }

  getMessage() {
    return this.socket.fromEvent('message');
  }
}

