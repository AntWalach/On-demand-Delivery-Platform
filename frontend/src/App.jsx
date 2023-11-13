import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import StartPage from "./pages/StartPage";
import Login from "./pages/Login";
import Delivery from "./pages/Delivery";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<StartPage />}></Route>
          <Route path="/delivery" element={<Delivery/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
