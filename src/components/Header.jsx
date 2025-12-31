import React, { useState, useEffect } from 'react';
import FoodPort from "../assets/Images/FoodPort.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { setCartFromStorage } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from "../utils/AuthContext";

export default function Header() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [loggedinUser, setLoggedinUser] = useState({});
  const { logout, user } = useAuth();
  // useEffect(() => {
  //   setIsLoggedIn(JSON.parse(localStorage.getItem("isAuth")));
  //   setLoggedinUser(JSON.parse(localStorage.getItem("loggedinUser")));
  // }, [])
  const navigate = useNavigate();
  const count = useSelector((store) => store.cart.totalItems);
  console.log(count);
  const dispatch = useDispatch();
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(setCartFromStorage(JSON.parse(storedCart)));
    }
  }, [dispatch]);

  function logInOut(e) {
    console.log(e.target.innerHTML)
    if (e.target.innerHTML === "Login") {
      navigate('/login');
    }
    else {
      // localStorage.setItem("isAuth", false);
      // localStorage.removeItem("loggedinUser");
      logout();
      // setLoggedinUser({});
      // setIsLoggedIn(!isLoggedIn);
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
            <Link to="/cart" className={`!text-black hover:!text-white hover:!bg-[#253772] !p-[6px] align-text-top hover:!rounded-[5px]`} >
              <FaCartArrowDown />
            </Link>
            {count > 0 && (<span className='text-[12px] p-[2px] relative
             right-[10px] bottom-[9px] w-[20px] h-[20px] text-white text-center bg-red-600 rounded-full' >{count}</span>)}
          </li>
          <li className='!p-0 flex justify-center items-center'>
            {!!user ?
            <Link to="/user" className='flex justify-center items-center gap-[4px] !text-black !p-[6px] align-text-middle hover:!text-white hover:!bg-[#253772] hover:!rounded-[5px]'>
              <span><FaRegUserCircle /></span>{user?.userName.slice(0, 2).toUpperCase()}
              </Link> : ""       
            }
            <button className='!bg-transparent !border-none !p-[6px] hover:!text-white hover:!bg-[#253772] hover:!rounded-[5px]'
              onClick={(e) => logInOut(e)}>
              {!!user ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>



    </div>
  )
}
