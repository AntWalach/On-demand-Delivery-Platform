import React, { useEffect, useState } from "react";
import NavbarDelivery from "../../components/Layouts/NavbarDelivery";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import customDelivery from "../../assets/css/Delivery.module.css";
function HistoryDelivery() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/delivery")
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
  <NavbarDelivery/>
  <div className={`${customDelivery.customContainer}`}>HistoryDelivery</div>
  </div>);
}

export default HistoryDelivery;
