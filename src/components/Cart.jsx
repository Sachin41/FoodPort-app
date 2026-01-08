import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { clearCart, setCartFromStorage } from '../slices/cartSlice';
import Bill from './Bill';
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Cart = () => {
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


  return (
    <>
      {cartItems.length > 0 ? (
        <div className='w-[70%]'>
          <div className='text-center mt-4'><p className="text-gray-600 text-[48px] font-semibold">Cart</p></div>
          <div className="flex items-center  w-full justify-between mb-4">
            <Link to={"/restaurant/" + resId} className='flex items-center text-[18px] font-bold !text-gray-600 mt-4 cursor-pointer !hover:bg-[gray]'>
              <IoChevronBackSharp /> <span>Back to Menu </span>
            </Link>
            <button className='!bg-[orange] !border-none text-white
             font-bold !py-2 !px-4 rounded-lg cursor-pointer !hover:bg-[green]' onClick={() => handleClearCart()}>Clear Cart</button>
          </div>
          <div className="flex w-full gap-[20px]">
            <div className="w-full h-full bg-white rounded-md p-4">
              {/* Cart Section */}
              {cartItems.map((menu) => {
                return (<CartItem key={menu.item.id} details={menu} />)
              })}
            </div>

            <div className="w-full h-full bg-white rounded-md p-4">
              {/* Bill Section */}
              <Bill total={total} />
            </div>

          </div>
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
    </>
  )
}

export default Cart
