import React from "react";
import { Box2HeartFill } from "react-bootstrap-icons";
import customNewOrders from "../../assets/css/NewOrders.module.css";

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

    console.log(postalCode);
    console.log(city);
    console.log(street);
    console.log(number);

    const result = `St. ${street} ${number}, ${city}, ${postalCode}`;
    return result;
  }
  return inputString;
}

function NewOrderComponent({ order,type, handleClick }) {
  return (
    <div className={`${customNewOrders.customCardsOrders} col-md-3 mb-4 d-flex justify-content-center`}>
      <div
        className={`${customNewOrders.customCard} ${customNewOrders.customTextColor} ${customNewOrders.card} card h-100 text-center`}
        key={order.id}
      >
        <Box2HeartFill
          className={`${customNewOrders.customIcon} m-auto mt-5`}
        />
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
          </div>
          {type === "history" ? null : (<div className="mt-auto">
            <button
              className={`${customNewOrders.customButton} btn btn-outline-success`}
              type="submit"
              onClick={() => handleClick(order.ID)}
            >
              Accept order
            </button>
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default NewOrderComponent;
