import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomErrorStateMatcher } from 'src/app/modules/core/utilities/error-state-matcher';
import { checkPasswords } from 'src/app/modules/core/utilities/helper';
import { SignInSignUpService } from '../../sign-in-sign-up.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public matcher: CustomErrorStateMatcher;
  private routeSubscription: Subscription;
  private compositeField: string;
  private checkPasswords = checkPasswords;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private signInSignUpService: SignInSignUpService
  ) {}

  ngOnInit() {
    this.createRouteSubscription();
    this.initializeResetPasswordForm();
    this.matcher = new CustomErrorStateMatcher();
  }

  private createRouteSubscription() {
    this.routeSubscription = this.activatedRoute.params.subscribe((params) => {
      this.compositeField = params['uid'] ? params['uid'] : null;
    });
  }

  private initializeResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group(
      {
        oldPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
            Validators.pattern(
              '^(?=.{3,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.checkPasswords }
    );
  }

  public resetPassword(formValue) {
    let isExist = this.signInSignUpService.isUserExist({
      compositeField: this.compositeField,
    });
    let message: string;
    if (this.compositeField && isExist) {
      this.signInSignUpService.saveUserDetails({
        compositeField: this.compositeField,
        password: formValue.password,
      });
      message = `Password has been successfully reset.`;
    } else {
      message = `Reset password failed due to the server error at this time. Please try again later.`;
    }
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
}
