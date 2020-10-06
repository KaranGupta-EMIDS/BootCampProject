import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { UserProfileComponent } from '@core-components/user-profile/user-profile.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  providers: [ApiService],
})
export class CoreModule {}
