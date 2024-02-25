
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/RegisterForm/Register.component';
import { LoginLayoutComponent } from './components/LoginLayout/LoginLayout.component';
import { isLogGuard } from '../guards/IsLog.guard';

const routes: Routes = [
  {
    path:'',component:LoginLayoutComponent,children:[
      {path:'login',component:LoginComponent,title:"Iniciar sesion"},
      {path:'registro',component:RegisterComponent,title:"Nueva cuenta"},
      {path:'**',redirectTo:'login'}
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LoginComponent,
    LoginLayoutComponent,
    RegisterComponent
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
