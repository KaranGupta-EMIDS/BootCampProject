import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInSignUpService } from '../../../../auth/sign-in-sign-up.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private signInSignUpService: SignInSignUpService,
    private router: Router
  ) {}

  ngOnInit() {}

  public signOutUser() {
    this.signInSignUpService.signOutUser().subscribe(()=>{
      this.router.navigate(['/']);
    });
  }
}
