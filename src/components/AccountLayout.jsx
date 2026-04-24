import { useState } from "react";
import { FaRegUser, FaMapMarkerAlt, FaShoppingBag, FaCreditCard } from "react-icons/fa";
import AddressList from './AddressList';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../slices/orderSlice";
import { getOrdersFromStorage } from "../utils/orderStorage";

const menuItems = [
    { id: "profile", label: "Profile", icon: FaRegUser },
    { id: "addresses", label: "Addresses", icon: FaMapMarkerAlt },
    { id: "orders", label: "Orders", icon: FaShoppingBag },
    { id: "payments", label: "Payments", icon: FaCreditCard },
];

export default function AccountLayout({ user }) {
    const [active, setActive] = useState("profile");

    const dispatch = useDispatch();
    const { orders } = useSelector((store) => store.allOrder);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            const storedOrders = getOrdersFromStorage(user._id);
            dispatch(setOrders(storedOrders.reverse()));
        }
    }, []);

    return (
        <div className="flex h-screen max-h-[75vh] bg-gray-100 w-[90%]">
            {/* Sidebar */}
            <div className="w-64 bg-gray-200 p-6">
                <div className="space-y-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left
                ${active === item.id
                                        ? "!text-orange-500"
                                        : "!shadow-md hover:!bg-gray-300"
                                    }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-10 bg-white">
                {active === "orders" && (
                    <div className="p-4">

                        {orders.length === 0 ? (
                            <h1 className="!text-2xl font-bold">No Orders</h1>
                        ) : (
                            orders.map(order => (
                                <div key={order.orderId} className="border p-3 mb-3 rounded">
                                    <p><strong>Order ID:</strong> {order.orderId}</p>
                                    <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                                    <p><strong>Status:</strong> {order.status}</p>

                                    {order.items.map((item, i) => (
                                        <p key={i}>{item.name} x {item.quantity}</p>
                                    ))}
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
                        <h2 className='!text-xl font-semibold'>{user?.userName}</h2>
                        <h3 className='!text-xl font-semibold'>{user?.email}</h3>
                    </div>

                )}

                {active === "payments" && (
                    <h1 className="!text-2xl font-bold">
                        Payment Methods
                    </h1>
                )}

                {active === "addresses" && (
                    <AddressList />
                )}
            </div>
        </div>
    );
}
