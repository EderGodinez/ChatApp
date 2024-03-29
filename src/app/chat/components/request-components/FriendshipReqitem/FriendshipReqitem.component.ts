import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RequestFriendShip } from 'src/app/interfaces/RequestFriendship.interface';

@Component({
  selector: 'friendship-reqitem',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="py-2 px-3 gap-2" id="RequestCard" style="border-bottom: 1px solid grey;">
  <div class="d-flex justify-content-between text-center align-items-center flex-wrap w-100" style="gap: 1.25rem;">
    <img [src]="User.photoURL" alt="image">
    <span>{{User.displayName}}</span>
    <span>{{User.DateSent|date:'short'}}</span>
  </div>

  <div class="d-flex justify-content-end gap-2 w-100" style="font-size:12px;">
  <button  class="btn btn-primary" style="font-size: 12px;" (click)="AcceptRequest()"><i class="bi bi-person-plus-fill" style="font-size: 18px;"></i>Aceptar</button>
  <button  class="btn btn-secondary" (click)="DeleteRequest()"><i class="bi bi-x"></i>Eliminar</button>
  </div>

</div>
  `,
  styleUrls: ['./FriendshipReqitem.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendshipReqitemComponent {
  @Input()
  User:RequestFriendShip={
    displayName:"",
    photoURL:"",
    uid:"",
    DateSent:new Date()
  }
  @Output()
  _DeleteR:EventEmitter<RequestFriendShip>=new EventEmitter()
  @Output()
  _AcceptR:EventEmitter<RequestFriendShip>=new EventEmitter()
  DeleteRequest(){
    this._DeleteR.emit(this.User)
  }
  AcceptRequest(){
    this._AcceptR.emit(this.User)
  }
 }
