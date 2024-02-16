import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { previewChatComponent } from "../ChatCard/Chat-card.component";
import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
    selector: 'app-chat-list',
    standalone: true,
    template: `
    <div class="d-flex w-100 justify-content-evenly">
      <div class="position-relative" style="width: 95%;">
        <input type="text" placeholder="Buscar...." (change)="searchChat()" #Search >
        <i class="bi bi-search position-absolute z-1" style="right: 10px;top:15px;  color:white;" ></i>
      </div>
    </div>
    <ul class="list" *ngIf="ChatKeys.length > 0; else NoChats">
  <li *ngFor="let chatId of ChatKeys; let i = index">
    <previewChats [UserId]="chatId" (click)="SelectChat(chatId,filterChats[chatId])" />
  </li>
</ul>
    <ng-template #NoChats>


        <div class="m-3 text-center">
          <span>No hay se encontraron chats</span>
        </div>
        <div id="NoChat" style="padding:10px;" class="text-center" [routerLink]="'/'+UserId+'/Addfriends'">
          <h6>Agregar contactos <i class="bi bi-person-fill-add"></i><hr style="width:50%;transform: translate(50%,0px);margin-top:10px;"></h6>
        </div>

    </ng-template>

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
    this.filterChats=this.UserService.User.Friends
    this.cdr.detectChanges()
  }

  @ViewChild('Search')
  $searchChat!:ElementRef
  filterChats:Record<string,string>={}
  searchChat(){
    console.log(this.$searchChat.nativeElement.value)

  }
  SelectChat(userId:string,chatId:string){
    this.Chat.SetCurrentChat({chatId,userId})
  }
  get UserId(){
    return this.UserService.User.uid
  }
  get ChatKeys():string[]{
    return  Object.keys(this.filterChats)
  }

   }
