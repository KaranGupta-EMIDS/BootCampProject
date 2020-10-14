import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateCity } from '../../interfaces/state-city';
import { UserProfile } from '../../interfaces/user-profile';
import { MockService } from '../../services/mock.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  public screenScope: { profile: boolean; contactList: boolean };
  public userProfileForm: FormGroup;
  public filteredStates: Array<string>;
  public filteredCities: Array<string>;
  public stateFilter;
  public cityFilter;
  public masterStateCityList: Array<StateCity>;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private mockService: MockService
  ) {
    // this.screenScope = { profile: false, contactList: true }; correct
    this.screenScope = { profile: true, contactList: false };
  }

  ngOnInit() {
    this.mockService.getCities().subscribe((list) => {
      if (Array.isArray(list) && list.length > 0) {
        this.masterStateCityList = list;
        this.filteredStates = Array.from(
          new Set(
            list.map((stateCity: StateCity) => {
              return stateCity.state;
            })
          )
        );
      }
    });
    this.setDefaultValuesInForm();
  }

  private setDefaultValuesInForm() {
    let userProfile: UserProfile;
    let existingProfile:UserProfile = JSON.parse(localStorage.getItem('myProfile'))
    userProfile = {
      fullName:
        existingProfile && existingProfile.fullName
          ? existingProfile.fullName
          : '',
      emailId:
        existingProfile && existingProfile.fullName
          ? existingProfile.fullName
          : '',
      mobileNo:
        existingProfile && existingProfile.fullName
          ? existingProfile.fullName
          : '',
      compositeField:
        existingProfile && existingProfile.fullName
          ? existingProfile.fullName
          : '',
      dateOfBirth:
        existingProfile && existingProfile.dateOfBirth
          ? existingProfile.dateOfBirth
          : '',
      state:
        existingProfile && existingProfile.state ? existingProfile.state : '',
      city: existingProfile && existingProfile.city ? existingProfile.city : '',
    };
    this.initializeUserProfileForm(userProfile);
  }

  private initializeUserProfileForm(userProfile: UserProfile) {
    this.userProfileForm = this.formBuilder.group({
      fullName: [
        userProfile.fullName ? userProfile.fullName : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      mobileNo: [
        userProfile.mobileNo ? userProfile.mobileNo : '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      emailId: [
        userProfile.emailId ? userProfile.emailId : '',
        [Validators.required, Validators.email],
      ],
      dateOfBirth: [
        userProfile.dateOfBirth ? userProfile.dateOfBirth : '',
        [Validators.required],
      ],
      state: [
        userProfile.state ? userProfile.state : '',
        [Validators.required],
      ],
      city: [userProfile.city ? userProfile.city : '', [Validators.required]],
    });
  }

  public filterCities(event) {
    if (this.stateFilter || (event && event.value)) {
      let filterVal = this.stateFilter || event.value;
      this.filteredCities = Array.from(
        new Set(
          this.masterStateCityList
            .filter((stateCity: StateCity) => {
              return stateCity.state.includes(filterVal);
            })
            .map((stateCity: StateCity) => {
              return stateCity.name;
            })
        )
      );
    }
  }

  public updateScreenScope(event: { profile: boolean; contactList: boolean }) {
    if (event) {
      this.screenScope = event;
    }
  }

  public updateForm(formValue: UserProfile) {
    localStorage.setItem('myProfile',JSON.stringify(formValue))
  }
}
