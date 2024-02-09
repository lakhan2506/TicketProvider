import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        adminLogin:false
    },
    reducers:{
        adminLoginData:(state,action)=>{
            state.adminLogin = action.payload;
        }
    }
})

export const adminActions = {...adminSlice.actions}

export default adminSlice;