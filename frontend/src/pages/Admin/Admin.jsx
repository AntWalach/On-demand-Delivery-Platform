import React from "react";
import NavbarAdmin from "../../components/Layouts/NavbarAdmin";
import "../../assets/css/Admin.module.css";
import customAdmin from "../../assets/css/Admin.module.css";

function Admin() {
  return (
    <div>
      <NavbarAdmin />

      <div className={`${customAdmin.customContainer}`}>

      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h1 className={`${customAdmin.customTextColorHeader} display-6`}>
            Admin
          </h1>
        </div>
      </div>

      <div className="row mt-5">
        <div className="text-center mt-5">
          <button
            className={`${customAdmin.customButtonWallet} btn btn-lg`}
            style={{
              width: '350px',
              height: '80px',
            }}
          >
            <strong>Clients</strong>
          </button>
        </div>

        <div className="text-center mt-5">
          <button
            className={`${customAdmin.customButtonWallet} btn btn-lg`}
            style={{
              width: '350px',
              height: '80px',
            }}
          >
            <strong>Delivery</strong>
          </button>
        </div>

        <div className="text-center mt-5">
          <button
            className={`${customAdmin.customButtonWallet} btn btn-lg`}
            style={{
              width: '350px',
              height: '80px',
            }}
          >
            <strong>Orders</strong>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Admin;
