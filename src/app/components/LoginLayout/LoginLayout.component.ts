import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `<div class="body"></div>
<div class="login-card text-center position-absolute">
<router-outlet></router-outlet>
</div>

  `,
  styleUrls: ['./LoginLayout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayoutComponent {
  
}
