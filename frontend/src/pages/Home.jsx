import React from "react";
import "../assets/css/customHome.css";
import Navbar from "../components/Navbar";
import { House } from "react-bootstrap-icons";
import { PinAngle } from "react-bootstrap-icons";
import { BoxFill } from "react-bootstrap-icons";
import { BoxSeamFill } from "react-bootstrap-icons";
import { Box2Fill } from "react-bootstrap-icons";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h2 className="display-4 custom-text-color-headings">
            Delivery destination
          </h2>
        </div>

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
                  The courier will deliver the parcel directly to the addressee
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
            <h2 className="display-4 custom-text-color-headings">Pack size</h2>
          </div>
        </div>

        <div className="row justify-content-center mt-4 p-0">
          <div className="col-2 mx-5">
            <div className="card custom-card custom-text-color h-100 text-center">
              <BoxFill className="m-auto mt-5 custom-icon" />
              <div className="card-body d-flex flex-column align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input stretched-link"
                    type="radio"
                    name="packageOption"
                    value=""
                    id="defaultCheck3"
                  />
                  <label
                    className="form-check-label stretched-link"
                    htmlFor="defaultCheck3"
                  />
                </div>
                <h5 className="card-title">Small</h5>
                <p className="card-text">max. 10 x 40 x 65</p>
                <p className="card-text">up to 10 kg</p>
                <h5 className="card-text">15 zł</h5>
              </div>
            </div>
          </div>

          <div className="col-2 mx-5">
            <div className="card custom-card custom-text-color h-100 text-center">
              <BoxSeamFill className="m-auto mt-5 custom-icon" />
              <div className="card-body d-flex flex-column align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input stretched-link"
                    type="radio"
                    name="packageOption"
                    value=""
                    id="defaultCheck4"
                  />
                  <label
                    className="form-check-label stretched-link"
                    htmlFor="defaultCheck4"
                  />
                </div>
                <h5 className="card-title">Medium</h5>
                <p className="card-text">max. 20 x 40 x 65 cm</p>
                <p className="card-text">up to 20 kg</p>
                <h5 className="card-text">20 zł</h5>
              </div>
            </div>
          </div>

          <div className="col-2 mx-5">
            <div className="card custom-card custom-text-color h-100 text-center">
              <Box2Fill className="m-auto mt-5 custom-icon" />
              <div className="card-body d-flex flex-column align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input stretched-link"
                    type="radio"
                    name="packageOption"
                    value=""
                    id="defaultCheck5"
                  />
                  <label
                    className="form-check-label stretched-link"
                    htmlFor="defaultCheck5"
                  />
                </div>
                <h5 className="card-title">Large</h5>
                <p className="card-text">max. 45 x 40 x 65 cm</p>
                <p className="card-text">up to 30 kg</p>
                <h5 className="card-text">25 zł</h5>
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
          <form className="w-50">
            <div className="container">
              <div className="row">
                <div className="mb-3">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control custom-imputs"
                      id="floatingInput"
                      placeholder="Name and surname or company name"
                    />
                    <label for="floatingInput" className="custom-text-color">
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
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
