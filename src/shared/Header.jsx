import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setLoggedin } from '../features/user/loginSlice';

function Header() {
    const isLoggedin = useSelector((state) => state.loginReducer.isLoggedin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get user details if logged in
    const userString = window.localStorage.getItem("user");
    const user = userString ? JSON.parse(userString)[0] : null;

    function logout() {
        window.localStorage.removeItem("user");
        dispatch(setLoggedin(false));
        navigate("/login");
    }

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '1rem 0',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-color)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '8px',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        color: 'white', fontWeight: 'bold', fontSize: '1.2rem',
                        boxShadow: 'var(--shadow-glow)'
                    }}>
                        CS
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                        Issue Tracker
                    </h3>
                </Link>

                <div>
                    {isLoggedin ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {user && (
                                <div style={{ textAlign: 'right', display: 'none' }} className="d-md-block">
                                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{user.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user.role}</div>
                                </div>
                            )}
                            <button className="btn-danger-custom" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn-secondary-custom" onClick={() => navigate("/login")}>Login</button>
                            <button className="btn-primary-custom" onClick={() => navigate("/signUp")}>Sign Up</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
