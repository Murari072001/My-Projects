import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useLazyAuthenticateQuery } from "../../Services/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin } from "./loginSlice";
import * as Yup from "yup";

function Login() {
    const navigate = useNavigate();
    const [loginFn] = useLazyAuthenticateQuery();
    const { isLoggedin } = useSelector((state) => state.loginReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedin) {
            navigate("/dashboard");
        }
    }, [isLoggedin, navigate]);

    const loginForm = useFormik({
        initialValues: { username: "", password: "" },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: (values) => {
            loginFn(values).then((res) => {
                if (res.data && res.data.length > 0) {
                    window.localStorage.setItem("user", JSON.stringify(res.data));
                    dispatch(setLoggedin(true));
                    navigate("/dashboard");
                } else {
                    alert("Invalid username or password");
                }
            });
        }
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px', height: '60px', borderRadius: '16px',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        color: 'white', fontWeight: 'bold', fontSize: '1.5rem',
                        margin: '0 auto 1rem auto',
                        boxShadow: 'var(--shadow-glow)'
                    }}>
                        🔐
                    </div>
                    <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>Welcome Back</h2>
                    <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>Sign in to continue to Issue Tracker</p>
                </div>

                <form onSubmit={loginForm.handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            className="input-custom" 
                            placeholder="Enter your username" 
                            onChange={loginForm.handleChange} 
                            value={loginForm.values.username}
                        />
                        {loginForm.errors.username && loginForm.touched.username && (
                            <div style={{ color: 'var(--accent-danger)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{loginForm.errors.username}</div>
                        )}
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="input-custom" 
                            placeholder="Enter your password" 
                            onChange={loginForm.handleChange} 
                            value={loginForm.values.password}
                        />
                        {loginForm.errors.password && loginForm.touched.password && (
                            <div style={{ color: 'var(--accent-danger)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{loginForm.errors.password}</div>
                        )}
                    </div>

                    <button type='submit' className="btn-primary-custom" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}>
                        Sign In
                    </button>
                    
                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
                        <span onClick={() => navigate("/signUp")} style={{ color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '500' }}>Sign Up</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;