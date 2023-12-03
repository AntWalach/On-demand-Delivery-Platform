import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickPackLogo from "../../assets/images/QuickPackLogo.png";
import "../../assets/css/customNavbarDelivery.css";
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
      .get("http://localhost:8081")
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data.valid) {
          setUser(res.data.name);
        } else {
          console.log('Error')
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
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
                className="nav-link custom-navbar-text-color"
                href="/delivery"
              >
                My deliveries
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link custom-navbar-text-color"
                href="/delivery/neworders"
              >
                New orders
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle  custom-navbar-text-color"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Wallet
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Account Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
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
              className="btn btn-outline-success custom-button-home"
              type="submit"
            >
              Search
            </button>
          </form>
          <button
            className="btn btn-danger custom-button-home mx-2"
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
