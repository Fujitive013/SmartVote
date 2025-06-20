// utils/passwordValidation.js
const validatePassword = (pass) => {
  let criteria = 0;

  // Check for minimum length
  if (pass.length >= 6) {
    // Check for uppercase
    if (/[A-Z]/.test(pass)) criteria++;
    // Check for special character
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) criteria++;
    // Check for number
    if (/[0-9]/.test(pass)) criteria++;

    return criteria >= 3;
  }
  return false;
};

export default validatePassword;
