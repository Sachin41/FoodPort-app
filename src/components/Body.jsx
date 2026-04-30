import React, { useEffect, useState } from 'react'
import restaurantLists from '../config/mockData';
import Shimmer from './shimmer';
import Restaurantcard from './Restaurantcard';
import {
  SWIGGY_API_URL,
  SWIGGY_REST_API_PATH,
} from '../config/constant'

export default function Body() {
    const [searchText, setSearchText] = useState('');
    const [restaurants, setRestaurants] = useState(restaurantLists);
  const fetchData = async () => {
    try {
    //   const data = await fetch(SWIGGY_API_URL);
    //   const json = await data.json();
    //   const restaurants = eval("json?." + SWIGGY_REST_API_PATH) || [];
    //   console.log("data", restaurants)
    //   setRestaurantList(restaurants);
    //   setFilteredRestaurants(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    useEffect(() => {
        handleSearch(searchText);
    }, [searchText])
    function handleSearch(searchText) {
        if (searchText.length > 0) {
            let filterRestaurant = restaurantLists.filter((list) => (
                list.info.name.toLowerCase().includes(searchText.toLowerCase())
                || list.info.areaName.toLowerCase().includes(searchText.toLowerCase())
                || list.info.cuisines.join("").toLowerCase().includes(searchText.toLowerCase())
            ));
            setRestaurants(filterRestaurant);
        } else {
            setRestaurants(restaurantLists);
        }
    }

    return restaurantLists.length === 0 ? (
        <Shimmer />
    ) : (
        <div className='body'>
            <div className="search-box">
                <input type="text" value={searchText} onChange={(e) => {
                    setSearchText(e.target.value);
                }}
                    name="search" id="search" placeholder="search a restaurant you want..." />
            </div>
            <div className="restaurant-container">
                {restaurants.length > 0 ?
                    restaurants.map((restaurant) => (
                        <Restaurantcard key={restaurant.info.id}
                        {...restaurant.info} />
                    )) : <h2>No Math found</h2>
                }
            </div>
        </div>
    )
}
