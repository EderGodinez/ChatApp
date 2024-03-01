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
export class  ChatService {
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
    this.connectUser(User)
    socket.fromEvent('UserWelcome').subscribe((userInfo:any)=>{
      this.Toast.message={ImageUrl:userInfo.photoURL,Content:`Bienvenido ${userInfo.displayName}`,Issue:"Hola bienvenido :D"}
    })
    socket.fromEvent('new_message').subscribe((message:any) => {
      this.setNewMessage(message);
      if (message.chatId===this._room$.getValue().chatId) {
        if (message.ReceptorId===this.UserService.User.uid) {
          this.PlayNewMessagesInChat()
        }
      }
      else{
        this.NewMessageSound()
        const index=this.UserService.User.Friends.findIndex((friend)=>friend.FriendId===message.emitterId)
        this.UserService.User.Friends[index].Messages.push(message)
      }
    });
    socket.fromEvent('new_friend').subscribe((friend:any) => {
      this.PlayNotification()
     this.UserService.User.Friends.push({...friend.friend,Messages:[]})
     this.Toast.message=friend.Message

    });
    socket.fromEvent('new_request').subscribe((request:any) => {
      this.PlayNotification()
      this.UserService.User.FriendshipRequest.push(request.req)
      this.Toast.message=request.message
    });
    socket.fromEvent('request_reject').subscribe((Request_reject:any) => {
      this.PlayNotification()
      this.UserService.User.FriendshipRequest=this.UserService.User.FriendshipRequest.filter((req)=>req.ReceptorId!==Request_reject.uid)
      this.Toast.message=Request_reject.message
    });
    socket.fromEvent('request_cancel').subscribe((uid:any) => {
      this.UserService.User.FriendshipRequest=this.UserService.User.FriendshipRequest.filter((req)=>req.ReceptorId!==uid)
    });
    socket.fromEvent('handle_friend_status').subscribe((user)=>{
      this.handleFriendStatus(user)
    })
    socket.fromEvent('on_chat').subscribe((resp)=>{
      if (resp!==null) {
        this._read$.next(!!resp)
      }
    })
    socket.fromEvent('typing').subscribe((resp)=>{
      if(resp){
        this._IsTyping$.next(resp)
      }
    })
  }
  //Uno es el elemento que emitira valores y el otro unicamente estara recibiendo los valores
  //Encargado de los mensajes del chat visto
  private _messages$ = new BehaviorSubject<Message|null>(null);
  public messages$ = this._messages$.asObservable();
  //Observable para definir el usuario que se conecte o desconecte
  private _friend$ = new BehaviorSubject<{userid:string,IsActive:boolean}|null>(null);
  public friend$ = this._friend$.asObservable();

  private _room$ = new BehaviorSubject<Chat>({chatId:"",userId:""});
  public room$=this._room$.asObservable()

  private _read$ = new BehaviorSubject<boolean|null>(null);
  public read$=this._read$.asObservable()

  private _IsTyping$ = new BehaviorSubject<{chatid:string,Istyping:boolean}|null|any>(null);
  public IsTyping$=this._IsTyping$.asObservable()

  public SetCurrentChat(Chat:Chat){
    this._room$.next(Chat)
  }

  setNewMessage(messageObject:Message|null){
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
  Cancel_Request(uid:string){
    this.socket.emit('Cancel_R',{EmmitterId:this.UserService.User.uid,ReceptorId:uid})
  }
  Accept_Request(uid:string){
    this.socket.emit('Accept_R',{EmmitterId:this.UserService.User.uid,ReceptorId:uid})
  }
  Reject_Request(uid:string){
    this.socket.emit('Reject_R',{EmmitterId:this.UserService.User.uid,ReceptorId:uid})
  }
  Sent_Request(uid:string){
    this.socket.emit('Sent_R',{EmmitterId:this.UserService.User.uid,ReceptorId:uid})
  }
  logout(){
    this.socket.disconnect()
    this.socket.emit('logout')
  }
  connectUser(User:any){
    this.socket.emit('cliente_conectado', { User });
  }
  JoinChat(chatid:string){
    this.socket.emit('join_chat',{chatid:chatid,uid:this.UserService.User.uid})
  }
  typingInChat(IsTyping:boolean,uid:string,chatid:string){
    this.socket.emit('On_Typing',{chatid:chatid,uid:uid,Istyping:IsTyping})
  }
  getMessage() {
    return this.socket.fromEvent('message');
  }
  handleFriendStatus(user:any){
    this._friend$.next(user)
  }
  PlayNotification(){
    const NewMessageSound=new Audio('./assets/mp3/Notification.wav')
    NewMessageSound.play()
  }
  PlayNewMessagesInChat(){
    const Sound=new Audio('./assets/mp3/Whatsapp-Ringtone.mp3')
    Sound.play()
    setTimeout(() => {
      Sound.pause()
    },2000);
  }
  NewMessageSound(){
    const Sound=new Audio('./assets/mp3/Whatsapp-Tone.mp3')
    Sound.play()
  }

  get currentChat(){
    const roomCurrent = this._room$.getValue();
   return roomCurrent
  }
}

