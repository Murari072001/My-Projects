import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup"
import { useLazyCheckLoginQuery, useCheckuserMutation } from "../services/stocksApi";
import { useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom"
import { setLogin, setUser } from "./userSlice";

const Login = () => {
    const [checkLogin]=useLazyCheckLoginQuery()
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [checkuser] = useCheckuserMutation()
    useEffect(()=>{
        checkLogin().then((res)=>{
            dispatch(setLogin(res.data?.Login))
            res.data?.Login?navigate("/dashboard"):navigate("/login")
        })
    },[])
    const LoginForm = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("*This Field Is Required*"),
            password: Yup.string().required("*This Field Is Required*")
        }),
        onSubmit: (values) => {
            // console.log(values);
            checkuser(values).then((res) => { if(res.data.Login){
                dispatch(setUser(res.data.user[0]))
                navigate("/dashboard")
            } })
        }
    })
    return (
        <div className="w-25 ms-auto me-auto">
            <form onSubmit={LoginForm.handleSubmit}>
                <b className="text-danger">{LoginForm.touched.username && LoginForm.errors.username}</b>
                <div className="form-floating m-3">
                    <input type="text" name="username" className="form-control" id="username" placeholder="Enter Your Username" onChange={LoginForm.handleChange} onBlur={LoginForm.handleBlur} />
                    <label htmlFor="username">Enter Your Username</label>
                </div>
                <div className="form-floating m-3">
                    <input type="password" name="password" className="form-control" id="password" placeholder="Enter Your Password" onChange={LoginForm.handleChange} onBlur={LoginForm.handleBlur} />
                    <label htmlFor="username">Enter Your Password</label>
                </div>
                <div className="form-floating m-3">
                    <button type="submit" className="btn btn-outline-primary w-100">Login</button>
                </div>
            </form>
        </div>
    )

}
export default Login