import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthDashboardComponent } from '@auth-components/auth-dashboard/auth-dashboard.component';
import { LoginFormComponent } from '@auth-components/login-form/login-form.component';
import { RegisterFormComponent } from '@auth-components/register-form/register-form.component';
import { SignInSignUpService } from './sign-in-sign-up.service';
import { SharedModule } from '../shared/shared.module';
import { EqualValidator } from './directives/equal-validator.directive';
import { CompositeFieldValidator } from './directives/composite-field-validator.directive';

@NgModule({
  declarations: [
    AuthDashboardComponent,
    RegisterFormComponent,
    LoginFormComponent,
    EqualValidator,
    CompositeFieldValidator
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    SharedModule,
    AuthRoutingModule,
  ],
  providers: [SignInSignUpService],
})
export class AuthModule {}
