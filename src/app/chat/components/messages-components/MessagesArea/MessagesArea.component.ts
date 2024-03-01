import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MessageListComponent } from '../messageList/messageList.component';
import { Subscription, map } from 'rxjs';
import { Preview } from 'src/app/interfaces/PreviewCard.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'messages-area',
  standalone: true,
  imports: [
    CommonModule,
    MessageListComponent,
    ReactiveFormsModule
  ],
  template: `
  <div class="h-100 w-100 bg-secondary rounded d-flex gap-2 flex-column justify-content-between" *ngIf="IsloadUserInfo;else Loading">
        <div class="d-flex align-items-center justify-content-start m-0 p-2 text-center" id="chat-user" >
          <div class="position-relative d-flex" style=" min-width: 40px;max-width: 9%;">
            <img [src]="DataUser.photoURL" alt="User image">
            <span class="inactive-status" [ngClass]="{'active':DataUser.IsActive}"></span>
          </div>
          <span class="">{{DataUser.displayName}}</span>
        </div>
        <div class="flex-grow-1" id="messages">
        <message-list [ChatId]="ChatId"></message-list>
        </div>
        <div class="w-100 p-3">
          <form action="" [formGroup]="MessageForm">
            <div class="position-relative">
              <input type="text"  placeholder="Mensaje...." class="w-100" formControlName="MessageInput" id="messageinput"
              autocomplete="off" (keydown)="EnterSentMessage($event)" (input)="Typing()" (blur)="NoTyping()">
              <button class="position-absolute transparent"><i class="bi bi-send" (click)="SentMessage()"></i></button>
            </div>
          </form>
        </div>
    </div>
    <ng-template #Loading >
        <div class="h-100 w-100 flex-wrap d-flex justify-content-center align-content-center">
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status" style="width: 5rem;height:5rem">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
        </div>
    </ng-template>


  `,
  styleUrls: ['./MessagesArea.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesAreaComponent implements OnChanges,OnDestroy,OnInit{
  constructor(private UserService:UserService,private cdr: ChangeDetectorRef,
    private FB:FormBuilder,private ChatService:ChatService){
      this.friendsSubscription= this.ChatService.friend$.subscribe((user)=>{
        if (user!==null) {
            this.DataUser.IsActive=user.IsActive
            this.cdr.detectChanges();
        }
      })
      this.messageSubscription= this.ChatService.messages$.subscribe((message)=>{
        if (message!==null) {
          setTimeout(() => {
            this.ScrollEnd()
          }, 100);
        }
      })
    }
  ngOnInit(): void {
      this.IsloadUserInfo=false
      this.InitUserInfo()
  }
  public MessageForm:FormGroup=this.FB.group({
    MessageInput:["",[Validators.minLength(1),Validators.required]]
  })

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['FriendId'].firstChange) {
    this.IsloadUserInfo=false
    this.InitUserInfo()
    }
    }
  ngOnDestroy(): void {
    this.IsloadUserInfo=false
  }
  @Input()
  FriendId:any=''
  IsloadUserInfo:boolean=false
  DataUser:Preview={
    displayName:"",
    IsActive:false,
    photoURL:"",
    uid:""
  }
  private messageSubscription: Subscription | undefined;
  private friendsSubscription: Subscription | undefined;

  InitUserInfo(){
    this.UserService.GetUserinfoById(this.FriendId).pipe(
      map((user)=>{return {displayName:user.displayName,photoURL:user.photoURL,IsActive:user.IsActive,uid:user.uid}})
    ).subscribe({
      next:(inf)=> {
        this.DataUser=inf
          this.IsloadUserInfo=true
          this.cdr.detectChanges();
          this.ScrollEnd()
      },
      error:(err)=> {
        console.error(err)
      },
    })

  }

  SentMessage(){
    if (this.MessageForm.valid) {
      const {MessageInput}=this.MessageForm.value
      const messageContent={chatId:this.ChatId,Content:MessageInput,emitterId:this.UserService.User.uid,ReceptorId:this.FriendId}
      this.ChatService.sendMessage(messageContent)
      this.NoTyping()
      this.MessageForm.reset()
      setTimeout(() => {
        this.ScrollEnd()
      }, 500);
    }
  }
  EnterSentMessage(event:any) {
    if (event.keyCode === 13) {
      this.SentMessage()
    }
  }
  Typing(){
    this.ChatService.typingInChat(true,this.DataUser.uid,this.ChatId)
  }
  NoTyping(){
    this.ChatService.typingInChat(false,this.DataUser.uid,this.ChatId)
  }
  get ChatId(){
    const index=this.UserService.User.Friends.findIndex((friend)=>friend.FriendId===this.FriendId)
    return this.UserService.User.Friends[index].ChatId
  }
  ScrollEnd(){
    const MessagesArea=document.getElementById('messages')
    if (MessagesArea) {
      MessagesArea.scrollTo({
        top: MessagesArea.scrollHeight,
        behavior: 'smooth'
      });
    }
  }
}
