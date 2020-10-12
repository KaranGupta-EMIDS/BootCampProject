import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ApiService } from './services/api.service';
import { CoreRoutingModule } from './core-routing.module';
import { UserProfileComponent } from '@core-components/user-profile/user-profile.component';
import { HeaderComponent } from '@core-components/common/header/header.component';
import { FooterComponent } from '@core-components/common/footer/footer.component';
import { ContactListComponent } from '@core-components/user-profile/contact-list/contact-list.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    ContactListComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [ApiService],
})
export class CoreModule {}
