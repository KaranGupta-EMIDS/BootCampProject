import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateCity } from '../../../interfaces/state-city';
import { UserProfile } from '../../../interfaces/user-profile';
import { MockService } from '../../../services/mock.service';
import { validateEmail, validateMobileNo } from '../../../utilities/helper';

@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  public userProfileForm: FormGroup;
  public filteredStates: Array<string>;
  public filteredCities: Array<string>;
  public stateFilter;
  public cityFilter;
  public masterStateCityList: Array<StateCity>;
  public minDate: Date;
  public maxDate: Date;
  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private mockService: MockService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
    this.getListofStates();
    this.initializeUserProfileForm();
  }

  private getListofStates() {
    this.mockService.getStateCities().subscribe((list) => {
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
  }

  private initializeUserProfileForm() {
    let existingProfile: UserProfile = JSON.parse(
      localStorage.getItem('myProfile')
    );
    let compositeField = localStorage.getItem('userId');
    this.userProfileForm = this.formBuilder.group({
      fullName: [
        existingProfile && existingProfile.fullName
          ? existingProfile.fullName
          : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      mobileNo: [
        existingProfile && existingProfile.mobileNo
          ? existingProfile.mobileNo
          : compositeField && validateMobileNo(compositeField)
          ? compositeField
          : '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      emailId: [
        existingProfile && existingProfile.emailId
          ? existingProfile.emailId
          : compositeField && validateEmail(compositeField)
          ? compositeField
          : '',
        [Validators.required, Validators.email],
      ],
      dateOfBirth: [
        existingProfile && existingProfile.dateOfBirth
          ? existingProfile.dateOfBirth
          : '',
        [Validators.required],
      ],
      state: [
        existingProfile && existingProfile.state ? existingProfile.state : '',
        [Validators.required],
      ],
      city: [
        existingProfile && existingProfile.city ? existingProfile.city : '',
        [Validators.required],
      ],
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

  public updateForm(formValue: UserProfile) {
    localStorage.setItem('myProfile', JSON.stringify(formValue));
    this.snackBar.open('Profile saved successfully', 'OK', { duration: 3000 });
  }
}
