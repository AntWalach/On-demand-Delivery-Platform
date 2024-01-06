import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDelivery from "../../components/Layouts/NavbarDelivery";
import axios from "axios";
import NewOrderComponent from "../../components/MyOrdersComponents/NewOrderComponent";
import customNewOrders from "../../assets/css/NewOrders.module.css";
import customMyOrdersNew from "../../assets/css/MyOrders.module.css";
import NewOrdersIcon from "../../assets/images/newOrders.png";

function NewOrders() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); 
  const [senderAddressFilter, setSenderAddressFilter] = useState("");
  const [recipientAddressFilter, setRecipientAddressFilter] = useState("");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/delivery/neworders"
        );
        if (response.data && Array.isArray(response.data)) {
          let sortedOrders = [...response.data];

          if (sortOrder === "desc") {
            sortedOrders.sort(
              (a, b) => new Date(b.Date) - new Date(a.Date)
            );
          } else if (sortOrder === "asc") {
            sortedOrders.sort(
              (a, b) => new Date(a.Date) - new Date(b.Date)
            );
          }

          setOrders(sortedOrders);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, [navigate, sortOrder]);

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

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) =>
      prevSortOrder === "desc" ? "asc" : "desc"
    );
  };

  const filteredOrders = orders
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
    <div>
      <NavbarDelivery />

      <div className={`${customNewOrders.customContainer}`}>
        <div className="row mx-auto">
          <div className="col-md-12 text-center mt-5">
            <div
              className={`${customMyOrdersNew.packageLogoBackground} mx-auto`}
            >
              <div
                className={`${customNewOrders.customTextColorHeader} display-6`}
              >
                Orders
              </div>
              <img
                src={NewOrdersIcon}
                className={`${customNewOrders.packageLogo}`}
                alt="New Orders Icon"
              />
            </div>
          </div>
        </div>
        <div
          className={`${customMyOrdersNew.containerMyPackages} mx-auto w-75`}
        >
          <div className="row mt-4 justify-content-between mx-auto p-0">
            <div className="row mb-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sender Address"
                  value={senderAddressFilter}
                  onChange={(e) => setSenderAddressFilter(e.target.value)}
                />
              </div>
              <div className="col-md-4 d-flex justify-content-center">
                <button
                  className="btn btn-secondary"
                  onClick={handleSortChange}
                >
                  {sortOrder === "desc"
                    ? "Sort Oldest to Newest"
                    : "Sort Newest to Oldest"}
                </button>
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
    </div>
  );
}

export default NewOrders;
