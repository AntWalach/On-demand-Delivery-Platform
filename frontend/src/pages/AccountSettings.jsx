import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar";
import NavbarDelivery from "../components/Layouts/NavbarDelivery";
import axios from "axios";
import customLogin from "../assets/css/Login.module.css";


function AccountSettings({ userType }) {
  axios.defaults.withCredentials = true;
  const [userData, setUserData] = useState({
    username: "",
    fName: "",
    lName: "",
    phoneNumber: "",
    email: "",
  });
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        if (res.data.valid) {
          console.log("Setting user data:", res.data);

          setUserData({
            username: res.data.username,
            id: res.data.id,
            fName: res.data.fName,
            lName: res.data.lName,
            phoneNumber: res.data.phoneNumber,
            email: res.data.email,
          });
        } else {
          console.log("Error");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);
  console.log(userType);
  console.log(source);

  return (
    <div
      className={`${customLogin.loginContainer} ${
        userType === "delivery" ? customLogin.delivery : ""
      }`}
    >
      {userType === "home" ? (
        <Navbar userType={userType} />
      ) : (
        <NavbarDelivery userType={userType} />
      )}
      <div className="container mt-4">
        <h1>Account Settings</h1>

        <div className="bg-white p-3 rounded">
          <h2>Current Data</h2>

          <div className="mb-3">
            <label className="form-label" htmlFor="username">
              Username:
            </label>
            <div className="form-text">{userData.username}</div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="fName">
              First Name:
            </label>
            <div className="form-text">{userData.fName}</div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="lName">
              Last Name:
            </label>
            <div className="form-text">{userData.lName}</div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <div className="form-text">{userData.phoneNumber}</div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <div className="form-text">{userData.email}</div>
          </div>
        </div>

        <div>
          <h2>Edit Profile</h2>
        </div>

      </div>
    </div>
  );
}

export default AccountSettings;
