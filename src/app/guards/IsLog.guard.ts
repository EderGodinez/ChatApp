import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';



export const isLogGuard: CanActivateFn =  (route, state) => {
  const auth=inject(AuthService)
const router=inject(Router)
auth.ValidateUserSession()
let User
const userString = localStorage.getItem('user')
if (userString) {
  User = JSON.parse(userString);
}
if (User) {
  router.navigateByUrl(`${User.uid}`)
return false
}
else{
  return true

}
};
