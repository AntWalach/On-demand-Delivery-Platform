import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import StartPage from "./pages/StartPage";
import Login from "./pages/Login";
import Delivery from "./pages/Delivery";
import MyOrders from "./pages/MyOrders";
import NewOrders from "./pages/NewOrders";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<StartPage />}></Route>
          <Route path="/delivery" element={<Delivery />}></Route>
          <Route path="/home/myorders" element={<MyOrders />}></Route>
          <Route path="/delivery/neworders" element={<NewOrders />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
