import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/modules/core/interfaces/user-register';
import { checkPasswords } from 'src/app/modules/core/utilities/helper';
import { CustomErrorStateMatcher } from '../../../core/utilities/error-state-matcher';
import { SignInSignUpService } from '../../sign-in-sign-up.service';

@Component({
  selector: 'app-registeration-form',
  templateUrl: 'register-form.component.html',
  styleUrls: ['register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  public userRegisterForm: FormGroup;
  public matcher: CustomErrorStateMatcher;
  private checkPasswords = checkPasswords;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private signInSignUpService: SignInSignUpService
  ) {}

  ngOnInit() {
    this.userRegisterForm = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
          ],
        ],
        compositeField: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.checkPasswords }
    );
    this.matcher = new CustomErrorStateMatcher();
  }

  public signUpUser(formValue: UserRegister) {
    if (!this.signInSignUpService.isUserExist(formValue)) {
      this.signInSignUpService.saveUserDetails(formValue);
      this.openSnackBar('Thank you for signing up');
      this.router.navigate(['/user/profile']);
    } else {
      const isEmailEntered =
        formValue.compositeField &&
        formValue.compositeField.indexOf('@') !== -1;
      this.openSnackBar(
        `${
          isEmailEntered ? 'Email' : 'Mobile No.'
        } is already registered. Kindly try to login or use a different ${
          isEmailEntered ? 'Email' : 'Mobile No.'
        }  to register.`
      );
    }
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
}
