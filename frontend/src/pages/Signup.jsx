import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../utils/signupValidation";
import PhoneInput from "react-phone-number-input/input";
import axios from "axios";
import Form from "react-bootstrap/Form";
import customLogin from "../assets/css/Login.module.css";

function Signup() {
  const [values, setValues] = useState({
    Login: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    Password: "",
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
      errors.Login === "" &&
      errors.FirstName === "" &&
      errors.LastName === "" &&
      errors.PhoneNumber === "" &&
      errors.Email === "" &&
      errors.Password === ""
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
    <div>
      <div className="px-3 pt-2">
        <Link to="/">
          <div className={`${customLogin.arrow} ${customLogin.arrowLeft}`}></div>
        </Link>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className={`${customLogin.customCardLoginSignup} p-3 rounded w-25`}>
          <h2>Sign Up</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Login">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                name="Login"
                onChange={handleInput}
                className="form-control"
              />
              {errors.Login && (
                <span className="text-danger">{errors.Login}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="FirstName">
                <strong>First Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter First Name"
                name="FirstName"
                onChange={handleInput}
                className="form-control"
              />
              {errors.FirstName && (
                <span className="text-danger">{errors.FirstName}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="LastName">
                <strong>Last Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Last Name"
                name="LastName"
                onChange={handleInput}
                className="form-control"
              />
              {errors.LastName && (
                <span className="text-danger">{errors.LastName}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="PhoneNumber">
                <strong>Phone Number</strong>
              </label>
              <PhoneInput
                //https://gitlab.com/catamphetamine/react-phone-number-input
                type="text"
                placeholder="Enter Phone Number"
                name="PhoneNumber"
                //withCountryCallingCode="true"
                country="PL"
                international={true}
                onChange={(PhoneNumber) => {
                  handleInput({
                    target: { name: "PhoneNumber", value: PhoneNumber },
                  });
                }}
                //onChange={handleInput}
                className="form-control"
              />
              {errors.PhoneNumber && (
                <span className="text-danger">{errors.PhoneNumber}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Email">
                <strong>Email</strong>
              </label>
              <input
                type="Email"
                placeholder="Enter Email"
                name="Email"
                onChange={handleInput}
                className="form-control"
              />
              {errors.Email && (
                <span className="text-danger">{errors.Email}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Password">
                <strong>Password</strong>
              </label>
              <input
                type="Password"
                placeholder="Enter Password"
                name="Password"
                onChange={handleInput}
                className="form-control"
              />
              {errors.Password && (
                <span className="text-danger">{errors.Password}</span>
              )}
            </div>

            <div className="row px-2">
              <div className="col-md-6 d-flex justify-content-start">
                <Form.Check
                  type="radio"
                  name="userType"
                  id="custom-radio-1"
                  label="Client"
                  value="Client"
                  onChange={() => {
                    handleInput({
                      target: { name: "userType", value: "Client" },
                    });
                  }}
                />
              </div>

              <div className="col-md-6 d-flex justify-content-end mb-3">
                <Form.Check
                  type="radio"
                  name="userType"
                  id="custom-radio-2"
                  label="Delivery"
                  value="Delivery"
                  onChange={() => {
                    handleInput({
                      target: { name: "userType", value: "Delivery" },
                    });
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`${customLogin.customButtonLogIn} btn btn-success w-100 mb-3`}
            >
              <strong>Sign up</strong>
            </button>
            <Link
              to="/login"
              className="btn btn-outline-secondary border w-100"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
