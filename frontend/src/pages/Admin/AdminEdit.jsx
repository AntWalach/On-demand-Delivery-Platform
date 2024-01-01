import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../../components/Layouts/NavbarAdmin";
import customAS from "../../assets/css/AccountSettings.module.css";
import customAdmin from "../../assets/css/Admin.module.css";
const AdminEdit = () => {
  const { entityType, entityId } = useParams();
  const [entityData, setEntityData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/admin/${entityType}/edit/${entityId}`
        );
        console.log("Response from server:", response.data);

        const { data } = response;
        setEntityData({
          FirstName: data[entityType].FirstName,
          LastName: data[entityType].LastName,
          PhoneNumber: data[entityType].PhoneNumber,
          Email: data[entityType].Email,
        });

        console.log(`Fetched ${entityType} Data:`, data);
      } catch (error) {
        console.error(`Error fetching ${entityType} data:`, error.message);
      }
    };

    fetchData();
  }, [entityId, entityType]);

  const handleInputChange = (e) => {
    setEntityData({
      ...entityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:8081/admin/${entityType}/edit/${entityId}`,
        {
          ...entityData,
        }
      );
      navigate(`/admin/${entityType}`);
    } catch (error) {
      console.error(`Error updating ${entityType} data:`, error.message);
    }
  };

  return (
    <div className={`${customAdmin.customContainer}`}>
      <NavbarAdmin />
      <div>
        <div className="container mt-4">
          <div className={`${customAS.bgdata} p-3 rounded`}>
            {entityData ? ( // Dodaj warunek sprawdzający dostępność danych
              <div className="">
                <h2>
                  Edit {entityType === "client" ? "client" : "delivery"} Data
                </h2>

                <div className={`${customAS.currentData} mb-4`}>
                  <h3>Current Data</h3>

                  <div>
                    <strong>First Name</strong> {entityData.FirstName}
                  </div>
                  <div>
                    <strong>Last Name</strong> {entityData.LastName}
                  </div>
                  <div>
                    <strong>Phone Number</strong> {entityData.PhoneNumber}
                  </div>
                  <div>
                    <strong>Email</strong> {entityData.Email}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="FirstName">
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="FirstName"
                    name="FirstName"
                    value={entityData.FirstName}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="LastName">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="LastName"
                    name="LastName"
                    value={entityData.LastName}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="PhoneNumber">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    id="PhoneNumber"
                    name="PhoneNumber"
                    value={entityData.PhoneNumber}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="Email">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    value={entityData.Email}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                {/* Dodaj inne pola klienta, które chcesz edytować */}
                <button
                  onClick={handleSaveChanges}
                  className="btn btn-outline-secondary"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEdit;
