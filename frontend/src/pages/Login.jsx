import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../utils/loginValidation";
import axios from "axios";
import "../assets/css/customLogin.css";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    userType: "user",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:8081') //czy tu nie bylo cos waznego?
    .then( res => {
      if(res.data.valid) {
          navigate('/home')
      }
      else {
          navigate('/login')
      }
    })
    .catch(err => console.log(err))
  }, [navigate])

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data.userType === "client") {
            navigate("/home");
          } else if (res.data.userType === "delivery") {
            navigate("/delivery");
          } else {
            //console.log(res.data)
            alert("No record existed.");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className={`login-container ${
        values.userType === "delivery" ? "delivery" : ""
      }`}
    >
      <div className="px-3 pt-2">
        <Link to="/">
          <div className="arrow arrow-left"></div>
        </Link>
      </div>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-3 rounded w-25 custom-card-login-signup">
          <div className="d-flex justify-content-between align-items-center vh-20">
            <h2 className="mb-3">Log In</h2>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check custom-button-radio"
                name="userType"
                id="btnradio1"
                defaultChecked
                onChange={() => {
                  handleInput({
                    target: { name: "userType", value: "user" },
                  });
                }}
              />
              <label className="btn custom-radio-outline" htmlFor="btnradio1">
                Client
              </label>

              <input
                type="radio"
                className="btn-check custom-button-radio"
                name="userType"
                id="btnradio2"
                autoComplete="off"
                onChange={() => {
                  handleInput({
                    target: { name: "userType", value: "delivery" },
                  });
                }}
              />
              <label className="btn custom-radio-outline" htmlFor="btnradio2">
                Delivery
              </label>
            </div>
          </div>
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

            <button
              type="submit"
              className="btn btn-success w-100 custom-button-log-in mb-3"
            >
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
