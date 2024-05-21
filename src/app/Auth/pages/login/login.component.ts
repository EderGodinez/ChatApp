
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider} from 'firebase/auth'

import { LoginButtonComponent } from '../../components/loginButton/loginbutton.component';
import { ValidatorService } from 'src/app/validators/validators.service';
import { AuthService } from '../../../services/auth.service';
import { ActionsService } from 'src/app/services/actions.service';
import { UserService } from 'src/app/services/user.service';


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
  <input type="password" class="form-control" id="floatingPassword"style="width:100%" formControlName="password" #password>
  <label for="floatingPassword">Contraseña</label>
  <i class="bi-eye-slash" (click)="handleShowpass()" #hide></i>
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
  <span  (click)="GoRegister()" class="text-primary text-decoration-underline cursor-pointer">Crear cuenta</span>

  </div>


  `,
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private FB:FormBuilder,private ValidatorService:ValidatorService,private UserService:UserService,
    private AuthService:AuthService,private Router:Router,private ActionsService:ActionsService){
  }
  LoginForm:FormGroup=this.FB.group({
    email:["",[Validators.required]],
    password:["",[Validators.required]]
  })

  @ViewChild('password')
  inputpassword!:ElementRef
  @ViewChild('hide')
  HidePassIcon!:ElementRef | undefined;
  handleShowpass(){
      const passwordInput = this.inputpassword;
      const inputType = passwordInput.nativeElement.type;
      if (inputType === 'password') {
        passwordInput.nativeElement.type = 'text';
        this.HidePassIcon?.nativeElement.classList.remove('bi-eye-slash');
        this.HidePassIcon?.nativeElement.classList.add('bi-eye');
      } else {
        passwordInput.nativeElement.type = 'password';
        this.HidePassIcon?.nativeElement.classList.remove('bi-eye');
        this.HidePassIcon?.nativeElement.classList.add('bi-eye-slash');
      }
  }
  getMessageError(field:string){
    return this.ValidatorService.getFieldError(this.LoginForm,field)
  }
  IsValidField(field:string){
    return this.ValidatorService.isValidField(this.LoginForm,field)
  }
  SignInWithFacebook(){
    this.LoginForm.get('password')?.setErrors(null)
    this.AuthService.SignInWithFacebook()
    .then(async (result) => {
      const user = result.user;
      const tokenAccess=await user.getIdToken().then((token)=>{
        return token
      })
      localStorage.setItem('user',JSON.stringify(user))
      //Se muestra toast
      this.ShowMessage(user.displayName)
      this.UserService.RegisterUser({displayName:user.displayName,email:user.email,uid:user.uid,photoURL:user.photoURL}).subscribe({
        next:(user)=> {
          this.UserService.User=user
        },
        error:(err)=> {
          console.error(err)
        },
        complete:()=> {

          this.Router.navigateByUrl(`${user.uid}/chats`)
        },
      })
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
    .then(async (result) => {
      const user = result.user;
      const tokenAccess=await user.getIdToken().then((token)=>{
        return token
      })
      localStorage.setItem('user',JSON.stringify(user))
      //Se muestra toast
      this.ShowMessage(user.displayName)
      this.UserService.RegisterUser({displayName:user.displayName,email:user.email,uid:user.uid,photoURL:user.photoURL}).subscribe({
        next:(user)=> {
          this.UserService.User=user
          },
          error:(err)=> {
            console.error(err)
          },
          complete:()=> {

            this.Router.navigateByUrl(`${user.uid}/chats`)
          },
        })

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }
  SignInWithGitHub(){
    this.LoginForm.get('password')?.setErrors(null)
    this.AuthService.SignInWithGitHub().then(async (result) => {
      const user = result.user;
      const tokenAccess=await user.getIdToken().then((token)=>{
        return token
      })
      //Se muestra toast
      this.ShowMessage(user.displayName)
      this.UserService.RegisterUser({displayName:user.displayName,email:user.email,uid:user.uid,photoURL:user.photoURL}).subscribe({
        next:(user)=> {
          localStorage.setItem('user',JSON.stringify(user))
          this.Router.navigateByUrl(`chats/${user.uid}`)
          this.UserService.User=user
        },
        error:(err)=> {
          console.error(err)
        },
        complete:()=> {
          this.Router.navigateByUrl(`${user.uid}/chats`)
        },
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode==='auth/account-exists-with-different-credential') {
        this.ActionsService.message={Issue:"Error",Content:"El correo ya esta vinculado a una cuenta"}
      }
      else{
        this.ActionsService.message={Issue:"Error innesperado",Content:"Ah ocurrido un error al intentar iniciar sesion intentelo con una cuenta diferente"}
      }

    });
  }
  login(){
    this.LoginForm.markAllAsTouched()
    this.LoginForm.get('password')?.setErrors(null)
    if (this.LoginForm.valid) {
      const {email,password}=this.LoginForm.value
      this.AuthService.SignIn(email,password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const tokenAccess=await user.getIdToken().then((token)=>{
          return token
        })
        //Se muestra toast
        this.UserService.RegisterUser({displayName:user.displayName,email:user.email,uid:user.uid,photoURL:user.photoURL}).subscribe({
          next:(usercomplete)=> {
            localStorage.setItem('user',JSON.stringify(usercomplete))
            this.UserService.User=usercomplete
            this.ShowMessage(usercomplete.displayName)
        },
        error:(err)=> {
          console.error(err)
        },
        complete:()=> {

          this.Router.navigateByUrl(`${user.uid}/chats`)
        },
      })
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
  ShowMessage(username:string|null){
  this.ActionsService.message={
    Content:`Bienvenido ${username}`,
    Issue:"Inicio de sesion exitoso"
  }
  }
  GoRegister(){
    this.Router.navigateByUrl('Inicio/registro')
  }


 }
