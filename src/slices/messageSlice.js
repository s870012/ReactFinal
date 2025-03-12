import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const messageSlice = createSlice({
  name:'messages',
  initialState:{
    messages:[],
  },
  reducers:{
    createMessage(state, action){
      const {text, status} = action.payload;
      const id = new Date().getTime();
      state.messages.push({
        id,
        text,
        status
      })
    },
    removeMessage(state, action){
      const messageId = action.payload;
      const index = state.messages.findIndex((message) => message.id === messageId);
      if(index !== -1){
        state.messages.splice(index, 1);
      }
    }
  }
})

export const { createMessage } = messageSlice.actions

export const asyncRemoveMessage = createAsyncThunk(
  'messages/asyncRemoveMessage',
  async(payload, { dispatch }) => {
    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(payload))
    }, 2000)
  }
)

export default messageSlice.reducer