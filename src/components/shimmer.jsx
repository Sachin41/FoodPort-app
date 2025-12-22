import React from "react";

export default function Shimmer() {
  return (
    <div className="body">
      <div className="shimmer-search-box"></div>
      <div className="restaurant-container">
        {
        Array(12).fill("").map((val, ind)=><div key={ind} className="shimmer-card"></div>)
        }
      </div>
    </div>
  );
}
