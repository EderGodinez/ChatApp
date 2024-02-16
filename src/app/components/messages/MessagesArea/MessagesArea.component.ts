import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MessageListComponent } from '../messageList/messageList.component';
import { map } from 'rxjs';
import { Preview } from 'src/app/interfaces/PreviewCard.interface';

@Component({
  selector: 'messages-area',
  standalone: true,
  imports: [
    CommonModule,
    MessageListComponent,
  ],
  template: `
  <div class="h-100 w-100 bg-secondary rounded d-flex gap-2 flex-column justify-content-between">
        <div class="d-flex align-items-center justify-content-start m-0 p-2 text-center" id="chat-user">
          <div class="position-relative d-flex" style=" min-width: 40px;max-width: 9%;">
            <img [src]="DataUser.photoURL" alt="User image">
            <span class="inactive-status" [ngClass]="{'active':DataUser.IsActive}"></span>
          </div>
          <span class="">{{DataUser.displayName}}</span>
        </div>
        <div class="flex-grow-1" id="messages"  style="overflow-x:hidden;">
        <message-list></message-list>
        </div>
        <div class="w-100 p-3">
            <div class="position-relative">
              <input type="text"  placeholder="Mensaje...." class="w-100" id="messageinput">
              <button class="position-absolute transparent"><i class="bi bi-send"></i></button>
            </div>
        </div>
    </div>


  `,
  styleUrls: ['./MessagesArea.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesAreaComponent implements OnChanges,OnDestroy,OnInit{
  constructor(private UserService:UserService,private cdr: ChangeDetectorRef){}
  ngOnChanges(changes: SimpleChanges): void {
    this.UserService.GetUserinfoById(this.FriendId).pipe(
      map((user)=>{return {displayName:user.displayName,photoURL:user.photoURL,IsActive:user.IsActive}})
    ).subscribe({
      next:(inf)=> {
        console.log(inf)
        this.DataUser=inf
        this.cdr.detectChanges();
      },
      error:(err)=> {
        console.error(err)
      },
    })

  }
  ngOnDestroy(): void {
    console.log('Se destruyo el componente')
  }
  ngOnInit(): void {
   console.log('init')
  }
  @Input()
  FriendId:any=''
  DataUser:Preview={
    displayName:"",
    IsActive:false,
    photoURL:""
  }
}
