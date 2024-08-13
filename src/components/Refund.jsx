import React from 'react';
import Title from './Title';

const Refund = () => {
  return (
   <div className='w-full'>
     <div className="terms-container  md:w-[60%] mx-auto text-[#1D1D1D] px-20 py-5">
     
      

      <Title>RETURNS AND REFUND POLICY</Title>
      <p className="my-4">
        At [Your Website Name], we are committed to ensuring your satisfaction with our products. If you are not completely satisfied with your purchase, you may be eligible for a return or refund under the following conditions:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>
          <strong>Eligibility for Returns:</strong> Products must be returned within [insert number] days from the date of delivery. To be eligible for a return, the item must be unused, in its original packaging, and in the same condition as when you received it. Certain items, such as perishable goods, custom-made products, or items on sale, may not be eligible for return.
        </li>
        <li>
          <strong>Return Process:</strong> To initiate a return, please contact our customer support team at [contact information]. Provide your order number, details of the product, and the reason for the return. Our team will provide you with instructions on how to return the item.
        </li>
        <li>
          <strong>Refunds:</strong> Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed, and a credit will automatically be applied to your original method of payment within [insert number] business days. Please note that shipping costs are non-refundable.
        </li>
        <li>
          <strong>Exchanges:</strong> If you need to exchange an item for the same product due to defects or damage, please contact us at [contact information]. We will arrange for a replacement item to be sent to you.
        </li>
        <li>
          <strong>Late or Missing Refunds:</strong> If you haven’t received a refund within the expected time frame, first check your bank account again. Then contact your credit card company or bank, as it may take some time before your refund is officially posted. If you’ve done all of this and still have not received your refund, please contact us at [contact information].
        </li>
        <li>
          <strong>Non-Returnable Items:</strong> Certain products may be exempt from returns due to their nature, such as perishable goods, digital products, gift cards, or final sale items. Please check the product description or contact our customer support team for clarification.
        </li>
      </ul>
      <p className="mt-4">
        By making a purchase on our website, you agree to this Returns and Refund Policy. We reserve the right to update or modify this policy at any time without prior notice. For further assistance, please contact our customer support team.
      </p>
    </div>
   </div>
  );
};

export default Refund;
