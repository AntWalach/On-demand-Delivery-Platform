import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layouts/NavbarDelivery";
import axios from "axios";
import NewOrderComponent from "../components/MyOrdersComponents/NewOrderComponent";
import customNewOrders from "../assets/css/NewOrders.module.css";

function NewOrders() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/delivery/neworders")
      .then((res) => {
        console.log("API:", res.data);

        if (res.data && Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleClick = async (orderId) => {
    console.log(orderId);

    try {
      const response = await axios.put(
        `http://localhost:8081/delivery/neworders/${orderId}`
      );
      if (response.status === 200) {
        console.log("Order updated successfully");
      } else {
        console.error("Error updating order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
    window.location.reload();
  };

  return (
    <div>
      <Navbar />
      <div className={`${customNewOrders.customContainer}`}>
        <div className="row">
          <div className="col-md-12 text-center mt-5">
            <h1
              className={`${customNewOrders.customTextColorHeadings} display-6 `}
            >
              Orders
            </h1>
          </div>
        </div>
        <div className="row mt-4 justify-content-center w-50 mx-auto">
          {orders.length > 0 ? (
            orders.map((order) => (
              <React.Fragment key={order.id}>
                <NewOrderComponent order={order} handleClick={handleClick} />
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

export default NewOrders;
