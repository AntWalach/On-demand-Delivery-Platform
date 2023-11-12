function Validation(values) {
  let error = {};
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.email === "") {
    error.email = "Email should not be empty.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    error.email = "Email didn't match.";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty.";
  } else if (!PASSWORD_PATTERN.test(values.password)) {
    error.password = "Password didn't match.";
  } else {
    error.password = "";
  }

  return error;
}

export default Validation;
