import { ActionsService } from 'src/app/services/actions.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { FriendshipReqitemComponent } from '../../components/request-components/FriendshipReqitem/FriendshipReqitem.component';
import { RequestFriendShip } from 'src/app/interfaces/RequestFriendship.interface';
import { UserService } from 'src/app/services/user.service';
import { filter, forkJoin, map } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { RequestSentItemComponent } from '../../components/request-components/Request-Sent-item/Request-Sent-item.component';

@Component({
  selector: 'app-friend-ship-req',
  standalone: true,
  imports: [
    CommonModule,
    FriendshipReqitemComponent,
    RequestSentItemComponent
  ],
  template: `
  <div *ngIf="PendientRequest;" class="text-center">
    <div *ngIf="RequestRecived.length>0">
      <span class="mt-2">Solicitudes por responder</span>
      <friendship-reqitem
      [User]="item"
      (_AcceptR)="AcceptRequest($event)"
      (_DeleteR)="DeleteRequest($event)"
      *ngFor="let item of RequestRecived"/>
    </div>
    <div *ngIf="RequestSent.length>0">
        <span class="mt-2">Solicitudes enviadas</span>
      <request-sent-item
    [User]="item"
    (_CancelR)="CancelRequest($event)"
    *ngFor="let item of RequestSent"/>
      </div>

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
  constructor(private ActionsService:ActionsService,private UserService:UserService,private cdr:ChangeDetectorRef,
    private Chat:ChatService){
    this.UserService.GetUserinfoById(this.UserService.User.uid).pipe(
      map((user)=>({FriendshipRequest:user.FriendshipRequest}))
    ).subscribe((user)=>{
      this.UserService.User.FriendshipRequest=user.FriendshipRequest
    })
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
      forkJoin(_ReciveRequest).subscribe({
        next: (request) => {
          this.RequestRecived=request
          this.IsLoad=true
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
        },
      });
      forkJoin(_RequestSent).subscribe({
        next: (request) => {
          this.RequestSent=request
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
  RequestSent:any[]=[]
  RequestRecived:any[]=[]
  IsLoad:boolean=false
  AcceptRequest($event:RequestFriendShip){
    console.log($event)
    //SE ELIMINA DE LA LISTA DE PETICIONES Y SE AGREGA A AMIGOS
    this.RequestRecived=this.RequestRecived.filter((request)=>request.uid!==$event.uid)
    this.cdr.detectChanges()
    this.UserService.User.FriendshipRequest=this.UserService.User.FriendshipRequest.filter((req)=>req.EmmiterId!==$event.uid)
    this.UserService.AddFriendsList($event.uid).subscribe({
      next:(UserInfo)=> {
        console.log(UserInfo)
        this.ActionsService.message={
          Content:"Se ah creado nuevo chat con "+$event.displayName,
          ImageUrl:`${$event.photoURL}`,
          Issue:"Nuevo amigo"
        }
        this.UserService.User=UserInfo
        this.cdr.detectChanges()
        const{ displayName,uid,photoURL }=this.UserService.User
        this.Chat.SentNotification($event.uid,{displayName,photoURL,uid},'Nuevo amigo')
    },
      error:(err)=> {
        console.error(err)
  },})
  }
  DeleteRequest($event:RequestFriendShip){
    //Se elimina el la peticion del usuario
    this.RequestRecived=this.RequestRecived.filter((request)=>request.uid!==$event.uid)
    this.UserService.CancelFriendShipRequest($event.uid).subscribe((user)=>{
    this.ActionsService.message={
      Content:"Has eliminado la solicitud de "+$event.displayName,
      ImageUrl:`${$event.photoURL}`,
      Issue:"Elimminacion de solicitud"
    }
    this.UserService.User=user
    this.cdr.detectChanges()
    })


  }
  CancelRequest($event:RequestFriendShip){
    this.UserService.CancelFriendShipRequest($event.uid).subscribe((user)=>{
      this.RequestSent=this.RequestSent.filter((req)=>req.uid!==$event.uid)
    this.ActionsService.message={
      Content:"Has cancelado la solicitud de "+$event.displayName,
      ImageUrl:`${$event.photoURL}`,
      Issue:"Solicitud cancelada"
    }
    this.UserService.User=user
      this.cdr.detectChanges()
    })

  }
  get PendientRequest(){
    const TotalRequest=this.RequestRecived.length+this.RequestSent.length
    return TotalRequest>0&&this.IsLoad
  }
  get NoRequest(){
    const TotalRequest=this.RequestRecived.length+this.RequestSent.length
    return TotalRequest===0&&this.IsLoad
  }
 }
