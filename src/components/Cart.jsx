import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { clearCart } from '../slices/cartSlice';
import Bill from './Bill';

const Cart = () => {
  const cart = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();
  const cartItems = Object.values(cart);
  console.log(cartItems, "CART")
  const handleClearCart = () => {
    console.log("clear Cart");
    dispatch(clearCart());

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
          <div className="flex w-full justify-between mt-12 mb-4 items-center">
            <p className="text-gray-600 text-[40px] font-semibold">Cart</p>
            <button className='!bg-[orange] text-white
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
