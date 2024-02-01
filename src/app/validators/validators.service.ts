import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorService {
  constructor() { }
  public  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public passPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;
  public AreFieldsEquals(pass:string,confirm:string){
    return(Form:AbstractControl): ValidationErrors| null=>{
      const field1value=Form.get(pass)?.value
      const field2value=Form.get(confirm)?.value
      if (field1value!==field2value) {
        Form.get(confirm)?.setErrors({FieldsDiferents:true})
        return {
          FieldsDiferents:true
        }
      }
      Form.get(confirm)?.setErrors(null)
      return null
    }
  }
  isValidField( MyForm:FormGroup,field: string ): boolean | null {
    return MyForm.controls[field].errors
      && MyForm.controls[field].touched;
  }
  getFieldError( MyForm:FormGroup,field: string): string | null {
    if ( !MyForm.controls[field] ) return null;
    const errors = MyForm.controls[field].errors || {};
    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'pattern':
                return `Formato de email invalido.`;
        case 'FieldsEquals':
          return 'La nueva contraseña debe de ser diferente a la anterior'
        case 'wrongPass':
          return 'Contraseña incorrecta'
        case 'FieldsDiferents':
          return 'Las contraseñas deben de ser iguales'
        case 'minlength':
          return `Campo requere mínimo ${ errors['minlength'].actualLength }/${ errors['minlength'].requiredLength } caracters.`;
        case 'FieldsDiferents':
          return 'Los campos de contraseñas deben de ser iguales'
        case 'AccountAlreadyRegister':
          return 'Correo ya esta vinculado a una cuenta'
        case 'AccountDoesNotExist':
            return 'No existe una cuenta registrada con los datos proporcionados'
        case 'TooManyAttemps':
          return 'Demasiados intentos la cuenta se ah bloqueado contactar con soporte para restablecerla'
      }
    }
    return null;
  }
}
