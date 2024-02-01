import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { option } from 'src/app/interfaces/ChatOptions.interface';

@Component({
  selector: 'chat-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <hr class="text-white m-0">
  <ul class="d-flex w-100 flex-nowrap justify-content-between p-0 my-0 pe-2 ps-2">
    <li *ngFor="let option of Options" class="d-flex gap-2 p-0 ml-0" style="font-size: 12px;">
    <span [routerLink]="option.Link" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="d-flex flex-column text-center" >
      <i [class]="option.icon" style="font-size: 1.25rem;"></i>
    {{option.OptionName}}
    </span>
    </li>
  </ul>
  <hr class="text-white m-0">
  `,
  styleUrls: ['./ChatMenu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMenuComponent {
  constructor(){}
  @Input()
  Options:option[]=[]
 }
