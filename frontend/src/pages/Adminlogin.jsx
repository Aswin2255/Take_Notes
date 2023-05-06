import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import Usevalidate from '../hooks/Usevalidate';
import { adminLogin } from '../api/api';
import { Adminaction } from '../Redux/Adminslice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Adminnav from '../components/Adminnav';

function Adminlogin() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { handelChange, values, errors } = Usevalidate();
    const generateerror = (err) => {
        toast.error(err, {
          position: "top-center",
        });
      };
    const handelsubmit = (e) => {
        e.preventDefault();
    
        if (Object.keys(values).length === 2 && Object.keys(errors).length === 0) {
          adminLogin("/admin/login", { values })
            .then(({ data }) => {
              dispatch(Adminaction.Adminlogin(data))
              navigate('/admin/home')
             
            })
            .catch((er) => {
              console.log(er);
              generateerror(er.response.data.message);
            });
        } else {
          generateerror("input fields have error plz check");
        }
      };
  return (
    <div>
    <ToastContainer />
    <Adminnav />
    <div className="flex justify-center align-middle m-10  ">
      <h1 className="items-center">Admin login</h1>
    </div>
    <div className="flex justify-center items-center align-middle m-10">
      <form onSubmit={handelsubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              required={true}
              placeholder="example@gmail.com"
              name="email"
              value={values.email}
              onChange={handelChange}
            ></input>
            <p className="text-red-500 text-xs italic h-4">
              {errors.email && errors.email}
            </p>
          </div>
          <div className="w-full px-3 mt-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              required={true}
              placeholder="*****"
              name="pass"
              value={values.pass}
              onChange={handelChange}
            ></input>
            <p className="text-red-500 text-xs italic h-4">
              {errors.pass && errors.pass}
            </p>
          </div>
        </div>

        <div className="flex justify-center align-middle ">
          <button
            type="submit"
            className=" inline-flex items-center px-3 py-2 text-sm font-medium  text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Adminlogin
