import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/Message.interface';


@Component({
  selector: 'message-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="message-container">
    <div class="message burble" [ngClass]="{'own':IsMessageOwnner}">
     <p>{{message.Content}}</p>
    <div class="message-status">
      <p style="align-self: self-end;">{{message.Time|date:"short"}}</p>
      <i class="bi bi-check"[ngClass]="{'bi bi-check-all':message.IsRead}" [ngStyle]="{'color':message.IsRead?'aqua':''}" style="font-size: 12px;    vertical-align: middle;"></i>
    </div>
  </div>
</div>`,
  styleUrls: ['./messageItem.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageItemComponent implements OnInit {
  constructor(private UserService:UserService){

  }
  ngOnInit(): void {
  }
  @Input()
  message!:Message
   get IsMessageOwnner():boolean{
    return this.UserService.User.uid===this.message.emitterId
  }
}
