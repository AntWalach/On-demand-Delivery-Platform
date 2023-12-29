import React, { useState, useEffect } from "react";
import NavbarAdmin from "../../components/Layouts/NavbarAdmin";
import "../../assets/css/Admin.module.css";
import customAdmin from "../../assets/css/Admin.module.css";
import test from "../../assets/css/Wallet.module.css";
import axios from "axios";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

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
      const nameA = `${a.SenderAddress} ${a.RecipientAddress}`.toLowerCase();
      const nameB = `${b.SenderAddress} ${b.RecipientAddress}`.toLowerCase();

      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortOrderToggle = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className={`${customAdmin.customContainer}`}>
      <NavbarAdmin />
      <div className={`${test.inputMoney}`}>
        <div>
          <input
            type="text"
            placeholder="Search by address..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSortOrderToggle}>
            Sort by Address ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            className="accordion accordion-flush inputMoney"
            id="accordionFlushExample"
          >
            {sortedAndFilteredOrders.map((order) => (
              <div className="accordion-item" key={order.ID}>
                <h2 className="accordion-header" id={`heading${order.ID}`}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${order.ID}`}
                    aria-expanded="true"
                    aria-controls={`collapse${order.ID}`}
                  >
                    Order ID: {order.ID}
                  </button>
                </h2>
                <div
                  id={`collapse${order.ID}`}
                  className="accordion-collapse collapse show"
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
