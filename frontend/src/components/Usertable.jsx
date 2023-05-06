import React from "react";
import DataTable from "react-data-table-component";
import Loader from "./Loader";
import { blockUnblock } from "../api/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Adminaction } from "../Redux/Adminslice";

function Usertable({ loader, userdata, modal, user, setuserdata }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setdetails = (userid) => {
    modal(true);
    user(userid);
  };
  const blockunblock = (userid, status) => {
    try {
      blockUnblock("/admin/blockunblock", { userid, status })
        .then(({ data }) => {
          console.log(data.updateuser)
          setuserdata(data.updateuser);
        })
        .catch((er) => {
          alert("unexpected error ocured plz login again");
          console.log(er);
          dispatch(Adminaction.Adminlogout());
        });
    } catch (error) {
      console.log(error);
      alert("unexpected error ocured");
      dispatch(Adminaction.Adminlogout());
    }
  };

  const columns = [
    {
      name: "username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "email",
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: "Details",
      selector: (row) => (
        <p
          onClick={() => setdetails(row._id)}
          className="text-blue-500 underline cursor-pointer"
        >
          session details
        </p>
      ),
    },
    {
      name: "block/unblock",
      selector: (row) => (
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            checked={row.status}
            onChange={() => blockunblock(row._id, row.status)}
            className="sr-only peer"
            readOnly
          />

          <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
        </label>
      ),
    },
  ];
  return (
    <div className="m-10 ">
      <DataTable
        title="User management"
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
  );
}

export default Usertable;
