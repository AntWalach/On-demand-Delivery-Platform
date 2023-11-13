import React from 'react'
import QuickPackLogo from '../assets/images/QuickPackLogo.png'
import '../assets/css/customNavbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={QuickPackLogo} className="App-logo" alt="logo" width="115" height="70"/>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link custom-navbar-text-color" href="#">My orders</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle  custom-navbar-text-color" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                My profile
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Wallet</a></li>
                <li><a className="dropdown-item" href="#">Account Settings</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">History of orders</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search for orders..." aria-label="Search"/>
            <button className="btn btn-outline-success custom-button-home" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar