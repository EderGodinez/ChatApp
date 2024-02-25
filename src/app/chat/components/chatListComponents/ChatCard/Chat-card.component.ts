import { InfoUser } from 'src/app/interfaces/InfoUser.interface';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { Preview } from 'src/app/interfaces/PreviewCard.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'previewChats',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="d-flex gap-3 py-2" id="previewCard"  style="border-bottom: 1px solid grey;">
    <div class="position-relative">
      <img [src]="Info.photoURL" alt="image">
      <span class="inactive-status" [ngClass]="{'active':Info.IsActive}"></span>
    </div>
    <div class="d-flex flex-grow-1 flex-column gap-2 " style="font-size: 13px;">
      <span>{{Info.displayName}}</span>
      <div *ngIf="IsType" class="typing"></div>
      <div *ngIf="!IsType" class="message-container">
          <p class="text"> {{LastMessage}}</p>
      </div>
    </div>
    <div class="d-flex flex-column gap-2" style="font-size:12px;">
       <span >{{DateLastMessage|date:'short':''}}</span>
      <span class="badge text-bg-secondary rounded-circle text-center align-self-end" style="width: 25px;" *ngIf="PendientMessages>0">{{PendientMessages}}</span>
    </div>

  </div>

  `,
  styleUrls: ['./Chat-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class previewChatComponent implements OnInit{
  constructor(private UserService:UserService,private cdr: ChangeDetectorRef){

  }
  ngOnInit(): void {}
  @Input()
  Info:Preview={
    displayName:"",
    photoURL:"",
    IsActive:false,
    uid:""
  }
  DateLastMessage:Date=new Date()
  PendientMessages:number=0
  IsType:boolean=false
  LastMessage:string=''
}
