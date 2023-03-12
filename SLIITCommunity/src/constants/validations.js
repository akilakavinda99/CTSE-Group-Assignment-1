export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = password => {
  if (password.length < 6) {
    return 'Please enter a valid password';
  }
  return null;
};

export const validateITNumber = s => {
  if (s.substring(0, 2).toLowerCase() === 'it') {
    return null;
  } else {
    return 'IT number not valid';
  }
};

export const requiredValidation = s => {
  if (s.length == 0) {
    return 'Required field';
  } else {
    return null;
  }
};
