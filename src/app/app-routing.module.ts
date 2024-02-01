import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './pages/login/login.component';
import { ChatLayoutComponent } from './pages/chat-layout/chat-layout.component';
import { LoginLayoutComponent } from './components/LoginLayout/LoginLayout.component';
import { RegisterComponent } from './components/RegisterForm/Register.component';
import { isLogGuard } from './guards/IsLog.guard';
import { isnotLogGuard } from './guards/IsnotLog.guard';
import { ChatListComponent } from './components/ChatList/ChatList.component';
import { NewFriendsComponent } from './components/NewFriends/NewFriends.component';
import { FriendShipReqComponent } from './components/FriendShipReq/FriendShipReq.component';


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
