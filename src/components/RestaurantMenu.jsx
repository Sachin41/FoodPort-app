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

        <div className="flex flex-col justify-center gap-[5px]">
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
            <span className="time">{sla?.deliveryTime-5}-{sla?.deliveryTime} Mins</span>
          </h4>
        </div>
      </div>
      {/* Category Accordians */}
      {cards.map((category, index) => (
        // Controlled Component
        <RestaurantMenuCategory
          key={category?.card?.card?.title}
          restInfo = {{restId: id, restName: name}}
          data={category?.card?.card}
          showMenuItems={index === showIndex}
          setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
        />
      ))}
      </div>
  )
}

export default RestaurantMenu