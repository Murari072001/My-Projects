import React from "react";
import { useNavigate, Link } from "react-router-dom";
import StatsCard from "../../shared/StatsCard";
import ListTickets from "./ListTickets";

function CustomerDashboard({ user }) {
    const navigate = useNavigate();
    const { username } = user;
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>
                    Customer Dashboard
                </h3>
                <button className="btn-primary-custom" onClick={() => navigate("/dashboard/addTicket")}>
                    + Raise Ticket
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <StatsCard title="My Tickets" value="Total" icon="🎫" color="var(--accent-primary)" />
                <StatsCard title="Action Required" value="Review" icon="⏳" color="var(--accent-warning)" delay={100} />
            </div>

            <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>
                <span style={{ marginRight: '1rem', fontWeight: '500', color: 'var(--accent-primary)' }}>List of Tickets</span>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <ListTickets />
            </div>
        </div>
    );
}

export default CustomerDashboard;