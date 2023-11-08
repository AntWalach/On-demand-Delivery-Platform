function Validation(values) {
  let error = {};
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  const PHONE_NUMBER_PATTERN = /^(\+\d{1,3}[-.\s]?)?(\d{3,4}[-.\s]?)?\d{3,4}[-.\s]?\d{4}$/;

  if (values.name === "") {
    error.name = "Name should not be empty.";
  } else {
    error.name = "";
  }

  if (values.phoneNumber === "") {
    error.phoneNumber = "Phone number should not be empty";
  } else if (!PHONE_NUMBER_PATTERN.test(values.phoneNumber)) {
    error.phoneNumber = "Phone Number didn't match.";
  } else {
    error.phoneNumber = "";
  }

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
