import React from 'react';

function StatsCard({ title, value, icon, color = 'var(--accent-primary)', delay = 0 }) {
    return (
        <div className="glass-card animate-fade-in" style={{ animationDelay: `${delay}ms`, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: `rgba(255,255,255,0.05)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: color,
                fontSize: '1.5rem',
                border: `1px solid ${color}33` // 33 is approx 20% opacity in hex
            }}>
                {icon || '📊'}
            </div>
            <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {title}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.2' }}>
                    {value}
                </div>
            </div>
        </div>
    );
}

export default StatsCard;
