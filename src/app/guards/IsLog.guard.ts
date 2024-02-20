import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AccessService } from '../services/Access.service';



export const isLogGuard: CanActivateFn =  (route, state) => {
  const auth=inject(AuthService)
const router=inject(Router)
const Access=inject(AccessService)
auth.ValidateUserSession()
let User
const userString = localStorage.getItem('user')
if (userString) {
  User = JSON.parse(userString);
}
if (User) {
  router.navigateByUrl(`${User.uid}`)
  const Token=User.stsTokenManager.accessToken
  Access.setToken(Token)
return false
}
else{
  return true

}
};
