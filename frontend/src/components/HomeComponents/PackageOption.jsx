import React from "react";
import { Form } from "react-bootstrap";
import customHome from "../../assets/css/Home.module.css";

const PackageOption = ({
  icon,
  title,
  sizeInfo,
  weightInfo,
  price,
  value,
  onChange,
}) => {
  return (
    <div className={`${customHome.customTextColor} ${customHome.card} card h-100 text-center ${customHome.customCard}`}>
      {icon && <div>{icon}</div>}
      <div className="card-body d-flex flex-column align-items-center">
        <div className="form-check">
          <Form.Check
            className="stretched-link"
            type="radio"
            name="packageOption"
            id={`defaultCheck-${value}`}
            value={value}
            onChange={() =>
              onChange({ target: { name: "packageOption", value } })
            }
          />
          <label
            className="form-check-label stretched-link"
            htmlFor={`defaultCheck-${value}`}
          />
        </div>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{sizeInfo}</p>
        <p className="card-text">{weightInfo}</p>
        <h5 className="card-text">{price}</h5>
      </div>
    </div>
  );
};

export default PackageOption;
