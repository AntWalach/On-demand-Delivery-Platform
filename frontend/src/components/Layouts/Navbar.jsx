import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickPackLogo from "../../assets/images/QuickPackLogo.png";
import customNavbar from "../../assets/css/NavbarUser.module.css";
import axios from "axios";

function Navbar() {
  const handleDelete = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/home")
      .then((res) => {
        if (res.data.valid) {
          setUser(res.data.Login);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleAccountSettingsClick = () => {
    navigate(`/home/account?source=home`);
  };

  return (
    <nav className={`${customNavbar.customNavbar} navbar navbar-expand-lg`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img
            src={QuickPackLogo}
            className="App-logo"
            alt="logo"
            width="115"
            height="70"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`${customNavbar.customNavbarTextColor} nav-link`}
                href="/home/myorders"
              >
                My orders
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`${customNavbar.customNavbarTextColor} nav-link dropdown-toggle`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/home/wallet">
                    Wallet
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/home/account"
                    onClick={handleAccountSettingsClick}
                  >
                    Account Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/home/history">
                    History of orders
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for orders..."
              aria-label="Search"
            />
            <button
              className={`${customNavbar.customButtonHome} btn btn-outline-success`}
              type="submit"
            >
              Search
            </button>
          </form>
          <button
            className={`${customNavbar.customButtonHome} btn btn-danger mx-2`}
            onClick={handleDelete}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
