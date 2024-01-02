import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar";
import NavbarDelivery from "../components/Layouts/NavbarDelivery";
import axios from "axios";
import customLogin from "../assets/css/Login.module.css";
import PhoneInput from "react-phone-number-input/input";
import customAS from "../assets/css/AccountSettings.module.css";

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
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const handlePhoneChange = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8081/updatePhoneNumber",
        {
          phoneNumber: userData.phoneNumber,
        }
      );

      console.log("Phone number updated:", response.data);

      setUserData({ ...userData, phoneNumber: response.data.phoneNumber });
    } catch (error) {
      console.error("Błąd podczas aktualizacji numeru telefonu", error);
    }
  };

  const handleEmailChange = async () => {
    try {
      const response = await axios.put("http://localhost:8081/updateEmail", {
        email: userData.email,
      });

      console.log("Email updated:", response.data);
      setUserData({ ...userData, email: response.data.email });
    } catch (error) {
      console.error("Błąd podczas aktualizacji adresu email", error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.put("http://localhost:8081/updatePassword", {
        oldPassword: oldPassword,
        newPassword: newPassword,
      });

      console.log("Password updated:", response.data);
    } catch (error) {
      console.error("Error updating password", error);
    }
  };
  return (
    <div
      className={`${customLogin.loginContainer} ${
        userType === "Delivery" ? customLogin.delivery : ""
      } `}
    >
      {userType === "Client" ? (
        <Navbar userType={userType} />
      ) : (
        <NavbarDelivery userType={userType} />
      )}
      <div className="col-md-12 text-center mt-5">
        <h1 className="display-6">Account Settings</h1>
      </div>
      
      <div className={`container mt-4 ${customAS.containerFlex}`}>
        <div className="container mt-4">
          <div className={`${customAS.bgdata} p-3 rounded`}>
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
        </div>

        <div className="container mt-4">
          <div className={`${customAS.bgdata} p-3 rounded`}>
            <h2>Edit Profile</h2>
            <strong>Phone Number</strong>
            <div className="input-group mb-3">
              <PhoneInput
                type="text"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                country="PL"
                international={true}
                className="form-control"
                value={userData.phoneNumber}
                onChange={(value) =>
                  setUserData({ ...userData, phoneNumber: value })
                }
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handlePhoneChange}
                >
                  Change
                </button>
              </div>
            </div>
            <strong>Email</strong>
            <div className="input-group mb-3">
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                className="form-control"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleEmailChange}
                >
                  Change
                </button>
              </div>
            </div>
            <strong>Old Password</strong>
            <div className="input-group mb-3">
              <input
                type="password"
                placeholder="Enter Old Password"
                name="oldPassword"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <strong>Password</strong>
            <div className="input-group mb-3">
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handlePasswordChange}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
