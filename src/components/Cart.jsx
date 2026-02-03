import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { clearCart, setCartFromStorage } from '../slices/cartSlice';
import Bill from './Bill';
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import AddressList from './AddressList';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Payment from './Payment';

const Cart = () => {
  const [checkoutSection, setCheckoutSection] = useState("address")
  const cart = useSelector((store) => store.cart.cartItems);
  const cartItems = Object.values(cart);
  const resId = cartItems?.[0]?.item?.id?.split("_")?.[0];
  console.log(resId, "Restaurant Id");
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      const cartKey = `cart_${user.email}`;
      const storedCart = JSON.parse(localStorage.getItem(cartKey)) || {};
      dispatch(setCartFromStorage(storedCart));
    }
  }, []);
  console.log(cartItems, "CART")
  const handleClearCart = () => {
    console.log("clear Cart");
    dispatch(clearCart({ userKey: `cart_${user.email}` }));

  }


  const total = cartItems.reduce((total, it) => {
    const price = Number(it.item.price.replace("₹", ""));
    return total + price * it.quantity;
  }, 0);
  console.log(total);
  const deliveryFee = 36;
  const restaurantPackaging = 30;
  const platformFee = 15;
  const GST = total * 0.18;
  const grandTotal = Math.round(total + deliveryFee + restaurantPackaging + platformFee + GST);

  return (
    <div className='w-[90%]'>
      {cartItems.length > 0 ? (
        <div className='flex gap-8'>
          {checkoutSection === "address" && <div className='w-[70%] mt-4'>
            <div className="address-sec bg-white rounded-md p-4">
              <p className="text-gray-600 text-xl font-bold px-4">Choose a delivery Address </p>
              <AddressList isCart={true} />
              <div className="px-4 flex gap-4 mt-4 justify-end">
                <button className='!bg-[orange] !border-none text-white flex justify-center items-center gap-2 font-bold
                 !py-2 !px-4 rounded-lg cursor-pointer !hover:bg-[green]' onClick={() => setCheckoutSection("payment")}>
                  Proceed to Pay <FaArrowRight />
                </button>
              </div>
            </div>


          </div>}

          {checkoutSection === "address" && <div className="w-[30%] flex flex-col gap-[10px] mt-4">
            <div className="flex items-center bg-white p-4 shadow-md rounded-md w-full justify-between">
              <Link to={"/restaurant/" + resId} className='flex items-center text-[18px] font-bold !text-gray-600 cursor-pointer !hover:bg-[gray]'>
                <IoChevronBackSharp /> <span>Back to Menu </span>
              </Link>
              <a className='!border-none !text-[orange]
             font-bold rounded-lg cursor-pointer !hover:bg-[green]' onClick={() => handleClearCart()}>Clear Cart</a>
            </div>
            <div className="w-full h-full bg-white rounded-md px-4 py-2 max-h-[285px] overflow-auto">
              {/* Cart Section */}
              {cartItems.map((menu) => {
                return (<CartItem key={menu.item.id} details={menu} />)
              })}
            </div>

            <div className="w-full h-fit bg-white rounded-md px-4 py-2">
              {/* Bill Section */}
              <Bill {... { total, deliveryFee, restaurantPackaging, platformFee, GST }} />
            </div>

          </div>}
          
          {/* Payment section */}
          {checkoutSection === "payment" && <div className="payment-sec w-full bg-white rounded-md mt-4 p-4">
            <div className="px-4 flex gap-4 mt-4 justify-start">
              <button className='!bg-[orange] !border-none text-white flex justify-center items-center gap-2 font-bold
                 !py-2 !px-4 rounded-lg cursor-pointer !hover:bg-[green]' onClick={() => setCheckoutSection("address")}>
                <FaArrowLeft /> Back to Cart
              </button>
            </div>
            <p className="text-gray-600 text-[30px] font-semibold">Choose payment method</p>
            {/* <p className='text-gray-600 text-[20px] font-semibold'>To Pay: ₹{grandTotal}</p> */}
            <Payment grandTotal= {grandTotal} />
          </div>
          
          }
        </div>

      )
        : (
          <div className="flex flex-col items-center gap-[20px]">
            <p className="text-gray-600 text-[50px] font-semibold">Cart Empty</p>
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
              alt="Empty Cart"
              className="w-[300px] object-cover bg-white"
            />
            <div className="flex justify-center items-center flex-col">
              <p className="text-gray-600 font-semibold text-xl">
                Your cart is empty.
              </p>
              <p className="text-gray-600 text-lg text-center">
                Add something from the menu.
              </p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Cart
