import React from 'react';

function ManagerTicketsTable({ tickets, employeesData, selectedEmployeeId, onEmployeeSelect, onAssign, isLoading }) {
  const getStatusBadge = (status) => {
    switch(status) {
        case 'completed': return <span className="badge-custom badge-resolved">Resolved</span>;
        case 'customer rejected': return <span className="badge-custom badge-inprogress">Rejected</span>;
        case 'ticketRaised': return <span className="badge-custom badge-open">Open</span>;
        default: return <span className="badge-custom badge-open">{status}</span>;
    }
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', animationDelay: '200ms', overflowX: 'auto' }}>
      <table className="table-custom">
        <thead>
          <tr>
            <th>Issue</th>
            <th>Type</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && tickets?.map((ticket, index) => (
            <tr key={index}>
              <td style={{ fontWeight: '500' }}>{ticket.issue}</td>
              <td style={{ color: 'var(--text-secondary)' }}>{ticket.IssueType}</td>
              <td style={{ color: 'var(--text-secondary)' }}>{ticket.customerName}</td>
              <td>{getStatusBadge(ticket.status)}</td>
              <td>
                {ticket.employeeId ? (
                  <span style={{ color: 'var(--text-primary)' }}>
                    {employeesData?.find((a) => a.id === ticket.employeeId)?.username || 'Unknown'}
                  </span>
                ) : (
                  <select 
                    className="input-custom" 
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                    onChange={(e) => onEmployeeSelect(ticket.id, e.target.value)}
                    value={selectedEmployeeId[ticket.id] || "null"}
                  >
                    <option value="null" disabled>Select Employee</option>
                    {employeesData?.map((employee) => (
                      <option key={employee.id} value={employee.id}>{employee.username}</option>
                    ))}
                  </select>
                )}
              </td>
              <td>
                {!ticket.employeeId ? (
                  <button 
                    className="btn-primary-custom" 
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                    onClick={() => onAssign(ticket)}
                  >
                    Assign
                  </button>
                ) : (
                  <span style={{ color: 'var(--accent-success)', fontSize: '0.875rem', fontWeight: '500' }}>Assigned</span>
                )}
              </td>
            </tr>
          ))}
          {!isLoading && tickets?.length === 0 && (
             <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                   No tickets found matching criteria.
                </td>
             </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerTicketsTable;
