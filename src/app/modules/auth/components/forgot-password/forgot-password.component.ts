import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignInSignUpService } from '../../sign-in-sign-up.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private signInSignUpService: SignInSignUpService
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      compositeField: ['', [Validators.required]],
    });
  }

  public forgotPassword(formValue) {
    let message: string;
    const isEmailEntered =
      formValue.compositeField && formValue.compositeField.indexOf('@') !== -1;
    if (this.signInSignUpService.isUserExist(formValue)) {
      message = `An email has been sent to ${formValue.compositeField} with a reset link. Please check your inbox.`;
    } else {
      message = `${
        isEmailEntered ? 'Email.' : 'Mobile No.'
      } is not registered with us. Please provide a valid ${
        isEmailEntered ? 'Email.' : 'Mobile No.'
      }`;
    }

    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
}
