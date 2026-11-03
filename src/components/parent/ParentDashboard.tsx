import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockParentMetric } from '../../data/mockData';
import { Users, Award, ShieldCheck, CheckCircle, Calendar, RefreshCw, AlertTriangle, Layers, Smartphone, Send, MessageSquare } from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const { subscriptions, transactions, openPaymentModal, activeLevel } = useApp();
  const metric = mockParentMetric;
  const [parentNoteText, setParentNoteText] = useState('');

  const handleSendParentNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentNoteText.trim()) return;
    alert(`Message sent to Dr. Mukasa Godfrey! Teacher will receive parent inquiry regarding ${metric.studentName}. ✉️`);
    setParentNoteText('');
  };

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '24px',
          borderRadius: '24px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(5, 150, 105, 0.2))',
          border: '1px solid var(--secondary)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '6px' }}>
              PARENT & GUARDIAN MONITORING DASHBOARD
            </span>
            <h2 style={{ fontSize: '1.6rem', margin: '4px 0' }}>
              Monitoring Student: {metric.studentName} ({metric.level})
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Real-time visibility into academic performance, attendance, teacher notes, and subscriptions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => openPaymentModal(metric.subscribedSubjects, metric.level, 'multi', 'monthly', 65000)}
              style={{
                padding: '12px 20px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #059669, #0284c7)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Smartphone size={18} /> Renew / Upgrade Subscriptions
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            LIVE CLASS ATTENDANCE
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>{metric.attendanceRate}%</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>18 / 19 Live Classes Attended</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            AVERAGE TEST SCORE
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>{metric.averageQuizScore}%</div>
          <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>GRADE A UNEB STANDARD</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            ACTIVE SUBJECTS
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)' }}>{metric.subscribedSubjects.length} / 4</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{metric.subscribedSubjects.join(', ')}</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            LAST ACTIVITY
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{metric.lastActiveDate}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Watched Newton\'s Laws Video</span>
        </div>
      </div>

      {/* Main Layout: Teacher Notes & Recent Results vs Safety Audit */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Verified Teacher Feedback Log */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--primary)' }} />
              Teacher Performance Notes & Feedback
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {metric.teacherNotes.map((note, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-surface)',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    borderLeft: '4px solid var(--primary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '4px' }}>
                    Dr. Mukasa Godfrey (Physics Teacher):
                  </div>
                  <div>"{note}"</div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscriptions & Transaction Receipts */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Smartphone size={20} style={{ color: 'var(--accent-gold)' }} />
              Active Mobile Money Subscriptions & Receipts
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {transactions.map(tx => (
                <div
                  key={tx.id}
                  style={{
                    background: 'var(--bg-surface)',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{tx.description}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {tx.provider} • Ref: {tx.referenceCode} • {tx.timestamp}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: 'var(--primary)' }}>UGX {tx.amountUGX.toLocaleString()}</div>
                    <span className="badge badge-verified" style={{ fontSize: '0.6rem' }}>PAID</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Child Safety & Responsible Communication Audit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', border: '1px solid var(--primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ShieldCheck size={22} style={{ color: '#10b981' }} />
              <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Child Safety Guarantee</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
              DBROFT THE SCIENCE CLASSROOM enforces strict child safety protocols for Ugandan students:
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                <span>All teachers undergo academic, criminal & identity verification before teaching.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                <span>All Q&A messaging channels are strictly monitored and logged for parent review.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                <span>No private un-monitored 1-on-1 contact allowed outside live moderated classrooms.</span>
              </li>
            </ul>
          </div>

          {/* Form Node: Direct Communication to Teacher */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <MessageSquare size={20} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Message Child's Science Teacher</h3>
            </div>
            <form onSubmit={handleSendParentNote} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <textarea
                value={parentNoteText}
                onChange={e => setParentNoteText(e.target.value)}
                placeholder="Ask Dr. Mukasa Godfrey about student progress or attendance..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Send size={15} /> Send Note to Teacher
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
