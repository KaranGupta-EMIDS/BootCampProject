import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SignInSignUpService } from '../../../../auth/sign-in-sign-up.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() screenScope = new EventEmitter();

  constructor(
    private signInSignUpService: SignInSignUpService,
    private router: Router
  ) {}

  ngOnInit() {}

  public signOutUser() {
    this.signInSignUpService.signOutUser().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  public toggleScreenScope(screenName: string) {
    this.screenScope.emit({
      profile: screenName === 'profile' ? true : false,
      contactList: screenName === 'contactList' ? true : false,
    });
  }
}
