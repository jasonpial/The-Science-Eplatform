import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, User, Camera, Shield, History, X, Check, Lock, Smartphone, Mail } from 'lucide-react';

export const SettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile, userLogs } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'logs'>('profile');
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  ];

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, email, phone, avatarUrl });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-responsive-card" style={{ maxWidth: '540px' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--bg-surface)',
            color: 'var(--text-secondary)',
            borderRadius: '50%',
            padding: '6px',
            border: '1px solid var(--border-color)'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Settings size={22} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: '1.35rem', margin: 0 }}>Account Settings & User Profile</h2>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '4px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: activeTab === 'profile' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'profile' ? '#fff' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <User size={16} /> User Credentials
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: activeTab === 'logs' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'logs' ? '#fff' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <History size={16} /> User Activity Logs
          </button>
        </div>

        {/* TAB 1: Profile & Avatar Uploader */}
        {activeTab === 'profile' ? (
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Avatar Selection Box */}
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '10px' }}>
                <img
                  src={avatarUrl || avatarPresets[0]}
                  alt="Profile Avatar"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--primary)',
                    boxShadow: '0 4px 12px rgba(29, 78, 216, 0.2)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    background: 'var(--primary)',
                    color: '#fff',
                    borderRadius: '50%',
                    padding: '6px',
                    display: 'flex'
                  }}
                >
                  <Camera size={14} />
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Select Profile Avatar Preset:
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {avatarPresets.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="Preset"
                    onClick={() => setAvatarUrl(url)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: avatarUrl === url ? '2px solid var(--primary)' : '1px solid var(--border-color)'
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Full Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Brian Kato"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Email Credentials:
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="brian.kato@student.ug"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Mobile Money Phone Number:
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+256 772 123456"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {savedSuccess && (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid #10b981',
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  textAlign: 'center',
                  fontWeight: 700
                }}
              >
                ✓ Profile & Avatar Updated Successfully!
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                background: 'var(--primary)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.95rem',
                marginTop: '6px'
              }}
            >
              Save Profile Credentials
            </button>
          </form>
        ) : (
          /* TAB 2: Activity Logs Viewer */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px', overflowY: 'auto' }} className="no-scrollbar">
            {userLogs.map(log => (
              <div
                key={log.id}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.82rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: '2px' }}>
                  <span>{log.action}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{log.timestamp}</span>
                </div>
                {log.details && (
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                    {log.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
