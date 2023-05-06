import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Adminnav from '../components/Adminnav'
import Usertable from '../components/Usertable'
import { getAlluser } from '../api/api'
import { useDispatch } from 'react-redux'
import { Adminaction } from '../Redux/Adminslice'
import Modal from '../components/Modal'

function Adminhome() {
    const dispatch = useDispatch()
    const [loader,setloader] = useState(true)
    const [userdata,setuserdata] = useState([])
    const [modal,setShowModal] = useState(false)
    const [userid,setuserid] = useState(null)
    useEffect(()=>{
      getAlluser('/admin/alluser').then(({data})=>{
           setuserdata(data.alluser)
           setloader(false)
      }).catch((er)=>{
        alert('unexpected error ocured log in again')
        dispatch(Adminaction.Adminlogout())
      })
    },[])
  return (
    <div>
      <Adminnav/>
      <Usertable loader = {loader} userdata = {userdata}  modal = {setShowModal} user = {setuserid} setuserdata = {setuserdata} />
      {
        modal && <Modal modal = {setShowModal} user = {userid}/>
      }
    </div>
  )
}

export default Adminhome
