import { createSlice } from "@reduxjs/toolkit";

const Postslice = createSlice({
  name: "post",
  initialState: { allpost: [] ,loading: true },
  reducers: {
   
    Getallpost(state, action) {
      state.allpost = action.payload;
      state.loading = false
    },
    Setloading(state,action){
       state.loading = true
    }
    
  
  },
});
export const postaction = Postslice.actions;
export default Postslice;
