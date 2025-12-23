import React, { useState, useEffect } from 'react';
import FoodPort from "../assets/Images/FoodPort.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { setCartFromStorage } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
    setIsLoggedIn(!isLoggedIn)
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
          <li className='!p-0'><Link to="/" className='!text-black !p-[6px] align-text-top hover:!text-white hover:!bg-[#E46F20] hover:!rounded-[5px]'>Home</Link></li>
          <li className='!p-0'><Link to="/about" className='!text-black !p-[6px] align-text-top hover:!text-white hover:!bg-[#E46F20] hover:!rounded-[5px]'>About</Link></li>
          <li className='!p-0'><Link to="/contact" className='!text-black !p-[6px] align-text-top hover:!text-white hover:!bg-[#E46F20] hover:!rounded-[5px]'>Contact</Link></li>
          <li className='!p-0 flex justify-center items-center'>
            <Link to="/cart" className={`!text-black hover:!text-white hover:!bg-[#E46F20] !p-[6px] align-text-top hover:!rounded-[5px]`} >
              <FaCartArrowDown />
            </Link>
            {count > 0 && (<span className='text-[12px] p-[2px] relative
             right-[10px] bottom-[9px] w-[20px] h-[20px] text-white text-center bg-red-600 rounded-full' >{count}</span>)}
          </li>
          <li className='!p-0'>
            <button className='!bg-transparent !border-none !p-[6px] hover:!text-white hover:!bg-[#E46F20] hover:!rounded-[5px]' onClick={(e) => logInOut(e)}>
              {!isLoggedIn ? "Login" : "Logout"}
            </button>
          </li>
        </ul>
      </div>



    </div>
  )
}
