import React from 'react'
import Navbar from "../Components/Navbar/Navbar"
import { Outlet } from 'react-router-dom'


const Mainpage = () => {
  return (
   <>
   <Navbar/>
   <Outlet/>
   </>
  )
}

export default Mainpage