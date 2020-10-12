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
        return !isNaN(parseInt(mobileNo))
    }
  }
  return false;
};
