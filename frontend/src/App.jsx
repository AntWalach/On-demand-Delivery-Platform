import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Client/Home";
import StartPage from "./pages/StartPage";
import Login from "./pages/Login";
import Delivery from "./pages/Delivery/Delivery";
import MyOrders from "./pages/Client/MyOrders";
import NewOrders from "./pages/Delivery/NewOrders";
import HomeAccountSettings from "./settings/HomeAccountSettings";
import DeliveryAccountSettings from "./settings/DeliveryAccountSettings";
import Admin from "./pages/Admin/Admin";
import ClientWallet from "./pages/Client/ClientWallet";
import HistoryClient from "./pages/Client/HistoryCllient";
import DeliveryWallet from "./pages/Delivery/DeliveryWallet";
import HistoryDelivery from "./pages/Delivery/HistoryDelivery";
import AdminClient from "./pages/Admin/AdminClient";
import AdminDelivery from "./pages/Admin/AdminDelivery";
import AdminOrders from "./pages/Admin/AdminOrders";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<StartPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/home/myorders" element={<MyOrders />}></Route>
          <Route path="/home/wallet" element={<ClientWallet/>}/>
          <Route path="/home/history" element={<HistoryClient/>}/>
          <Route path="/home/account" element={<HomeAccountSettings userType="home" />} />
          <Route path="/delivery" element={<Delivery />}></Route>
          <Route path="/delivery/neworders" element={<NewOrders />}></Route>
          <Route path="/delivery/wallet" element={<DeliveryWallet/>}/>
          <Route path="/delivery/history" element={<HistoryDelivery/>}/>
          <Route path="/delivery/account" element={<DeliveryAccountSettings userType="delivery"/>} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/admin/client" element={<AdminClient/>}/>
          <Route path="/admin/delivery" element={<AdminDelivery/>}/>
          <Route path="/admin/orders" element={<AdminOrders/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
