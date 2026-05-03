import { useFormik } from "formik";
import React from "react";
import { useGetLoginMutation } from "../Services/Api";

const Login = ()=>{
    const [loginFn] = useGetLoginMutation()
    const loginFormic = useFormik({
        initialValues:{
            "username":"",
            "password":""
        },
        onSubmit:(values)=>{
            console.log(values);
            loginFn(values).then((res)=>{
                console.log(res);
                
            })
        }
    })
    return <>
        <div className="form-floating w-25">
            <input type="text" className="form-control" name="username" id="username" placeholder="Username" onChange={loginFormic.handleChange} />
            <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating w-25">
            <input type="text" className="form-control" name="password" id="password" placeholder="password" onChange={loginFormic.handleChange} />
            <label htmlFor="password">Password</label>
        </div>
        <button type="Submit" onClick={loginFormic.handleSubmit}>Login</button>
    </>
}

export default Login