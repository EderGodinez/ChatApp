import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { previewChatComponent } from "../ChatCard/Chat-card.component";

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
    <ul class="list" *ngIf="filterChats.length>0;else NoChats">
      <li *ngFor="let chatpreview of filterChats">
        <previewChats/>
      </li>
    </ul>
    <ng-template #NoChats>
      <div style="padding:10px;" class="text-center">
        <span>No hay se encontraron chats</span>
      </div>
    </ng-template>

  `,
    styleUrls: ['./ChatList.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        previewChatComponent
    ]
})
export class ChatListComponent {
  @ViewChild('Search')
  $searchChat!:ElementRef
  filterChats:string[]=[""]
  searchChat(){
    console.log(this.$searchChat.nativeElement.value)
  }
   }
