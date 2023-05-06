import React from 'react'
import { useSelector } from 'react-redux'
//import { getuser } from '../Redux/Userslices'
import { Navigate, Outlet } from 'react-router-dom'

function Protected() {
    const value = useSelector((state)=>state.Auth.logedin)
    console.log(value)
  return value ? <Outlet/> : <Navigate to='/login'/>
 
}

export default Protected
