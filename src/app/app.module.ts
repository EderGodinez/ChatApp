import {  HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/pages/login/login.component';
import { ChatLayoutComponent } from './chat/pages/chat-layout/chat-layout.component';

import localeEsMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';

import { AccessService,TokenService } from './services/Access.service';


registerLocaleData(localeEsMx)
    const tokenService = new TokenService(new AccessService());
    const config: SocketIoConfig = { url: 'http://localhost:80', options: {query:{token:tokenService.CurrentToken}}, };

    console.log(config)
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    ChatLayoutComponent,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {provide:LOCALE_ID,useValue:'es-MX'},
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
