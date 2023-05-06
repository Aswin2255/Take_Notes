import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { createpost, fetchasynuserpost, getuser } from '../Redux/Userslices'
import Cards from "./Cards";
import Usevalidate from "../hooks/Usevalidate";
import { createPost, logOut } from "../api/api";
import { postaction } from "../Redux/postslice";
import { Authaction } from "../Redux/Userslices";
import { toast } from "react-toastify";

function Createpost() {
  let { handelChange, values, errors, removevalue } = Usevalidate();

  const ref = useRef(null);

  const dispatch = useDispatch();

  // const user = useSelector(getuser)

  /*useEffect(() => {
        console.log('workingggggg')
        dispatch(fetchasynuserpost())
    }, [up])*/
  const generatesucess = (msg) => {
    toast.success(msg, {
      position: "top-center",
    });
  };

  const submit = async () => {
    console.log("reached");
    if (Object.keys(errors).length === 0) {
      const post = values.post;
      dispatch(postaction.Setloading())
      createPost("post/createpost", { post })
        .then(({ data }) => {
          ref.current.value = null;
          generatesucess("note added");
          removevalue();
          dispatch(postaction.Getallpost(data.post));
        })
        .catch((er) => {
          alert("unexpected error ocured loag in again");
          logOut("/auth/logout").then((data) => {
            dispatch(Authaction.Userlogout());
          });
        });
    } else {
      alert("cannote be empty");
    }
  };

  return (
    <Cards>
      <div className="flex gap-3 items-center">
        <div></div>

        <textarea
          onChange={(e) => {
            handelChange(e);
          }}
          ref={ref}
          maxLength={50}
          value={values.post}
          name="post"
          className="grow p-3 h-14"
          placeholder={`whats on your mind..`}
        />
      </div>
      <div className="flex gap-5 items-center mt-2">
        <div className="text-center">
          <p className="text-red-500 text-xs italic h-4">
            {errors.post && errors.post}
          </p>
        </div>
        <div className="grow text-right">
          <button
            disabled={
              errors.post || Object.keys(values).length === 0 ? true : false
            }
            onClick={submit}
            className={
              errors.post || Object.keys(values).length === 0
                ? "bg-blue-400  text-white  md:px-6 py-1 rounded-md opacity-50"
                : "bg-socialblue text-white  md:px-6 py-1 rounded-md"
            }
          >
            Share
          </button>
        </div>
      </div>
    </Cards>
  );
}

export default Createpost;
