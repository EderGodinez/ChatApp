import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NewFriendItemComponent } from '../../components/newFriend-components/NewFriendItem/NewFriendItem.component';
import { UserService } from 'src/app/services/user.service';
import { map} from 'rxjs';
import { NewFriend } from 'src/app/interfaces/NewFriend.initerface';

@Component({
  selector: 'app-new-friends',
  standalone: true,
  imports: [
    CommonModule,
    NewFriendItemComponent,
    FormsModule
  ],
  template: `
  <div class="position-relative" style="width: 95%;padding-left:1rem">
        <input type="text" placeholder="Buscar...." (input)="searchFriend()" #Search >
        <i class="bi bi-search position-absolute z-1" style="right: 10px;top:15px;  color:white;" ></i>
      </div>
   <div class="d-flex w-100 justify-content-between" *ngIf="IsLoad">
    </div>
    <ul class="list" *ngIf="TheresUsers">
      <li *ngFor="let newFriend of filterUser">
        <new-friend-item [User]="newFriend"/>
      </li>
    </ul>

      <div class="d-flex justify-content-center align-content-center flex-wrap h-100"  *ngIf="!IsLoad">
        <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="NoUsers">
        <div style="padding:10px;" class="text-center">
          <span class="text-white">Usuario no encontrado</span>
        </div>
      </div>


  `,
  styleUrls: ['./NewFriends.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewFriendsComponent implements OnInit {
  constructor(private UserService:UserService,private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
    this.UserService.GetusersList('')
    .pipe(
      map((users)=>{
        return users.map(user => ({ photoURL: user.photoURL, displayName: user.displayName,uid:user.uid }))
      })
    ).subscribe({
      next:(users)=> {
          this.filterUser=users
          this.IsLoad=true
          this.cdr.detectChanges()
      },
    })
  }
  @ViewChild('Search')
  $searchUsers!:ElementRef
  filterUser:NewFriend[]=[]
  IsLoad:boolean=false
  searchFriend(){
    this.IsLoad=false
    this.cdr.detectChanges()
    console.log(this.$searchUsers.nativeElement.value)
    this.UserService.GetusersList(this.$searchUsers.nativeElement.value)
    .pipe(
      map((users)=>{
        return users.map(user => ({ photoURL: user.photoURL, displayName: user.displayName,uid:user.uid }))
      })
    ).subscribe({
      next:(users)=> {
        this.filterUser=users
        this.IsLoad=true
        this.cdr.detectChanges()
      },
    })
  }
  get TheresUsers(){
    return this.filterUser.length>0&&this.IsLoad
  }
  get NoUsers(){
    return this.filterUser.length===0&&this.IsLoad
  }

}

