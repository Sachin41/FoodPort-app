import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsToCart } from '../slices/cartSlice';
const CartItem = ({ details }) => {
    const dispatch = useDispatch();
  const user  = useSelector((store) => store.auth.user);
    const { name, price, imageId } = details.item;
    const { quantity } = details;
    console.log(quantity);
    const handleRemoveFromCart = (item) => {
        console.log("remove to cart clicked");
        dispatch(removeItemsToCart({
            ...item,
            id: item.id,
            userKey: `cart_${user.email}`,
        }))
    }
    const handleAddToCart = (item) => {
        console.log("add to cart clicked");

        dispatch(
            addItemsToCart({
                ...item,
                id: item.id,
                userKey: `cart_${user.email}`,
            })
        );
    }

    return (
        <div className='flex justify-between items-center gap-[50px] py-[10px] border-b border-[#5b5b5b] last:border-b-0' >
            <div className="flex gap-[30px] w-[75%]">
                <img
                    className="w-[90px] h-[60px] object-cover rounded-[8px]"
                    // src={IMAGE_CDN_URL + imageId}
                    src={"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"}
                    alt={name}
                />
                <div className='w-full mt-1'>
                    <p className="text-[15px] font-bold text-black">{name}</p>
                    <p className="font-semibold text-gray-600">{price}</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="border text-sm border-[#5b5b5b] !bg-white text-green-600 font-semibold rounded-md flex items-center justify-between">
                    <button className="!rounded-r-none !bg-white !px-[8px] !py-[4px] cursor-pointer border-none hover:bg-gray-300 hover:text-green-800 transition-all 0.3s"
                        onClick={() => handleRemoveFromCart(details.item)}>
                        -
                    </button>
                    <span className="px-2">{quantity}</span>
                    <button className="!rounded-l-none !bg-white !px-[8px] !py-[4px] cursor-pointer border-none hover:bg-gray-300 hover:text-green-800 transition-all 0.3s"
                        onClick={() => handleAddToCart(details.item)}>+</button>
                </div>
                <p className="font-semibold text-black ml-6">₹{Number(price.replace("₹", "")) * quantity}</p>
            </div>
        </div>
    )
}

export default CartItem
