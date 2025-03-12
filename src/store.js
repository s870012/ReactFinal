import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import orderReducer  from "./slices/orderSlice";
import messageReducer  from "./slices/messageSlice";


export const store = configureStore({
  reducer:{
    cart: cartReducer,
    orders: orderReducer,
    messages: messageReducer
  }
})

export default store