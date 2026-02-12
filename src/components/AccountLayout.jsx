import { useState } from "react";
// import {
//   User,
//   MapPin,
//   CreditCard,
//   ShoppingBag,
// } from "lucide-react";
import { FaRegUser, FaMapMarkerAlt, FaShoppingBag, FaCreditCard } from "react-icons/fa";
import AddressList from './AddressList';

const menuItems = [
    { id: "profile", label: "Profile", icon: FaRegUser },
    { id: "addresses", label: "Addresses", icon: FaMapMarkerAlt },
    { id: "orders", label: "Orders", icon: FaShoppingBag },
    { id: "payments", label: "Payments", icon: FaCreditCard },
];

export default function AccountLayout({user}) {
    const [active, setActive] = useState("profile");

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
                    <h1 className="!text-2xl font-bold">No Orders</h1>
                )}

                {active === "profile" && (
                    <div className='w-[80%]'>
                        <h1 className="!text-[25px] mb-3 font-bold">
                            Profile
                        </h1>
                        <h2 className='!text-xl font-semibold'>{user?.userName}</h2>
                        <h3 className='!text-xl font-semibold'>{user?.email}</h3>
                        {/* <AddressList /> */}
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
