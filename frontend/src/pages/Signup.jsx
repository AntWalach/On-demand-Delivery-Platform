import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../utils/signupValidation";
import PhoneInput from "react-phone-number-input/input";
import axios from "axios";
import Form from "react-bootstrap/Form";
import customLogin from "../assets/css/customLogin.module.css";

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
      errors.username === "" &&
      errors.fName === "" &&
      errors.lName === "" &&
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
    <div>
      <div className="px-3 pt-2">
        <Link to="/">
          <div className={`${customLogin.arrow} ${customLogin.arrowLeft}`}></div>
        </Link>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className={`${customLogin.customCardLoginSignup} bg-white p-3 rounded w-25`}>
          <h2>Sign Up</h2>
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
                className="form-control"
              />
              {errors.username && (
                <span className="text-danger">{errors.username}</span>
              )}
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
                className="form-control"
              />
              {errors.fName && (
                <span className="text-danger">{errors.fName}</span>
              )}
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
                className="form-control"
              />
              {errors.lName && (
                <span className="text-danger">{errors.lName}</span>
              )}
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
              />
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>

            <div className="row px-2">
              <div className="col-md-6 d-flex justify-content-start">
                <Form.Check
                  type="radio"
                  name="userType"
                  id="custom-radio-1"
                  label="Client"
                  value="user"
                  onChange={() => {
                    handleInput({
                      target: { name: "userType", value: "user" },
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
                  value="delivery"
                  onChange={() => {
                    handleInput({
                      target: { name: "userType", value: "delivery" },
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
