import { ActionsService } from 'src/app/services/actions.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FriendshipReqitemComponent } from '../../extras/FriendshipReqitem/FriendshipReqitem.component';
import { RequestFriendShip } from 'src/app/interfaces/RequestFriendship.interface';
import { UserService } from 'src/app/services/user.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-friend-ship-req',
  standalone: true,
  imports: [
    CommonModule,
    FriendshipReqitemComponent
  ],
  template: `
  <div *ngIf="PendientRequest;">
    <friendship-reqitem
    [User]="item"
    (_AcceptR)="AcceptRequest($event)"
    (_DeleteR)="DeleteRequest($event)"
    *ngFor="let item of RequestList"/>
  </div>
  <div class="d-flex justify-content-center align-content-center flex-wrap h-100" *ngIf="!IsLoad">
  <div class="spinner-border" role="status" style="height: 3rem;width:3rem">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
  <div *ngIf="NoRequest">
  <div style="padding:10px;" class="text-center">
        <span class="text-white">No tienes solicitud pendientes</span>
      </div>
  </div>
  `,
  styleUrls: ['./FriendShipReq.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendShipReqComponent implements OnInit{
  constructor(private ActionsService:ActionsService,private UserService:UserService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    this.UserService.User.FriendshipRequest=[{DateSent:new Date(),userId:"Uv1U8CWZbqXrtQItjfOahEnuScd2"}]
    const observables = this.UserService.User.FriendshipRequest.map(request =>
      this.UserService.GetUserinfoById(request.userId).pipe(
        map((user) => ({ displayName: user.displayName,DateSent:request.DateSent, photoURL: user.photoURL, uid: request.userId }))
      )
    );

    forkJoin(observables).subscribe({
      next: (request) => {
        this.RequestList=request
        this.IsLoad=true
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  RequestList:RequestFriendShip[]=[]
  IsLoad:boolean=false
  AcceptRequest($event:RequestFriendShip){
    //SE ELIMINA DE LA LISTA DE PETICIONES Y SE AGREGA A AMIGOS
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
  get PendientRequest(){
    return this.RequestList.length>0&&this.IsLoad
  }
  get NoRequest(){
    return this.RequestList.length===0&&this.IsLoad
  }
 }
