import { createSlice } from "@reduxjs/toolkit";
const Authslice = createSlice({
  name: "Auth",
  initialState: {
    logedin: false,
    username: null,
    sessionid : null
  },
  reducers: {
    Userlogin(state, action) {
      state.logedin = true;
      state.username = action.payload.userfind[0].username;
      state.sessionid = action.payload.savedsession
      ._id
    },
    Userlogout(state, action) {
      state.logedin = false;
      state.username = null;
      state.sessionid = null
    },
  },
});

export const Authaction = Authslice.actions;

export default Authslice;
