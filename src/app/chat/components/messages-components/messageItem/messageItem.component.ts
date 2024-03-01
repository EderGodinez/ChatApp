import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/interfaces/Message.interface';
import { ChatService } from 'src/app/services/chat.service';


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
      <i class="bi bi-check"[ngClass]="{'bi bi-check-all':message.IsRead}" [ngStyle]="{'color':MessageRead?'aqua':''}" style="font-size: 12px;    vertical-align: middle;"></i>
    </div>
  </div>
</div>`,
  styleUrls: ['./messageItem.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageItemComponent implements OnDestroy {
  constructor(private UserService:UserService,private Chat:ChatService,private cdr:ChangeDetectorRef){
    this.MessageObservable=this.Chat.read$.subscribe((value)=>{
      if (value!==null) {
        if (this.message.emitterId!==this.UserService.User.uid) {
          this.message.IsRead=value
          this.cdr.detectChanges()
        }
      }
    })
  }
  ngOnDestroy(): void {
    if (this.MessageObservable) {
      this.MessageObservable.unsubscribe()
    }
  }
  private MessageObservable:Subscription | undefined;
  @Input()
  message!:Message
   get IsMessageOwnner():boolean{
    return this.UserService.User.uid===this.message.emitterId
  }
  get MessageRead():boolean{
    return this.IsMessageOwnner&&this.message.IsRead
  }
}
