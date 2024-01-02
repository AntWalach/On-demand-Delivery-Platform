import React, { useEffect, useState } from "react";
import NavbarDelivery from "../../components/Layouts/NavbarDelivery";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewOrderComponent from "../../components/MyOrdersComponents/NewOrderComponent";
import customNewOrders from "../../assets/css/NewOrders.module.css";

function HistoryDelivery() {
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
      <NavbarDelivery />

      <div className={`${customNewOrders.customContainer}`}>
        <div className="row mx-auto">
          <div className="col-md-12 text-center mt-5">
            <h1
              className={`${customNewOrders.customTextColorHeadings} display-6 `}
            >
              History
            </h1>
          </div>
        </div>
        <div className="row mt-4 justify-content-center w-50 mx-auto">
          {orders.length > 0 ? (
            orders.map((order) => (
              <React.Fragment key={order.id}>
                <NewOrderComponent order={order} type={"history"} />
              </React.Fragment>
            ))
          ) : (
            <div className="col-md-12 text-center mt-5">
              <h1
                className={`${customNewOrders.customTextColorHeadings} display-6 `}
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
