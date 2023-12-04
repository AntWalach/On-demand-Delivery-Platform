import React, { useEffect, useState } from "react";
import Navbar from "../components/Layouts/Navbar";
import axios from "axios";
import Order from "../components/MyOrdersComponents/Order";
import { useNavigate } from "react-router-dom";
import customMyOrders from "../assets/css/customMyOrders.module.css";

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
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h1 className={`${customMyOrders.customTextColorHeader} display-6`}>Orders</h1>
        </div>
      </div>
      <div className="row mt-4 justify-content-center w-50 mx-auto">
        {orders.length > 0 ? (
          orders.map((order) => (
            <React.Fragment key={order.id}>
              <Order order={order} />
            </React.Fragment>
          ))
        ) : (
          <div className="col-md-12 text-center mt-5">
            <h1 className={`${customMyOrders.customTextColorHeader} display-6`}>
              You don't have any orders.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
