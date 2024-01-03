import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layouts/Navbar";
import axios from "axios";
import Order from "../../components/MyOrdersComponents/Order";
import customMyOrders from "../../assets/css/MyOrders.module.css";

function HistoryClient() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/history")
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
          <h1
            className={`${customMyOrders.customTextColorHeader} display-6 mx-auto`}
          >
            History
          </h1>
        </div>
      </div>
      <div className="row mt-4 justify-content-center mx-auto">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="col-sm-6 col-lg-3">
              <Order order={order} userType="Client" type="rating" />
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
  );
}

export default HistoryClient;
