import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../utils/loginValidation";
import axios from "axios";
import customLogin from "../assets/css/Login.module.css";

function Login() {
  const [values, setValues] = useState({
    Email: "",
    Password: "",
    userType: "Client",
  });

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  let end = ""

  if(values.userType === "Client") {
      end = "home"
  } else {
      end = "delivery"
  }


  useEffect(() => {
    axios
      .get(`http://localhost:8081/${end}`)
      .then((res) => {
        if (res.data.valid) {
          navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    console.log("UserType:", values.userType);
  }, [values.userType]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.Email === "" && errors.Password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data.userType === "Client") {
            navigate("/home");
          } else if (res.data.userType === "Delivery") {
            navigate("/delivery");
          } else {
            alert("No record existed.");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className={`${customLogin.loginContainer} ${
        values.userType === "Delivery" ? customLogin.delivery : ""
      }`}
    >
      <div className="px-3 pt-2">
        <Link to="/">
          <div
            className={`${customLogin.arrow} ${customLogin.arrowLeft}`}
          ></div>
        </Link>
      </div>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className={`${customLogin.customCardLoginSignup}  p-3 rounded w-25`}
        >
          <div className="d-flex justify-content-between align-items-center vh-20">
            <h2 className="mb-3">Log In</h2>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className={`${customLogin.customButtonRadio} btn-check`}
                name="userType"
                id="btnradio1"
                defaultChecked
                onChange={() => {
                  handleInput({
                    target: { name: "userType", value: "Client" },
                  });
                }}
              />
              <label
                className={`${customLogin.customRadioOutline} btn`}
                htmlFor="btnradio1"
              >
                Client
              </label>

              <input
                type="radio"
                className={`${customLogin.customButtonRadio} btn-check`}
                name="userType"
                id="btnradio2"
                autoComplete="off"
                onChange={() => {
                  handleInput({
                    target: { name: "userType", value: "Delivery" },
                  });
                }}
              />
              <label
                className={`${customLogin.customRadioOutline} btn`}
                htmlFor="btnradio2"
              >
                Delivery
              </label>
            </div>
          </div>
          <form action="" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className={`${customLogin.customButtonLogIn} btn btn-success w-100 mb-3`}
            >
              <strong>Log in</strong>
            </button>
            <Link
              to="/signup"
              className={`${customLogin.customButtonCreateAccount} btn btn-outline-secondary border w-100`}
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
