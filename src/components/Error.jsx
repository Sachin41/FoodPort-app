import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import errorImage from '../assets/Images/error-image.jpg'

function Error() {
    const err = useRouteError();
    console.log("error", err)
    return (
        <div className='w-full flex flex-col gap-[10px] h-fit items-center justify-center'>
            {err.status === 404 ? <img src={errorImage} alt="Error-404" className='w-[60%] rounded-lg' /> : <h4 className='text-40px font-semibold'>{err.status}</h4>}
            <p className='text-[30px] text-gray-400 font-semibold'>OOPS! Something went wrong!!</p>
            <p className='text-[20px] text-gray-500 font-semibold'>{err.data}</p>
            <Link to='/' className='!bg-[orange] !text-white sfont-bold !py-2 !px-4 rounded-lg cursor-pointer !hover:bg-[green]'>
                Back Home
            </Link>
        </div>
    )
}

export default Error