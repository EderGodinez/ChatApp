import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <p>ChatList works!</p>
  <p>ChatList works!</p>
  <p>ChatList works!</p>
  <p>ChatList works!</p>
  <p>ChatList works!</p>
  <p>ChatList works!</p>
  <p>ChatList works!</p>
  <p>ChatList works!</p>
  <p>ChatList works!</p>
  <p>ChatList works!</p>
  <p>ChatList works!</p>
  `,
  styleUrls: ['./ChatList.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent {
   }
