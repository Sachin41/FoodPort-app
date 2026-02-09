import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";

const OrderSummary = () => {
  const [orderData, setOrderData] = useState(null);
  const location = useLocation();

  // Get orderId from URL
  const query = new URLSearchParams(location.search);
  const orderid = query.get("orderId");

useEffect(() => {
  debugger
  if (!orderid) return;
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('orderData='));

  if (cookie) {
    let value = cookie.split('=')[1];
value = decodeURIComponent(value)
    const data = JSON.parse(decodeURIComponent(value));
    console.log("OrderData:", data);
    setOrderData(data);
  }
}, [orderid]);


  return (
    <div className='w-full flex flex-col gap-[10px] h-fit items-center justify-center'>
      <p className='text-[30px] text-gray-400 font-semibold'>Congratulation order placed!!- {(orderData?.data?.amount/100).toFixed(2)}</p>
      <p className='text-[20px] text-gray-500 font-semibold'>TransactionId:{orderid}</p>
    </div>
  )
}

export default OrderSummary
