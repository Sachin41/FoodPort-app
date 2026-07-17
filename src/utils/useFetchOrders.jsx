import React, { useEffect, useState } from 'react'

const useFetchOrders = (user) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            const token = localStorage.getItem("token");
            getOrder(token);
        }
    }, []);

    const getOrder = async (token) => {
        try {
            const fetchedData = await fetch("http://localhost:8000/api/orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await fetchedData.json();
            setOrders(res.orders);
        } catch (error) {
            console.error("order fetching failed:", error)
        }
    }

    return orders;
}

export default useFetchOrders
