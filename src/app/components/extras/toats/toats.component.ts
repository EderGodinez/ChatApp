import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageProperties } from 'src/app/interfaces/MessageProperties.interface';
declare const bootstrap: any;
@Component({
  selector: 'toats-component',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="toast-container position-fixed top-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img *ngIf="MessageProp.ImageUrl" [src]="MessageProp.ImageUrl" width="30" height="30" class="me-2" alt="..." style="border-radius: 50%;">
      <strong class="me-auto">{{MessageProp.Issue}}</strong>
      <small>ahora</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" style="color: black;">
      {{MessageProp.Content}}
    </div>
  </div>
</div>
  `,
  styleUrls: ['./toats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToatsComponent implements OnChanges{
  @Input()
  MessageProp:MessageProperties={
    Content:"",
    ImageUrl:"",
    Issue:""
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['MessageProp'].firstChange){
      const toast = document.getElementById('liveToast')
      const toastBootstrap =  bootstrap.Toast.getOrCreateInstance(toast)
      toastBootstrap.show()
    setTimeout(() => {
      toastBootstrap.hide()
    }, 5000);
    }

  }

}
