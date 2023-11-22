function Validation(values) {
  let error = {};
  // const ZIPCODE_PATTERN = /^[0-9]{2}-[0-9]{3}$/

  if (values.InputZipCode1 === "") {
    error.InputZipCode1 = "Name should not be empty.";
  } else {
    error.InputZipCode1 = "";
  }

  if (values.InputCity1 === "") {
    error.InputCity1 = "Name should not be empty.";
  } else {
    error.InputCity1 = "";
  }

  if (values.InputStreet1 === "") {
    error.InputStreet1 = "Name should not be empty.";
  } else {
    error.InputStreet1 = "";
  }

  if (values.InputBuildingNumber1 === "") {
    error.InputBuildingNumber1 = "Name should not be empty.";
  } else {
    error.InputBuildingNumber1 = "";
  }

  if (values.InputApartmentNumber1 === "") {
    error.InputApartmentNumber1 = "Name should not be empty.";
  } else {
    error.InputApartmentNumber1 = "";
  }

  if (values.InputZipCode2 === "") {
    error.InputZipCode2 = "Name should not be empty.";
  } else {
    error.InputZipCode2 = "";
  }

  if (values.InputCity2 === "") {
    error.InputCity2 = "Name should not be empty.";
  } else {
    error.InputCity2 = "";
  }

  if (values.InputStreet2 === "") {
    error.InputStreet2 = "Name should not be empty.";
  } else {
    error.InputStreet2 = "";
  }

  if (values.InputBuildingNumber2 === "") {
    error.InputBuildingNumber2 = "Name should not be empty.";
  } else {
    error.InputBuildingNumber2 = "";
  }

  if (values.InputApartmentNumber2 === "") {
    error.InputApartmentNumber2 = "Name should not be empty.";
  } else {
    error.InputApartmentNumber2 = "";
  }

}
export default Validation;
