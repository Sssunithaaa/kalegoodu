import React from 'react';
import PolicyForm from './AddDetails';

const ManageDetails = () => {
  console.log("Rendering ManageDetails Component");

  return (
    <div className='flex flex-col lg:flex-row'>
      <PolicyForm title="Returns and Refunds Policy" endpoint="returns-policy" />
      <PolicyForm title="Delivery Details" endpoint="delivery-details" />
      <PolicyForm title="Terms and Conditions" endpoint="terms-conditions" />
    </div>
  );
};

export default ManageDetails;
