import React from "react";
import logo from "./logo.png";
import Lefttab from "./Lefttab";
import "../css/Navbar.css";

export default function Navbar({ handleLogout }) {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={logo}
              alt="Logo"
              width="35"
              height="35"
              className="d-inline-block align-text-top mx-3"
            />
            DevHubb
          </a>
          <div className="d-flex">
            <button className="btn1" onClick={handleLogout}>
              <i className="bi bi-box-arrow-left fs-3"></i>
            </button>
            <button
              className="btn"
              id="userbutton"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              <i className="bi bi-person-circle fs-3 user"></i>
            </button>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title text-center"
            id="offcanvasWithBothOptionsLabel"
          >
            User Details:
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <hr />
          <Lefttab />
        </div>
      </div>
    </div>
  );
}
