
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatLayoutComponent } from './pages/chat-layout/chat-layout.component';


const routes: Routes = [
  { path: '', component:ChatLayoutComponent  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ChatLayoutComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
