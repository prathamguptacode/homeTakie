import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { useContext } from 'react'
import { user } from '../App'

function MessageArea() {

    const [message, setMessage] = useState([])
    const socket = useRef()
    const messageData = useRef()
    const userVal=useContext(user)

    function sendMessage() {
        const inMessage=messageData.current.value;
        console.log(userVal)
        const username=userVal.login.toString()
        const messageMe = username + ":    " +inMessage;
        socket.current.emit('message', { message: messageMe });
        setMessage((prev) => [...prev, { me: true, message: messageMe }]);
        messageData.current.value = "";
    }

    function detectEnter(e){
        if(e.nativeEvent.key == 'Enter'){
            sendMessage()
        }
    }

    useEffect(() => {
        (async () => {
            const data=await axios.get('http://localhost:3000');
            const message=data.data
            message.forEach(element => {
                setMessage((prev)=> [...prev, {me: false, message: element.message}])
            });
            setMessage((prev)=> [...prev, {me: false, message: 'SERVER: your legendary conversation starts from here'}])
        })()


        socket.current = io('http://localhost:3000')
        socket.current.on('receive', (data) => {
            setMessage((prev) => [...prev, { me: false, message: data.message }])
        })
    }, [])

    return (
        <div className='area'>
            <div className="messageArea">
                {
                    message.map((e) => {
                        if (e.me) {
                            return <div className="inbubble">{e.message}</div>
                        }
                        else {
                            return <div className="bubble">{e.message}</div>
                        }
                    })
                }
            </div>
            <div className="inmessageArea">
                <input type="text" placeholder='Enter your message' className='inmessage' ref={messageData} onKeyDown={detectEnter} />
                <button className='sendbtn' onClick={sendMessage} > Send </button>
            </div>
        </div>
    )
}

export default MessageArea
