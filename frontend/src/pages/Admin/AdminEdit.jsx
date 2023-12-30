import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../../components/Layouts/NavbarAdmin";
import customAS from "../../assets/css/AccountSettings.module.css";
import customAdmin from "../../assets/css/Admin.module.css";
const AdminEdit = () => {
  const { entityType, entityId } = useParams();
  const [entityData, setEntityData] = useState({
    fName: "",
    lName: "",
    phoneNumber: "",
    email: "",
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
          fName: data[entityType].FirstName,
          lName: data[entityType].LastName,
          phoneNumber: data[entityType].PhoneNumber,
          email: data[entityType].Email,
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
                    <strong>First Name</strong> {entityData.fName}
                  </div>
                  <div>
                    <strong>Last Name</strong> {entityData.lName}
                  </div>
                  <div>
                    <strong>Phone Number</strong> {entityData.phoneNumber}
                  </div>
                  <div>
                    <strong>Email</strong> {entityData.email}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="fName">
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="fName"
                    name="fName"
                    value={entityData.fName}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="lName">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="lName"
                    name="lName"
                    value={entityData.lName}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="phoneNumber">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={entityData.phoneNumber}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={entityData.email}
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
