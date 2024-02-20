import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'loader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<div class="lds-hourglass"></div>`,
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent { }
