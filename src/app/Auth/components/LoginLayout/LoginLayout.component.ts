import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToatsComponent } from '../../../chat/components/chat-layout-components/toats/toats.component';
import { MessageProperties } from 'src/app/interfaces/MessageProperties.interface';
import { ActionsService } from 'src/app/services/actions.service';

@Component({
  selector: 'login-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToatsComponent
  ],
  template: `<div class="body"></div>
<div class="login-card text-center position-absolute">
<router-outlet></router-outlet>
</div>
<toats-component [MessageProp]="Message" />
`,
styleUrls: ['./LoginLayout.component.css'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayoutComponent implements OnInit,OnDestroy{
  constructor(private ActionsService:ActionsService){}
  ngOnInit(): void {
    this.ShowToast()
    this.messageSubscription = this.ActionsService.message$.subscribe((message: MessageProperties) => {
      console.log('cambio',message)
      this.ShowToast();
    });
    }

    ngOnDestroy() {
      if (this.messageSubscription) {
        this.messageSubscription.unsubscribe();
      }
    }
  Message:MessageProperties={
    Content:"primer mensaje",
    Issue:"test"
  }
  private messageSubscription: Subscription | undefined;
  ShowToast(){
    this.Message=this.ActionsService.message
  }
}
