import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
const SideNav = () => {
    return (
        <>

            <div className='border rounded-md shadow-md bg-white w-[25%] mx-2 mt-4 h-[500px]'>

                <div className='flex mt-5 '>

                    <input
                        className='h-8 bg-white w-[100%] border outline-none   px-5 rounded-md'
                        placeholder='Search here'
                    />
                    <div className='  rounded-md border h-8  '>
                        <AiOutlineSearch className='text-gray-200 w-[1.5rem] h-[1.5rem] ' />
                    </div>
                </div>

                <div className='font-bold text-2xl mt-5 mx-5'>Chats</div>
                <div className='flex mt-5  p-4 hover:bg-slate-100  mb-5'>
                    <img alt='' className='border-2 rounded-[50%] w-10 h-10 ' />
                    <p className='mx-3 mt-2'>Ram</p>
                </div>
                <hr className='flex-col mb-3' />
            </div>
        </>
    )
}

export default SideNav