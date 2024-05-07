import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environments } from 'src/env/environments';
const a=localStorage.getItem('user')
let User:any=''
let currentUserToken:any=''
if (a) {
  User=JSON.parse(a)
}


 currentUserToken =User.stsTokenManager?.accessToken
  const config: SocketIoConfig = { url: `wss://chatapp-back-aki3.onrender.com:81`, options: {query:{token:currentUserToken}}, };
@NgModule({
  imports: [
    SocketIoModule.forRoot(config)
  ],
  providers: [],
})
export  class ChatModule {
}
