import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../slices/cartSlice';
import { addOrder } from "../slices/orderSlice";
import { saveOrdersToStorage } from "../utils/orderStorage";


const OrderSummary = () => {
  const [orderData, setOrderData] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const { orders } = useSelector((store) => store.allOrder);
  const cart = useSelector((store) => store.cart.cartItems);
  const cartItems = Object.values(cart);

  // Get orderId from URL
  const query = new URLSearchParams(location.search);
  const orderId = query.get("orderId");

  useEffect(() => {
    if (!orderId || !user?.email) return;
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('orderData='));

    if (cookie) {
      try {
        let value = cookie.split('=')[1];
        value = decodeURIComponent(value)
        const data = JSON.parse(decodeURIComponent(value));
        console.log("OrderData:", data);
        setOrderData(data);
                const newOrder = {
          orderId: Date.now(),
          items: cartItems,
          totalAmount: (data.data.amount / 100).toFixed(2),
          address: "83 New Nand Puri Kanker Khera, Mrt",
          status: data.data.state,
          createdAt: new Date()
        };

        const updatedOrders = [newOrder, ...orders];

        // 1. Redux update
        dispatch(addOrder(newOrder));

        // 2. Save to localStorage
        saveOrdersToStorage(user?.email, updatedOrders);
        dispatch(clearCart({ userKey: `cart_${user.email}` }));
      } catch (error) {
        console.error("Invalid order cookie:", error);
      }

    }
  }, [orderId, user?.email, dispatch]);


  return (
    <div className='w-full flex flex-col gap-[10px] h-fit items-center justify-center'>
      <p className='text-[30px] text-gray-400 font-semibold'>Congratulation order placed!!- {(orderData?.data?.amount / 100).toFixed(2)}</p>
      <p className='text-[20px] text-gray-500 font-semibold'>TransactionId:{orderId}</p>
    </div>
  )
}

export default OrderSummary
