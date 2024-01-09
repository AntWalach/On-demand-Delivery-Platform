import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoxFill } from "react-bootstrap-icons";
import { BoxSeamFill } from "react-bootstrap-icons";
import { Box2Fill } from "react-bootstrap-icons";
import { BoxArrowInDown } from "react-bootstrap-icons";
import { PencilSquare } from "react-bootstrap-icons";
import { Printer } from "react-bootstrap-icons";
import { SendCheck } from "react-bootstrap-icons";
import axios from "axios";
import Navbar from "../../components/Layouts/Navbar";
import PackageOption from "../../components/HomeComponents/PackageOption";
import AddressFormSection from "../../components/HomeComponents/AddressFormSection";
import Validation from "../../utils/orderValidation";
import customHome from "../../assets/css/Home.module.css";
import HomeIcon from "../../components/HomeComponents/HomeIcon";
import Footer from "../../components/Layouts/Footer";
import "../../assets/css/Home.module.css";
import ZPL from "../../assets/css/ZPL.module.css";

function Home() {
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
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
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [labelImage, setLabelImage] = useState("");
  const [isZPLVisible, setZPLVisible] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [selectedPackagePrice, setSelectedPackagePrice] = useState(15);
  const navigate = useNavigate();

  const handlePackageSelection = (event, price) => {
    setValues((prev) => ({
      ...prev,
      packageOption: event.target.value,
    }));

    setSelectedPackagePrice(price);
  };

  const handleFormInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/home")
      .then((res) => {
        console.log("API Response:", res.data);
        console.log(selectedPackagePrice);
        if (res.data.valid) {
          setAuth(true);
          setUser(res.data.name);
          setWalletBalance(res.data.Balance);
        } else {
          setAuth(false);
          navigate("/login");
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [navigate, walletBalance, selectedPackagePrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    console.log("Validation Errors:", validationErrors);

    if (Object.values(validationErrors).every((error) => !error)) {
      try {
        // Existing code for fetching wallet balance
        const walletBalanceResponse = await axios.get(
          "http://localhost:8081/home"
        );
        const userWalletBalance = parseFloat(
          walletBalanceResponse.data.Balance
        );

        if (userWalletBalance >= selectedPackagePrice) {
          handleGenerateZPL();
          await axios.post("http://localhost:8081/home", values);
          await axios.post(
            "http://localhost:8081/home/updatewalletclient",
            values
          );
        } else {
          console.log("Insufficient funds");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  function convertToZPLString(inputString) {
    const polishCharsMap = {
      ą: "a",
      ć: "c",
      ę: "e",
      ł: "l",
      ń: "n",
      ó: "o",
      ś: "s",
      ź: "z",
      ż: "z",
      Ą: "A",
      Ć: "C",
      Ę: "E",
      Ł: "L",
      Ń: "N",
      Ó: "O",
      Ś: "S",
      Ź: "Z",
      Ż: "Z",
    };

    return inputString.replace(
      /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g,
      (match) => polishCharsMap[match] || match
    );
  }

  const handleGenerateZPL = async () => {
    try {
      const validationErrors = Validation(values);

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
        try {
          const generatedZPL = `^XA

      ^FX Top section with logo, name and address.
      ^CF0,60
      ^FO50,50^GB100,100,100^FS
      ^FO75,75^FR^GB100,100,100^FS
      ^FO93,93^GB40,40,40^FS
      ^FO220,50^FDIntershipping, Inc.^FS
      ^CF0,30
      ^FO220,115^FD${convertToZPLString(values.InputZipCode1)}^FS
      ^FO220,155^FD${convertToZPLString(values.InputCity1)}^FS
      ^FO220,195^FD${convertToZPLString(
        values.InputStreet1
      )} ${convertToZPLString(
            values.InputBuildingNumber1
          )} / ${convertToZPLString(values.InputApartmentNumber1)}9^FS
      ^FO50,250^GB700,3,3^FS
      
      ^FX Second section with recipient address and permit information.
      ^CFA,30
      
      ^FO50,340^FD${convertToZPLString(values.InputZipCode2)}^FS
      ^FO50,380^FD${convertToZPLString(values.InputCity2)}^FS
      ^FO50,420^FD${convertToZPLString(
        values.InputStreet2
      )} ${convertToZPLString(
            values.InputBuildingNumber2
          )} / ${convertToZPLString(values.InputApartmentNumber2)}^FS
      ^CFA,15
      ^FO600,300^GB150,150,3^FS
      ^FO638,340^FDPermit^FS
      ^FO638,390^FD123456^FS
      ^FO50,500^GB700,3,3^FS
      
      ^FX Third section with bar code.
      ^BY5,2,270
      ^FO100,550^BC^FD12345678^FS
      
      ^FX Fourth section (the two boxes on the bottom).
      ^FO50,900^GB700,250,3^FS
      ^FO400,900^GB3,250,3^FS
      ^CF0,40
      ^FO100,960^FDCtr. X34B-1^FS
      ^FO100,1010^FDREF1 F00B47^FS
      ^FO100,1060^FDREF2 BL4H8^FS
      ^CF0,190
      ^FO470,955^FDCA^FS
      
      ^XZ`;

          const response = await fetch(
            "http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/",
            {
              method: "POST",
              headers: {
                Accept: "image/png",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `${generatedZPL}`,
            }
          );

          if (response.ok) {
            const imageUrl = URL.createObjectURL(await response.blob());
            setLabelImage(imageUrl);
            setZPLVisible(true);
          } else {
            const errorMessage = await response.text();
            console.error("Error generating label:", errorMessage);
          }
        } catch (error) {
          console.error("Error generating label:", error);
        }
      }
    } catch (err) {
      console.error("Error in handleGenerateZPL:", err);
    }
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = labelImage;
    link.download = "label_image.png";
    link.click();
  };

  return (
    <div>
      <Navbar />
      <div>
        {isZPLVisible ? (
          <div className={`mt-4 text-center`}>
            <div className={`w-400 rounded `}>
              <button
                className={`${customHome.customButtonHome} btn btn-lg mb-2`}
                onClick={() => {
                  setZPLVisible(false);
                  handleDownloadImage();
                }}
              >
                <strong>Close & Download</strong>
              </button>
              <div>
                <img
                  src={labelImage}
                  alt="Label"
                  className={`img-fluid border p-2 rounded ${ZPL.customContainer}`}
                  style={{
                    width: "22%",
                    height: "22%",
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="row mt-5 mx-auto">
            <div className="text-center">
              <h2 className={`${customHome.customTextColorHeadings} display-4`}>
                Send your parcel quickly and conveniently!
              </h2>
            </div>
            <div>
              <div className="row justify-content-center mt-4 w-75 mx-auto">
                <HomeIcon
                  icon={
                    <BoxArrowInDown
                      className={`${customHome.customIcon} ${customHome.customIconHome} ${customHome.customIconHome1} m-auto mt-5`}
                    />
                  }
                  description={
                    <span className={`${customHome.customDescriptionHome1}`}>
                      Pack a parcel
                    </span>
                  }
                />

                <HomeIcon
                  icon={
                    <PencilSquare
                      className={`${customHome.customIcon} ${customHome.customIconHome} ${customHome.customIconHome2} m-auto mt-5`}
                    />
                  }
                  description={
                    <span className={`${customHome.customDescriptionHome2}`}>
                      Complete the data
                    </span>
                  }
                />

                <HomeIcon
                  icon={
                    <Printer
                      className={`${customHome.customIcon} ${customHome.customIconHome} ${customHome.customIconHome3} m-auto mt-5`}
                    />
                  }
                  description={
                    <span className={`${customHome.customDescriptionHome3}`}>
                      Pay, print, stick the label
                    </span>
                  }
                />

                <HomeIcon
                  icon={
                    <SendCheck
                      className={`${customHome.customIcon} ${customHome.customIconHome} ${customHome.customIconHome4} m-auto mt-5`}
                    />
                  }
                  description={
                    <span className={`${customHome.customDescriptionHome4}`}>
                      Send the parcel
                    </span>
                  }
                />
              </div>
              <form
                className="w-60 mx-auto justify-content-center text-center"
                action=""
                onSubmit={handleSubmit}
              >
                <div className="row mt-5">
                  <div className="col-12 text-center mt-2">
                    <h2
                      className={`${customHome.customTextColorHeadings} display-4`}
                    >
                      Pack size
                    </h2>
                  </div>
                </div>

                {/* Package options components */}
                <div className="row justify-content-center mt-4 p-0 w-75 mx-auto">
                  <div
                    className={`${customHome.customColWidth} col-3 mx-4 d-flex justify-content-center mb-3`}
                  >
                    <PackageOption
                      icon={
                        <BoxFill
                          className={`${customHome.customIcon} m-auto mt-5`}
                        />
                      }
                      title="Small"
                      sizeInfo="max. 10 x 40 x 65 cm"
                      weightInfo="up to 10 kg"
                      price="$15"
                      value="Small"
                      onChange={(event) => handlePackageSelection(event, 15)}
                    />
                  </div>

                  <div
                    className={`${customHome.customColWidth} col-3 mx-4 d-flex justify-content-center mb-3`}
                  >
                    <PackageOption
                      icon={
                        <BoxSeamFill
                          className={`${customHome.customIcon} m-auto mt-5`}
                        />
                      }
                      title="Medium"
                      sizeInfo="max. 20 x 40 x 65 cm"
                      weightInfo="up to 20 kg"
                      price="$20"
                      value="Medium"
                      onChange={(event) => handlePackageSelection(event, 20)}
                    />
                  </div>

                  <div
                    className={`${customHome.customColWidth} col-3 mx-4 d-flex justify-content-center mb-3`}
                  >
                    <PackageOption
                      icon={
                        <Box2Fill
                          className={`${customHome.customIcon} m-auto mt-5`}
                        />
                      }
                      title="Large"
                      sizeInfo="max. 45 x 40 x 65 cm"
                      weightInfo="up to 30 kg"
                      price="$25"
                      value="Large"
                      onChange={(event) => handlePackageSelection(event, 25)}
                    />
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-12 text-center">
                    <h2
                      className={`${customHome.customTextColorHeadings} display-4`}
                    >
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
                        handleInput={handleFormInput}
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
                        handleInput={handleFormInput}
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
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
