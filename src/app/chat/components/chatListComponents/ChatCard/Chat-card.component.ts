import { User } from './../../../../interfaces/user.interface';
import { InfoUser } from 'src/app/interfaces/InfoUser.interface';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription, map, tap } from 'rxjs';
import { Preview } from 'src/app/interfaces/PreviewCard.interface';
import { UserService } from 'src/app/services/user.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from 'src/app/interfaces/Message.interface';

@Component({
  selector: 'previewChats',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="d-flex gap-3 py-2" id="previewCard"  style="border-bottom: 1px solid grey;" (click)="this.PendientMessages=0">
    <div class="position-relative">
      <img [src]="Info.photoURL" alt="image">
      <span class="inactive-status" [ngClass]="{'active':Info.IsActive}"></span>
    </div>
    <div class="d-flex flex-grow-1 flex-column gap-2 " style="font-size: 13px;">
      <span>{{Info.displayName}}</span>
      <div *ngIf="IsType" class="typing"></div>
      <div *ngIf="!IsType" class="message-container">
          <p class="text"> {{LastMessage.Content}}</p>
      </div>
    </div>
    <div class="d-flex flex-column gap-2" style="font-size:12px;">
       <span >{{LastMessage.Time |date:'short'}}</span>
      <span class="badge text-bg-secondary rounded-circle text-center align-self-end" style="width: 25px;" *ngIf="PendientMessages>0">{{PendientMessages}}</span>
    </div>
  </div>

  `,
  styleUrls: ['./Chat-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class previewChatComponent implements OnInit{
  constructor(private UserService:UserService,private cdr: ChangeDetectorRef,private ChatService:ChatService){
  }
  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe()
    this.friendsSubscription?.unsubscribe()
    this.TypingSubscription?.unsubscribe()
  }
  ngOnInit(): void {
    this.friendsSubscription= this.ChatService.friend$.subscribe((user)=>{
      if (user!==null) {
        if (this.Info.uid===user.userid) {
            this.Info.IsActive=user.IsActive
            this.cdr.detectChanges();
          }
      }
    })
    this.messageSubscription= this.ChatService.messages$.subscribe((message)=>{
      if (message!==null) {
        if(message.emitterId&&this.ChatId===message.chatId) {
          this.LastMessage=message
        }
        if(message.chatId!==this.ChatService.currentChat.chatId&&message.chatId===this.ChatId){
          this.PendientMessages+=1
        }
      }
      this.cdr.detectChanges();
    })
    this.TypingSubscription=this.ChatService.IsTyping$.subscribe((resp)=>{
      if (resp!==null) {
        if(this.ChatId===resp.chatid){
          this.IsType=resp.Istyping
          this.cdr.detectChanges()
        }
      }

    })
    if (this.UserService.User.Friends[this.UserIndex].Messages.length>0) {
      this.LastMessage=this.UserService.User.Friends[this.UserIndex].Messages[this.UserService.User.Friends[this.UserIndex].Messages.length-1]
      this.setPendientMessages()
    }
    else{
      this.LastMessage={
        chatId:this.ChatId,
        Content:"Nuevo chat",
        emitterId:this.UserService.User.uid,
        ReceptorId:this.Info.uid,
        IsRead:false,
        Time:new Date()
      }
    }
    this.cdr.detectChanges()
  }
  @Input()
  ChatId!:string
  @Input()
  Info!:Preview
  private messageSubscription: Subscription | undefined;
  private friendsSubscription: Subscription | undefined;
  private TypingSubscription: Subscription | undefined;
  PendientMessages:number=0
  IsType:boolean=false
  LastMessage:Message={
    chatId:"",
    Content:"",
    emitterId:"",
    IsRead:false,
    ReceptorId:"",
    Time:new Date()
  }
  get UserIndex(){
    return this.UserService.User.Friends.findIndex((friend)=>friend.FriendId===this.Info.uid)
  }
  setPendientMessages(){
    this.PendientMessages=this.PendientMessages = this.UserService.User.Friends[this.UserIndex].Messages.reduce((sum, message) => {
      // Verifica si el estado del mensaje es no leído
      if (!message.IsRead&&message.ReceptorId===this.UserService.User.uid) {
        return sum + 1;
      }
      return sum;
    }, 0);
  }


}

