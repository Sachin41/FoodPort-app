import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsToCart } from '../slices/cartSlice';
// import { IMAGE_CDN_URL } from '../config/constant';

const RestaurantMenuItemList = ({ items }) => {
    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cart.cartItems);
    const cartItems = Object.values(cart);
    const handleRemoveFromCart = (item) => {
        console.log("remove to cart clicked");
        dispatch(removeItemsToCart(item))
    }
    const handleAddToCart = (item) => {
        console.log("add to cart clicked");
        dispatch(addItemsToCart(item))
    }

    return (
        <div>
            {items?.map((item, ind) => {
                const { id, name, price, imageId, description } = item?.card?.info;
                const cartItem = cartItems.find(cartItem => cartItem.item.id === id)
                { console.log("id:", id) }
                // { console.log("cart Item:", cartItem.item) }
                return (
                    <div key={id} className={`flex justify-between items-center gap-[50px] py-[20px] ${ind === items.length - 1 ? ' ' : 'border-b border-[#5b5b5b]'}`} >
                        <div className="flex flex-col gap-[5px] w-[75%]">
                            <p className="text-[20px] font-bold text-gray-700">{name}</p>
                            <p className="font-semibold text-black">₹{price}</p>
                            <p className="text-gray-600 font-medium">
                                {(description && description.slice(0, 140)) || "Dummy Data"}
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img
                                className="w-[150px] h-[100px] object-cover rounded-[8px]"
                                // src={IMAGE_CDN_URL + imageId}
                                src={"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"}
                                alt={name}
                            />
                            {
                                cartItem ?
                                    (
                                        <div className="!bg-white text-green-600 font-semibold rounded-md relative bottom-[15px] flex items-center justify-between">
                                            <button className="!rounded-r-none !bg-white px-[12px] py-[5px] cursor-pointer border-none hover:bg-gray-300 hover:text-green-800 transition-all 0.3s"
                                                onClick={() => handleRemoveFromCart(cartItem.item)}>
                                                -
                                            </button>
                                            <span className="px-2">{cartItem.quantity}</span>
                                            <button className="!rounded-l-none !bg-white px-[12px] py-[5px] cursor-pointer border-none hover:bg-gray-300 hover:text-green-800 transition-all 0.3s"
                                             onClick={() => handleAddToCart(cartItem.item)}>+</button>
                                        </div>
                                    )
                                    : (
                                        <button
                                            className="w-[100px] text-green-600 !bg-white font-semibold rounded-md text-[1.2rem] px-[30px] py-[5px] cursor-pointer border-none relative bottom-[15px] hover:bg-gray-300 hover:text-green-800 transition-all 0.3s"
                                            onClick={() => handleAddToCart(item?.card?.info)}
                                        >
                                            ADD
                                        </button>
                                    )}

                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default RestaurantMenuItemList
