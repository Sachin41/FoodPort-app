import React, { useState, useEffect } from 'react'
import mockMenuData from '../config/mockMenuData.json'

const useRestaurant = (resId) => {
     const [restaurant, setRestaurant] = useState(null);
  console.log("param", resId);
  async function fetchMenuData() {
    try {
      const data = await mockMenuData[resId];
      console.log(data)
      // debugger
      if (data) {
        setRestaurant(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }
  useEffect(() => {
    fetchMenuData();
  }, [resId])
  return restaurant;
}

export default useRestaurant
