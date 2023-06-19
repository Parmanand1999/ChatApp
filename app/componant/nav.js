"use client"
import { endpoint } from '@/endpoints';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
const SideNav = ({ setCurrentchat, oneToOneConnection }) => {
    const [userData, setUserData] = useState([])
    const [previousChatUsers, setPreviousChatUser] = useState([])
    const [searchField, setSearchField] = useState("");
    const [filteredUserData, setFilteredUserData] = useState([]);
    const { id } = JSON?.parse(localStorage?.getItem("user"))
    useEffect(() => {
        getPreviousChatUsers()
    }, [])

    const getPreviousChatUsers = async () => {
        const response = await axios(`${endpoint.chats}/${id}/chats`)
        setPreviousChatUser(response.data)
    }



    const handelSearch = async (e) => {
        const searchValue = e.target.value;
        console.log("searchField::", searchValue);
        setSearchField(e.target.value)
        try {
            const res = await axios.get(`${endpoint.getUser}/?name=${searchValue}`)
            if (res.status == 200) {
                setUserData(res.data);
                setFilteredUserData(res.data);
                console.log(res.data, "restdata");
            }

        } catch (error) {
            console.log(err, "EERRERRREEE")
        }
    }

    return (
        <>

            <div className='border rounded-md shadow-md bg-white max-w-[25%] mx-2 mt-4 h-[500px]'>

                <div className='flex mt-5 w-[100%] relative cursor-auto'>

                    <input
                        className='h-8  bg-white w-[100%] border outline-none  pr-8 px-2  rounded-md'
                        placeholder='Search here'
                        value={searchField}
                        onChange={handelSearch}
                    />
                    <div className=' h-8 absolute left-[70%] sm:left-[85%]   mt-1 '>
                        <AiOutlineSearch className='text-gray-200 text-center w-[1.5rem] h-[1.5rem] ' />
                    </div>
                </div>

                <div className='font-bold text-xl sm:text-2xl  text-center mt-2  sm:mx-5'>Chats</div>
                <div className='container h-72 overflow-y-auto  '>

                    {!!filteredUserData.length && <><p>Search Results</p>
                        <hr style={{ height: '5px' }} /></>}

                    {filteredUserData.map((data, index) =>

                        <div className='flex p-2 hover:bg-slate-200 flex-col sm:flex-row items-center sm:items-center ' key={index} onClick={() => {
                            oneToOneConnection(data)
                        }}>


                            {/* <img alt='' className='border-2 rounded-[50%] w-10 h-10 ' /> */}
                            {/* <div className=' flex  '> */}


                            <div className=' w-10 h-10 '>
                                <BsPersonCircle className='w-8 h-8' />

                            </div>
                            <div className='w-10'>
                                <p className=' sm:mx-3 text-xs text-blue-400 font-semibold '>{data.first_name} {data.last_name}</p>

                                <p className=' sm:mx-3 overflow-hidden sm:overflow-visible text-[12px] '>{data.email}</p>
                            </div >
                            {/* </div> */}
                        </div>
                    )}
                    {!!filteredUserData.length && <><p>Previous Chats</p>
                        <hr style={{ height: '5px' }} /></>}
                    {previousChatUsers.map((data, index) =>

                        <div className='flex p-2 hover:bg-slate-200 flex-col sm:flex-row items-center sm:items-center ' key={index} onClick={() => {
                            oneToOneConnection(data)
                        }}>


                            {/* <img alt='' className='border-2 rounded-[50%] w-10 h-10 ' /> */}
                            {/* <div className=' flex  '> */}


                            <div className=' w-10 h-10 '>
                                <BsPersonCircle className='w-8 h-8' />

                            </div>
                            <div className='w-10'>
                                <p className=' sm:mx-3 text-xs text-blue-400 font-semibold '>{data.first_name} {data.last_name}</p>

                                <p className=' sm:mx-3 overflow-hidden sm:overflow-visible text-[12px] '>{data.email}</p>
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



