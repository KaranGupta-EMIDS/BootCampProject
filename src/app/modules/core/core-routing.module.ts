import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from '@core-components/user-dashboard/contact-list/contact-list.component';
import { UserDashboardComponent } from '@core-components/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from '@core-components/user-dashboard/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: "",
    component: UserDashboardComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'contactlist', component: ContactListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
