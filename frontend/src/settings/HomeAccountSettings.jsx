import React from "react";
import { useLocation } from "react-router-dom";
import AccountSettings from "../pages/AccountSettings";

function HomeAccountSettings() {
  const location = useLocation();
  const source = location.state?.source;

  return <AccountSettings userType="Home" source={source} />;
}

export default HomeAccountSettings;
