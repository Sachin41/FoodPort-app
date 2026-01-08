import React from 'react'
import RestaurantMenuItemList from './RestaurantMenuItemList'
import { MdKeyboardArrowUp } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";

const RestaurantMenuCategory = ({restInfo, data, showMenuItems, setShowIndex }) => {
  return (
      <div className="w-full shadow-md px-[20px] bg-gray-50 rounded-md py-[10px] my-[30px]">
        {/* Category Header */}
        <div
          className="flex justify-between items-center text-xl font-extrabold cursor-pointer"
          onClick={()=>setShowIndex() }
        >
          <span>{`${data?.title.slice(0, 40)} (${
            data?.itemCards?.length
          })`}</span>
          <div className="text-[40px]">
            {showMenuItems ? <MdKeyboardArrowUp /> : <RiArrowDownSLine />}
          </div>
        </div>

        {/* Category Body */}
        {showMenuItems && <RestaurantMenuItemList restInfo= {restInfo} items={data?.itemCards} />}
      </div>
  )
}

export default RestaurantMenuCategory
