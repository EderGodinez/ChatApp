import { UserService } from './../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'message-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="message-container">
    <div class="message burble" [ngClass]="{'own':IsmessageOwnner}">
     <p>{{message.messageContent}}</p>
    <div class="message-status">
     <p>{{message.dateSent|date:"short"}}</p>
    </div>
  </div>
</div>`,
  styleUrls: ['./messageItem.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageItemComponent implements OnInit {
  constructor(private UserService:UserService){}
  ngOnInit(): void {
  }
  @Input()
  message!:any
   get IsmessageOwnner():boolean{

    return this.UserService.User.uid===this.message.emmiterid
  }
}
