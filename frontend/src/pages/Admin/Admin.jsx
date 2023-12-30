import React from "react";
import NavbarAdmin from "../../components/Layouts/NavbarAdmin";
import "../../assets/css/Admin.module.css";
import customAdmin from "../../assets/css/Admin.module.css";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div>
      <NavbarAdmin />

      <div className={`${customAdmin.customContainer}`}>
        <div className="row mx-auto">
          <div className="col-md-12 text-center mt-5">
            <h1 className={`${customAdmin.customTextColorHeader} display-6`}>
              Admin
            </h1>
          </div>
        </div>

        <div className="row mt-5 mx-auto">
          <div className="text-center mt-5">
          <Link to="/admin/client">
            <button
              className={`${customAdmin.customButton} btn btn-lg`}
              style={{
                width: "350px",
                height: "80px",
              }}
            >
              <strong>Clients</strong>
            </button>
            </Link>
          </div>

          <div className="text-center mt-5">
          <Link to="/admin/delivery">
            <button
              className={`${customAdmin.customButton} btn btn-lg`}
              style={{
                width: "350px",
                height: "80px",
              }}
            >
              <strong>Delivery</strong>
            </button>
            </Link>
          </div>

          <div className="text-center mt-5">
          <Link to="/admin/orders">
            <button
              className={`${customAdmin.customButton} btn btn-lg`}
              style={{
                width: "350px",
                height: "80px",
              }}
            >
              <strong>Orders</strong>
            </button>
            </Link>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default Admin;
