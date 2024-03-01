
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NewFriend } from 'src/app/interfaces/NewFriend.initerface';
import { ActionsService } from 'src/app/services/actions.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'new-friend-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="d-flex justify-content-between py-2 px-3 gap-2" style="border-bottom: 1px solid grey;">
  <div class="d-flex text-center align-items-center gap-2 flex-wrap">
    <img [src]="User.photoURL" alt="image">
    <span style="font-size: 15px;">{{User.displayName}}</span>
  </div>

  <div class="d-flex gap-2" style="font-size:12px;">
  <button *ngIf="!Sent" class="btn btn-info" style="font-size: 12px;" (click)="SentRequest()"><i class="bi bi-person-plus-fill" style="font-size: 18px;"></i>Agregar</button>
  <button *ngIf="Sent" class="btn btn-secondary" (click)="CancelRequest()"><i class="bi bi-x"></i>Cancelar</button>
  </div>

</div>`,
  styleUrls: ['./NewFriendItem.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewFriendItemComponent implements OnInit {
  constructor(private ActionsService:ActionsService,private UserService:UserService,private cdr:ChangeDetectorRef,private ChatService:ChatService){}
  ngOnInit(): void {
  }
  @Input()
  User:NewFriend={
    displayName:"",
    photoURL:"",
    uid:""
  }
  public Sent:boolean=false
  SentRequest(){
    this.ChatService.Sent_Request(this.User.uid)
    const {displayName,uid,photoURL}=this.UserService.User
    this.ActionsService.message={
      Content:`Se ah enviado la solicitud a ${this.User.displayName}`,
      ImageUrl:this.User.photoURL,
      Issue:"Solicitud de amistad"
    }
    this.Sent=true
    this.cdr.detectChanges()

  }
  CancelRequest(){
    this.ChatService.Cancel_Request(this.User.uid)
    this.ActionsService.message={
      Content:`Se ah cancelado solicitud a ${this.User.displayName}`,
      ImageUrl:this.User.photoURL,
      Issue:"Cancelacion de solicitud"
    }
    this.Sent=false
    this.cdr.detectChanges()

  }
}
