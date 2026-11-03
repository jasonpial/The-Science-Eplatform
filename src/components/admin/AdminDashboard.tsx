import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Users, Smartphone, BookOpen, Check, X, Award, TrendingUp, AlertCircle, Activity, Server, WifiOff, Database } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    teacherRequests,
    approveTeacherRequest,
    rejectTeacherRequest,
    transactions,
    subscriptions,
    lessons,
    isDataSaverMode,
    toggleDataSaver
  } = useApp();

  const totalRevenueUGX = transactions.reduce((acc, curr) => acc + curr.amountUGX, 0);
  const pendingRequests = teacherRequests.filter(r => r.status === 'pending');

  return (
    <div className="responsive-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Admin Header */}
      <div
        className="glass-card"
        style={{
          padding: '24px',
          borderRadius: '24px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(5, 150, 105, 0.4))',
          border: '1px solid var(--primary)'
        }}
      >
        <span className="badge badge-gold" style={{ marginBottom: '6px' }}>
          DBROFT TECHNOLOGIES • PLATFORM ADMINISTRATION
        </span>
        <h2 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', margin: '4px 0 6px 0' }}>
          THE SCIENCE CLASSROOM System Administration
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
          Manage teacher verification applications, monitor Mobile Money subscriptions, and oversee platform quality.
        </p>
      </div>

      {/* KPI Metrics Summary Grid */}
      <div className="kpi-responsive-grid" style={{ marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            TOTAL PLATFORM REVENUE
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>
            UGX {totalRevenueUGX.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Via MTN & Airtel Mobile Money</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            ACTIVE SUBSCRIPTIONS
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>
            {subscriptions.length} Students
          </div>
          <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>O & A-LEVEL COMBINED</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            PUBLISHED SCIENCE LESSONS
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)' }}>
            {lessons.length} Lessons
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>With Video, Audio & PDF Notes</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            PENDING TEACHER APPROVALS
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: pendingRequests.length > 0 ? '#f59e0b' : 'var(--text-primary)' }}>
            {pendingRequests.length} Applications
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Awaiting Credential Audit</span>
        </div>
      </div>

      {/* Main Admin Columns */}
      <div className="two-col-grid" style={{ gap: '24px' }}>
        {/* Left Column: Teacher Verification Queue */}
        <div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={22} style={{ color: 'var(--primary)' }} />
            Teacher Verification & Quality Approval Hub
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {teacherRequests.map(req => (
              <div
                key={req.id}
                className="glass-card"
                style={{
                  padding: '20px',
                  borderRadius: '20px',
                  borderLeft: req.status === 'approved' ? '5px solid #10b981' : req.status === 'rejected' ? '5px solid #ef4444' : '5px solid #f59e0b'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', margin: '0 0 4px 0' }}>{req.teacherName}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Email: {req.email} • Phone: {req.phone}
                    </span>
                  </div>

                  {req.status === 'approved' && (
                    <span className="badge badge-verified">✓ VERIFIED BADGE GRANTED</span>
                  )}
                  {req.status === 'rejected' && (
                    <span className="badge badge-gold" style={{ background: '#ef4444', color: '#fff' }}>REJECTED</span>
                  )}
                  {req.status === 'pending' && (
                    <span className="badge badge-gold pulse-badge">PENDING REVIEW</span>
                  )}
                </div>

                <div
                  style={{
                    background: 'var(--bg-surface)',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div><strong>Academic Degree:</strong> {req.academicDegree}</div>
                  <div><strong>Teaching Experience:</strong> {req.teachingExperienceYears} Years</div>
                  <div><strong>Specialties:</strong> {req.unebSpecialities.join(', ')}</div>
                  <div><strong>National ID (NIN):</strong> {req.nationalIdNumber}</div>
                </div>

                {req.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => approveTeacherRequest(req.id)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '12px',
                        background: '#10b981',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        flex: '1 1 220px'
                      }}
                    >
                      <Check size={16} /> Approve & Issue Verified Teacher Badge
                    </button>
                    <button
                      onClick={() => rejectTeacherRequest(req.id)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '12px',
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        border: '1px solid #ef4444',
                        flex: '1 1 160px'
                      }}
                    >
                      <X size={16} /> Reject Application
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Payments Log & System Health */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Smartphone size={22} style={{ color: 'var(--accent-gold)' }} />
              System Mobile Money Audit
            </h3>

            <div className="glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {transactions.map(tx => (
                  <div
                    key={tx.id}
                    style={{
                      background: 'var(--bg-surface)',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.8rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: '2px' }}>
                      <span>{tx.provider}</span>
                      <span style={{ color: 'var(--primary)' }}>UGX {tx.amountUGX.toLocaleString()}</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>{tx.description}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Phone: {tx.phoneNumber} • {tx.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Health & Data-Saver Control Node */}
          <div className="glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Server size={20} style={{ color: 'var(--secondary)' }} />
              System Health & Data Compression
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <div>• Server Status: <strong style={{ color: '#10b981' }}>● ONLINE (99.9% Uptime)</strong></div>
              <div>• Data Saver Engine: <strong>{isDataSaverMode ? '⚡ ENABLED (Compressed)' : 'High Speed HD'}</strong></div>
            </div>
            <button
              onClick={toggleDataSaver}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                background: isDataSaverMode ? 'rgba(245, 158, 11, 0.15)' : 'var(--primary-light)',
                color: isDataSaverMode ? '#d97706' : 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Toggle Global Data Saver Compression
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
