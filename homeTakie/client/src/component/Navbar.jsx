import React from 'react'
import { MdSatelliteAlt } from "react-icons/md";
import { BsMenuButtonFill } from "react-icons/bs";

function Navbar() {
    return (
        <div className='nav'>
            <MdSatelliteAlt size={42} color='white' />
            <div className="title">Home-Takie</div>
            <div className="username">Mission Anion</div>
            <BsMenuButtonFill size={28} color='white' className='menu' />
        </div>
    )
}

export default Navbar
