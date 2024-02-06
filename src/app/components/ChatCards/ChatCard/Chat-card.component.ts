import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'previewChats',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="d-flex justify-content-between py-2" id="previewCard"  style="border-bottom: 1px solid grey;">
    <div class="position-relative">
      <img src="assets/images/default-user.jpg" alt="image">
      <span class="inactive-status active"></span>
    </div>
    <div class="d-flex flex-column gap-2">
      <span>ChatName</span>
      <span *ngIf="IsType">Is typing..</span>
    </div>
    <div class="d-flex flex-column gap-2" style="font-size:12px;">
       <span >{{DateLastMessage|date:'short':''}}</span>
      <span class="badge text-bg-secondary rounded-circle text-center align-self-end" style="width: 25px;" *ngIf="PendientMessages>0">5</span>
    </div>

  </div>
  `,
  styleUrls: ['./Chat-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class previewChatComponent {
  DateLastMessage:Date=new Date()
  PendientMessages:number=0
  IsType:boolean=false
}
