import { createSlice } from "@reduxjs/toolkit";
const Adminslice = createSlice({
  name: "Admin",
  initialState: {
    Admin: false,
  
  },
  reducers: {
    Adminlogin(state, action) {
      state.Admin = true;
    
     
    },
    Adminlogout(state, action) {
        state.Admin = false;
       
    },
  },
});

export const Adminaction = Adminslice.actions;

export default Adminslice;