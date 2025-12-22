import React from 'react'
import contactImg from '../assets/Images/contact-us.png'

function Contact() {
    return (
        <div className='contact-container flex justify-evenly w-full py-8'>
            <div className="contact-left max-w-[350px] rounded-md">
                <img src={contactImg} alt="contact-img" />
            </div>
            <div className="contact-right flex flex-col justify-center items-center max-w-[500px]">
                <h1 className='font-[48px]- font-semibold mb-4'>Contact us</h1>
                <form action="submit" className='text-center'>
                    <input type="text" name="name" placeholder="Name"
                    className='w-full my-2 border border-gray-400 shadow-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />
                    <input type="email" name="email" placeholder='Email'
                    className='w-full my-2 border border-gray-400 shadow-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />
                    <textarea name="message" placeholder='Type your message here...' cols="2" rows="2"
                    className='w-full my-2 border border-gray-400 shadow-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />
                    <button className='!bg-[#273a6e] hover:bg-blue-700 text-white !font-[32px] font-semibold py-2 rounded-lg transition duration-200' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact