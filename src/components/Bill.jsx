import React from 'react'

const Bill = ({ total, deliveryFee, restaurantPackaging, platformFee, GST }) => {
  const grandTotal = total + deliveryFee + restaurantPackaging + platformFee + GST;

  return (
    <>
      <p className='text-md font-semibold text-black mb-2'>Bill Detail</p>
      <div className="flex justify-between w-full mb-[1px] text-sm text-gray-600 font-semibold">
        <p>Item Total</p>
        <p>₹{total}</p>
      </div>
      <div className="flex justify-between w-full mb-[1px] text-sm text-gray-600 font-semibold">
        <p>Delivery Fee | <span className='text-gray-400'>4.2 kms</span></p>
        <p>₹{deliveryFee}</p>
      </div>
      <div className="flex justify-between w-full pt-[2px] mb-2 border-t border-gray-200
              text-sm text-gray-600 font-semibold">
        <p>Restaurant Packaging</p>
        <p>₹{restaurantPackaging}</p>
      </div>
      <div className="flex justify-between w-full mb-[2px] text-sm text-gray-600 font-semibold">
        <p>Platform fee</p>
        <p>₹{platformFee}</p>
      </div>
      <div className="flex justify-between w-full mb-[2px] text-sm text-gray-600 font-semibold">
        <p>Restaurant GST | <span className='text-gray-400'>18%</span></p>
        <p>₹{GST}</p>
      </div>

      <div className="flex justify-between w-full pt-2 border-t">
        <p className="text-lg font-semibold text-black ">To Pay</p>
        <p className="text-lg font-semibold text-black">₹{Math.round(grandTotal)}</p>
      </div>
    </>
  )
}

export default Bill
