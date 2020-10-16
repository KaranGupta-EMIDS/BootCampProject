import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../core/interfaces/user-login';
import { UserRegister } from '../core/interfaces/user-register';

@Injectable({ providedIn: 'root' })
export class SignInSignUpService {
  constructor() {}

  public isUserExist(param: { compositeField: string }) {
    return localStorage.getItem(param.compositeField);
  }

  public saveUserDetails(param: { compositeField: string; password: string }) {
    localStorage.setItem(param.compositeField, param.password);
    this.setUserLoggedInStorage(param.compositeField);
  }

  public signInUser(userLogin: UserLogin): boolean {
    let result = localStorage.getItem(userLogin.compositeField);
    return result && userLogin.password === result;
  }

  public signOutUser() {
    return new Observable((observer) => {
      // localStorage.clear();
      observer.next();
      setTimeout(() => {
        observer.complete();
      }, 2000);
    });
  }

  public setUserLoggedInStorage(userID: string) {
    localStorage.setItem('userId', userID);
  }
}
