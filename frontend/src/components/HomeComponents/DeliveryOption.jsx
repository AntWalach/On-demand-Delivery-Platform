import React from 'react';
import customHome from "../../assets/css/Home.module.css";

const DeliveryOption = ({ icon, title, description }) => {
    return (
      <div className={`${customHome.customTextColor} ${customHome.card} card h-100 text-center ${customHome.customCard}`}>
        {icon && <div>{icon}</div>}
        <div className="card-body d-flex flex-column align-items-center">
          <div className="form-check">
            <input
              className="form-check-input stretched-link"
              type="radio"
              name="deliveryOption"
              id={`defaultCheck${title}`}
            />
            <label
              className="form-check-label stretched-link"
              htmlFor={`defaultCheck${title}`}
            />
          </div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    );
  };
  
  export default DeliveryOption;