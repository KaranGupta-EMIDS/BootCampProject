import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthDashboardComponent } from './auth-dashboard.component';


describe('AuthDashboardComponent', () => {
  let component: AuthDashboardComponent;
  let fixture: ComponentFixture<AuthDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatCardModule,
        MatTabsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
      ],
      declarations: [AuthDashboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AuthDashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#card-title').textContent).toContain('SignIn/SignUp');
  });

  // it('should have signin tab', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should have signup tab', () => {
  //   expect(component).toBeTruthy();
  // });

});
