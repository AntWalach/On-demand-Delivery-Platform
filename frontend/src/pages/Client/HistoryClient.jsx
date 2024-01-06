import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layouts/Navbar";
import axios from "axios";
import Order from "../../components/MyOrdersComponents/Order";
import customMyOrders from "../../assets/css/MyOrders.module.css";
import ordersHistory from "../../assets/css/OrdersHistory.module.css";
import HistoryIcon from "../../assets/images/historyIcon.png";

function HistoryClient() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const [sortByDate, setSortByDate] = useState("asc");
  const [sortByRating, setSortByRating] = useState("asc");

  useEffect(() => {
    axios
      .get("http://localhost:8081/home/history")
      .then((res) => {
        console.log("API:", res.data);

        if (res.data && Array.isArray(res.data)) {
          setAuth(true);
          const sortedOrders = sortOrders(res.data);
          setOrders(sortedOrders);
        } else {
          setAuth(false);
          navigate("/login");
          setMessage("Error");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate, sortByDate, sortByRating]);

  const sortOrders = (ordersToSort) => {
    const compareByDate = (a, b) => {
      const dateComparison = new Date(b.Date) - new Date(a.Date);
      return sortByDate === "asc" ? dateComparison : -dateComparison;
    };

    const compareByRating = (a, b) => {
      const ratingA = a.OrderRate || 0;
      const ratingB = b.OrderRate || 0;
      return sortByRating === "asc" ? ratingB - ratingA : ratingA - ratingB;
    };

    return ordersToSort.slice().sort((a, b) => {
      const dateComparison = compareByDate(a, b);
      return dateComparison !== 0 ? dateComparison : compareByRating(a, b);
    });
  };

  const handleSortChange = (sortBy) => {
    if (sortBy === "date") {
      setSortByDate((prevSortOrder) =>
        prevSortOrder === "asc" ? "desc" : "asc"
      );
      setSortByRating("asc"); 
    } else if (sortBy === "rating") {
      setSortByRating((prevSortOrder) =>
        prevSortOrder === "asc" ? "desc" : "asc"
      );
      setSortByDate("asc"); 
    }
  };

  const handleRatingChange = (orderId, newRating) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.ID === orderId ? { ...order, OrderRate: newRating } : order
      )
    );

    setOrders((prevOrders) => sortOrders(prevOrders));
  };

  return (
    <div>
      <Navbar />
      <div className="row mx-auto">
        <div className="col-md-12 text-center mt-5">
          <div className={`${customMyOrders.packageLogoBackground} mx-auto`}>
            <div className={`${ordersHistory.customTextColorHeader} display-6`}>
              History
            </div>
            <img
              src={HistoryIcon}
              className={`${ordersHistory.packageLogo}`}
              alt="History Icon"
            />
          </div>
        </div>
      </div>
      <div className={`${customMyOrders.containerMyPackages} mx-auto w-75`}>
        <div className="row mt-4 justify-content-center mx-auto">
          <div className="col-md-12 mb-3">
            <button
              className={`btn btn-secondary me-2 ${
                sortByDate === "desc" ? "active" : ""
              }`}
              onClick={() => handleSortChange("date")}
            >
              {sortByDate === "desc"
                ? "Sort Newest to Oldest"
                : "Sort Oldest to Newest"}
            </button>
            <button
              className={`btn btn-secondary ${
                sortByRating === "desc" ? "active" : ""
              }`}
              onClick={() => handleSortChange("rating")}
            >
              {sortByRating === "desc"
                ? "Sort Highest to Lowest Rating"
                : "Sort Lowest to Highest Rating"}
            </button>
          </div>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="col-sm-6 col-lg-3">
                <Order
                  order={order}
                  userType="Client"
                  type="rating"
                  onRatingChange={handleRatingChange}
                />
              </div>
            ))
          ) : (
            <div className="col-md-12 text-center mt-5">
              <h1
                className={`${customMyOrders.customTextColorHeadings} display-6`}
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

export default HistoryClient;
