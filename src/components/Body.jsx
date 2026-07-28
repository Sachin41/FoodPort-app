import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import restaurantLists from '../config/mockData';
import Shimmer from './shimmer';
import Restaurantcard from './RestaurantCard';
import {
    SWIGGY_API_URL,
    SWIGGY_REST_API_PATH,
} from '../config/constant'

export default function Body() {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const items_per_page = 10;

    const [restaurants, dispatch] = useReducer(stateReducer, []);
    const searchRef = useRef();

    //   const fetchData = async () => {
    //     try {
    //       const data = await fetch(SWIGGY_API_URL);
    //       const json = await data.json();
    //       const restaurants = eval("json?." + SWIGGY_REST_API_PATH) || [];
    //       console.log("data", restaurants)
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };

    function stateReducer(state, action) {
        console.log("action page:", action.page)
        switch (action.type) {
            case "search":
                return restaurantLists.filter((list) =>
                    list.info.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                );
            case "load":
                return restaurantLists.slice(0, action.page * items_per_page);
        }

    }

    useEffect(() => {
        dispatch({ type: "load", page: page + 1 });
    }, []);

    const throttle = (func, limit = 200) => {
        let inThrottle = false;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                }, limit);
            }
        }

    }

    const handleScroll = () => {
        console.log("Current Scroll Position:", window.scrollY);
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (!loading && (scrollTop + windowHeight) >= documentHeight - 100) {
            console.log("load More")
            if (hasMore) loadMoreRestaurants();
        }
    }

    const throttledScroll = useMemo(
        () => throttle(handleScroll, 300),
        [handleScroll]
    );

    useEffect(() => {
        setHasMore(restaurants.length < restaurantLists.length);
        window.addEventListener("scroll", throttledScroll);

        return () => {
            window.removeEventListener("scroll", throttledScroll);
        };
    }, [throttledScroll]);




    const loadMoreRestaurants = () => {
        setLoading(true);

        setTimeout(() => {
            const filterText = !!searchRef.current.value
            if (hasMore === true && !filterText) {
                console.log("Not filtered")
                setPage(prev => prev + 1);
                dispatch({ type: "load", page: page + 1 })
            }
            if (hasMore === true && filterText) {
                console.log("filtered")
                setPage(prev => prev + 1);
                dispatch({ type: "search" })
            }

            setHasMore(restaurants.length < restaurantLists.length);
            setLoading(false);
        }, 300);
    };


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
                console.log("SearhRef:", searchRef.current.value);
                dispatch({ type: "search" });
                setPage(prev => prev + 1);
                setHasMore(restaurants.length < restaurantLists.length);
            }, 200),
        []
    );

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        debouncedSearch(e.target.value);
    };

    return (
        <div className='body'>
            <div className="search-box lg:w-1/2 md:w-2/3 w-80">
                <input ref={searchRef} type="text" value={searchText} onChange={(e) => {
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
            {loading && (restaurants.length < restaurantLists.length) && (
                <div className="flex justify-center py-6">
                    <Shimmer />
                </div>
            )}
        </div>
    )
}
