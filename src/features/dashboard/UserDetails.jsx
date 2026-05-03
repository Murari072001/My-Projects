import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../Services/userApi';
import { useListTicketsByUserIdQuery, useEmployeeListTicketsQuery } from '../../Services/ticketApi';
import ProfileSection from '../user/ProfileSection';

function UserTickets({ userId, role }) {
    // We only fetch customer tickets if role is customer, and employee tickets if role is employee.
    // However, RTK query hooks cannot be called conditionally. We will call both with skip option.
    const { data: customerTickets, isLoading: loadingCustomer } = useListTicketsByUserIdQuery(userId, { skip: role !== 'customer' });
    const { data: employeeTickets, isLoading: loadingEmployee } = useEmployeeListTicketsQuery(userId, { skip: role !== 'employee' });

    const isLoading = role === 'customer' ? loadingCustomer : (role === 'employee' ? loadingEmployee : false);
    const tickets = role === 'customer' ? customerTickets : (role === 'employee' ? employeeTickets : []);

    const getStatusBadge = (status) => {
        switch(status) {
            case 'completed': return <span className="badge-custom badge-resolved">Resolved</span>;
            case 'customer rejected': return <span className="badge-custom badge-inprogress">Rejected</span>;
            case 'ticketRaised': return <span className="badge-custom badge-open">Open</span>;
            default: return <span className="badge-custom badge-open">{status}</span>;
        }
    };

    if (role === 'manager') {
        return <div style={{ color: 'var(--text-muted)' }}>Managers do not have associated tickets.</div>;
    }

    if (isLoading) return <div style={{ color: 'var(--text-muted)' }}>Loading tickets...</div>;

    if (!tickets || tickets.length === 0) {
        return <div style={{ color: 'var(--text-muted)' }}>No tickets found for this {role}.</div>;
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{role === 'customer' ? 'Raised Tickets' : 'Assigned Tickets'}</h5>
            <table className="table-custom">
                <thead>
                    <tr>
                        <th>Issue</th>
                        <th>Type</th>
                        {role === 'employee' && <th>Customer</th>}
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td style={{ fontWeight: '500' }}>{ticket.issue}</td>
                            <td style={{ color: 'var(--text-secondary)' }}>{ticket.IssueType}</td>
                            {role === 'employee' && <td style={{ color: 'var(--text-secondary)' }}>{ticket.customerName}</td>}
                            <td>{getStatusBadge(ticket.status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function UserDetails() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { data: user, isLoading } = useGetUserByIdQuery(userId);

    // Verify access
    const currentUserString = window.localStorage.getItem("user");
    const currentUser = currentUserString ? JSON.parse(currentUserString)[0] : null;

    if (!currentUser || currentUser.role !== "manager") {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--accent-danger)' }}>
                <h3>Access Denied</h3>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>User Details</h4>
                <button className="btn-secondary-custom" onClick={() => navigate("/dashboard/users")}>Back to Users List</button>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading user details...</div>
            ) : user ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
                    <div className="dashboard-sidebar">
                        <ProfileSection user={user} />
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <UserTickets userId={user.id} role={user.role} />
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>User not found.</div>
            )}
        </div>
    );
}

export default UserDetails;
