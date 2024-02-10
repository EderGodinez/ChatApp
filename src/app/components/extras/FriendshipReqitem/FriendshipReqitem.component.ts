import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'friendship-reqitem',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="py-2 px-3 gap-2" id="RequestCard" style="border-bottom: 1px solid grey;">
  <div class="d-flex justify-content-rounded text-center align-items-center flex-wrap w-100" style="gap: 1.25rem;">
    <img [src]="User.ImageUrl" alt="image">
    <span>{{User.projectName}}</span>
  </div>

  <div class="d-flex justify-content-center gap-2 w-100" style="font-size:12px;">
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
  User:any
  @Output()
  _DeleteR:EventEmitter<any>=new EventEmitter()
  @Output()
  _AcceptR:EventEmitter<any>=new EventEmitter()
  DeleteRequest(){
    this._DeleteR.emit(this.User)
  }
  AcceptRequest(){
    this._AcceptR.emit(this.User)
  }
 }
