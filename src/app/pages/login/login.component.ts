import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider} from 'firebase/auth'

import { LoginButtonComponent } from '../../components/loginButton/loginbutton.component';
import { ValidatorService } from 'src/app/validators/validators.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [
    CommonModule,
    LoginButtonComponent,
    ReactiveFormsModule,
    FormsModule
  ],

  template:`
  <div class="w-100 h-100 d-flex flex-column justify-content-evenly">
  <h1>Bienvenido a ChatApp
    <hr>
</h1>
<form class="d-flex flex-wrap justify-content-center" [formGroup]="LoginForm" (submit)="login()" >
<div class=" my-3 w-100 text-start">
<div class="form-floating w-100" [ngClass]="IsValidField('email') ? 'invalid-field' : ''">
  <input type="email" class="form-control" id="floatingInput"style="width:100%" formControlName="email" >
  <label for="floatingInput">Correo</label>
</div>
<small *ngIf="IsValidField('email')" style="margin-left:10px;color:red">{{getMessageError('email')}}</small>
</div>
<div class="my-3 w-100 text-start">
<div class="form-floating w-100" [ngClass]="IsValidField('password') ? 'invalid-field' : ''">
  <input type="password" class="form-control" id="floatingPassword"style="width:100%" formControlName="password">
  <label for="floatingPassword">Contraseña</label>
</div>
<small  *ngIf="IsValidField('password')" style="margin-left:10px;color:red">{{getMessageError('password')}}</small>
</div>

<button class="btn btn-dark my-3"  style="width: 50%; border-radius:20px;">Iniciar sesion</button>
</form>
<span>Inicia sesion con:</span>
  <div class="d-flex justify-content-center" >
    <loginButtonComponent (click)="SignInWithFacebook()" [TypeButton]="'Facebook'"/>
    <loginButtonComponent (click)="SignInWithGoogle()" [TypeButton]="'Google'"/>
    <loginButtonComponent (click)="SignInWithGitHub()" [TypeButton]="'GitHub'"/>
  </div>
  <a href="Inicio/registro">Crear cuenta</a>

  </div>

  `,
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private FB:FormBuilder,private ValidatorService:ValidatorService,private AuthService:AuthService,private Router:Router){
  }
  LoginForm:FormGroup=this.FB.group({
    email:["",[Validators.required]],
    password:["",[Validators.required]]
  })
  getMessageError(field:string){
    return this.ValidatorService.getFieldError(this.LoginForm,field)
  }
  IsValidField(field:string){
    return this.ValidatorService.isValidField(this.LoginForm,field)
  }
  SignInWithFacebook(){
    this.LoginForm.get('password')?.setErrors(null)
    this.AuthService.SignInWithFacebook()
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      localStorage.setItem('user',JSON.stringify(user))
      this.Router.navigateByUrl(`user/${user.uid}/chats`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
  }
  SignInWithGoogle(){
    this.LoginForm.get('password')?.setErrors(null)
    this.AuthService.SignInWithGoogle()
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      localStorage.setItem('user',JSON.stringify(user))
      this.Router.navigateByUrl(`user/${user.uid}/chats`)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }
  SignInWithGitHub(){
    this.LoginForm.get('password')?.setErrors(null)
    this.AuthService.SignInWithGitHub().then((result) => {
      const user = result.user;
      const credential =GithubAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      localStorage.setItem('user',JSON.stringify(user))
      this.Router.navigateByUrl(`user/${user.uid}/chats`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    
    });
  }
  login(){
    this.LoginForm.markAllAsTouched()
    this.LoginForm.get('password')?.setErrors(null)
    if (this.LoginForm.valid) {
      const {email,password}=this.LoginForm.value
      this.AuthService.SignIn(email,password)
      .then((userCredential) => {
        const user = userCredential.user;
      localStorage.setItem('user',JSON.stringify(user))
      })
      .catch((error) => {
        switch(error.message){
          case 'auth/invalid-credential':
           return this.LoginForm.get('password')?.setErrors({AccountDoesNotExist:true})
           case 'auth/too-many-requests':
             return this.LoginForm.get('password')?.setErrors({TooManyAttemps:true})
        }
        this.LoginForm.get('password')?.markAsTouched()


      });
    }
  }


 }
