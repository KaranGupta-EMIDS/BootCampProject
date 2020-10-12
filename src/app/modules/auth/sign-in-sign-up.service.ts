import { Injectable } from '@angular/core';
import { UserRegister } from '../core/interfaces/user-register';

@Injectable({ providedIn: 'root' })
export class SignInSignUpService {
  constructor() {}

  public isUserExist(userRegisterRequest: UserRegister) {
    return localStorage.getItem(userRegisterRequest.compositeField);
  }

  public saveUserDetails(userRegisterRequest: UserRegister){
    localStorage.setItem(
      userRegisterRequest.compositeField,
      userRegisterRequest.password
    );
  }

}
