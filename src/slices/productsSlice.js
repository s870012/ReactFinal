import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data:[]
  },
  reducers:{
    getProducts(state, { payload }){
      state.data = payload
    }
  }
})

export const { getProducts } = productsSlice.actions

export const asyncGetProducts = createAsyncThunk(
  'products/asyncGetProducts',
  async(_, { dispatch }) => {
    try {
      const res = await axios.get(`${url}/api/${path}/products/all`)
      dispatch(getProducts(res.data.products))
    } catch (error) {
      console.log(error);
    }
  }
)

export default productsSlice.reducer