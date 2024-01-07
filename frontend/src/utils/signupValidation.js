function Validation(values) {
  let error = {};
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  const PHONE_NUMBER_PATTERN =
    /^(\+\d{1,3}[-.\s]?)?(\d{3,4}[-.\s]?)?\d{3,4}[-.\s]?\d{4}$/;

  if (values.Login === "") {
    error.Login = "Username should not be empty.";
  } else {
    error.Login = "";
  }

  if (values.FirstName === "") {
    error.FirstName = "First Name should not be empty.";
  } else {
    error.FirstName = "";
  }

  if (values.LastName === "") {
    error.LastName = "Last Name should not be empty.";
  } else {
    error.LastName = "";
  }

  if (values.PhoneNumber === "") {
    error.PhoneNumber = "Phone number should not be empty";
  } else if (!PHONE_NUMBER_PATTERN.test(values.PhoneNumber)) {
    error.PhoneNumber = "Phone Number didn't match.";
  } else {
    error.PhoneNumber = "";
  }

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
