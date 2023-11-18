import React, { useState } from "react";
import "../assets/css/customHome.css";
import Navbar from "../components/Navbar";
import { House } from "react-bootstrap-icons";
import { PinAngle } from "react-bootstrap-icons";
import { BoxFill } from "react-bootstrap-icons";
import { BoxSeamFill } from "react-bootstrap-icons";
import { Box2Fill } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import axios from "axios";

function Home() {
  const [values, setValues] = useState({
    //deliveryOption: "",
    packageOption: "",
    InputZipCode1: "",
    InputStreet1: "",
    InputBuildingNumber1: "",
    InputApartmentNumber1: "",
    InputZipCode2: "",
    InputStreet2: "",
    InputBuildingNumber2: "",
    InputApartmentNumber2: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8081/home", values);
  };

  return (
    <div>
      <Navbar />
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h2 className="display-4 custom-text-color-headings">
            Delivery destination
          </h2>
        </div>
        <form className="w-50 mx-auto " action="" onSubmit={handleSubmit}>
          <div className="row justify-content-center mt-4 p-0">
            <div className="col-2 mx-5">
              <div className="card custom-card custom-text-color h-100 text-center">
                <House className="m-auto mt-5 custom-icon" />
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input stretched-link"
                      type="radio"
                      name="deliveryOption"
                      id="defaultCheck1"
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="defaultCheck1"
                    />
                  </div>
                  <h5 className="card-title">Address</h5>
                  <p className="card-text">
                    The courier will deliver the parcel directly to the
                    address
                  </p>
                </div>
              </div>
            </div>

            <div className="col-2 mx-5">
              <div className="card custom-card custom-text-color h-100 text-center">
                <PinAngle className="m-auto mt-5 custom-icon" />
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input stretched-link"
                      type="radio"
                      name="deliveryOption"
                      id="defaultCheck2"
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="defaultCheck2"
                    />
                  </div>
                  <h5 className="card-title">Shipping point</h5>
                  <p className="card-text">
                    The courier will deliver the parcel at the shipping point
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12 text-center">
              <h2 className="display-4 custom-text-color-headings">
                Pack size
              </h2>
            </div>
          </div>

          <div className="row justify-content-center mt-4 p-0">
            <div className="col-2 mx-5">
              <div className="card custom-card custom-text-color h-100 text-center">
                <BoxFill className="m-auto mt-5 custom-icon" />
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="form-check">
                    <Form.Check
                      className="stretched-link"
                      type="radio"
                      name="packageOption"
                      id="defaultCheck3"
                      value="Small"
                      onChange={() => {
                        handleInput({
                          target: { name: "packageOption", value: "Small" },
                        });
                      }}
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="defaultCheck3"
                    />
                  </div>
                  <h5 className="card-title">Small</h5>
                  <p className="card-text">max. 10 x 40 x 65</p>
                  <p className="card-text">up to 10 kg</p>
                  <h5 className="card-text">15 $</h5>
                </div>
              </div>
            </div>

            <div className="col-2 mx-5">
              <div className="card custom-card custom-text-color h-100 text-center">
                <BoxSeamFill className="m-auto mt-5 custom-icon" />
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="form-check">
                    <Form.Check
                      className="stretched-link"
                      type="radio"
                      name="packageOption"
                      id="defaultCheck4"
                      value="Medium"
                      onChange={() => {
                        handleInput({
                          target: { name: "packageOption", value: "Medium" },
                        });
                      }}
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="defaultCheck4"
                    />
                  </div>
                  <h5 className="card-title">Medium</h5>
                  <p className="card-text">max. 20 x 40 x 65 cm</p>
                  <p className="card-text">up to 20 kg</p>
                  <h5 className="card-text">20 $</h5>
                </div>
              </div>
            </div>

            <div className="col-2 mx-5">
              <div className="card custom-card custom-text-color h-100 text-center">
                <Box2Fill className="m-auto mt-5 custom-icon" />
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="form-check">
                    <Form.Check
                      className="stretched-link"
                      type="radio"
                      name="packageOption"
                      id="defaultCheck5"
                      value="Large"
                      onChange={() => {
                        handleInput({
                          target: { name: "packageOption", value: "Large" },
                        });
                      }}
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="defaultCheck5"
                    />
                  </div>
                  <h5 className="card-title">Large</h5>
                  <p className="card-text">max. 45 x 40 x 65 cm</p>
                  <p className="card-text">up to 30 kg</p>
                  <h5 className="card-text">25 $</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12 text-center">
              <h2 className="display-4 custom-text-color-headings">
                Shipping details
              </h2>
            </div>
          </div>

          <div className="row justify-content-center mt-3 mb-5">
            <div className="container">
              <div className="row">
                <div className="mb-3">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control custom-imputs"
                      id="floatingInput"
                      placeholder="Name and surname or company name"
                    />
                    <label
                      htmlFor="floatingInput"
                      className="custom-text-color"
                    >
                      Name and surname or company name
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className=" row justify-content-center ">
                <div className="col-md-4 custom-container rounded">
                  <div className="mb-2">
                    <label
                      htmlFor="InputZipCode1"
                      className="form-label custom-text-color-headings"
                    >
                      Zip code
                    </label>
                    <input
                      type="text"
                      className="form-control custom-imputs"
                      id="InputZipCode1"
                      name="InputZipCode1"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="InputStreet1"
                      className="form-label custom-text-color-headings"
                    >
                      Street
                    </label>
                    <input
                      type="text"
                      className="form-control custom-imputs"
                      id="InputStreet1"
                      name="InputStreet1"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="InputBuildingNumber1"
                      className="form-label custom-text-color-headings"
                    >
                      Building number
                    </label>
                    <input
                      type="text"
                      className="form-control custom-imputs"
                      id="InputBuildingNumber1"
                      name="InputBuildingNumber1"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="InputApartmentNumber1"
                      className="form-label custom-text-color-headings text-nowrap"
                    >
                      Apartment number
                    </label>
                    <input
                      type="text"
                      className="form-control custom-imputs"
                      id="InputApartmentNumber1"
                      name="InputApartmentNumber1"
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="col-md-4 offset-md-1 custom-container rounded">
                  <div className="mb-2">
                    <label
                      htmlFor="InputZipCode2"
                      className="form-label custom-text-color-headings"
                    >
                      Zip code
                    </label>
                    <input
                      type="text"
                      className="form-control custom-imputs"
                      id="InputZipCode2"
                      name="InputZipCode2"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="InputStreet2"
                      className="form-label custom-text-color-headings"
                    >
                      Street
                    </label>
                    <input
                      type="text"
                      className="form-control custom-imputs"
                      id="InputStreet2"
                      name="InputStreet2"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="InputBuildingNumber2"
                      className="form-label custom-text-color-headings"
                    >
                      Building number
                    </label>
                    <input
                      type="text"
                      className="form-control custom-imputs"
                      id="InputBuildingNumber2"
                      name="InputBuildingNumber2"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="InputApartmentNumber2"
                      className="form-label custom-text-color-headings text-nowrap"
                    >
                      Apartment number
                    </label>
                    <input
                      type="text"
                      className="form-control custom-imputs"
                      id="InputApartmentNumber2"
                      name="InputApartmentNumber2"
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-2">
              <button
                type="submit"
                className="btn btn-primary btn-lg custom-button-home"
              >
                <strong>Submit</strong>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
