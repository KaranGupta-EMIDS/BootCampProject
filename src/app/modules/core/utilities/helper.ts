import { FormGroup } from '@angular/forms';

export const makeClone = (original) => {
  return JSON.parse(JSON.stringify(original));
};

export const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const validateMobileNo = (mobileNo) => {
  if (mobileNo) {
    mobileNo = mobileNo.trim();
    if (mobileNo.length > 0 && mobileNo.length === 10) {
      return !isNaN(parseInt(mobileNo));
    }
  }
  return false;
};

export function getUserListFromStorage() {
  return JSON.parse(localStorage.getItem('userlist'));
}

export function setUsetListInStorage(userList) {
  localStorage.setItem('userlist', JSON.stringify(userList));
}


export function validateDateFormat(selectedDate) {
  let date_regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  return selectedDate !== '' && !date_regex.test(selectedDate);
}

export function checkPasswords(group: FormGroup) {
  // here we have the 'passwords' group
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true };
}

