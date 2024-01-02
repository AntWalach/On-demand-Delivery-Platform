const Validation = (values) => {
  let errors = {};
  const ZIPCODE_PATTERN = /^\d{5}$/;
  //const UPPERCASE_LETTER_PATTERN = /^[A-Z]/;
  const UPPERCASE_LETTER_PATTERN = /^[A-ZĄĆĘŁŃÓŚŹŻ]/;
  
  if (!values.InputZipCode1.trim()) {
    errors.InputZipCode1 = "Zip Code is required";
  } else if (!ZIPCODE_PATTERN.test(values.InputZipCode1.trim())) {
    errors.InputZipCode1 = "Invalid ZIP Code format";
  }

  if (!values.InputZipCode2.trim()) {
    errors.InputZipCode2 = "Zip Code is required";
  } else if (!ZIPCODE_PATTERN.test(values.InputZipCode2.trim())) {
    errors.InputZipCode2 = "Invalid ZIP Code format";
  }

  if (!values.InputCity1.trim()) {
    errors.InputCity1 = "City is required";
  } else if (!UPPERCASE_LETTER_PATTERN.test(values.InputCity1.charAt(0))) {
    errors.InputCity1 = "City must start with an uppercase letter";
  }

  if (!values.InputCity2.trim()) {
    errors.InputCity2 = "City is required";
  } else if (!UPPERCASE_LETTER_PATTERN.test(values.InputCity2.charAt(0))) {
    errors.InputCity2 = "City must start with an uppercase letter";
  }

  if (!values.InputStreet1.trim()) {
    errors.InputStreet1 = "Street is required";
  } else if (!UPPERCASE_LETTER_PATTERN.test(values.InputStreet1.charAt(0))) {
    errors.InputStreet1 = "Street must start with an uppercase letter";
  }

  if (!values.InputStreet2.trim()) {
    errors.InputStreet2 = "Street is required";
  } else if (!UPPERCASE_LETTER_PATTERN.test(values.InputStreet2.charAt(0))) {
    errors.InputStreet2 = "Street must start with an uppercase letter";
  }

  if (!values.InputBuildingNumber1.trim()) {
    errors.InputBuildingNumber1 = "Building Number is required";
  }

  if (!values.InputBuildingNumber2.trim()) {
    errors.InputBuildingNumber2 = "Building Number is required";
  }

  return errors;
};

export default Validation;
