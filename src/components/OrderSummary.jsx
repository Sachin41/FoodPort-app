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
  const token = localStorage.getItem("token");

  // Get orderId from URL
  const query = new URLSearchParams(location.search);
  const orderId = query.get("orderId");

  async function getOrder(orderId) {
    try {
      const fetchedData = await fetch("http://localhost:8000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allOrder = await fetchedData.json();
      console.log("OrderData:", allOrder);
      const data = allOrder.orders.filter(o => o.phonePeTransactionId === orderId)
      setOrderData(data[0]);
      dispatch(clearCart({ userKey: `cart_${user.email}` }));
      // let value = cookie.split('=')[1];
      // value = decodeURIComponent(value)
      // const data = JSON.parse(decodeURIComponent(value));
      // const amount = Number(data[0]?.amount || 0);
      // const newOrder = {
      //   orderId: Date.now(),
      //   items: cartItems,
      //   totalAmount: (amount / 100).toFixed(2),
      //   address: "83 New Nand Puri Kanker Khera, Mrt",
      //   status: data?.data?.state,
      //   createdAt: new Date()
      // };

      // 1. Redux update
      // dispatch(addOrder(newOrder));

      // 2. Save to localStorage
      // saveOrdersToStorage(user?.email, [newOrder, ...orders]);

    } catch (error) {
      console.error("data fetching failure:", error);
    }
  }
  useEffect(() => {
    if (!orderId || !user?.email) return;
    // const cookie = document.cookie
    //   .split('; ')
    //   .find(row => row.startsWith('orderData='));

    // if (!cookie) {
    //   console.warn("Order cookie not found");
    //   return;
    // }

    getOrder(orderId);

  }, [orderId, user?.email]);

  const orderAmount = Number(orderData?.amount || 0);
  return (
    <div className='w-full flex flex-col gap-[10px] h-fit items-center justify-center'>
      <p className='text-[30px] text-gray-400 font-semibold'>Congratulation order placed!!- ₹{orderAmount}</p>
      <p className='text-[20px] text-gray-500 font-semibold'>TransactionId:{orderId}</p>
    </div>
  )
}

export default OrderSummary
