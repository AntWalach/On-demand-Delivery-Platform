import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickPackLogo from "../../assets/images/QuickPackLogoV3.png";
import customNavbarDelivery from "../../assets/css/NavbarDelivery.module.css";
import axios from "axios";

function NavbarDelivery() {
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
      .get("http://localhost:8081/delivery")
      .then((res) => {
        console.log("NavbarD API Response:", res.data);
        console.log(res.data.valid)
        if (res.data.valid) {
          setUser(res.data.Login);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleAccountSettingsClick = () => {
    navigate(`/delivery/account?source=delivery`);
  };
  return (
    <nav
      className={`${customNavbarDelivery.customNavbar} navbar navbar-expand-lg`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/delivery">
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
                className={`${customNavbarDelivery.customNavbarTextColor} nav-link`}
                href="/delivery"
              >
                My orders
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`${customNavbarDelivery.customNavbarTextColor} nav-link`}
                href="/delivery/neworders"
              >
                New orders
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`${customNavbarDelivery.customNavbarTextColor} nav-link dropdown-toggle`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/delivery/wallet">
                    Wallet
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/delivery/account"
                    onClick={handleAccountSettingsClick}
                  >
                    Account Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/delivery/history">
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
              className={`${customNavbarDelivery.customButtonHome} btn btn-outline-success`}
              type="submit"
            >
              Search
            </button>
          </form>
          <button
            className={`${customNavbarDelivery.customButtonHome} btn btn-danger mx-2`}
            onClick={handleDelete}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarDelivery;
