
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorService } from 'src/app/validators/validators.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  template: `
  <div class="w-100 h-100 d-flex flex-column justify-content-evenly">
  <h1>Nuevo usuario
    <hr>
</h1>
<form class="d-flex flex-wrap" [formGroup]="RegisterForm" (submit)="Register()" >
<div class="form-floating my-3 w-100" [ngClass]="IsValidField('ProjectName') ? 'invalid-field' : ''" >
  <input type="text" class="form-control" id="floatingPassword"style="width:100%" formControlName="ProjectName">
  <label for="floatingPassword">Nombre de usuario</label>
</div>
<small *ngIf="IsValidField('ProjectName')"style="color:red">{{getMessageError('ProjectName')}}</small>
<div class="form-floating my-3 w-100" [ngClass]="IsValidField('email') ? 'invalid-field' : ''">
  <input type="email" class="form-control" id="floatingInput"style="width:100%" formControlName="email" >
  <label for="floatingInput">Correo</label>
</div>
<small *ngIf="IsValidField('email')"style="color:red">{{getMessageError('email')}}</small>
<div class="form-floating my-3 w-100" [ngClass]="IsValidField('password') ? 'invalid-field' : ''">
  <input type="password" class="form-control" style="width:100%" formControlName="password">
  <label for="floatingPassword">Contraseña</label>
</div>
<small *ngIf="IsValidField('password')"style="color:red">{{getMessageError('password')}}</small>
<div class="form-floating my-3 w-100" [ngClass]="IsValidField('confirmPass') ? 'invalid-field' : ''">
  <input type="password" class="form-control" style="width:100%" formControlName="confirmPass">
  <label for="floatingPassword">Confirmar contraseña</label>
</div>
<small *ngIf="IsValidField('confirmPass')" style="color:red">{{getMessageError('confirmPass')}}</small>
<div class="d-flex justify-content-center w-100">
  <button class="btn btn-dark my-3 "  style="font-size:14px;width: 50%; border-radius:20px;">Registrarse</button>
</div>
</form>
  <a href="Inicio/login">Iniciar sesion</a>
  </div>
  `,
  styleUrls: ['./Register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(private FB:FormBuilder,private ValidatorService:ValidatorService,private Auth:AuthService){
  }
  public RegisterForm:FormGroup=this.FB.group({
    ProjectName:["",[Validators.required,Validators.minLength(6)]],
    email:["",[Validators.pattern(this.ValidatorService.emailPattern),Validators.required]],
    password:["",[Validators.required,Validators.minLength(10)]],
    confirmPass:["",[Validators.required]],
  })
  PasswordEquals(field1:string,field2:string){
    return this.ValidatorService.AreFieldsEquals(field1,field2)
  }
  getMessageError(field:string){
    return this.ValidatorService.getFieldError(this.RegisterForm,field)
  }
  IsValidField(field:string){
    return this.ValidatorService.isValidField(this.RegisterForm,field)
  }
  AreEquals(pass:string,confirm:string){
  if ( this.RegisterForm.get(pass)?.value===this.RegisterForm.get(confirm)?.value) {
    return null
  }
  return this.RegisterForm.get(confirm)?.setErrors({FieldsDiferents:true})
  }
  Register(){
    this.RegisterForm.markAllAsTouched()
    this.RegisterForm.get('confirmPass')?.setErrors(null)
    this.AreEquals('password','confirmPass')
    if (this.RegisterForm.valid) {
      const {email,password}=this.RegisterForm.value
      this.Auth.CreateUser(email,password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode==='auth/email-already-in-use') {
          this.RegisterForm.get('confirmPass')?.markAsTouched()
          return this.RegisterForm.get('confirmPass')?.setErrors({AccountAlreadyRegister:true})
        }
      });
    }
  }
}
