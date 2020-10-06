import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonAction } from 'src/app/modules/core/interfaces/button-action';
import { UserRegister } from 'src/app/modules/core/interfaces/user-register';
import { UserRegisterFormError } from 'src/app/modules/core/interfaces/user-register-form-error';
import {
  validateEmail,
  validateMobileNo,
} from 'src/app/modules/core/utilities/helper';
import { SignInSignUpService } from '../../sign-in-sign-up.service';

@Component({
  selector: 'app-registeration-form',
  templateUrl: 'register-form.component.html',
  styleUrls: ['register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  public userRegisterRequest: UserRegister;
  public userRegisterFromError: UserRegisterFormError;
  public buttonAction: ButtonAction;
  public isEmailEntered: boolean;

  constructor(
    private router: Router,
    private signInSignUpService: SignInSignUpService
  ) {
    this.userRegisterRequest = {
      firstName: null,
      lastName: null,
      compositeField: null,
      password: null,
      confirmPassword: null,
    };

    this.buttonAction = { enable: false };

    this.userRegisterFromError = {
      firstName: null,
      lastName: null,
      compositeField: null,
      password: null,
      confirmPassword: null,
    };
  }

  ngOnInit() {}

  public passwordChanged(fieldName: string, event) {
    if (!(event && event.target && event.target.value)) {
      this.userRegisterFromError[fieldName] = `Password is required.`;
    } else {
      if (
        (fieldName === 'password' &&
          this.userRegisterRequest.confirmPassword &&
          event.target.value !== this.userRegisterRequest.confirmPassword) ||
        (fieldName === 'confirmPassword' &&
          this.userRegisterRequest.password &&
          event.target.value !== this.userRegisterRequest.password)
      ) {
        this.userRegisterFromError[fieldName] = 'Password doesnt Match.';
        this.userRegisterRequest[fieldName] = null;
        this.buttonAction = {
          enable: false,
        };
      } else {
        if (
          this.userRegisterRequest.password &&
          this.userRegisterRequest.confirmPassword &&
          this.userRegisterRequest.password ===
            this.userRegisterRequest.confirmPassword
        ) {
          this.buttonAction = {
            enable: true,
          };
        }
      }
    }
  }

  public compositeFieldChanged(fieldName: string, event) {
    if (!(event && event.target && event.target.value)) {
      this.userRegisterFromError[fieldName] = `Email/Mobile No. is required.`;
    } else {
      this.isEmailEntered = event.target.value.indexOf('@') !== -1;
      let isValid = this.isEmailEntered
        ? validateEmail(event.target.value)
        : validateMobileNo(event.target.value);
      this.buttonAction = {
        enable: isValid
      };
      if (!isValid) {
        this.userRegisterFromError[fieldName] = `${
          this.isEmailEntered ? 'Email' : 'Mobile No.'
        } is invalid.`;
        this.userRegisterRequest.compositeField = null;
      }
    }
  }

  public nameChanged(fieldName: string, event) {
    if (!(event && event.target && event.target.value)) {
      this.userRegisterFromError[fieldName] = `${
        fieldName === 'lastName' ? 'Last Name' : 'First Names'
      } is required.`;
    }
  }

  public signUpUser() {
    if (this.validateRequest()) {
      if (!this.signInSignUpService.isUserExist(this.userRegisterRequest)) {
        this.signInSignUpService.saveUserDetails(this.userRegisterRequest);
        alert('Thank you for signing up');
        this.router.navigate(['/user/profile']);
      } else {
        alert(
          `${
            this.isEmailEntered ? 'Email' : 'Mobile No.'
          } is already registered. Kindly try to login or use a different ${
            this.isEmailEntered ? 'Email' : 'Mobile No.'
          }  to register.`
        );
      }
    } else {
      alert('Kindly complete form details');
    }
  }

  private validateRequest() {
    return Object.keys(this.userRegisterRequest).filter((key) => {
      return !this.userRegisterRequest[key];
    });
  }
}
