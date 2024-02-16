import { ActionsService } from 'src/app/services/actions.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FriendshipReqitemComponent } from '../../extras/FriendshipReqitem/FriendshipReqitem.component';
import { RequestFriendShip } from 'src/app/interfaces/RequestFriendship.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friend-ship-req',
  standalone: true,
  imports: [
    CommonModule,
    FriendshipReqitemComponent
  ],
  template: `
  <div *ngIf="RequestList.length>0;else NoRequest">
    <friendship-reqitem
    [User]="item"
    (_AcceptR)="AcceptRequest($event)"
    (_DeleteR)="DeleteRequest($event)"
    *ngFor="let item of RequestList"/>
  </div>
  <ng-template #NoRequest>
  <div style="padding:10px;" class="text-center">
        <span class="text-white">No tienes solicitud pendientes</span>
      </div>
  </ng-template>
  `,
  styleUrls: ['./FriendShipReq.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendShipReqComponent {
  constructor(private ActionsService:ActionsService,private UserService:UserService){}
  RequestList:RequestFriendShip[]=[{displayName:"Anonimo",photoURL:"",uid:"1",DateSent:new Date()}]
  AcceptRequest($event:RequestFriendShip){
    //SE ELIMINA DE LA LISTA DE PETICIONES Y SE AGREGA A AMIGOS
    this.UserService.User.FriendshipRequest=[{DateSent:new Date(),userId:"1"}]
    console.log($event)
    this.UserService.User.FriendshipRequest=this.UserService.User.FriendshipRequest.filter((req)=>req.userId!==$event.uid)
    this.UserService.AddFriend($event.uid)
    this.UserService.ModifyFriendsList().subscribe({
      next:(UserInfo)=> {
        this.ActionsService.message={
          Content:"Se ah creado nuevo chat con "+$event.displayName,
          ImageUrl:`${$event.photoURL}`,
          Issue:"Nuevo amigo"
        }
        this.UserService.User=UserInfo
    },
      error:(err)=> {
        console.error(err)
  },})


  }
  DeleteRequest($event:RequestFriendShip){
    //Se elimina el la peticion del usuario
    this.UserService.User.FriendshipRequest=this.UserService.User.FriendshipRequest.filter((uid)=>uid.userId!==$event.uid)
    this.UserService.DeleteFriendShipRequest()
    this.ActionsService.message={
      Content:"Has eliminado la solicitud de "+$event.displayName,
      ImageUrl:`${$event.photoURL}`,
      Issue:"Elimminacion de solicitud"
    }

  }
 }
