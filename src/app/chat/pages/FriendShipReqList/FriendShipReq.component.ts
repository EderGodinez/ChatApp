import { ActionsService } from 'src/app/services/actions.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FriendshipReqitemComponent } from '../../components/request-components/FriendshipReqitem/FriendshipReqitem.component';
import { RequestFriendShip } from 'src/app/interfaces/RequestFriendship.interface';
import { UserService } from 'src/app/services/user.service';
import { forkJoin, map } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

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
  <div *ngIf="NoRequest" class="d-flex justify-content-center align-content-center flex-wrap h-100">
  <div style="padding:10px;" class="text-center">
        <span class="text-white">No tienes solicitudes pendientes</span>
      </div>
  </div>
  `,
  styleUrls: ['./FriendShipReq.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendShipReqComponent implements OnInit{
  constructor(private ActionsService:ActionsService,private UserService:UserService,private cdr:ChangeDetectorRef,private Chat:ChatService){

  }
  ngOnInit(): void {

    if (this.UserService.User.FriendshipRequest.length>0) {
      const Recive=this.UserService.User.FriendshipRequest.filter((user)=>user.EmmiterId!==this.UserService.User.uid)
      const Sent=this.UserService.User.FriendshipRequest.filter((user)=>user.EmmiterId===this.UserService.User.uid)
      const _ReciveRequest = Recive.map(request =>this.UserService.GetUserinfoById(request.EmmiterId).pipe(
            map((user) => ({ displayName: user.displayName,DateSent:request.DateSent, photoURL: user.photoURL, uid: user.uid }))
          )
      );
      const _RequestSent=Sent.map(request =>this.UserService.GetUserinfoById(request.ReceptorId).pipe(
            map((user) => ({ displayName: user.displayName,DateSent:request.DateSent, photoURL: user.photoURL, uid: user.uid }))
            )
        );
        const mergeObservables=[..._ReciveRequest,..._RequestSent]
      forkJoin(mergeObservables).subscribe({
        next: (request) => {
          console.log(request)
          this.RequestList=request
          this.IsLoad=true
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
    else{
      this.IsLoad=true
      this.cdr.detectChanges()
    }

  }
  RequestList:any[]=[]
  IsLoad:boolean=false
  AcceptRequest($event:RequestFriendShip){
    //SE ELIMINA DE LA LISTA DE PETICIONES Y SE AGREGA A AMIGOS
    this.RequestList=this.RequestList.filter((request)=>request.uid!==$event.uid)
    this.UserService.User.FriendshipRequest=this.UserService.User.FriendshipRequest.filter((req)=>req.EmmiterId!==$event.uid)
    console.log(this.RequestList)
    this.cdr.detectChanges()
    this.UserService.AddFriend($event.uid)
    this.UserService.AddFriendsList().subscribe({
      next:(UserInfo)=> {
        this.ActionsService.message={
          Content:"Se ah creado nuevo chat con "+$event.displayName,
          ImageUrl:`${$event.photoURL}`,
          Issue:"Nuevo amigo"
        }
        this.cdr.detectChanges()
        this.UserService.User=UserInfo
        const{ displayName,uid,photoURL }=this.UserService.User
        this.Chat.SentNotification($event.uid,{displayName,photoURL,uid},'Nuevo amigo')
    },
      error:(err)=> {
        console.error(err)
  },})


  }
  DeleteRequest($event:RequestFriendShip){
    //Se elimina el la peticion del usuario
    this.UserService.CancelFriendShipRequest($event.uid)
    this.RequestList=this.RequestList.filter((request)=>request.uid!==$event.uid)
    this.ActionsService.message={
      Content:"Has eliminado la solicitud de "+$event.displayName,
      ImageUrl:`${$event.photoURL}`,
      Issue:"Elimminacion de solicitud"
    }
      this.cdr.detectChanges()

  }
  get PendientRequest(){
    return this.RequestList.length>0&&this.IsLoad
  }
  get NoRequest(){
    return this.RequestList.length===0&&this.IsLoad
  }
 }
