import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className='footer flex justify-center align-center !text-xl !bg-white shadow-[-2px_7px_5px_-6px_#0000009c]'>
      <p>Created By</p>
      <p className=' ml-[5px] text-purple-900 font-bold'>❤️ Sachin Kumar</p>
      <p> <span className="ml-[5px] text-[20px]">&copy;</span>{year} </p>
      <p className='pl-[5px] font-bold'> <span className='text-[#273a6e]'>Food</span><span className='text-[#9bc65f]'> Port</span> </p>
    </div>
  )
}
