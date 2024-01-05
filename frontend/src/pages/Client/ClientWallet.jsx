import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Layouts/Navbar";
import customWallet from "../../assets/css/Wallet.module.css";

function ClientWallet() {
  axios.defaults.withCredentials = true;

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [topUpAmount, setTopUpAmount] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8081/home")
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data.valid) {
          setAuth(true);
          setUser(res.data.name);
          fetchWalletBalance();
        } else {
          setAuth(false);
          navigate("/login");
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const fetchWalletBalance = () => {
    axios.get("http://localhost:8081/home/walletBalance").then((res) => {
      setWalletBalance(res.data.balance);
    });
  };

  const handleTopUp = () => {
    // czy topUpAmount jest liczbą dodatnią
    if (isNaN(topUpAmount) || topUpAmount <= 0) {
      console.error("Invalid top-up amount");
      return;
    }

    axios
      .post("http://localhost:8081/home/topup", { amount: topUpAmount })
      .then((response) => {
        console.log("Top-up successful", response.data);
      })
      .catch((error) => {
        console.error("Error during top-up", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="row mx-auto">
        <div className="col-md-12 text-center mt-5">
          <h1 className={`${customWallet.customTextColorHeader} display-6`}>
            Wallet
          </h1>
        </div>
      </div>
      <div className="row mx-auto">
        <div className="col-md-12 text-center mt-5">
          <h1 className={`${customWallet.customTextColorHeader} display-6`}>
            My balance : ${walletBalance}
          </h1>
        </div>
      </div>

      <div className="row my-5 mx-auto"></div>

      <div className="row mt-5 mx-auto">
        <div class="input-group" style={{ width: "30%", margin: "0 auto" }}>
          <span class="input-group-text">Top up your wallet</span>
          <div class="form-floating">
            <input
              type="float"
              class="form-control"
              id="floatingInputGroup1"
              placeholder="Username"
              onChange={(e) => setTopUpAmount(e.target.value)}
            />
            <label for="floatingInputGroup1">Enter value</label>
          </div>
        </div>

        <div className="text-center mt-5">
          <button
            type="submit"
            className={`${customWallet.customButtonWallet} btn btn-lg`}
            style={{
              padding: "8px 70px",
            }}
            onClick={handleTopUp}
          >
            <strong>Submit</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientWallet;
