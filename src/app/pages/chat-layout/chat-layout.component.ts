import { LoaderComponent } from '../../components/extras/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChatMenuComponent } from 'src/app/components/extras/ChatMenu/ChatMenu.component';
import { MessageListComponent } from 'src/app/components/messages/messageList/messageList.component';
import { option } from 'src/app/interfaces/ChatOptions.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    RouterModule,
    ChatMenuComponent,
    MessageListComponent
  ],
  template: `
  <div  *ngIf="Isload; else Loader" class="bg-dark d-flex" style="height: 100vh;width:100vw">
  <!-- chats y menu -->
  <div class="col-4 h-100 d-flex flex-column justify-content-between" style="border-right: 1px solid grey;">

    <div class="d-flex gap-1 align-items-center justify-content-between m-0 p-2 text-center" id="UserInfo">
      <img src="assets/images/default-user.jpg" alt="User image">
      <span>Nombre de usuario</span>
      <i class="bi bi-box-arrow-in-left" (click)="SignOut()" id="signout" style="font-size: 25px;"></i>
    </div>
    <hr class="m-0">
    <div class="h-auto overflow-auto" id="routerContainer">
      <router-outlet></router-outlet>
    </div>
    <chat-menu [Options]="ChatOptions"/>
  </div>
  <div class="col-8 h-100 px-3 py-2">
    <div class="h-100 w-100 bg-white rounded d-flex gap-2 flex-column justify-content-between">
        <div class="d-flex align-items-center justify-content-start m-0 p-2 text-center" id="chat-user">
          <div class="position-relative d-flex" style=" min-width: 40px;max-width: 9%;">
            <img src="assets/images/default-user.jpg" alt="User image">
            <span class="inactive-status active"></span>
          </div>
          <span class="">Nombre de amigo</span>
        </div>
        <div class="flex-grow-1" id="messages"  style="overflow-x:hidden;">
        <message-list></message-list>
        </div>
        <div class="w-100 p-3">
            <div class="position-relative">
              <input type="text"  placeholder="Mensaje...." class="w-100" id="messageinput">
              <button class="position-absolute transparent"><i class="bi bi-send"></i></button>
            </div>
        </div>
    </div>
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
