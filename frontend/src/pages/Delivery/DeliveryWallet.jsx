import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarDelivery from "../../components/Layouts/NavbarDelivery";
import customDelivery from "../../assets/css/Delivery.module.css";
import customWallet from "../../assets/css/Wallet.module.css";

function DeliveryWallet() {
  axios.defaults.withCredentials = true;

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8081/delivery")
      .then((res) => {
        console.log("API:", res.data);

        if (res.data.valid) {
          setAuth(true);

          showBalance();
        } else {
          setAuth(false);
          navigate("/login");
          setMessage("Error");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const showBalance = () => {
    axios.get("http://localhost:8081/delivery/wallet").then((res) => {
      setWalletBalance(res.data.balance);
    });
  };

  const handleWithdraw = () => {
    axios
      .post("http://localhost:8081/delivery/withdraw")
      .then((res) => {
        if (res.data.success) {
          setWalletBalance(0);

          setMessage("Withdrawal successful");
        } else {
          setMessage("Withdrawal failed");
        }
      })
      .catch((err) => {
        console.error("Withdrawal error:", err);
        setMessage("Withdrawal error");
      });
  };

  return (
    <div>
      <NavbarDelivery />
      <div className={`${customDelivery.customContainer}`}>
        <div className="row mx-auto">
          <div className="col-md-12 text-center mt-5">
            <h1
              className={`${customDelivery.customTextColorHeadings} display-6`}
            >
              Wallet
            </h1>
          </div>
        </div>
        <div className="row mx-auto">
          <div className="col-md-12 text-center mt-5">
            <h1
              className={`${customDelivery.customTextColorHeadings} display-6`}
            >
              My balance : ${walletBalance}
            </h1>
          </div>
        </div>

        <div className="row my-5 mx-auto"></div>

        <div className="row mt-5 mx-auto">
          <div className="text-center mt-5">
            <button
              type="submit"
              className={`${customWallet.customButtonWalletDelivery} btn btn-lg`}
              style={{
                padding: "8px 70px",
              }}
              onClick={handleWithdraw}
            >
              <strong>Withdraw</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryWallet;
