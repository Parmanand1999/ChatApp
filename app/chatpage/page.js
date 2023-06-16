"use client"
import { useEffect, useRef, useState } from 'react';
import SideNav from '@/app/componant/nav';
import { BsPersonCircle } from 'react-icons/bs';
import { endpoint } from '@/endpoints';
import axios from 'axios';

const Chats = () => {

    const [input, setInput] = useState({
        "action": "message",
        "message": "",
        "receiver": ""
    });
    const [chatHistory, setChatHistory] = useState([])
    const [currentChat, setCurrentchat] = useState({})

    const socket = useRef(null)


    const userid = localStorage.getItem("user") ? JSON?.parse(localStorage?.getItem("user")) : null
    const id = userid?.id
    useEffect(() => {
        try {
            axios.get(`${endpoint.roomId}/?member_1=${id}&member_2=${currentChat.id}`).then((res) => {
                if (res.data.roomId) {

                    axios.get(`${endpoint.messages}/${res.data.id}/messages`).then((res) => {
                        setChatHistory(res.data)
                    })
                    socket.current = new WebSocket(`${endpoint.connection}/${id}/${currentChat.id}/`)
                    socket.current.addEventListener("open", (event) => {
                        console.log("socket connected successfully");
                    });

                    const temp = socket.current.addEventListener("message", (event) => {
                        const receivedMessage = JSON.parse(event.data);

                        axios.get(`${endpoint.messages}/${res.data.id}/messages`).then((res) => {
                            setChatHistory(res.data)
                        })

                    });

                    socket.current.addEventListener("close", (event) => {
                        console.log("socket closed ");
                    });

                    return () => {
                        socket.current.close();
                    };
                }
            })
        } catch (error) {
            console.log(error);

        }

    }, [currentChat]);

    const oneToOneConnection = (data) => {
        setCurrentchat(data)
        setInput({
            ...input,
            receiver: data.id
        })



    }

    const handleSendMessage = () => {
        setInput({
            ...input,
            message: ''
        });
        socket.current.send(JSON.stringify(input));
    };


    const handleInputChange = (e) => {
        setInput({
            ...input,
            message: e.target.value
        });
    }

    const myDivRef = useRef();

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const scrollToBottom = () => {
        myDivRef?.current.scrollTo({
            top: myDivRef?.current.scrollHeight,
            behavior: "smooth",
        });
    };



    return (
        <div className='bg-gray-200 w-full h-full'>

            <div className='flex w-[100%] justify-between  h-[100%]'>
                <SideNav setCurrentchat={setCurrentchat} oneToOneConnection={oneToOneConnection} />
                <div className='border flex flex-col bg-white overflow-y-auto rounded-md shadow-md w-full mx-2 mt-4 h-[500px] justify-between'>
                    <div className='flex border shadow-lg p-3 rounded-md  bg-white'>
                        <BsPersonCircle className=' w-8 h-8' />
                        <p className='mx-1 mt-2 text-blue-400 font-semibold'>{currentChat.first_name}</p>
                        <p className=' mt-2 text-blue-400 font-semibold'>{currentChat.last_name}</p>
                    </div>

                    <div className="container h-96 overflow-y-auto px-4 " ref={myDivRef}>
                        {Object.keys(currentChat).length ? <div className="mb-4 overflow-y-auto">

                            {chatHistory.map((chat, index,) => (
                                <>
                                    {chat?.receiver === userid?.id ? <div
                                        key={index}

                                        className="flex items-center py-2 w-[50%]"
                                    >

                                        <div className="ml-2 flex flex-col">

                                            <span className="text-gray-700 bg-orange-300 p-2 rounded-md">{chat.message
                                            }</span>
                                        </div>
                                    </div> :

                                        <div
                                            key={index}
                                            className="flex justify-end flex-col py-2 ext-right "
                                        >
                                            <div className="ml-2 flex self-end">

                                            </div>
                                            <span className="text-gray-700 bg-blue-300 rounded-md p-2 text-right self-end break-all w-[50%]">{chat.message}</span>
                                        </div>

                                    }
                                </>
                            ))}
                        </div> : <>
                            <div className='flex justify-center items-center h-64 '>
                                <h1>no chat selected</h1>
                            </div>
                        </>}
                    </div>
                    {!!Object.keys(currentChat).length && <div className="flex items-center">
                        <input
                            type="text"
                            className="border cursor-auto border-gray-300 rounded-l-lg py-2 px-4 flex-1 mr-2 focus:outline-none"
                            placeholder="Type your message"
                            value={input.message}
                            onChange={handleInputChange}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-lg"
                            onClick={handleSendMessage}
                        >
                            Send
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Chats;



const chats = [
    {
        id: 123,
        username: "Jane Cooper",
        datetime: "20 May 18:01",
        msg: "We invite you to the reserved Loft Industrial apartment Address Main street 6/25 (top floor, door on the left). The apartment is available from 15.",
    },
    {
        id: 123,
        username: "you",
        datetime: "20 May 18:01",
        msg: "We invite you to the reserved Loft Industrial apartment Address Main street 6/25 (top floor, door on the left). The apartment is available from 15.",
    },



    {
        id: 123,
        username: "you",
        datetime: "20 May 18:01",
        msg: "We invite you to the reserved Loft Industrial apartment Address Main street 6/25 (top floor, door on the left). The apartment is available from 15.",
    },

];
