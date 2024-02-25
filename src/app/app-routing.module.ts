import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isnotLogGuard } from './guards/IsnotLog.guard';
import { isLogGuard } from './guards/IsLog.guard';
const routes: Routes = [
  //Rutas de login y register
  {path:'Inicio',loadChildren:() => import('./Auth/Auth.routing.module').then(m=>m.AuthRoutingModule),canActivate:[isLogGuard]},
  //Ruta de chats
  {
    path:':uid',
    canActivate: [isnotLogGuard],
    loadChildren:() => import('./chat/Chat.routing.module').then(m => m.ChatRoutingModule)
  },
  {path:'**',redirectTo:'Inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
