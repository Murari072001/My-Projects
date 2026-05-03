import React, { useState } from 'react';
import { useAddCustomersMutation } from '../../Services/userApi';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [newCustomer, setNewCustomer] = useState({ username: "", password: "", role: "" });
    const navigate = useNavigate();
    const [customer] = useAddCustomersMutation();

    const signUp = (e) => {
        e.preventDefault();
        customer(newCustomer).then(() => {
            navigate("/login");
        });
    };
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px', height: '60px', borderRadius: '16px',
                        background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        color: 'white', fontWeight: 'bold', fontSize: '1.5rem',
                        margin: '0 auto 1rem auto',
                        boxShadow: 'var(--shadow-glow)'
                    }}>
                        ✨
                    </div>
                    <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>Create Account</h2>
                    <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>Join the Issue Tracker platform</p>
                </div>

                <form onSubmit={signUp}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="input-custom" 
                            placeholder="Choose a username" 
                            onChange={(e) => setNewCustomer({ ...newCustomer, username: e.target.value })} 
                            required 
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="input-custom" 
                            placeholder="Create a password" 
                            onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })} 
                            required 
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label htmlFor="role" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Role</label>
                        <select 
                            id="role" 
                            className="input-custom" 
                            onChange={(e) => setNewCustomer({ ...newCustomer, role: e.target.value })} 
                            required
                            defaultValue=""
                            style={{ cursor: 'pointer' }}
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="customer">Customer</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-primary-custom" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}>
                        Sign Up
                    </button>
                    
                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
                        <span onClick={() => navigate("/login")} style={{ color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '500' }}>Sign In</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;