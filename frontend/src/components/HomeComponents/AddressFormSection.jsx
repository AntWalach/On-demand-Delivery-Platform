import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import customHome from "../../assets/css/Home.module.css";

const AddressFormSection = ({
  label,
  zipCodeId,
  cityId,
  streetId,
  buildingNumberId,
  apartmentNumberId,
  zipCode,
  city,
  street,
  buildingNumber,
  apartmentNumber,
  errors,
  handleInput,
}) => {
  return (
    <div className={`${customHome.customContainer} col-md-4 rounded mx-3 mb-2 ${customHome.customShippingForm}`}>
      <div className="d-flex justify-content-center">
        <label className={`${customHome.customLabel} center-label mt-2`}>
          <strong>{label}</strong>
        </label>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-2">
            <FloatingLabel label="Zip Code" className="mb-3">
              <Form.Control
                className={`${customHome.customInputs}`}
                type="text"
                id={zipCodeId}
                name={zipCodeId}
                value={zipCode}
                onChange={handleInput}
              />
              {errors[zipCodeId] && (
                <span className="text-danger">{errors[zipCodeId]}</span>
              )}
            </FloatingLabel>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-2">
            <FloatingLabel label="City" className="mb-3">
              <Form.Control
                className={`${customHome.customInputs}`}
                type="text"
                id={cityId}
                name={cityId}
                value={city}
                onChange={handleInput}
              />
              {errors[cityId] && (
                <span className="text-danger">{errors[cityId]}</span>
              )}
            </FloatingLabel>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-2">
            <FloatingLabel label="Street" className="mb-3">
              <Form.Control
                className={`${customHome.customInputs}`}
                type="text"
                id={streetId}
                name={streetId}
                value={street}
                onChange={handleInput}
              />
              {errors[streetId] && (
                <span className="text-danger">{errors[streetId]}</span>
              )}
            </FloatingLabel>
          </div>
        </div>

        <div className="col-md-3">
          <div className="mb-2">
            <FloatingLabel label="Building" className="mb-3">
              <Form.Control
                className={`${customHome.customInputs}`}
                type="text"
                id={buildingNumberId}
                name={buildingNumberId}
                value={buildingNumber}
                onChange={handleInput}
              />
              {errors[buildingNumberId] && (
                <span className="text-danger">{errors[buildingNumberId]}</span>
              )}
            </FloatingLabel>
          </div>
        </div>

        <div className="col-md-3">
          <div className="mb-3">
            <FloatingLabel label="Apartment" className="mb-3">
              <Form.Control
                className={`${customHome.customInputs}`}
                type="text"
                id={apartmentNumberId}
                name={apartmentNumberId}
                value={apartmentNumber}
                onChange={handleInput}
              />
            </FloatingLabel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressFormSection;
