import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-friends',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>NewFriends works!</p>`,
  styleUrls: ['./NewFriends.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewFriendsComponent { }
