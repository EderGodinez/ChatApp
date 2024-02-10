import { ActionsService } from 'src/app/services/actions.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FriendshipReqitemComponent } from '../../extras/FriendshipReqitem/FriendshipReqitem.component';

@Component({
  selector: 'app-friend-ship-req',
  standalone: true,
  imports: [
    CommonModule,
    FriendshipReqitemComponent
  ],
  template: `
  <friendship-reqitem [User]="item" (_AcceptR)="AcceptRequest($event)" (_DeleteR)="DeleteRequest($event)" *ngFor="let item of RequestList"/>
  `,
  styleUrls: ['./FriendShipReq.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendShipReqComponent {
  constructor(private ActionsService:ActionsService){}
  RequestList:any=[{
    projectName:"Erasmo Cruz",
    ImageUrl:"assets/images/default-user.jpg"
  },
  {
    projectName:"Jesus Mendoza",
    ImageUrl:"assets/images/default-user.jpg"
  },
  {
    projectName:"Frank Ortega",
    ImageUrl:"assets/images/default-user.jpg"
  },
  {
    projectName:"Emily Adame",
    ImageUrl:"assets/images/default-user.jpg"
  }
]
  AcceptRequest($event:any){
    this.ActionsService.message={
      Content:"Se ah creado nuevo chat con "+$event.projectName,
      ImageUrl:`${$event.ImageUrl}`,
      Issue:"Nuevo amigo"
    }
   
  }
  DeleteRequest($event:any){
    this.ActionsService.message={
      Content:"Has eliminado la solicitud de "+$event.projectName,
      ImageUrl:`${$event.ImageUrl}`,
      Issue:"Elimminacion de solicitud"
    }

  }
 }
