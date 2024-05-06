import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoggedin } from '../features/user/loginSlice'

function Navbar(){
    var isLoggedin = useSelector((state)=>(state.loginReducer.isLoggedin))
    var navigate=useNavigate()
    var dispatch=useDispatch()


    function logout(){
        window.localStorage.removeItem("user")
        dispatch(setLoggedin(false))
        navigate("/login")
    }
    function signUp(){
        navigate("/signUp")
    }
    function login(){
        navigate("/login")
    }
    return (
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex justify-content-between">
            <h3 className="navbar-brand fs-2">Customer Issue Tracking System</h3>
            <div className="" id="">
                {
                    isLoggedin && (
                        <>
                            <button className="btn btn-light"  style={{marginRight:"60px"}} onClick={()=>{logout()}}>Logout</button><br/>
                        </>
                    )
                }
                {
                    !isLoggedin && (
                        <div style={{marginRight:"60px"}}>
                            <button  className="btn btn-light" onClick={()=>{login()}}>Login</button>&nbsp;&nbsp;
                            <button  className="btn btn-light" onClick={()=>{signUp()}}>SignUp</button>                  
                        </div>
                    )
                }
                &nbsp;&nbsp;&nbsp;
                {
                }
            </div>
        </div>
        </nav>
    )
}
export default Navbar