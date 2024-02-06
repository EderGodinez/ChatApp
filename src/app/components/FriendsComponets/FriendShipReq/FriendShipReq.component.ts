import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-friend-ship-req',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>FriendShipReq works!</p>`,
  styleUrls: ['./FriendShipReq.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendShipReqComponent { }
