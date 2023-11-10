import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import PhoneInput from "react-phone-number-input/input";
import axios from "axios";
import Form from "react-bootstrap/Form";

function Signup() {
  
  const [values, setValues] = useState({
    username: "",
    fName: "",
    lName: "",
    phoneNumber: "",
    email: "",
    password: "",
    userType: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (
      errors.name === "" &&
      errors.phoneNumber === "" &&
      errors.email === "" &&
      errors.password === ""
    ) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-Up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="fName">
              <strong>First Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="fName"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="lName">
              <strong>Last Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lName"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber">
              <strong>Phone Number</strong>
            </label>
            <PhoneInput
              //https://gitlab.com/catamphetamine/react-phone-number-input
              type="text"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              //withCountryCallingCode="true"
              country="PL"
              international={true}
              onChange={(phoneNumber) => {
                handleInput({
                  target: { name: "phoneNumber", value: phoneNumber },
                });
              }}
              //onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.phoneNumber && (
              <span className="text-danger">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-center align-items-center">
              <div className="mx-5">
                <Form.Check
                  type="radio"
                  name="userType"
                  id="custom-radio-1"
                  label="User"
                  value="user"
                  onChange={() => {
                    handleInput({
                      target: { name: "userType", value: "user" },
                    });
                  }}
                />
              </div>

              <div className="mx-5">
                <Form.Check
                  type="radio"
                  name="userType"
                  id="custom-radio-2"
                  label="Delivery"
                  value="delivery"
                  onChange={() => {
                    handleInput({
                      target: { name: "userType", value: "delivery" },
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            <strong>Sign up</strong>
          </button>
          <p>You agree to our terms and policies</p>
          <Link
            to="/login"
            className="btn btn-default border w-100 bg-light rounded-0 textdecoration-none"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
