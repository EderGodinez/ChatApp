import { User } from './../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActionsService } from 'src/app/services/actions.service';
interface user{
  ImageUrl:string
  projectName:string
}
@Component({
  selector: 'new-friend-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="d-flex justify-content-between py-2 px-3 gap-2" style="border-bottom: 1px solid grey;">
  <div class="d-flex text-center align-items-center gap-2 flex-wrap">
    <img [src]="User.ImageUrl" alt="image">
    <span>{{User.projectName}}</span>
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
  User:user={
    projectName:"",
    ImageUrl:""
  }
  public Sent:boolean=false
  SentRequest(){
    this.ActionsService.message={
      Content:`Se ah enviado la solicitud a ${this.User.projectName}`,
      ImageUrl:this.User.ImageUrl,
      Issue:"Solicitud de amistad"
    }
    this.Sent=true
  }
  CancelRequest(){
    this.ActionsService.message={
      Content:`Se ah cancelado solicitud a ${this.User.projectName}`,
      ImageUrl:this.User.ImageUrl,
      Issue:"Cancelacion de solicitud"
    }
    this.Sent=false
  }
}