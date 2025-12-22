import React, { useState } from 'react';
import FoodPort from "../assets/Images/FoodPort.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const count = useSelector((store)=>store.cart.totalItems);
  console.log(count)

  function logInOut(e) {
    console.log(e.target.innerHTML)
    if (e.target.innerHTML === "Login") {
      navigate('/login');
    }
    setIsLoggedIn(!isLoggedIn)
  }
  return (
    <div className='header'>
      <div className='logo-container'>
        <Link to="/">
          <img className='logo' src={FoodPort} alt="logo" />
        </Link>
      </div>
      <div className='nav-items'>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li className='flex justify-center items-center px-2 cursor-pointer text-inherit hover:text-white hover:bg-[#E46F20] hover:rounded-[5px]'>
            <Link to="/cart" >
            <FaCartArrowDown />
            </Link>
            <span className='text-sm p-[2px] ml-[-6px] mt-[-19px] w-[25px] h-[25px] text-white text-center bg-red-600 rounded-full' >{count}</span>
            </li>
        </ul>
      </div>

      <button onClick={(e) => logInOut(e)}>
        {!isLoggedIn ? "Login" : "Logout"}
      </button>

    </div>
  )
}
