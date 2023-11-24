import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Delivery() {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data.valid) {
          setAuth(true);
          setName(res.data.login);
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
      <div className="d-flex flex-column align-items-center vh-100">
        <div className="rounded m-1 text-black bg-white w-50 h-50">Test</div>
        <div className="rounded m-1 text-black bg-white w-50 h-50">Test</div>
        <div className="rounded m-1 text-black bg-white w-50 h-50">Test</div>
        <div className="rounded m-1 text-black bg-white w-50 h-50">Test</div>
      </div>
    </div>
  );
}

export default Delivery;
