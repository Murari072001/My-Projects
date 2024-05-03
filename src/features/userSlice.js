import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:{},
  Login:false
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser:(state,action)=>{
        state.user=action.payload
    },
    setLogin:(state,action)=>{
        state.Login=action.payload
    }
  },
})

export const { setUser,setLogin } = userSlice.actions

export default userSlice.reducer