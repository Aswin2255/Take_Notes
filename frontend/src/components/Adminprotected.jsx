import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function Adminprotected() {
    const admin = useSelector((state)=>state.Admin.Admin)
   
  return admin ? <Outlet/> : <Navigate to='/admin'/>
}

export default Adminprotected
