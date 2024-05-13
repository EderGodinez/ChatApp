import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { previewChatComponent } from "../../components/chatListComponents/ChatCard/Chat-card.component";
import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { forkJoin, map } from 'rxjs';
import { Preview } from 'src/app/interfaces/PreviewCard.interface';
import { Friend } from 'src/app/interfaces/user.interface';

@Component({
    selector: 'app-chat-list',
    standalone: true,
    template: `
    <ul class="list" *ngIf="TheresFriends;">
  <li *ngFor="let user of FriendData;let i=index">
    <previewChats [Info]="user" [ChatId]="Chats[i].ChatId" (click)="SelectChat(user.uid,Chats[i].ChatId)" />
  </li>
</ul>
<div class="d-flex justify-content-center flex-wrap w-100 h-100"*ngIf="!IsLoad">
<div class="d-flex justify-content-center align-content-center w-100 h-100 flex-wrap"  >
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</div>

    <div *ngIf="NoFriends" class="d-flex justify-content-center align-content-center flex-wrap w-100 h-100">
    <div class="d-flex flex-column">
    <div class="m-3 text-center">
          <span>No hay se encontraron chats</span>
        </div>
        <div id="NoChat" style="padding:10px;" class="text-center" [routerLink]="'/'+UserId+'/Addfriends'">
          <h6>Agregar contactos <i class="bi bi-person-fill-add"></i><hr style="width:50%;transform: translate(50%,0px);margin-top:10px;"></h6>
        </div>
    </div>

    </div>
  `,
    styleUrls: ['./ChatList.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        previewChatComponent,
        RouterModule
    ]
})
export class ChatListComponent implements OnInit {
  constructor(private UserService:UserService,private Chat:ChatService,private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
    this.Chats=this.UserService.User.Friends
    if (this.Chats.length===0) {
      this.IsLoad = true;
          this.cdr.detectChanges();
    }
    else{
      this.cdr.detectChanges()
    const observables = this.Chats.map(friendId =>
      this.UserService.GetUserinfoById(friendId.FriendId).pipe(
        map((user) => ({ displayName: user.displayName, IsActive: user.IsActive, photoURL: user.photoURL, uid: friendId.FriendId }))
      )
    );
    forkJoin(observables).subscribe({
      next: (users) => {
          this.FriendData = users;
          this.IsLoad = true;
          this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
    }

  }

  @ViewChild('Search')
  $searchChat!:ElementRef
  Chats:Friend[]=[]
  FriendData:Preview[]=[]
  IsLoad:boolean=false
  searchChat(){
    this.IsLoad=false
    this.cdr.detectChanges()
    setTimeout(() => {
      this.IsLoad=true
      this.cdr.detectChanges()
    }, 2000);
  }
  SelectChat(userId:string,chatId:string){
    this.Chat.SetCurrentChat({chatId,userId})
    this.Chat.JoinChat(chatId)
  }
  get UserId(){
    return this.UserService.User.uid
  }
  get TheresFriends(){
    return this.Chats.length>0&&this.IsLoad
  }
  get NoFriends(){
    return this.Chats.length===0&&this.IsLoad
  }

   }
