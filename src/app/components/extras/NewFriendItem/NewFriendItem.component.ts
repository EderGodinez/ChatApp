import { User } from './../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { userSearch } from 'src/app/interfaces/searchUser.interface';
import { ActionsService } from 'src/app/services/actions.service';

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
    <span>{{User.displayName}}</span>
  </div>

  <div class="d-flex gap-2" style="font-size:12px;">
  <button *ngIf="!Sent" class="btn btn-info" style="font-size: 12px;" (click)="SentRequest()"><i class="bi bi-person-plus-fill" style="font-size: 18px;"></i>Agregar amigo</button>
  <button *ngIf="Sent" class="btn btn-secondary" (click)="CancelRequest()"><i class="bi bi-x"></i>Cancelar</button>
  </div>

</div>`,
  styleUrls: ['./NewFriendItem.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewFriendItemComponent implements OnInit {
  constructor(private ActionsService:ActionsService){}
  ngOnInit(): void {
   // console.log(this.User)
  }
  @Input()
  User:any={
    displayName:"",
    photoURL:"",
    uid:""
  }
  public Sent:boolean=false
  SentRequest(){
    this.ActionsService.message={
      Content:`Se ah enviado la solicitud a ${this.User.displayName}`,
      ImageUrl:this.User.photoURL,
      Issue:"Solicitud de amistad"
    }
    this.Sent=true
  }
  CancelRequest(){
    this.ActionsService.message={
      Content:`Se ah cancelado solicitud a ${this.User.displayName}`,
      ImageUrl:this.User.photoURL,
      Issue:"Cancelacion de solicitud"
    }
    this.Sent=false
  }
}
