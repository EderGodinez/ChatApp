import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AccessService {
    constructor(){}
     _Access$ = new BehaviorSubject<string>('ESte es primer token de prueba');
   Access$ = this._Access$.asObservable();
  get token():string{
    return this._Access$.getValue()
  }
  public setToken(token:string): void {
    this._Access$.next('SE cambio');
  }
}
@Injectable({providedIn: 'root'})
export class TokenService implements OnDestroy{
  CurrentToken:string=''
  private changesSubscription : Subscription | undefined;
  constructor(private Access:AccessService){
    this.changesSubscription =this.Access.Access$.subscribe((token)=>{
      this.CurrentToken=token
      console.log(token)
    })
  }
  ngOnDestroy(): void {
    if (this.changesSubscription ) {
      this.changesSubscription.unsubscribe();
    }
  }

}
