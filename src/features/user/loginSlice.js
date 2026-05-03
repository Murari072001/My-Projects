import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = window.localStorage.getItem("user");
const initialIsLoggedin = userFromStorage ? true : false;

const initialState={
    isLoggedin: initialIsLoggedin,
    searchword:"",
    radio:"",
    checkbox:"",
    slicedata:[]
}
export const loginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        setLoggedin:(state,action)=>{
            state.isLoggedin=action.payload
        },
        setSearch:(state,action)=>{
            console.log(action.payload);
            state.searchword=action.payload
        },
        setRadio:(state,action)=>{
            state.radio=action.payload
        },
        setCheck:(state,action)=>{
            state.checkbox=action.payload
        },
        setData:(state,action)=>{
            state.slicedata=action.payload
        }
    }
})
export const {setLoggedin,setCheck,setRadio,setSearch , setData}=loginSlice.actions
export default loginSlice.reducer