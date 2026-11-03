import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Check, X, Radio, Award, BookOpen, AlertCircle } from 'lucide-react';

export const NotificationDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, setActiveTab } = useApp();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '60px',
        right: '24px',
        width: '360px',
        maxWidth: '90vw',
        maxHeight: '480px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-surface)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '0.95rem', margin: 0 }}>System Notifications</h3>
        </div>

        <button
          onClick={onClose}
          style={{ background: 'transparent', color: 'var(--text-secondary)', padding: '2px' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Notifications List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }} className="no-scrollbar">
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            No new notifications.
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.linkTab) setActiveTab(n.linkTab);
                onClose();
              }}
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: n.read ? 'var(--bg-surface)' : 'var(--primary-light)',
                border: n.read ? '1px solid var(--border-color)' : '1px solid var(--primary)',
                cursor: 'pointer',
                transition: 'background 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                <span style={{ fontWeight: 800, color: n.read ? 'var(--text-primary)' : 'var(--primary-hover)' }}>
                  {n.title}
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>{n.timestamp}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
                {n.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
