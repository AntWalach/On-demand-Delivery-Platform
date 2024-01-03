import React, { useState } from "react";
import { Box2HeartFill } from "react-bootstrap-icons";
import customHome from "../../assets/css/Home.module.css";
import customMyOrders from "../../assets/css/MyOrders.module.css";
import customNewOrders from "../../assets/css/NewOrders.module.css";
import axios from "axios";

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = new Date(dateString).toLocaleString("pl-PL", options);
  return formattedDate;
}

function parseAddress(inputString) {
  const addressRegex = /^(\d{5})([^\d]+?)([A-Z][^\d]+)(\d+)$/;
  const match = inputString.match(addressRegex);

  if (match) {
    const postalCode = match[1];
    const city = match[2];
    const street = match[3];
    const number = match[4];

    const result = `St. ${street} ${number}, ${city}, ${postalCode}`;
    return result;
  }
  return inputString;
}

function Order({ order, userType }) {
  const textColorClass =
    userType === "Client"
      ? customHome.customTextColor
      : customNewOrders.customTextColor;

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleUpdateStatus = () => {
    if (!selectedStatus) {
      alert("Select a status before updating.");
      return;
    }
    console.log(order.ID);
    console.log(selectedStatus);
    axios
      .put(`http://localhost:8081/delivery`, {
        orderstatusid: selectedStatus,
        orderId: order.ID,
      })
      .then((response) => {
        console.log("Order status updated:", response.data);
        // Tutaj możesz dodać kod do odświeżenia listy zamówień lub innego zachowania po aktualizacji statusu
      })
      .catch((error) => {
        console.error("Error updating order status", error);
      });

      axios.put("http://localhost:8081/updatewalletdelivery", {
        orderId: order.ID,
        orderstatusid: selectedStatus,
      });
  };

  return (
    <div
      className={`${customMyOrders.customCardsOrders} mb-4 d-flex justify-content-center`}
    >
      <div
        className={`${customNewOrders.customCard} ${textColorClass} ${customHome.card} card text-center`}
        key={order.id}
      >
        <Box2HeartFill className={`${customHome.customIcon} m-auto mt-5`} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-3">Shipment details</h5>
          <div className="d-flex flex-column flex-grow-1">
            <div className="card-text">
              <p className="m-0">
                <strong>Sender Address</strong>
              </p>
              <p>{parseAddress(order.SenderAddress)}</p>
            </div>
            <div className="card-text">
              <p className="m-0">
                <strong>Recipient Address</strong>
              </p>
              <p>{parseAddress(order.RecipientAddress)}</p>
            </div>
            <div className="card-text">
              <p className="m-0">
                <strong>Order Date</strong>
              </p>
              <p className="m-0">{formatDate(order.Date)}</p>
            </div>
            <div className="card-text">
              <p className="m-0">
                <strong>Status</strong>
              </p>
              <p className="m-0">{order.status}</p>
            </div>
          </div>
          {userType === "Delivery" ? (
            <div className="mt-auto input-group">
              <select
                className="form-select"
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
                onChange={(e) => setSelectedStatus(e.target.value)}
                value={selectedStatus}
              >
                <option value="" disabled selected>
                  Status...
                </option>
                <option value="3">On way</option>
                <option value="4">To destination</option>
                <option value="5">Delivered</option>
              </select>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleUpdateStatus}
              >
                Update Status
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Order;
