import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLogin } from '../../../core/interfaces/user-login';
import { SignInSignUpService } from '../../sign-in-sign-up.service';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  public userLoginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private signInSignUpService: SignInSignUpService
  ) {}

  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      compositeField: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  public signInUser(formValue: UserLogin) {
    if (this.signInSignUpService.signInUser(formValue)) {
      this.signInSignUpService.setUserLoggedInStorage(formValue.compositeField);
      this.router.navigate(['/user/profile']);
    } else {
      const isEmailEntered =
        formValue.compositeField &&
        formValue.compositeField.indexOf('@') !== -1;

      this.snackBar.open(
        `${
          isEmailEntered ? 'Email' : 'Mobile No.'
        } or the password is incorrect.`,
        'OK',
        {
          duration: 3000,
        }
      );
    }
  }
}
