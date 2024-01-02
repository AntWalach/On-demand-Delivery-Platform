import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/Layouts/NavbarAdmin";
import "../../assets/css/Admin.module.css";
import customAdmin from "../../assets/css/Admin.module.css";
import axios from "axios";

const AdminClient = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate(); 

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/admin/Client");
      const { clients } = response.data;
      console.log("Data from server:", clients);
      setClients(clients);
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

  const handleDeleteClient = async (clientId) => {
    try {
      await axios.delete(`http://localhost:8081/admin/Client/${clientId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting client:", error.message);
    }
  };

  const handleEditClient = (clientId) => {
    navigate(`/admin/Client/edit/${clientId}`);
  };

  const sortedAndFilteredClients = clients
    .filter((client) =>
      `${client.FirstName} ${client.LastName}`
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
        <div className="container">
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
          {sortedAndFilteredClients.map((client) => (
            <div className="accordion-item" key={client.ID}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse-${client.ID}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse-${client.ID}`}
                >
                  {`${client.FirstName} ${client.LastName}`}
                </button>
              </h2>
              <div
                id={`flush-collapse-${client.ID}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {`ID: ${client.ID}, Email: ${client.Email}`}
                </div>
                <button onClick={() => handleDeleteClient(client.ID)}>
                  Delete
                </button>
                <button onClick={() => handleEditClient(client.ID)}>
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

export default AdminClient;
