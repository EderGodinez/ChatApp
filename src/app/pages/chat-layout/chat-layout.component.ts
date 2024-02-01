import { LoaderComponent } from './../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChatMenuComponent } from 'src/app/components/ChatMenu/ChatMenu.component';
import { option } from 'src/app/interfaces/ChatOptions.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    RouterModule,
    ChatMenuComponent
  ],
  template: `
  <div  *ngIf="Isload; else Loader" class="bg-dark d-flex" style="height: 100vh;width:100vw">
  <!-- chats y menu -->
  <div class="col-4 h-100 d-flex flex-column justify-content-between">
  <div>
    <div class="d-flex gap-1 align-items-center justify-content-between m-0 p-2 text-center" id="UserInfo">
      <img src="assets/images/default-user.jpg" alt="User image">
      <span>Nombre de usuario</span>
      <i class="bi bi-box-arrow-in-left" (click)="SignOut()" id="signout" style="font-size: 25px;"></i>
    </div>
    <hr class="mt-0">
  </div>

    <div class="h-auto overflow-auto " id="routerContainer">
      <router-outlet></router-outlet>
    </div>
    <chat-menu [Options]="ChatOptions"/>
  </div>
  <div class="col-8 h-100">
    <p >Chat-area-works!</p>
  </div>
  </div>

  <ng-template #Loader >
    <div class="d-flex justify-content-center text-center" style="height: 100vh;width: 100vw;align-items: center;">
      <loader/>
      <h1>Cargando....</h1>
  </div>
  </ng-template>
  `,
  styleUrls: ['./chat-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatLayoutComponent implements OnInit {
  constructor(private Auth:AuthService,private cdr: ChangeDetectorRef,private Router:Router){

  }
  ChatOptions:option[]=[
    {icon:"bi bi-chat",Link:"chats",OptionName:"Chats"},
    {icon:"bi bi-person-add",Link:"Addfriends",OptionName:"Buscar"},
    {icon:"bi bi-chat-square-heart",Link:"request",OptionName:"Peticiones"}
  ]
  Isload:boolean=false
  ngOnInit(): void {
  this.UserActive()
  }
  UserActive(){
    setTimeout(() => {
      this.Isload=true
      this.cdr.detectChanges();
    }, 1000);
  }
  SignOut(){
    console.log('cerraste sesion',this.Auth.User.displayName)
    this.Auth.LogOut()
    this.Isload=false
    setTimeout(() => {
      this.Router.navigate(['Inicio'])
    }, 2000);
  }
 }
