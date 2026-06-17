import React, { useCallback, useEffect, useMemo, useState } from 'react'
import restaurantLists from '../config/mockData';
import Shimmer from './shimmer';
import Restaurantcard from './RestaurantCard';
import {
    SWIGGY_API_URL,
    SWIGGY_REST_API_PATH,
} from '../config/constant'

export default function Body() {
    const [searchText, setSearchText] = useState('');
    const [restaurants, setRestaurants] = useState(restaurantLists);
    //   const fetchData = async () => {
    //     try {
    //       const data = await fetch(SWIGGY_API_URL);
    //       const json = await data.json();
    //       const restaurants = eval("json?." + SWIGGY_REST_API_PATH) || [];
    //       console.log("data", restaurants)
    //       setRestaurantList(restaurants);
    //       setFilteredRestaurants(restaurants);
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };

    //   useEffect(() => {
    //     fetchData();
    //   }, []);

    // useEffect(() => {
    //     const timer = setTimeout(()=>{
    //         handleSearch(searchText);
    //     }, 500)
    //     return ()=> clearTimeout(timer);
    // }, [searchText])

    const debounce = (func, delay) => {
        console.log("debounce")
        let timer;
        return (...args) => {
            console.log("args", ...args);
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay)
        }
    }

    const debouncedSearch = useMemo(
        () =>
            debounce((searchText) => {
                console.log("Searching:", searchText);

                const filtered = restaurantLists.filter((list) =>
                    list.info.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                );

                setRestaurants(filtered);
            }, 500),
        [restaurantLists]
    );

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        debouncedSearch(e.target.value);
    };

    return restaurantLists.length === 0 ? (
        <Shimmer />
    ) : (
        <div className='body'>
            <div className="search-box lg:w-1/2 md:w-2/3 w-80">
                <input type="text" value={searchText} onChange={(e) => {
                    handleSearch(e)
                }}
                    name="search" id="search" placeholder="search a restaurant you want..." />
            </div>
            <div className="restaurant-container gap-4 w-auto sm:w-full">
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
