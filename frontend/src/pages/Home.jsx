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
import FloatingLabel from "react-bootstrap/FloatingLabel";
//import Validation from "../utils/orderValidation";

function Home() {
  const [values, setValues] = useState({
    //deliveryOption: "",
    packageOption: "",
    InputZipCode1: "",
    InputCity1: "",
    InputStreet1: "",
    InputBuildingNumber1: "",
    InputApartmentNumber1: "",
    InputZipCode2: "",
    InputCity2: "",
    InputStreet2: "",
    InputBuildingNumber2: "",
    InputApartmentNumber2: "",
  });

  //const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setErrors(Validation(values));
    // if (
    //   errors.InputZipCode1 === "" &&
    //   errors.InputZipCode2 === "" &&
    //   errors.InputCity1 === "" &&
    //   errors.InputCity2 === "" &&
    //   errors.InputStreet1 === "" &&
    //   errors.InputStreet2 === "" &&
    //   errors.InputBuildingNumber1 === "" &&
    //   errors.InputBuildingNumber2 === "" &&
    //   errors.InputApartmentNumber1 === "" &&
    //   errors.InputApartmentNumber2 === ""
    // ) {
    axios.post("http://localhost:8081/home", values);
    //     .catch((err) => console.log(err));
    // }
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
        <div>
          <form
            className="w-60 mx-auto justify-content-center text-center"
            action=""
            onSubmit={handleSubmit}
          >
            <div className="row justify-content-center mt-4 ">
              <div className="col-3 mx-5 d-flex justify-content-center">
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

              <div className="col-3 mx-5 d-flex justify-content-center">
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
              <div className="col-3 mx-4 d-flex justify-content-center">
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

              <div className="col-3 mx-4 d-flex justify-content-center">
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

              <div className="col-3 mx-4 d-flex justify-content-center">
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
                <div className="row justify-content-center">
                  <div className="col-md-4 custom-container rounded">
                    <div className="d-flex justify-content-center">
                      <label className="custom-label center-label mt-2">
                        <strong>Sender</strong>
                      </label>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-2">
                          <FloatingLabel label="Zip Code" className="mb-3">
                            <Form.Control
                              className="custom-inputs"
                              type="text"
                              id="InputZipCode1"
                              name="InputZipCode1"
                              onChange={handleInput}
                            />
                          </FloatingLabel>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-2">
                          <FloatingLabel label="City" className="mb-3">
                            <Form.Control
                              className="custom-inputs"
                              type="text"
                              id="InputCity1"
                              name="InputCity1"
                              onChange={handleInput}
                            />
                          </FloatingLabel>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-2">
                          <FloatingLabel label="Street" className="mb-3">
                            <Form.Control
                              className="custom-inputs"
                              type="text"
                              id="InputStreet1"
                              name="InputStreet1"
                              onChange={handleInput}
                            />
                          </FloatingLabel>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-2">
                          <FloatingLabel label="Building" className="mb-3">
                            <Form.Control
                              className="custom-inputs"
                              type="text"
                              id="InputBuildingNumber1"
                              name="InputBuildingNumber1"
                              onChange={handleInput}
                            />
                          </FloatingLabel>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <FloatingLabel label="Apartment" className="mb-3">
                            <Form.Control
                              className="custom-inputs"
                              type="text"
                              id="InputApartmentNumber1"
                              name="InputApartmentNumber1"
                              onChange={handleInput}
                            />
                          </FloatingLabel>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 offset-md-1 custom-container rounded">
                    <div className="d-flex justify-content-center">
                      <label className="custom-label center-label mt-2">
                        <strong>Recipient</strong>
                      </label>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-2">
                          <FloatingLabel label="Zip Code" className="mb-3">
                            <Form.Control
                              className="custom-inputs"
                              type="text"
                              id="InputZipCode2"
                              name="InputZipCode2"
                              onChange={handleInput}
                            />
                          </FloatingLabel>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-2">
                          <FloatingLabel label="City" className="mb-3">
                            <Form.Control
                              className="custom-inputs"
                              type="text"
                              id="InputCity2"
                              name="InputCity2"
                              onChange={handleInput}
                            />
                          </FloatingLabel>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-2">
                          <FloatingLabel label="Street" className="mb-3">
                            <Form.Control
                              className="custom-inputs"
                              type="text"
                              id="InputStreet2"
                              name="InputStreet2"
                              onChange={handleInput}
                            />
                          </FloatingLabel>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-2">
                          <FloatingLabel label="Building" className="mb-3">
                            <Form.Control
                              className="custom-inputs"
                              type="text"
                              id="InputBuildingNumber2"
                              name="InputBuildingNumber2"
                              onChange={handleInput}
                            />
                          </FloatingLabel>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <FloatingLabel label="Apartment" className="mb-3">
                            <Form.Control
                              className="custom-inputs"
                              type="text"
                              id="InputApartmentNumber2"
                              name="InputApartmentNumber2"
                              onChange={handleInput}
                            />
                          </FloatingLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-2">
                <button
                  type="submit"
                  className="btn btn-lg custom-button-home"
                  style={{
                    padding: "8px 70px",
                  }}
                >
                  <strong>Submit</strong>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
