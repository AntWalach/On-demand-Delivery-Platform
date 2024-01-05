import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar";
import NavbarDelivery from "../components/Layouts/NavbarDelivery";
import axios from "axios";
import customLogin from "../assets/css/Login.module.css";
import PhoneInput from "react-phone-number-input/input";
import customAS from "../assets/css/AccountSettings.module.css";
import { Sliders } from "react-bootstrap-icons";

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
  let end = "";
  if (userType === "Client") {
    end = "home";
  } else {
    end = "delivery";
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8081/${end}`)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Obsługa zmiany loginu
      const usernameResponse = await axios.put(
        `http://localhost:8081/${end}/updateUsername`,
        {
          username: userData.username,
        }
      );
      console.log("Username updated:", usernameResponse.data);
      setUserData({ ...userData, username: usernameResponse.data.username });

      // Obsługa zmiany imienia
      const fNameResponse = await axios.put(
        `http://localhost:8081/${end}/updateFirstName`,
        {
          fName: userData.fName,
        }
      );
      console.log("First name updated:", fNameResponse.data);
      setUserData({ ...userData, fName: fNameResponse.data.fName });

      // Obsługa zmiany nazwiska
      const lNameResponse = await axios.put(
        `http://localhost:8081/${end}/updateLastName`,
        {
          lName: userData.lName,
        }
      );
      console.log("Last name updated:", lNameResponse.data);
      setUserData({ ...userData, lName: lNameResponse.data.lName });

      // Obsługa zmiany numeru telefonu
      const phoneResponse = await axios.put(
        `http://localhost:8081/${end}/updatePhoneNumber`,
        {
          phoneNumber: userData.phoneNumber,
        }
      );
      console.log("Phone number updated:", phoneResponse.data);
      setUserData({ ...userData, phoneNumber: phoneResponse.data.phoneNumber });

      // Obsługa zmiany adresu email
      const emailResponse = await axios.put(
        `http://localhost:8081/${end}/updateEmail`,
        {
          email: userData.email,
        }
      );
      console.log("Email updated:", emailResponse.data);
      setUserData({ ...userData, email: emailResponse.data.email });

      // Obsługa zmiany hasła
      const passwordResponse = await axios.put(
        `http://localhost:8081/${end}/updatePassword`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        }
      );
      console.log("Password updated:", passwordResponse.data);
    } catch (error) {
      console.error("Błąd podczas aktualizacji danych", error);
      if (error.response) {
        console.error("Odpowiedź z serwera:", error.response.data);
      }
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
      <div className="row w-100 mt-5">
        <div className="col-auto text-center d-flex justify-content-center align-items-center">
          <h1 className={`${customAS.pageHeader} display-6`}>
            Account Settings
          </h1>
        </div>
        <div className="col-auto d-flex justify-content-center align-items-center">
          <Sliders className={`${customAS.settingsIcon}`} />
        </div>
      </div>
      <div className="row w-25 mx-auto mt-3">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <div className={`${customAS.bgdata} p-3 rounded`}>
              <h3 className={`${customAS.settingsText} px-5`}>Account data</h3>
              <div className={`${customAS.settingsText} px-5`}>Username</div>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  className="form-control"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </div>
              <div className={`${customAS.settingsText} px-5`}>First Name</div>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="fName"
                  className="form-control"
                  value={userData.fName}
                  onChange={(e) =>
                    setUserData({ ...userData, fName: e.target.value })
                  }
                />
              </div>
              <div className={`${customAS.settingsText} px-5`}>Last Name</div>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lName"
                  className="form-control"
                  value={userData.lName}
                  onChange={(e) =>
                    setUserData({ ...userData, lName: e.target.value })
                  }
                />
              </div>
              <div className={`${customAS.settingsText} px-5`}>
                Phone Number
              </div>
              <div className="input-group mb-3 w-75 mx-auto">
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
              </div>
              <div className={`${customAS.settingsText} px-5`}>Email</div>
              <div className="input-group mb-3 w-75 mx-auto">
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
              </div>
              <div className={`${customAS.settingsText} px-5`}>
                Old Password
              </div>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="password"
                  placeholder="Enter Old Password"
                  name="oldPassword"
                  className="form-control"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className={`${customAS.settingsText} px-5`}>Password</div>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <button className="btn btn-outline-secondary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;

{
  /* <div className={`container mt-4 ${customAS.containerFlex}`}>
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
      </div> */
}
