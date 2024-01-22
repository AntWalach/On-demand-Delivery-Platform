const Validation = (values) => {
  let errors = {};
  const ZIPCODE_PATTERN = /^\d{5}$/;
  const BUILDING_NUMBER_PATTERN = /^\d+[A-Z]?$/;
  const PATTERN = /^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż ]+$/;

  if (!values.InputZipCode1.trim()) {
    errors.InputZipCode1 = "Zip Code is required";
  } else if (!ZIPCODE_PATTERN.test(values.InputZipCode1.trim())) {
    errors.InputZipCode1 = "Invalid ZIP Code format: example [12345]";
  }

  if (!values.InputZipCode2.trim()) {
    errors.InputZipCode2 = "Zip Code is required";
  } else if (!ZIPCODE_PATTERN.test(values.InputZipCode2.trim())) {
    errors.InputZipCode2 = "Invalid ZIP Code format: example [12345]";
  }

  if (!values.InputCity1.trim()) {
    errors.InputCity1 = "City is required";
  } else if (!PATTERN.test(values.InputCity1.trim())) {
    errors.InputCity1 = "Invalid City format";
  }

  if (!values.InputCity2.trim()) {
    errors.InputCity2 = "City is required";
  } else if (!PATTERN.test(values.InputCity2.trim())) {
    errors.InputCity2 = "Invalid City format";
  }

  if (!values.InputStreet1.trim()) {
    errors.InputStreet1 = "Street is required";
  } else if (!PATTERN.test(values.InputStreet1.trim())) {
    errors.InputStreet1 = "Invalid Street format";
  }

  if (!values.InputStreet2.trim()) {
    errors.InputStreet2 = "Street is required";
  } else if (!PATTERN.test(values.InputStreet2.trim())) {
    errors.InputStreet2 = "Invalid Street format";
  }

  if (!values.InputBuildingNumber1.trim()) {
    errors.InputBuildingNumber1 = "Building Number is required";
  } else if (!BUILDING_NUMBER_PATTERN.test(values.InputBuildingNumber1.trim())) {
    errors.InputBuildingNumber1 = "Invalid Building Number format";
  }

  if (!values.InputBuildingNumber2.trim()) {
    errors.InputBuildingNumber2 = "Building Number is required";
  } else if (!BUILDING_NUMBER_PATTERN.test(values.InputBuildingNumber2.trim())) {
    errors.InputBuildingNumber2 = "Invalid Building Number format";
  }

  return errors;
};

export default Validation;
