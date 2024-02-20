
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoginLayoutComponent } from '../shared/LoginComponets/LoginLayout/LoginLayout.component';
import { RegisterComponent } from '../shared/LoginComponets/RegisterForm/Register.component';
const routes: Routes = [
  {
    path: '', component:LoginLayoutComponent,children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'*',redirectTo:'login'}
  ]
 }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginComponent,
    LoginLayoutComponent,
    RegisterComponent
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
