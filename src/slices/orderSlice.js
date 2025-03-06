import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
export const orderSlice = createSlice({
  name:'orders',
  initialState:{
    data:[]
  },
  reducers:{
    getOrders(state, { payload }){
      state.data = payload
    }
  }
})

export const { getOrders } = orderSlice.actions

export const asyncGetOrders = createAsyncThunk(
  'orders/asyncGetOrders',
  async(payload, {dispatch}) => {
    try {
      const res = await axios.get(`${url}/api/${path}/orders`)
      dispatch(getOrders(res.data.orders[0]))
    } catch (error) {
      console.log(error);
    }
  }
)

export default orderSlice.reducer