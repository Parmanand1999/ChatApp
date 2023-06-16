"use client"
import { endpoint } from '@/endpoints';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
const SideNav = ({ setCurrentchat, oneToOneConnection }) => {
    const baseUrl = "http://65.108.77.50:8005/"
    const [userData, setUserData] = useState([])
    const [searchField, setSearchField] = useState("");
    const [filteredUserData, setFilteredUserData] = useState([]);

    const handelSearch = async (e) => {
        const searchValue = e.target.value;
        setSearchField(e.target.value)
        try {
            const res = await axios.get(`${endpoint.getUser}/?name=${searchValue}`)
            if (res.status == 200) {
                setUserData(res.data);
                setFilteredUserData(res.data);
            }

        } catch (error) {
            console.log(err, "EERRERRREEE")
        }
    }

    return (
        <>

            <div className='border rounded-md shadow-md bg-white max-w-[25%] mx-2 mt-4 h-[500px]'>

                <div className='flex mt-5 '>

                    <input
                        className='h-8  bg-white w-[100%] border outline-none   px-5 rounded-md'
                        placeholder='Search here'
                        value={searchField}
                        onChange={handelSearch}
                    />
                    <div className='  rounded-md border h-8  '>
                        <AiOutlineSearch className='text-gray-200 text-center w-[1.5rem] h-[1.5rem] ' />
                    </div>
                </div>

                <div className='font-bold text-2xl mt-2 mx-5'>Chats</div>
                <div className='container h-72 overflow-y-auto'>

                    {filteredUserData.map((data, index) =>

                        <div className='flex p-2 hover:bg-slate-200 flex-col sm:flex-row sm:items-center ' key={index} onClick={() => {
                            oneToOneConnection(data)
                        }}>


                            {/* <img alt='' className='border-2 rounded-[50%] w-10 h-10 ' /> */}
                            {/* <div className=' flex  '> */}


                            <div className=' w-10 h-10 '>
                                <BsPersonCircle className='w-8 h-8' />

                            </div>
                            <div>
                                <p className='mx-3 text-xs text-blue-400 font-semibold '>{data.first_name} {data.last_name}</p>

                                <p className='mx-3 text-xs '>{data.email}</p>
                            </div >
                            {/* </div> */}
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default SideNav
// const chats = [
//     {
//         id: 123,
//         username: "Ram",
//         datetime: "20 May 18:01",

//     },
//     {
//         id: 123,
//         username: "you",
//         datetime: "20 May 18:01",

//     },
//     {
//         id: 123,
//         username: "Jane Cooper",
//         datetime: "20 May 18:01",

//     },
//     {
//         id: 123,
//         username: "you",
//         datetime: "20 May 18:01",

//     },
//     {
//         id: 123,
//         username: "you",
//         datetime: "20 May 18:01",

//     },
//     {
//         id: 123,
//         username: "you",
//         datetime: "20 May 18:01",

//     },
//     {
//         id: 123,
//         username: "you",
//         datetime: "20 May 18:01",

//     },
//     {
//         id: 123,
//         username: "you",
//         datetime: "20 May 18:01",

//     },

// ];