import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Layouts/Navbar";

function PaymentHistory() {
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
      <div>PaymentHistory</div>
    </div>
  );
}

export default PaymentHistory;
