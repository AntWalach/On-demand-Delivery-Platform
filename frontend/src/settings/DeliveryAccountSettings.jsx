import React from 'react';
import { useLocation } from 'react-router-dom';
import AccountSettings from '../pages/AccountSettings';

function DeliveryAccountSettings() {
  const location = useLocation();
  const source = location.state?.source;
  return (
    <AccountSettings userType="Delivery" source={source} />
  );
}

export default DeliveryAccountSettings;
