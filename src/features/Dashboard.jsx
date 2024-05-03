import React, { useEffect } from "react";
import { useLazyCheckLoginQuery } from "../services/stocksApi";
import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setLogin, setUser } from "./userSlice";
const Dashboard = () => {
    const [checkLogin] = useLazyCheckLoginQuery()
    const { user } = useSelector(state => state.userDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        checkLogin().then((res) => {
            dispatch(setLogin(res.data.Login))
            dispatch(setUser(res.data.user))
            console.log(res.data);
            res.data.Login ? navigate("/dashboard") : navigate("/login")
        })
    }, [])

    const expand=()=>{
        document.getElementById("sidebar").className=document.getElementById("sidebar").className==="open"?"close":"open"
        document.getElementById("sidebar").className==="close"?document.getElementById("dashboard").style.width="95%":document.getElementById("dashboard").style.width="80%"
    }

    return <div className="d-flex main">
        <div id="sidebar" className="close">
            <div className="closed">
                <button className="btn" onClick={()=>{expand()}}><h1 className="bi bi-list"></h1></button>
            </div>
            <div className="opened">
                <button className="btn x-square" onClick={()=>{expand()}}><h4 className="bi bi-x-square"></h4></button>
                <h3 className="text-center m-2">Menu</h3>
                <button className="btn" onClick={()=>{navigate("/dashboard")}}>My DashBoard</button>
                <button className="btn" onClick={()=>{navigate("/dashboard/myStocks")}}>My Stocks</button>
                <button className="btn">My Wallet</button>
                <button className="btn">My Profile</button>
            </div>
        </div>
        <div id="dashboard">
            <h1>{user?.username}</h1>
            <h6>Wallet Amount : {user?.wallet}</h6>
            <Outlet></Outlet>
        </div>
    </div>
}
export default Dashboard