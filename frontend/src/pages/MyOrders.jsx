import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../assets/css/customMyOrders.css";
import Order from "../components/Order";
import { useNavigate } from "react-router-dom";

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
          <h1 className="display-6 custom-text-color-header">Orders</h1>
        </div>
      </div>
      <div className="row mt-4 justify-content-center w-100 mx-auto">
        {orders.length > 0 ? (
          orders.map((order) => (
            <React.Fragment key={order.id}>
              <Order order={order} />
            </React.Fragment>
          ))
        ) : (
          <p>You don't have any orders.</p>
        )}
      </div>
    </div>
  );
}

export default MyOrders;