import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './Auth/pages/login/login.component';
import { ChatLayoutComponent } from './chat/pages/chat-layout/chat-layout.component';
import { LoginLayoutComponent } from './Auth/components/LoginLayout/LoginLayout.component';
import { RegisterComponent } from './Auth/pages/RegisterForm/Register.component';
import { isLogGuard } from './guards/IsLog.guard';
import { isnotLogGuard } from './guards/IsnotLog.guard';
import { ChatListComponent } from './chat/pages/ChatList/ChatList.component';
import { NewFriendsComponent } from './chat/pages/NewFriends/NewFriends.component';
import { FriendShipReqComponent } from './chat/pages/FriendShipReqList/FriendShipReq.component';



const routes: Routes = [
  {path:'Inicio',component:LoginLayoutComponent,children:[
    {path:'login',component:LoginComponent,title:"Iniciar sesion"},
    {path:'registro',component:RegisterComponent,title:"Nueva cuenta"},
    {path:'**',redirectTo:'login'}
  ],canActivate:[isLogGuard]},
  //Ruta de chats
  {path:':uid',component:ChatLayoutComponent,children:[
    {path:'chats',component:ChatListComponent,title:"Chats"},
    {path:'Addfriends',component:NewFriendsComponent,title:"Amigos"},
    {path:'request',component:FriendShipReqComponent,title:"Peticiones de amistad"},
    {path:'**',redirectTo:'chats'},
  ],canActivate:[isnotLogGuard]},
  {path:'**',redirectTo:'Inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
