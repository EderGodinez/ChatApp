import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MessageItemComponent } from '../messageItem/messageItem.component';
import { Message } from 'src/app/interfaces/Message.interface';
import { MessagesService } from 'src/app/services/messages.service';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'message-list',
  standalone: true,
  imports: [
    CommonModule,
    MessageItemComponent
  ],
  template: `
  <ul class="list px-2" id="list">
    <li *ngFor="let item of messages" [ngStyle]="{'align-self':item.emitterId===UserId?'end':''}">
    <message-item [message]="item"/>
    </li>
  </ul>
  <ng-template #Loading >
        <div class="h-100 flex-wrap d-flex justify-content-center align-content-center">
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status" style="width: 5rem;height:5rem">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
        </div>
    </ng-template>
  `,
  styleUrls: ['./messageList.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent implements OnChanges,OnDestroy {
  constructor(private UserService:UserService,private cdr:ChangeDetectorRef,private el: ElementRef,private ChatService:ChatService){
    this.messageSubscription= this.ChatService.messages$.subscribe((message)=>{
      if (message!==null) {
        if(message.emitterId&&message.chatId===this.ChatId) {
          this.UserService.User.Friends[this.ChatIdIndex].Messages.push(message)
          this.cdr.detectChanges();
      }
      // if(message.emitterId===this.UserService.User.uid){
      //   this.ChatService.DropSound()
      // }
      }
    })

  }
  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ChatId=changes['ChatId'].currentValue
    this.cdr.detectChanges()
  }
  private messageSubscription: Subscription | undefined;
  @Input()
  ChatId!:string
  get UserId():string{
    return this.UserService.User.uid
  }
 get ChatIdIndex(){
    return this.UserService.User.Friends.findIndex((friend)=>friend.ChatId===this.ChatId)
 }
 get messages(){
  return this.UserService.User.Friends[this.ChatIdIndex].Messages
 }

}
