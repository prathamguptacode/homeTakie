import React from 'react'
import { useContext } from 'react';
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { user } from '../App';

function ProtectedRoutes() {
    const userVal=useContext(user)
    const check=userVal.login
    return check ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes
