import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: []
  },
  reducers:{
    getCart(state, { payload }){
      state.data = payload
    },
    deleteCart(state, {payload}){
      state.data = payload
    },
  }
})

export const { getCart, deleteCart } = cartSlice.actions

export const asyncGetCart = createAsyncThunk(
  'cart/asyncGetCart',
  async(_, {dispatch}) => {
    try {
      const res = await axios.get(`${url}/api/${path}/cart`)
      dispatch(getCart(res.data.data))
    } catch (error) {
      console.log(error);
    }
  }
)

export const asyncDeleteCart = createAsyncThunk(
  'cart/asyncDeleteCart',
  async(_, {dispatch}) => {
    try {
      const res = await axios.delete(`${url}/api/${path}/carts`)
      dispatch(deleteCart(res.data))
    } catch (error) {
      console.log(error);
    }
  }
)


export default cartSlice.reducer