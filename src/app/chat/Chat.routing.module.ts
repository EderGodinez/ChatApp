

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatLayoutComponent } from './pages/chat-layout/chat-layout.component';
import { ChatListComponent } from './pages/ChatList/ChatList.component';
import { FriendShipReqComponent } from './pages/FriendShipReqList/FriendShipReq.component';
import { NewFriendsComponent } from './pages/NewFriends/NewFriends.component';
const routes: Routes = [
  { path: '', component:ChatLayoutComponent,children:[
    {path:'chats',component:ChatListComponent,title:"Chats"},
    {path:'Addfriends',component:NewFriendsComponent,title:"Amigos"},
    {path:'request',component:FriendShipReqComponent,title:"Peticiones"},
    {path:'**',redirectTo:'chats'},
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ChatLayoutComponent
  ],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
