import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthDashboardComponent } from '@auth-components/auth-dashboard/auth-dashboard.component';
import { ForgotPasswordComponent } from '@auth-components/forgot-password/forgot-password.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'auth', component: AuthDashboardComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  declarations: [ ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
