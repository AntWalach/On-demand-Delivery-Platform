function Validation(values) {
  let error = {};
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.Email === "") {
    error.Email = "Email should not be empty.";
  } else if (!EMAIL_PATTERN.test(values.Email)) {
    error.Email = "Email didn't match.";
  } else {
    error.Email = "";
  }

  if (values.Password === "") {
    error.Password = "Password should not be empty.";
  } else if (!PASSWORD_PATTERN.test(values.Password)) {
    error.Password = "Password didn't match.";
  } else {
    error.Password = "";
  }

  return error;
}

export default Validation;
