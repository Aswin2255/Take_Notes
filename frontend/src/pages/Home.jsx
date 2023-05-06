import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Createpost from "../components/Createpost";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { fetchuser } from "../Redux/Userslices";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

import Sessionmodal from "../components/Sessionmodal";

function Home() {
const [modal,setmodal] = useState(false)
const userid = useSelector((state)=>state.Auth.sessionid)

  return (
    <>
       <ToastContainer />
      <Navbar />
      <Layout modal = {setmodal} userid = {userid}>
      <Createpost/>
      <Post />
      </Layout>
      { modal && <Sessionmodal  modal={setmodal} user={userid}/> }
      
    </>
  );
}

export default Home;
