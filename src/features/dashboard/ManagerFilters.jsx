import React from 'react';

function ManagerFilters({ sortObj, onSearch, onRadioChange, onCheckboxChange }) {
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '1.5rem' }}>
      <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1rem' }}>Filters</h5>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <h6 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>By Status</h6>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
            <input type='radio' onChange={onRadioChange} name="tkt" value="completed" checked={sortObj.radio === 'completed'} /> Completed
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
            <input type='radio' onChange={onRadioChange} name="tkt" value="ticketRaised" checked={sortObj.radio === 'ticketRaised'} /> Open
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
            <input type='radio' onChange={onRadioChange} name="tkt" value="customer rejected" checked={sortObj.radio === 'customer rejected'} /> Rejected
          </label>
        </div>
      </div>

      <div>
        <h6 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>By Type</h6>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
            <input type="checkbox" value="electric" onChange={onCheckboxChange} checked={sortObj.checkbox.includes("electric")} /> Electric
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
            <input type="checkbox" value="building" onChange={onCheckboxChange} checked={sortObj.checkbox.includes("building")} /> Building
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
            <input type="checkbox" value="water" onChange={onCheckboxChange} checked={sortObj.checkbox.includes("water")} /> Water
          </label>
        </div>
      </div>
    </div>
  );
}

export default ManagerFilters;
