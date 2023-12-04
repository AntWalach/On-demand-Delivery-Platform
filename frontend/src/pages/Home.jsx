import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { House } from "react-bootstrap-icons";
import { PinAngle } from "react-bootstrap-icons";
import { BoxFill } from "react-bootstrap-icons";
import { BoxSeamFill } from "react-bootstrap-icons";
import { Box2Fill } from "react-bootstrap-icons";
import axios from "axios";
import Navbar from "../components/Layouts/Navbar";
import DeliveryOption from "../components/HomeComponents/DeliveryOption";
import PackageOption from "../components/HomeComponents/PackageOption";
import AddressFormSection from "../components/HomeComponents/AddressFormSection";
import Validation from "../utils/orderValidation";
import customHome from "../assets/css/customHome.module.css";


function Home() {
  const [values, setValues] = useState({
    //deliveryOption: "",
    packageOption: "Small",
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

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    console.log("Validation Errors:", validationErrors);
    if (
      !validationErrors.InputZipCode1 &&
      !validationErrors.InputZipCode2 &&
      !validationErrors.InputCity1 &&
      !validationErrors.InputCity2 &&
      !validationErrors.InputStreet1 &&
      !validationErrors.InputStreet2 &&
      !validationErrors.InputBuildingNumber1 &&
      !validationErrors.InputBuildingNumber2
    ) {
      await axios
        .post("http://localhost:8081/home", values)
        .catch((err) => console.log(err));
    }
  };

  axios.defaults.withCredentials = true;

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data.valid) {
          setAuth(true);
          setUser(res.data.name);
        } else {
          setAuth(false);
          navigate("/login");
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
      <div>
        <Navbar />
        <div className="row mt-5">
          <div className="col-12 text-center">
            <h2 className={`${customHome.customTextColorHeadings} display-4`}>
              Delivery destination
            </h2>
          </div>
          <div>
            <form
              className="w-60 mx-auto justify-content-center text-center"
              action=""
              onSubmit={handleSubmit}
            >
              {/* Delivery options components */}
              <div className="row justify-content-center mt-4 w-75 mx-auto">
                <div className={`${customHome.customColWidth} col-3 mx-5 d-flex justify-content-center mb-3`}>
                  <DeliveryOption
                    icon={<House className={`${customHome.customIcon} m-auto mt-5`}/>}
                    title="Address"
                    description="The courier will deliver the parcel directly to the address"
                  />
                </div>
  
                <div className={`${customHome.customColWidth} col-3 mx-5 d-flex justify-content-center mb-3`}>
                  <DeliveryOption
                    icon={<PinAngle className={`${customHome.customIcon} m-auto mt-5`} />}
                    title="Shipping point"
                    description="The courier will deliver the parcel at the shipping point"
                  />
                </div>
              </div>
  
              <div className="row mt-5">
                <div className="col-12 text-center">
                  <h2 className={`${customHome.customTextColorHeadings} display-4`}>
                    Pack size
                  </h2>
                </div>
              </div>
  
              {/* Package options components */}
              <div className="row justify-content-center mt-4 p-0 w-75 mx-auto">
                <div className={`${customHome.customColWidth} col-3 mx-4 d-flex justify-content-center mb-3`}>
                  <PackageOption
                    icon={<BoxFill className={`${customHome.customIcon} m-auto mt-5`} />}
                    title="Small"
                    sizeInfo="max. 10 x 40 x 65 cm"
                    weightInfo="up to 10 kg"
                    price="$15"
                    value="Small"
                    onChange={handleInput}
                  />
                </div>
  
                <div className={`${customHome.customColWidth} col-3 mx-4 d-flex justify-content-center mb-3`}>
                  <PackageOption
                    icon={<BoxSeamFill className={`${customHome.customIcon} m-auto mt-5`} />}
                    title="Medium"
                    sizeInfo="max. 20 x 40 x 65 cm"
                    weightInfo="up to 20 kg"
                    price="$20"
                    value="Medium"
                    onChange={handleInput}
                  />
                </div>
  
                <div className={`${customHome.customColWidth} col-3 mx-4 d-flex justify-content-center mb-3`}>
                  <PackageOption
                    icon={<Box2Fill className={`${customHome.customIcon} m-auto mt-5`} />}
                    title="Large"
                    sizeInfo="max. 45 x 40 x 65 cm"
                    weightInfo="up to 30 kg"
                    price="$25"
                    value="Large"
                    onChange={handleInput}
                  />
                </div>
              </div>
  
              <div className="row mt-5">
                <div className="col-12 text-center">
                  <h2 className={`${customHome.customTextColorHeadings} display-4`}>
                    Shipping details
                  </h2>
                </div>
              </div>
  
              <div className="row justify-content-center mt-3 mb-5">
                <div className="container">
                  <div className="row justify-content-center">
                    <AddressFormSection
                      label="Sender"
                      zipCodeId="InputZipCode1"
                      cityId="InputCity1"
                      streetId="InputStreet1"
                      buildingNumberId="InputBuildingNumber1"
                      apartmentNumberId="InputApartmentNumber1"
                      zipCode={values.InputZipCode1}
                      city={values.InputCity1}
                      street={values.InputStreet1}
                      buildingNumber={values.InputBuildingNumber1}
                      apartmentNumber={values.InputApartmentNumber1}
                      errors={errors}
                      handleInput={handleInput}
                    />
  
                    <AddressFormSection
                      label="Recipient"
                      zipCodeId="InputZipCode2"
                      cityId="InputCity2"
                      streetId="InputStreet2"
                      buildingNumberId="InputBuildingNumber2"
                      apartmentNumberId="InputApartmentNumber2"
                      zipCode={values.InputZipCode2}
                      city={values.InputCity2}
                      street={values.InputStreet2}
                      buildingNumber={values.InputBuildingNumber2}
                      apartmentNumber={values.InputApartmentNumber2}
                      errors={errors}
                      handleInput={handleInput}
                    />
                  </div>
                </div>
  
                <div className="text-center mt-2">
                  <button
                    type="submit"
                    className={`${customHome.customButtonHome} btn btn-lg`}
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
