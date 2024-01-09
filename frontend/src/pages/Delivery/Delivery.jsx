import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import customDelivery from "../../assets/css/Delivery.module.css";
import Order from "../../components/MyOrdersComponents/Order";
import NavbarDelivery from "../../components/Layouts/NavbarDelivery";
import customMyOrdersDelivery from "../../assets/css/MyOrders.module.css";
import ScooterIcon from "../../assets/images/scooterIcon.png";

function Delivery() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState(null);
  const [senderAddressFilter, setSenderAddressFilter] = useState("");
  const [recipientAddressFilter, setRecipientAddressFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/delivery")
      .then((res) => {
        console.log("API:", res.data);

        if (res.data.valid) {
          setAuth(true);
          //setOrders(res.data);
          setUser(res.data.name);
        } else {
          setAuth(false);
          navigate("/login");
          setMessage("Error");
        }
      })
      .catch((err) => console.log(err));

    axios.get("http://localhost:8081/delivery/orders").then((res) => {
      setOrders(res.data);
    });
  }, [navigate]);

  const filteredOrders = orders
    .filter(
      (order) =>
        orderStatusFilter === null || order.OrderStatusID === orderStatusFilter
    )
    .filter(
      (order) =>
        senderAddressFilter === "" ||
        order.SenderAddress.includes(senderAddressFilter)
    )
    .filter(
      (order) =>
        recipientAddressFilter === "" ||
        order.RecipientAddress.includes(recipientAddressFilter)
    );

  return (
    <div className={`${customDelivery.customContainer}`}>
      <NavbarDelivery />
      <div>
        <div className="row mx-auto">
          <div className="col-md-12 text-center mt-5">
            <div
              className={`${customMyOrdersDelivery.packageLogoBackground} mx-auto`}
            >
              <div
                className={`${customDelivery.customTextColorHeader} display-6`}
              >
                Orders
              </div>
              <img
                src={ScooterIcon}
                className={`${customMyOrdersDelivery.packageLogo}`}
              ></img>
            </div>
          </div>
        </div>

        <div
          className={`${customMyOrdersDelivery.containerMyPackages} mx-auto w-75`}
        >
          <div className="row mt-4 justify-content-md-between mx-auto p-0">
            <div className="row mb-3">
              <div className="col-md-4">
                <select
                  className="form-select"
                  value={orderStatusFilter === null ? "" : orderStatusFilter}
                  onChange={(e) =>
                    setOrderStatusFilter(
                      e.target.value === "" ? null : parseInt(e.target.value)
                    )
                  }
                >
                  <option value="">All Statuses</option>
                  <option value="2">Accepted</option>
                  <option value="3">On way</option>
                  <option value="4">To destination</option>
                </select>
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sender Address"
                  value={senderAddressFilter}
                  onChange={(e) => setSenderAddressFilter(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Recipient Address"
                  value={recipientAddressFilter}
                  onChange={(e) => setRecipientAddressFilter(e.target.value)}
                />
              </div>
            </div>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.id} className="col-auto">
                  <Order order={order} userType="Delivery" />
                </div>
              ))
            ) : (
              <div className="col-md-12 text-center mt-5">
                <h1
                  className={`${customDelivery.customTextColorHeadings} display-6`}
                >
                  No matching orders found.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
