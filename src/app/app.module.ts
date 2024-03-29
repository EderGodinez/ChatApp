import {  HttpClientModule } from '@angular/common/http';
import {  LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/pages/login/login.component';
import { ChatLayoutComponent } from './chat/pages/chat-layout/chat-layout.component';

import localeEsMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';


registerLocaleData(localeEsMx)

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
  ],
  providers: [
    {provide:LOCALE_ID,useValue:'es-MX'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
