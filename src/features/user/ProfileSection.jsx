import React from 'react';

function ProfileSection({ user }) {
    if (!user) return null;

    return (
        <div className="glass-card animate-fade-in" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))',
                border: '2px solid var(--accent-primary)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto 1rem auto',
                fontSize: '2rem',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-md)'
            }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            
            <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>
                {user.name || 'User'}
            </h2>
            
            <div style={{ 
                display: 'inline-block', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '999px', 
                background: 'var(--bg-tertiary)', 
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
            }}>
                {user.role || 'Guest'}
            </div>
            
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', textAlign: 'left' }}>
                <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Email:</span>
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: '500' }}>{user.email || 'N/A'}</span>
                </div>
                <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Phone:</span>
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: '500' }}>{user.mobile || 'N/A'}</span>
                </div>
                {user.role === 'customer' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>City:</span>
                        <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: '500' }}>{user.city || 'N/A'}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileSection;
