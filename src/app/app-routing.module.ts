import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared-guards/auth.guard';

const routes: Routes = [
{
  path: 'auth',
  loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
},
{
  path: 'user',
  loadChildren: () => import('./modules/core/core.module').then(m => m.CoreModule),
  canLoad: [AuthGuard]
},
{ path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
