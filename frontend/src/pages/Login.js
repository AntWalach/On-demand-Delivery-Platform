import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../LoginValidation";
import axios from "axios"
import '../assets/css/customLogin.css';


function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(errors.email === "" && errors.password === "") {
        axios.post("http://localhost:8081/login", values)
        .then(res => {
            if(res.data === "Success"){
                navigate("/home")
            } else {
                alert("No record existed.")
            }
        })
        .catch(err => console.log(err))
    }
  };

  return (
    <div>
       <div className="px-3 pt-2">
          <Link to="/">
            <div class="arrow arrow-left"></div>
          </Link>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-3 rounded w-25 custom-card-login-signup">
          <h2>Log In</h2>
          <form action="" onSubmit={handleSubmit}>
            
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
              <label htmlFor="password"><strong>Password</strong></label>
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

            <button type="submit" className="btn btn-success w-100 custom-button-log-in mb-3">
              <strong>Log in</strong>
            </button>
            <Link
              to="/signup"
              className="btn btn-outline-secondary border w-100 custom-button-create-account"
            >
              Create Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
