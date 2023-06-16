"use client"
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react'

const Loading = () => {
    const router = useRouter();

    useLayoutEffect(() => {
        const useraccess = localStorage.getItem("user") ? JSON.parse(localStorage?.getItem("user")) : null
        const access = useraccess?.access
        if (!access) {
            router.push("/")
        }
    })

    return (
        <div className='flex mx-auto mt-[50%]'>Loading...</div>
    )
}

export default Loading