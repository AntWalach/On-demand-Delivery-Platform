import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Client/Home";
import StartPage from "./pages/StartPage";
import Login from "./pages/Login";
import Delivery from "./pages/Delivery/Delivery";
import MyOrders from "./pages/MyOrders";
import NewOrders from "./pages/NewOrders";
import HomeAccountSettings from "./settings/HomeAccountSettings";
import DeliveryAccountSettings from "./settings/DeliveryAccountSettings";
import Admin from "./pages/Admin";
import ClientWallet from "./pages/Client/ClientWallet";
import HistoryClient from "./pages/Client/HistoryCllient";
import DeliveryWallet from "./pages/Delivery/DeliveryWallet";
import HistoryDelivery from "./pages/Delivery/HistoryDelivery";
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
          <Route path="/home/account" element={<HomeAccountSettings userType="home" />} />
          <Route path="/delivery/account" element={<DeliveryAccountSettings userType="delivery"/>} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/home/wallet" element={<ClientWallet/>}/>
          <Route path="/home/history" element={<HistoryClient/>}/>
          <Route path="/delivery/wallet" element={<DeliveryWallet/>}/>
          <Route path="/delivery/history" element={<HistoryDelivery/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
