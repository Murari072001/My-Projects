import React, { useEffect } from 'react';
import { useLazyEmployeeListTicketsQuery, useUpdateEmployeeTicketMutation } from '../../Services/ticketApi';
import StatsCard from '../../shared/StatsCard';

function EmployeeDashboard({ user }) {
    var id = user.id;
    var { username } = user;
    var [employeeFn, { isLoading, data }] = useLazyEmployeeListTicketsQuery();
    var [employeeUpdateFn] = useUpdateEmployeeTicketMutation();

    useEffect(() => {
        employeeFn(id);
    }, [employeeFn, id]);

    function issueCompleteBtn(tkt) {
        var status = "completed";
        var updateEmployeeData = { ...tkt, status };
        employeeUpdateFn(updateEmployeeData).then(() => {
            alert("Ticket marked as completed!");
            employeeFn(id);
        });
    }

    const getStatusBadge = (status) => {
        switch(status) {
            case 'completed': return <span className="badge-custom badge-resolved">Resolved</span>;
            case 'customer rejected': return <span className="badge-custom badge-inprogress">Rejected</span>;
            case 'ticketRaised': return <span className="badge-custom badge-open">Open</span>;
            default: return <span className="badge-custom badge-open">{status}</span>;
        }
    };

    const pendingTickets = data ? data.filter(t => t.status !== 'completed').length : 0;
    const completedTickets = data ? data.filter(t => t.status === 'completed').length : 0;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>
                    Employee Dashboard
                </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <StatsCard title="Pending Tickets" value={pendingTickets} icon="📋" color="var(--accent-warning)" />
                <StatsCard title="Completed" value={completedTickets} icon="✅" color="var(--accent-success)" delay={100} />
            </div>

            <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', animationDelay: '200ms' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Assigned Tickets</h4>
                
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading tickets...</div>
                ) : data && data.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="table-custom">
                            <thead>
                                <tr>
                                    <th>Issue</th>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((ticket, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: '500' }}>{ticket.issue}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{ticket.customerName}</td>
                                        <td>{getStatusBadge(ticket.status)}</td>
                                        <td>
                                            <button 
                                                className="btn-primary-custom" 
                                                onClick={() => issueCompleteBtn(ticket)} 
                                                disabled={ticket.status === "completed"}
                                                style={{ 
                                                    opacity: ticket.status === "completed" ? 0.5 : 1, 
                                                    cursor: ticket.status === "completed" ? 'not-allowed' : 'pointer',
                                                    padding: '0.25rem 0.75rem',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {ticket.status === "completed" ? "Completed" : "Mark Complete"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No tickets assigned.</div>
                )}
            </div>
        </div>
    );
}

export default EmployeeDashboard;