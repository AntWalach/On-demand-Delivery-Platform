import React from "react";
import { Box2HeartFill } from "react-bootstrap-icons";
import customNewOrders from "../../assets/css/customNewOrders.module.css";

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

function Order({ order }) {
  return (
    <div className={`${customNewOrders.customCardsOrders} col-md-3 mb-4`}>
      <div
        className="card custom-card custom-text-color h-100 text-center mx-auto"
        key={order.id}
      >
        <Box2HeartFill className="m-auto mt-5 custom-icon" />
        <div className="card-body">
          <h5 className="card-title mb-3">Shipment details</h5>
          <p className="card-text">
            <p className="m-0"><strong>Sender Address</strong></p>
            <p>{parseAddress(order.SenderAddress)}</p>
          </p>
          <p className="card-text">
            <p className="m-0"><strong>Recipient Address</strong></p>
            <p>{parseAddress(order.RecipientAddress)}</p>
          </p>
          <p className="card-text">
            <p className="m-0"><strong>Order Date</strong></p>
            <p className="m-0">{formatDate(order.Date)}</p>
          </p>
          <button
              className="btn btn-outline-success custom-button"
              type="submit"
            >
              Accept order
            </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
