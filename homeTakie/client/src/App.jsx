import './App.css'
import Home from './pages/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login.jsx'
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'
import { createContext } from 'react'
import { useState } from 'react'

export const user=createContext();

function App() {

  const [login,setLogin]=useState(false)

  return (
    <user.Provider value={{login: login,setLogin: setLogin}}>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </user.Provider>
  )
}

export default App
