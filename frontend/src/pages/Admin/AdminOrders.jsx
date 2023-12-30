import React, { useState, useEffect } from "react";
import NavbarAdmin from "../../components/Layouts/NavbarAdmin";
import "../../assets/css/Admin.module.css";
import customAdmin from "../../assets/css/Admin.module.css";
import axios from "axios";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [idSortOrder, setIdSortOrder] = useState("asc");
  const [addressSortOrder, setAddressSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [orderSortBy, setOrderSortBy] = useState("id");

  const handleAccordion = (orderId) => {
    setOpenOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/admin/orders");
      const { orders } = response.data;
      console.log("Order data from server:", orders);
      setOrders(orders);
    } catch (error) {
      console.error("Error fetching order data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8081/admin/orders/${orderId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };


  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleString("pl-PL", options);
    return formattedDate;
  };

  const parseAddress = (inputString) => {
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
  };

  const sortedAndFilteredOrders = orders
    .filter((order) =>
      `${order.SenderAddress} ${order.RecipientAddress}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (orderSortBy === "id") {
        return idSortOrder === "asc" ? a.ID - b.ID : b.ID - a.ID;
      } else {
        const addressA =
          `${a.SenderAddress} ${a.RecipientAddress}`.toLowerCase();
        const addressB =
          `${b.SenderAddress} ${b.RecipientAddress}`.toLowerCase();
        return addressSortOrder === "asc"
          ? addressA.localeCompare(addressB)
          : addressB.localeCompare(addressA);
      }
    });

  const handleSortOrderId = () => {
    setIdSortOrder((prevSortOrder) =>
      prevSortOrder === "asc" ? "desc" : "asc"
    );
    setOrderSortBy("id");
  };

  const handleSortOrderAddress = () => {
    setAddressSortOrder((prevSortOrder) =>
      prevSortOrder === "asc" ? "desc" : "asc"
    );
    setOrderSortBy("address");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`${customAdmin.customContainer}`}>
      <NavbarAdmin />
      <div className="container mt-4">
        <div className="container mt-4">
          <input
            type="text"
            placeholder="Search by address..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSortOrderId}>
            Sort by ID ({idSortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
          <button onClick={handleSortOrderAddress}>
            Sort by Address (
            {addressSortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            className="container accordion accordion-flush inputMoney mt-4"
            id="accordionFlushExample"
          >
            {sortedAndFilteredOrders.map((order) => (
              <div className="accordion-item" key={order.ID}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button${
                      order.ID === openOrderId ? "" : " collapsed"
                    }`}
                    type="button"
                    onClick={() => handleAccordion(order.ID)}
                    aria-expanded={openOrderId === order.ID ? "true" : "false"}
                    aria-controls={`collapse${order.ID}`}
                  >
                    Order ID: {order.ID}
                  </button>
                </h2>
                <div
                  id={`collapse${order.ID}`}
                  className={`accordion-collapse collapse${
                    order.ID === openOrderId ? " show" : ""
                  }`}
                  aria-labelledby={`heading${order.ID}`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <p>Sender Address: {parseAddress(order.SenderAddress)}</p>
                    <p>
                      Recipient Address: {parseAddress(order.RecipientAddress)}
                    </p>
                    <p>Date: {formatDate(order.Date)}</p>
                    {/* Inne informacje do wyświetlenia */}
                  </div>
                  <button onClick={() => handleDeleteOrder(order.ID)}> Delete </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrder;
