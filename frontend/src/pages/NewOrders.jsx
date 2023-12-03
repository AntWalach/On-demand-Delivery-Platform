import React, { useEffect, useState } from "react";
import Navbar from "../components/Layouts/NavbarDelivery";
import axios from "axios";
import "../assets/css/newOrders.css";
import Order from "../components/MyOrdersComponents/NewOrder";
import { useNavigate } from "react-router-dom";

function NewOrders() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/delivery/neworders")
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
      <div className="custom-container">
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h1 className="display-6 custom-text-color-headings">Orders</h1>
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
            <h1 className="display-6 custom-text-color-headings">
              You don't have any orders.
            </h1>
          </div>
        )}
      </div>
      </div>
      </div>
  );
}

export default NewOrders;