import React, { useState, useEffect } from 'react';
import FoodPort from "../assets/Images/FoodPort.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { setCartFromStorage } from '../slices/cartSlice';
import { logoutUser } from "../slices/authSlice";
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  const isAuthenticated = useSelector(
    (store) => store.auth.isAuthenticated
  );
  let count = useSelector((store) => store.cart.totalItems);
  console.log(count);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      const cartKey = `cart_${user.email}`;      
      const storedCart = JSON.parse(localStorage.getItem(cartKey)) || {};
      dispatch(setCartFromStorage(storedCart));
    } 
  }, [dispatch]);

  function logInOut(e) {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(logoutUser());
    }
  }

  function handleCartClick(e) {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  }
  return (
    <div className='header h-20 !bg-white !text-md shadow-[-2px_7px_5px_-6px_#0000009c] font-bold'>
      <div className='logo-container'>
        <Link to="/">
          <img className='logo' src={FoodPort} alt="logo" />
        </Link>
      </div>
      <div className='nav-items'>
        <ul className='list-none flex items-center'>
          <li className='!p-0'><Link to="/" className='!text-black !p-[6px] align-text-top hover:!text-white hover:!bg-[#253772] hover:!rounded-[5px]'>Home</Link></li>
          <li className='!p-0'><Link to="/about" className='!text-black !p-[6px] align-text-top hover:!text-white hover:!bg-[#253772] hover:!rounded-[5px]'>About</Link></li>
          <li className='!p-0'><Link to="/contact" className='!text-black !p-[6px] align-text-top hover:!text-white hover:!bg-[#253772] hover:!rounded-[5px]'>Contact</Link></li>
          <li className='!p-0 flex justify-center items-center'>
            <Link onClick={handleCartClick} className={`!text-black hover:!text-white hover:!bg-[#253772] !p-[6px] align-text-top hover:!rounded-[5px]`} >
              <FaCartArrowDown />
            </Link>
            {user && count > 0 && (<span className='text-[12px] p-[2px] relative
             right-[10px] bottom-[9px] w-[20px] h-[20px] text-white text-center bg-red-600 rounded-full' >{count}</span>)}
          </li>
          <li className='!p-0 flex justify-center items-center'>
            {user && (
              <Link to="/user" className='flex justify-center items-center gap-[4px] !text-black !p-[6px] align-text-middle hover:!text-white hover:!bg-[#253772] hover:!rounded-[5px]'>
                <span><FaRegUserCircle /></span>{user?.userName.slice(0, 2).toUpperCase()}
              </Link>)
            }
            <button className='!bg-transparent !border-none !p-[6px] hover:!text-white hover:!bg-[#253772] hover:!rounded-[5px]'
              onClick={(e) => logInOut(e)}>
              {user ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>



    </div>
  )
}
