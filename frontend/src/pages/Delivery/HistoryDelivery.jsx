import React, { useEffect, useState } from "react";
import NavbarDelivery from "../../components/Layouts/NavbarDelivery";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewOrderComponent from "../../components/MyOrdersComponents/NewOrderComponent";
import customNewOrders from "../../assets/css/NewOrders.module.css";
import customMyOrders from "../../assets/css/MyOrders.module.css";
import ordersHistory from "../../assets/css/OrdersHistory.module.css";
import HistoryIcon from "../../assets/images/historyIcon.png";
import Order from "../../components/MyOrdersComponents/Order";
function HistoryDelivery() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/delivery/historyd")
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
    <div className={`${customNewOrders.customContainer}`}>
      <NavbarDelivery />

      <div className="row mx-auto">
        <div className="col-md-12 text-center mt-5">
          <div className={`${customMyOrders.packageLogoBackground} mx-auto`}>
            <div className={`${ordersHistory.customTextColorHeader} display-6`}>
              History
            </div>
            <img
              src={HistoryIcon}
              className={`${ordersHistory.packageLogo}`}
            ></img>
          </div>
        </div>
      </div>
      <div className={`${customMyOrders.containerMyPackages} mx-auto w-75`}>
        <div className="row mt-4 mx-auto">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="col-auto">
                <Order order={order} type="history" />
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

export default HistoryDelivery;
