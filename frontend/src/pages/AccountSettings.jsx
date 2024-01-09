import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar";
import NavbarDelivery from "../components/Layouts/NavbarDelivery";
import axios from "axios";
import customLogin from "../assets/css/Login.module.css";
import PhoneInput, { PhoneNumber } from "react-phone-number-input/input";
import customAS from "../assets/css/AccountSettings.module.css";
import { Sliders } from "react-bootstrap-icons";
import Footer from "../components/Layouts/Footer";

function AccountSettings({ userType }) {
  axios.defaults.withCredentials = true;
  const [userData, setUserData] = useState({
    Login: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/${end}`);
        console.log("Response from server Test:", response.data);

        const { data } = response;

        if (data.valid) {
          setUserData({
            Login: data.Login,
            FirstName: data.FirstName,
            LastName: data.LastName,
            PhoneNumber: data.PhoneNumber,
            Email: data.Email,
          });
        } else {
          console.log("User not authenticated. Redirecting to login...");
          navigate("/login");
        }

        console.log(`Fetched ${end} Data:`, data);
      } catch (error) {
        console.error(`Error fetching ${end} data:`, error.message);
      }
    };

    fetchData();
  }, [end, navigate]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      let updatedUserData = { ...userData };

      // Hash old and new passwords if provided
      if (oldPassword && newPassword) {
        const response = await axios.post(
          `http://localhost:8081/${end}/verify-password`,
          {
            OldPassword: oldPassword,
          }
        );
        console.log(response);
        if (response.data.valid) {
          console.log("TEST");

          updatedUserData = {
            ...updatedUserData,
            Password: newPassword,
          };
        } else {
          console.error("Old password is incorrect");
          return;
        }
      }

      await axios.put(`http://localhost:8081/${end}/update`, updatedUserData);

      //navigate(`/login`);
    } catch (error) {
      console.error(`Error updating ${end} data:`, error.message);
    }

    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
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
          <form>
            <div className={`${customAS.bgdata} p-3 rounded`}>
              <h3 className={`${customAS.settingsText} px-5`}>Account data</h3>
              <div className={`${customAS.settingsText} px-5`}>Username</div>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="Login"
                  className="form-control"
                  value={userData.Login}
                  onChange={handleInputChange}
                />
              </div>
              <div className={`${customAS.settingsText} px-5`}>First Name</div>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="FirstName"
                  className="form-control"
                  value={userData.FirstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className={`${customAS.settingsText} px-5`}>Last Name</div>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="LastName"
                  className="form-control"
                  value={userData.LastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className={`${customAS.settingsText} px-5`}>
                Phone Number
              </div>
              <div className="input-group mb-3 w-75 mx-auto">
                <PhoneInput
                  type="text"
                  placeholder="Enter Phone Number"
                  name="PhoneNumber"
                  country="PL"
                  international={true}
                  className="form-control"
                  value={userData.PhoneNumber}
                  onChange={(value, country, e) =>
                    handleInputChange({
                      target: { name: "PhoneNumber", value },
                    })
                  }
                />
              </div>
              <div className={`${customAS.settingsText} px-5`}>Email</div>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="Email"
                  placeholder="Enter Email"
                  name="Email"
                  className="form-control"
                  value={userData.Email}
                  onChange={handleInputChange}
                />
              </div>
              <div className={`${customAS.settingsText} px-5`}>
                Old Password
              </div>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="password"
                  placeholder="Enter Old Password"
                  name="Password"
                  className="form-control"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className={`${customAS.settingsText} px-5`}>Password</div>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="Password"
                  placeholder="Enter Password"
                  name="Password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    onClick={handleSaveChanges}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AccountSettings;
