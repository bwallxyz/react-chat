import React from 'react'
import { useEffect, useState } from 'react'

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3508")



function ChatInput() {

    const [message, setMessage] = useState('')
    const [receivedMessage, setReceivedMessage] = useState('')

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setReceivedMessage(data.message)
        }, [socket])
    })

    async function handleSubmit() {
        socket.emit("send_message", {message})
    }

    return (
        <div className='chat-input'>
            <input onChange={(event) =>{setMessage(event.target.value)}}></input>
            <button onClick={handleSubmit}>SEND</button>
            <h1>Message: {receivedMessage}</h1>
        </div>
    )
}

export default ChatInput
