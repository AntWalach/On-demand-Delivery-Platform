import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layouts/Navbar";
import axios from "axios";
import Order from "../../components/MyOrdersComponents/Order";
import customMyOrders from "../../assets/css/MyOrders.module.css";
import PackLogo from "../../assets/images/packageIcon.png";

function MyOrders() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/myorders")
      .then((res) => {
        console.log("API:", res.data);

        if (res.data && Array.isArray(res.data)) {
          setAuth(true);
          setOrders(res.data);
        } else {
          setAuth(false);
          navigate("/login");
          setMessage("Error");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="row mx-auto">
        <div className="col-md-12 text-center mt-5">
          <div className={`${customMyOrders.packageLogoBackground} mx-auto`}>
            <div
              className={`${customMyOrders.customTextColorHeader} display-6`}
            >
              Orders
            </div>
            <img
              src={PackLogo}
              className={`${customMyOrders.packageLogo}`}
            >
            </img>
          </div>
        </div>
      </div>
      <div className={`${customMyOrders.containerMyPackages} mx-auto w-75`}>
        <div className="row mt-4 justify-content-center mx-auto">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="col-sm-6 col-lg-3">
                <Order order={order} userType="Client" />
              </div>
            ))
          ) : (
            <div className="col-md-12 text-center mt-5">
              <h1
                className={`${customMyOrders.customTextColorHeadings} display-6`}
              >
                You don't have any orders.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
