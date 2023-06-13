"use client"
import { useEffect, useRef, useState } from 'react';
import SideNav from '@/componant/nav';




const Chats = () => {
    const [input, setInput] = useState({
        "action": "message",
        "message": "",
        "receiver": 2
    });
    const [chatstore, setChatStore] = useState([])
    const socket = useRef(null)


    useEffect(() => {
        socket.current = new WebSocket("ws://0.tcp.in.ngrok.io:17193/api/v1/ws/chat/2/3/")
        socket.current.addEventListener("open", (event) => {
            // socket.current.send("Hello Server!");
            console.log("socket conneted successfully")
        });

        socket.current.addEventListener("message", (event) => {
            console.log("Message from server ", event.data);
        });

        socket.current.addEventListener("close", (event) => {
            console.log("socket closed ")
        });

    }, [])



    const sendMassge = () => {
        console.log(socket.current.readyState, "cuasfodsojfjkadsbfkjsadbjk")
        if (socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify(input));
        }
        socket.current.addEventListener("message", (event) => {
            console.log("Message from server ", event.data);
        });

        setChatStore(...chatstore, input)

    }
    console.log(chatstore, " <p className=' float-right '></p>");

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            message: e.target.value
        });

    }


    console.log(input, "eshdgfuiknifd");

    return (
        <div className='bg-gray-200 w-full h-full'>

            <div className='flex w-[100%] justify-between  h-[100%]'>
                <SideNav />
                <div className='border flex justify-between flex-col bg-white overflow-y-scroll rounded-md shadow-md w-full mx-2 mt-4 h-[500px]'>
                    <div className='flex border shadow-lg p-3 rounded-md  bg-white mb-5'>
                        <img alt='' className='border-2 rounded-[50%] w-10 h-10 ' />
                        <p className='mx-3 mt-2'>Ram</p>
                    </div>

                    <p className=' float-right '>{input.message}</p>

                    <div className='flex mx-2 rounded-md justify-end bg-gray-200 p-4'>
                        <input
                            className='w-[85%] border-gray-300 rounded-lg mx-4 px-3  shadow-md'
                            value={input?.message}
                            onChange={onChangeHandler}
                            placeholder='Type a message'
                        ></input>
                        <button onClick={sendMassge} className='mx-2 text-white rounded-lg p-[0.3rem] bg-orange-400'>Send</button>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Chats;
