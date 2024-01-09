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
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [showScrollbar, setShowScrollbar] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8081/delivery")
      .then((res) => {
        if (res.data.valid) {
          setAuth(true);

          showBalance();
          showWithdrawalHistory();
        } else {
          setAuth(false);
          navigate("/login");
          setMessage("Error");
        }
      })
      .catch((err) => console.log(err));
    if (withdrawalHistory.length >= 5) {
      setShowScrollbar(true);
    } else {
      setShowScrollbar(false);
    }
  }, [navigate]);

  const showBalance = () => {
    axios.get("http://localhost:8081/delivery/wallet").then((res) => {
      setWalletBalance(res.data.balance);
    });
  };

  const showWithdrawalHistory = () => {
    axios
      .get("http://localhost:8081/delivery/withdrawalHistory")
      .then((res) => {
        setWithdrawalHistory(res.data);
      });
  };

  const handleWithdraw = () => {
    axios.post("http://localhost:8081/delivery/addWageHistory", {
      BankAccountNumber: "1234567890",
      AmountWage: walletBalance,
      PayDate: new Date(),
    });

    axios
      .post("http://localhost:8081/delivery/withdraw")
      .then((res) => {
        if (res.data.success) {
          setWalletBalance(0);

          setMessage("Withdrawal successful");
          // Aktualizuj historię wypłat po udanej wypłacie
          showWithdrawalHistory();
        } else {
          setMessage("Withdrawal failed");
        }
      })
      .catch((err) => {
        console.error("Withdrawal error:", err);
        setMessage("Withdrawal error");
      });

    // Usuń to, aby uniknąć automatycznego przeładowania strony
    window.location.reload();
  };

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleString("pl-PL", options);
    return formattedDate;
  }
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
        <div className="row my-5 mx-auto">
          <div className="col-md-12 text-center">
            <h2
              className={`${customDelivery.customTextColorHeadings} display-6 mb-4`}
            >
              Withdrawal History
            </h2>

            <div
              className={`col-md-8 mx-auto ${
                showScrollbar ? "show-scrollbar" : ""
              }`}
            >
              <ul
                className="list-group"
                style={{ maxWidth: "400px", margin: "auto" }}
              >
                {withdrawalHistory.map((withdrawal, index) => (
                  <li
                    key={index}
                    className="list-group-item narrow-list-item rounded mb-2"
                    style={{
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {`Date: ${formatDate(withdrawal.PayDate)}, Amount: ${
                      withdrawal.AmountWage
                    }`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryWallet;
