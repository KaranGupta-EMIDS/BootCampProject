import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AlertModule, TooltipModule } from 'ngx-bootstrap';
import { DefaultModalComponent } from './components/default-modal/default-modal.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    DefaultModalComponent,
    AutoFocusDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // AlertModule.forRoot(),
    // TooltipModule.forRoot()
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // AlertModule,
    // TooltipModule,
    DefaultModalComponent,
    AutoFocusDirective
  ],
  providers:[
    AuthGuard
  ]
})
export class SharedModule { }
