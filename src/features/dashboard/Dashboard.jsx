import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import ProfileSection from '../user/ProfileSection';

function Dashboard() {
    const { isLoggedin } = useSelector((state) => state.loginReducer);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!isLoggedin) {
            navigate("/login");
        } else {
            const userData = window.localStorage.getItem("user");
            if (userData) {
                setUser(JSON.parse(userData)[0]);
            } else {
                navigate("/login");
            }
        }
    }, [isLoggedin, navigate]);

    if (!user) return null;

    return (
        <div className="dashboard-grid">
            <div className="dashboard-sidebar">
                <ProfileSection user={user} />
            </div>
            <div className="dashboard-main glass-card animate-fade-in" style={{ padding: '2rem' }}>
                <Outlet context={{ user }} />
            </div>
        </div>
    );
}

export default Dashboard;