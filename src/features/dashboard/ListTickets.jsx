import React from "react";
import { useLazyListTicketsByUserIdQuery, useUpdateTicketMutation } from "../../Services/ticketApi";

function ListTickets() {
    var cid = JSON.parse(window.localStorage.getItem("user"))[0].id;
    var [fn, { isLoading, data }] = useLazyListTicketsByUserIdQuery();
    var [updatedTicketFn] = useUpdateTicketMutation();

    React.useEffect(() => {
        fn(cid);
    }, [fn, cid]);

    function rejectBtn(tkt) {
        const { employeeId, ...rest } = tkt;
        const newTicket = { ...rest, status: "customer rejected" };
        updatedTicketFn(newTicket).then(() => {
            fn(cid);
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

    return (
        <div className="glass-card animate-fade-in" style={{ padding: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Your Tickets</h4>
            
            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading tickets...</div>
            ) : data && data.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                    <table className="table-custom">
                        <thead>
                            <tr>
                                <th>Issue</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((ticket, index) => (
                                <tr key={index}>
                                    <td style={{ fontWeight: '500' }}>{ticket.issue}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{ticket.IssueType}</td>
                                    <td>{getStatusBadge(ticket.status)}</td>
                                    <td>
                                        {ticket.status === "completed" && (
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button className="btn-secondary-custom" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Satisfied</button>
                                                <button className="btn-danger-custom" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => rejectBtn(ticket)}>Reject</button>
                                            </div>
                                        )}
                                        {ticket.status !== "completed" && <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>-</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No tickets found.</div>
            )}
        </div>
    );
}

export default ListTickets;