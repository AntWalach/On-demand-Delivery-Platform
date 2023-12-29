import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickPackLogo from "../../assets/images/QuickPackLogo.png";
import customNavbarDelivery from "../../assets/css/NavbarDelivery.module.css";

import axios from "axios";

function NavbarAdmin() {
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
                href="#"
              >
                My orders
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`${customNavbarDelivery.customNavbarTextColor} nav-link`}
                href="#"
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
              ></a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Wallet
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Orders
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
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
