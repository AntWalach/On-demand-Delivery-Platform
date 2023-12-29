import React, { useEffect, useState } from "react";
import NavbarDelivery from "../../components/Layouts/NavbarDelivery";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import customDelivery from "../../assets/css/Delivery.module.css";

function DeliveryWallet() {
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
      <NavbarDelivery />
      <div className={`${customDelivery.customContainer}`}>
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h1 className={`${customDelivery.customTextColorHeadings} display-6`}>Wallet</h1>
          
        </div>
      </div>



      </div>
    </div>
  );
}

export default DeliveryWallet;
