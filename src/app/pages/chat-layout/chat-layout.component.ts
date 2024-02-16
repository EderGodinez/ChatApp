import { LoaderComponent } from '../../components/extras/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatMenuComponent } from 'src/app/components/extras/ChatMenu/ChatMenu.component';
import { ToatsComponent } from 'src/app/components/extras/toats/toats.component';
import { MessagesAreaComponent } from 'src/app/components/messages/MessagesArea/MessagesArea.component';
import { option } from 'src/app/interfaces/ChatOptions.interface';
import { InfoUser } from 'src/app/interfaces/InfoUser.interface';
import { MessageProperties } from 'src/app/interfaces/MessageProperties.interface';
import { ActionsService } from 'src/app/services/actions.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    RouterModule,
    ChatMenuComponent,
    ToatsComponent,
    MessagesAreaComponent
  ],
  template: `
  <toats-component [MessageProp]="Message"/>
  <div  *ngIf="Isload; else Loader" class="bg-dark d-flex" style="height: 100vh;width:100vw">
  <!-- chats y menu -->
  <div class="col-4 h-100 d-flex flex-column justify-content-between" style="border-right: 1px solid grey;">

    <div class="d-flex gap-1 align-items-center justify-content-between m-0 p-2 text-center" id="UserInfo">
      <img [src]="UserInfo.photoURL" alt="User image">
      <span>{{UserInfo.displayName}}</span>
      <i class="bi bi-box-arrow-in-left" (click)="SignOut()" id="signout" style="font-size: 25px;"></i>
    </div>
    <hr class="m-0">
    <div class="h-auto overflow-auto" id="routerContainer">
      <router-outlet></router-outlet>
    </div>
    <chat-menu [Options]="ChatOptions"/>
  </div>
  <div class="col-8 h-100 px-3 py-2" *ngIf="roomValue!=='';else noChatSelected" >
  <messages-area [FriendId]="roomValue"></messages-area>
  </div>
</div>

  <ng-template #Loader >
    <div class="d-flex justify-content-center text-center" style="height: 100vh;width: 100vw;align-items: center;">
      <loader/>
      <h1>Cargando....</h1>
  </div>
  </ng-template>
  <ng-template #noChatSelected>
    <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
      <h1 style="margin: 0px auto;">Ningun chat aun seleccionado</h1>
      <h3>Seleccione chat para continuar</h3>
    </div>
  </ng-template>
  `,
  styleUrls: ['./chat-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatLayoutComponent implements OnInit {
  constructor(private Auth:AuthService,private cdr: ChangeDetectorRef,private Router:Router,private Chat:ChatService,
     private ActionsService:ActionsService,private UserService:UserService){}
  private messageSubscription: Subscription | undefined;
  roomValue:string|undefined
UserInfo:InfoUser={
displayName:"",
photoURL:""
}
  ChatOptions:option[]=[
    {icon:"bi bi-chat",Link:"chats",OptionName:"Chats"},
    {icon:"bi bi-person-add",Link:"Addfriends",OptionName:"Buscar"},
    {icon:"bi bi-chat-square-heart",Link:"request",OptionName:"Peticiones"}
  ]
  Message:MessageProperties={
    Content:"",
    ImageUrl:"",
    Issue:""
  }
  Isload:boolean=false
  ngOnInit(): void {
  let User
  const userString = localStorage.getItem('user')
if (userString) {
  User = JSON.parse(userString);
}
    this.UserService.GetUserinfoById(User.uid).subscribe({
      next:(user)=> {
        const {photoURL,displayName}=user
        this.UserService.User=user
        this.Isload=true
        this.UserInfo={displayName,photoURL}
    },
  complete:()=> {
    this.UserActive()
  },})
  this.Chat.room$.subscribe((room)=>{
    this.roomValue=room.userId?room.userId:""
  })
  const {displayName,photoURL}=this.UserService.User
  this.UserInfo={displayName,photoURL}
  this.messageSubscription = this.ActionsService.message$.subscribe((message: MessageProperties) => {
    this.ShowToast();
  });
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
  UserActive(){
      this.Isload=true
      this.cdr.detectChanges();
 }
  SignOut(){
    this.Auth.LogOut()
    this.Isload=false
    setTimeout(() => {
      this.Router.navigate(['Inicio'])
    }, 2000);
  }
  ShowToast(){
    this.Message=this.ActionsService.message
  }

 }
