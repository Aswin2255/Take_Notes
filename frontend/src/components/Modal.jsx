import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Loader from "./Loader";
import { getUsersession } from "../api/api";
import { useDispatch } from "react-redux";
import { Adminaction } from "../Redux/Adminslice";
import moments from 'moment'
export default function Modal({ modal, user }) {
  const [loader, setloader] = useState(true);
  const [userdata, setuserdata] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getUsersession(`/admin/getusersession/${user}`)
      .then(({ data }) => {
        setuserdata(data.allsession);
        setloader(false);
      })
      .catch((er) => {
        alert("unexpected error ocured");
        dispatch(Adminaction.Adminlogout());
      });
  }, []);
  const columns = [
    {
      name: "starttime",
      selector: (row) =>  moments(row.starttime).format('MMMM Do YYYY, h:mm:ss a') ,
      sortable: true,
    },
    {
      name: "endtime",
      selector: (row) => row.endtime ? moments(row.endtime).format('MMMM Do YYYY, h:mm:ss a') : '-',
      sortable: true,
    },

    {
      name: "Active duration",
      selector: (row) => row.endtime && row.starttime ? `${Math.abs((new Date(row.endtime) - new Date(row.starttime))/(1000*60)).toFixed(2)} minutes` : '-',
      sortable: true,
    },
  ];

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative  my-6 mx-auto md:w-1/2 lg:w-1/2 sm:w-4/5 w-4/5 ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">User session details</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => modal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <DataTable
               
                columns={columns}
                data={userdata}
                progressPending={loader}
                progressComponent={<Loader />}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450px"
                highlightOnHover
              />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => modal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
