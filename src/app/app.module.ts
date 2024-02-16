import {  HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatLayoutComponent } from './pages/chat-layout/chat-layout.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import localeEsMx from '@angular/common/locales/es-MX';

import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsMx)
const config: SocketIoConfig = { url: 'http://localhost:80', options: {} };
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
    {provide:LOCALE_ID,useValue:'es-MX'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
