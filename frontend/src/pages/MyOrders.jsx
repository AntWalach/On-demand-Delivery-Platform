import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = new Date(dateString).toLocaleString("pl-PL", options);
  return formattedDate;
}

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
        <div>
          {orders.map((order) => (
            <div className="container mt-5">
              <div className="mx-auto bg-white rounded" key={order.id}>
                <div className="mb-3 text-center">
                  <strong>Sender Address:</strong> {order.SenderAddress}
                </div>
                <div className="mb-3 text-center">
                  <strong>Recipient Address:</strong> {order.RecipientAddress}
                </div>
                <div className="mb-3 text-center">
                  <strong>Order Date:</strong> {formatDate(order.Date)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You don't have any orders.</p>
      )}
    </div>
  );
}

export default MyOrders;
