import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newTodo:'',
  todos:[],
  isUpdate:false,
  index:undefined
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    newtodo:(state,action)=>{
        state.newTodo=action.payload
    },
    getTodos:(state,action)=>{
        state.todos=action.payload
    },
    updatingTodo:(state,action)=>{
      state.isUpdate=!state.isUpdate
      state.index=action.payload
    }
  },
})

export const { newtodo,getTodos,updatingTodo } = todoSlice.actions

export default todoSlice.reducer