import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { NewFriendItemComponent } from '../../extras/NewFriendItem/NewFriendItem.component';

@Component({
  selector: 'app-new-friends',
  standalone: true,
  imports: [
    CommonModule,
    NewFriendItemComponent,
    FormsModule
  ],
  template: `
   <div class="d-flex w-100 justify-content-between">
      <div class="position-relative" style="width: 95%;padding-left:1rem">
        <input type="text" placeholder="Buscar...." (change)="searchFriend()" #Search >
        <i class="bi bi-search position-absolute z-1" style="right: 10px;top:15px;  color:white;" ></i>
      </div>
    </div>
    <ul class="list" *ngIf="filterUser.length>0;else NoUsers">
      <li *ngFor="let newFriend of filterUser">
        <new-friend-item [User]="newFriend"/>
      </li>
    </ul>
    <ng-template #NoUsers>
      <div style="padding:10px;" class="text-center">
        <span class="text-white">Usuario no encontrado</span>
      </div>
    </ng-template>
  `,
  styleUrls: ['./NewFriends.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewFriendsComponent {
  @ViewChild('Search')
  $searchUsers!:ElementRef
  filterUser:any[]=[
    {
      ImageUrl:"assets/images/default-user.jpg",
      projectName:"Nicole Salazar"
  },{
    ImageUrl:"assets/images/default-user.jpg",
    projectName:"Eder Godinez"
  }]
  searchFriend(){

   console.log('impresion',this.$searchUsers.nativeElement.value)
  }

}

