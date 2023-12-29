import React from "react";
import { Box2HeartFill } from "react-bootstrap-icons";
import customHome from "../../assets/css/Home.module.css";
import customMyOrders from "../../assets/css/MyOrders.module.css";
import customNewOrders from "../../assets/css/NewOrders.module.css";

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

function parseAddress(inputString) {
  const addressRegex = /^(\d{5})([^\d]+?)([A-Z][^\d]+)(\d+)$/;
  const match = inputString.match(addressRegex);

  if (match) {
    const postalCode = match[1];
    const city = match[2];
    const street = match[3];
    const number = match[4];

    console.log(postalCode);
    console.log(city);
    console.log(street);
    console.log(number);

    const result = `St. ${street} ${number}, ${city}, ${postalCode}`;
    return result;
  }
  return inputString;
}

function Order({ order, userType }) {
  const textColorClass =
    userType === "client"
      ? customHome.customTextColor
      : customNewOrders.customTextColor;

  return (
    <div className={`${customMyOrders.customCardsOrders} col-md-6 mb-4`}>
      <div
        className={`${customNewOrders.customCard} ${textColorClass} ${customHome.card} card h-100 text-center mx-auto`}
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
              <p className="m-0">testtesttesttest</p>
            </div>
          </div>
          {userType === "delivery" ? (
            <div class="mt-auto input-group">
              <select
                class="form-select"
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
              >
                <option selected>Status...</option>
                <option value="1">On way</option>
                <option value="2">To destination</option>
                <option value="3">Delivered</option>
              </select>
              <button class="btn btn-outline-secondary" type="button">
                Button
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Order;
