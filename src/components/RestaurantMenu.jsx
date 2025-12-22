import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// import { MENU_API_URL } from '../config/constant';
import Restaurantcard from './Restaurantcard';
import "../styles/RestaurantMenu.css";
import useRestaurant from '../utils/useRestaurant';
import { IMAGE_CDN_URL } from '../config/constant';
import { MdStarRate } from "react-icons/md";
import RestaurantMenuCategory from './RestaurantMenuCategory'
function RestaurantMenu() {
  const [showIndex, setShowIndex]= useState(0);
  const { resId } = useParams();
  const restaurantInfo = useRestaurant(resId);
  const {
    id,
    cloudinaryImageId,
    name,
    avgRatingString,
    costForTwo,
    totalRatingsString,
    cuisines,
    locality,
    sla,
  } = restaurantInfo?.cards[2]?.card?.card?.info || {};

  const cards = restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  return (
    <div className="w-[60%]">
      <div className="w-full flex items-center bg-black text-white shadow-md p-[20px] rounded-[8px] my-[25px] overflow-hidden">
        <img
          className="w-[250px] h-[150px] object-cover rounded-[8px] mr-[40px] hover:scale-[1.1] transition-transform duration-300 ease-in-out"
          src={IMAGE_CDN_URL + cloudinaryImageId}
          alt={name}
        />

        <div className="flex flex-col justify-center gap-[5px">
          <p className="text-[25px] font-bold">{name}</p>
          <h3 className="text-[#bcbcbc] font-semibold text-[17px]">
            {locality}
          </h3>
          <p className="text-[15px] text-[#c1b9b9]">{cuisines?.join(", ")}</p>

          <h4 className="text-[#eceaea] flex gap-[20px] font-semibold mt-1">
            <div className="flex items-center">
              <MdStarRate
                className="w-[18px] h-[18px] rounded-[50%] p-[2px] mr-[5px]"
                style={
                  avgRatingString > 4.0
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "red" }
                }
              />
              <span>
                {avgRatingString || 3.8} ({totalRatingsString || "1K+ ratings"})
              </span>
            </div>
            <span>|</span>
            <span className="time">{sla?.slaString}</span>
          </h4>
        </div>
      </div>
      {/* Category Accordians */}
      {cards.map((category, index) => (
        // Controlled Component
        <RestaurantMenuCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showMenuItems={index === showIndex}
          setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
        />
      ))}
    {/* <div className='restaurant-menu flex justify-center-safe gap-2 max-w-xs md:max-w-2xl !p-8 !m-8
     w-full bg-white rounded-lg shadow-sm shadow-gray-800'>

      <div className="right-side w-3/5 sm:!pl-[60px] !pl-[10px]">
        <h2 className='sm:text-4xl text-2xl font-bold text-[#273a6e]
         underline !mb-[4px] indent-[5px] sm:tracking-[8px]'>FOOD MENU</h2>
        <ul>
          {console.log("cards", cards)}
          {
            cards.map((e, ind) => {
              const title = e?.card?.card?.title;
              const items = e?.card?.card?.itemCards;
              if (!items) return null;
              return (
                <li key={ind}>
                  <h2 className='text-2xl bg-[#273a6e] text-white text-center py-2 align-top leading-[33px]'>{title}</h2>
                  <ul style={{marginBottom: 10}}>
                    {items?.map((c) => {
                      return (
                        <li key={c?.card?.info?.id} className='font-medium'>
                          <span>{c?.card?.info?.name}</span><span className='float-right'>{c?.card?.info?.price}</span></li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
        </ul>
      </div>
    </div> */}
      </div>
  )
}

export default RestaurantMenu