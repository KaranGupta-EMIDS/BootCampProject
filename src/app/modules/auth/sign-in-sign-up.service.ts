import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../core/interfaces/user-login';
import { UserRegister } from '../core/interfaces/user-register';

@Injectable({ providedIn: 'root' })
export class SignInSignUpService {
  constructor() {}

  public isUserExist(userRegisterRequest: UserRegister) {
    return localStorage.getItem(userRegisterRequest.compositeField);
  }

  public saveUserDetails(userRegisterRequest: UserRegister) {
    localStorage.setItem(
      userRegisterRequest.compositeField,
      userRegisterRequest.password
    );
    this.setUserLoggedInStorage(userRegisterRequest.compositeField);
  }

  public signInUser(userLogin: UserLogin): boolean {
    let result = localStorage.getItem(userLogin.compositeField);
    return result && userLogin.password === result;
  }

  public signOutUser() {
    return new Observable((observer) => {
      localStorage.clear();
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
