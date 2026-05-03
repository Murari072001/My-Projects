import React from 'react';
import { useGetAllUsersQuery } from '../../Services/userApi';
import { useNavigate } from 'react-router-dom';

function AllUsers() {
    const { data: users, isLoading } = useGetAllUsersQuery();
    const navigate = useNavigate();

    // Verify access
    const userString = window.localStorage.getItem("user");
    const currentUser = userString ? JSON.parse(userString)[0] : null;

    if (!currentUser || currentUser.role !== "manager") {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--accent-danger)' }}>
                <h3>Access Denied</h3>
                <p>You do not have permission to view this page.</p>
                <button className="btn-secondary-custom" onClick={() => navigate("/dashboard")}>Return to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="glass-card animate-fade-in" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>User Management</h4>
                <button className="btn-secondary-custom" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading users...</div>
            ) : users && users.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                    <table className="table-custom">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td style={{ color: 'var(--text-secondary)' }}>#{user.id}</td>
                                    <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{user.username}</td>
                                    <td>
                                        <span className={`badge-custom ${user.role === 'manager' ? 'badge-resolved' : user.role === 'employee' ? 'badge-inprogress' : 'badge-open'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn-primary-custom" 
                                            style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                                            onClick={() => navigate(`/dashboard/users/${user.id}`)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No users found.</div>
            )}
        </div>
    );
}

export default AllUsers;
