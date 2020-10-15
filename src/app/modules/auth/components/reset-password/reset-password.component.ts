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
  public passwordVisibility: {
    isVisible: boolean;
    icon: string;
    fieldType: string;
  };

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private signInSignUpService: SignInSignUpService
  ) {
    this.passwordVisibility = {
      isVisible: false,
      icon: 'visibility_off',
      fieldType: 'password',
    };
  }

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
      if (this.compositeField == formValue.oldPassword) {
        this.signInSignUpService.saveUserDetails({
          compositeField: this.compositeField,
          password: formValue.password,
        });
        message = `Password has been successfully reset.`;
      } else {
        message = `Old password entered is incorrect.`;
      }
    } else {
      message = `Reset password failed due to the server error at this time. Please try again later.`;
    }
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }

  public togglePasswordVisibility() {
    this.passwordVisibility = {
      isVisible: !this.passwordVisibility.isVisible,
      icon: this.passwordVisibility.isVisible ? 'visibility' : 'visibility_off',
      fieldType: this.passwordVisibility.isVisible ? 'text' : 'password',
    };
  }
}
