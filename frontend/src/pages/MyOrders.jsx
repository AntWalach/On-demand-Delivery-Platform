import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
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
      <h1>My Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order ID: {order.ID},
              Sender Address: {order.SenderAddress},
              Recipient Address: {order.RecipientAddress} 
              
            </li>
          ))}
        </ul>
      ) : (
        <p>You don't have any orders.</p>
      )}
    </div>
  );
}

export default MyOrders;
