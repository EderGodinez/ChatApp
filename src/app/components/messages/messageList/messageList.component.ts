import { UserService } from './../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessageItemComponent } from '../messageItem/messageItem.component';

@Component({
  selector: 'message-list',
  standalone: true,
  imports: [
    CommonModule,
    MessageItemComponent
  ],
  template: `<ul class="list px-2">
    <li *ngFor="let item of messages" [ngStyle]="{'align-self':item.emmiterid===UserId?'end':''}">
    <message-item [message]="item"/>
    </li>
  </ul>`,
  styleUrls: ['./messageList.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent {
  constructor(private UserService:UserService){}
  messages:any[]=[
    {
      emmiterid:"1",
      dateSent:new Date(),
      messageContent:"Hola soy eder que tal estas , esta es una prueba de de mensaje para probar la burbuja del chat jajjajhdk shakjdhajkg skjagjww ldlskjdk ljskdjskljdkl s",
    },
    {
      emmiterid:"2",
      dateSent:new Date(),
      messageContent:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      emmiterid:"2",
      dateSent:new Date(),
      messageContent:"Hola soy eder que tal estas , esta es una prueba de de mensaje para probar la burbuja del chat jajjajhdk shakjdhajkg skjagjww ldlskjdk ljskdjskljdkl s",
    },
    {
      emmiterid:"1",
      dateSent:new Date(),
      messageContent:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    }
  ]
  get UserId():number{
    return this.UserService.User._id
  }
}
