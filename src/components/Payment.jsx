import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Payment = ({ grandTotal }) => {
  const navigate = useNavigate()

  const data = {
    name: 'Vikas',
    amount: grandTotal,
    number: '9999999999',
    transactionId: 'T' + Date.now(),
  }

  const handlePayment = async (e) => {
    e.preventDefault();

    let res = await axios.post('http://localhost:8000/order', { ...data }).then(res => {

      console.log(res)
      if (res.data && res.data.data.instrumentResponse.redirectInfo.url) {
        navigate(res.data.data.instrumentResponse.redirectInfo.url);
      }
    })
      .catch(error => {
        console.error(error);
      });

  }

  return (
    <div className="max-w-sm mx-auto border shadow-xl rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-2">Complete Payment</h2>
      <p className="text-gray-500 mb-4">
        Pay securely using UPI / Card / NetBanking
      </p>

      <div className="flex justify-between mb-4">
        <span>Total Amount</span>
        <span className="font-bold">₹{grandTotal}</span>
      </div>

      <button
        onClick={handlePayment}
        className="w-full !bg-green-600 !hover:bg-green-700 text-white py-2 rounded-lg transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
