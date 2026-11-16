import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Payment = ({ grandTotal, cartItems, checkoutAddress, user }) => {
  // const navigate = useNavigate()
  // const user = useSelector((store) => store.auth.user);

  const API_URL = import.meta.env.VITE_API_URL;
  const data = {
    userId: user._id,
    name: user.name,
    amount: grandTotal,
    number: user.phone,
    orderItems: cartItems,
    address: checkoutAddress,
    transactionId: 'T' + Date.now(),
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/api/payment/order`, { ...data }).then(res => {

      console.log(res)
      if (res.data && res.data.success === true) {
        window.location.href = res.data.data.instrumentResponse.redirectInfo.url;
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
