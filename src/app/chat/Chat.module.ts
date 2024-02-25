import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
const a=localStorage.getItem('user')
let User:any=''
let currentUserToken:any=''
if (a) {
  User=JSON.parse(a)
}


 currentUserToken =User.stsTokenManager?.accessToken
  const config: SocketIoConfig = { url: 'http://localhost:80', options: {query:{token:currentUserToken}}, };
@NgModule({
  imports: [
    SocketIoModule.forRoot(config)
  ],
  providers: [],
})
export  class ChatModule {
}
