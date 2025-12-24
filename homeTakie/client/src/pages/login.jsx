import React from 'react'
import './login.css'
import { useRef } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { useContext } from 'react';
import { user } from '../App';
import { useNavigate } from 'react-router-dom';

function Login() {

    const username = useRef();
    const password = useRef();
    const userVal=useContext(user)
    const navigate=useNavigate()

    async function submit() {
        const usr = username.current.value;
        const pss = password.current.value;
        const data = await axios.post('http://localhost:3000/login', { username: usr, password: pss })
        if (data.data.message == "invalid user") {
            toast.error('invalid credentials', { style: { backgroundColor: "hsl(0, 0%, 15%)", color: "white" } })
        }
        else {
            toast.success('user verified', { style: { backgroundColor: "hsl(0, 0%, 15%)", color: "white" } })
            const set=userVal.setLogin;
            set(usr)
            navigate('/')
        }
    }

    return (
        <div className="login">
            <div className='loginPage'>
                <div className="titleLogin">LOGIN</div>
                <div className="user">
                    <div className="userN">username: </div>
                    <input type="text" className='inT' placeholder='pratham' ref={username} />
                </div>
                <div className="pass">
                    <div className="userN">password: </div>
                    <input type="password" className='inT' placeholder='mypassword' ref={password} />
                </div>
                <button className='lgbtn' onClick={submit}>SUBMIT</button>
            </div>
            <Toaster />
        </div>
    )
}

export default Login
