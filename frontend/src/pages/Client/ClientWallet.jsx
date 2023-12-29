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
  const walletBalance = 0;

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
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h1 className={`${customWallet.customTextColorHeader} display-6`}>
            Wallet
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h1 className={`${customWallet.customTextColorHeader} display-6`}>
            My balance : ${walletBalance}
          </h1>
        </div>
      </div>

      <div className="row my-5"></div>

      <div className="row mt-5">
        <div class="input-group" style={{ width: "30%", margin: "0 auto" }}>
          <span class="input-group-text">Top up your wallet</span>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInputGroup1"
              placeholder="Username"
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
          >
            <strong>Submit</strong>
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default ClientWallet;