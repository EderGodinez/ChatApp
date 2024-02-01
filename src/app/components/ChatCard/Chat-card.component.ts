import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-grups-chat',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>GrupsChat works!</p>`,
  styleUrls: ['./Chat-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrupsChatComponent { }
