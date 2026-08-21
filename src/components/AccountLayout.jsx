import { useState } from "react";
import { FaRegUser, FaMapMarkerAlt, FaShoppingBag, FaCreditCard } from "react-icons/fa";
import AddressList from './AddressList';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../slices/orderSlice";
import { getOrdersFromStorage } from "../utils/orderStorage";
import useFetchOrders from "../utils/useFetchOrders";
import AddressCard from "./AddressCard";
import { Link } from 'react-router-dom';

const menuItems = [
    { id: "profile", label: "Profile", icon: FaRegUser },
    { id: "addresses", label: "Addresses", icon: FaMapMarkerAlt },
    { id: "orders", label: "Orders", icon: FaShoppingBag },
    { id: "payments", label: "Payments", icon: FaCreditCard },
];

export default function AccountLayout({ user }) {
    const [active, setActive] = useState("profile");
    const orders = useFetchOrders(user);

    useEffect(() => {
        console.log("orders", orders)
    })

    return (
        <div className="flex bg-gray-100 lg:w-[90%] w-full">
            {/* Sidebar */}
            <div className="lg:w-64 bg-gray-200 p-6">
                <div className="space-y-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className={`flex items-center gap-3 w-full lg:!px-4 !px-0 lg:!py-3 !py-0 lg:bg-white-400 bg-transparent rounded-lg text-left
                ${active === item.id
                                        ? "!text-orange-500"
                                        : "!shadow-md hover:!bg-gray-300"
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="hidden md:inline">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 lg:p-8 px-4 py-6 bg-white">
                {active === "orders" && (
                    <div className="p-4">

                        {orders.length === 0 ? (
                            <h1 className="!text-2xl font-bold">No Orders</h1>
                        ) : (
                            orders.map(order => (
                                <div key={order._id} className="border p-3 mb-3 rounded flex">
                                    <div className="border-r border-[#5b5b5b] pr-4 mr-4 w-[35%]">
                                        <p><Link to={"/restaurant/" + order?.orderItems[0]?.restaurantId} className='items-center text-[18px] !overflow-x-hidden font-bold !text-gray-600 cursor-pointer !hover:bg-[gray]'>
                                            <span title={order.orderItems[0]?.restaurantName} className='truncate'>{order.orderItems[0]?.restaurantName}</span>
                                        </Link></p>
                                        <p><strong>Order ID:</strong> {order._id}</p>
                                        <p><strong>Status:</strong> {order.orderStatus}</p>  
                                        <p className="text-md text-gray-500">Ordered: {order.createdAt.slice(0, 9)}, {order.createdAt.slice(11, 16)}</p>  
                                                  
                                    </div>
                                    <AddressCard address={order?.orderAddress} />
                                    <div className="border-l border-[#5b5b5b] pl-4 ml-4 w-[30%] relative">
                                        <div className="w-full">
                                        {order.orderItems.map((item, i) => (
                                            <p className="text-[12px]" key={i}>{item.name} x {item.quantity} <span className="float-right">{item.price*item.quantity}</span></p>
                                        ))}
                                        </div>
                                        <p className="absolute border-t pb-2 bottom-0 w-[95%]"><strong>Bill Total:</strong> <span className="float-right">₹{order.amount}</span></p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                )}

                {active === "profile" && (
                    <div className='w-[80%]'>
                        <h1 className="!text-[25px] mb-3 font-bold">
                            Profile
                        </h1>
                        <h2 className='!text-xl font-semibold'>{user?.name}</h2>
                        <h3 className='!text-xl font-semibold'>{user?.email}</h3>
                    </div>

                )}

                {active === "payments" && (
                    <h1 className="!text-2xl font-bold">
                        Payment Methods
                    </h1>
                )}

                {active === "addresses" && (
                    <AddressList>
                        <p className="!text-[25px] mb-3 font-bold">
                            Manage Addresses
                        </p>
                    </AddressList>
                )}
            </div>
        </div>
    );
}
