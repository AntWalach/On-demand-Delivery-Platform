import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/Layouts/NavbarAdmin";
import "../../assets/css/Admin.module.css";
import customAdmin from "../../assets/css/Admin.module.css";
import axios from "axios";

const AdminDelivery = () => {
  const [delivery, setDelivery] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/admin/delivery");
      const { delivery } = response.data;
      console.log("Data from server:", delivery);
      setDelivery(delivery);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } 
  };

  const fetchDataWrapper = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchDataWrapper();
  }, []);

  const handleDeleteDelivery = async (deliveryId) => {
    try {
      await axios.delete(`http://localhost:8081/admin/delivery/${deliveryId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting delivery:", error.message);
    }
  };

  const handleEditDelivery = (deliveryId) => {
    navigate(`/admin/delivery/edit/${deliveryId}`);
  };

  const sortedAndFilteredDelivery = delivery
    .filter((delivery) =>
      `${delivery.FirstName} ${delivery.LastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = `${a.FirstName} ${a.LastName}`.toLowerCase();
      const nameB = `${b.FirstName} ${b.LastName}`.toLowerCase();

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

      <div className="container mt-4">
        <div className="container mt-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSortOrderToggle}>
            Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>

        <div
          className="container accordion accordion-flush inputMoney mt-4"
          id="accordionFlushExample"
        >
          {sortedAndFilteredDelivery.map((delivery) => (
            <div className="accordion-item" key={delivery.ID}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse-${delivery.ID}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse-${delivery.ID}`}
                >
                  {`${delivery.FirstName} ${delivery.LastName}`}
                </button>
              </h2>
              <div
                id={`flush-collapse-${delivery.ID}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {/* Dodaj inne informacje o kliencie */}
                  {`ID: ${delivery.ID}, Email: ${delivery.Email}`}
                </div>
                <button onClick={() => handleDeleteDelivery(delivery.ID)}>Delete</button>
                <button onClick={() => handleEditDelivery(delivery.ID)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDelivery;
