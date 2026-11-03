import React from 'react';
import { useApp } from '../../context/AppContext';
import { ExternalLink, ChevronRight, Phone, Mail, UserCheck, Play, Award, Smartphone } from 'lucide-react';
import { ScienceSubject } from '../../types';

export const HighPointDashboardView: React.FC = () => {
  const {
    activeLevel,
    setActiveTab,
    setActiveLesson,
    lessons,
    liveClasses,
    openPaymentModal,
    userSubscribedSubjects
  } = useApp();

  return (
    <div style={{ padding: '24px 28px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* 3-Column Grid Matching the Reference Image */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* COLUMN 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* CARD 1: TO DOS */}
          <div className="widget-card">
            <div className="widget-header">
              <h3>To Dos</h3>
              <ExternalLink size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <div className="widget-body">
              <div
                className="widget-item-row"
                onClick={() => setActiveTab('live')}
              >
                <div>
                  <div style={{ color: 'var(--text-primary)' }}>UNEB {activeLevel} Physics Mechanics Live Lesson</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Today, 4:00 PM EAT • Dr. Mukasa</div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
              </div>

              <div
                className="widget-item-row"
                onClick={() => setActiveTab('quizzes')}
              >
                <div>
                  <div style={{ color: 'var(--text-primary)' }}>Math Quadratic Equations Quiz Submission</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Timed Auto-Graded Practice</div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
              </div>

              <div
                className="widget-item-row"
                onClick={() => setActiveTab('dashboard')}
              >
                <div>
                  <div style={{ color: 'var(--text-primary)' }}>Chemistry Titration Practical Notes Review</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>PDF Formula Sheet & Workings</div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => setActiveTab('live')}
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    background: 'transparent'
                  }}
                >
                  View 5 More
                </button>
              </div>
            </div>
          </div>

          {/* CARD 2: SHOPPING CART (SUBJECT SUBSCRIPTIONS) */}
          <div className="widget-card">
            <div className="widget-header">
              <h3>Shopping Cart <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>2026 Term 3</span></h3>
              <ExternalLink size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <div className="widget-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '2px' }}>General Biology I</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>{activeLevel} BIOL 201</div>
                <button
                  onClick={() => openPaymentModal(['Biology'], activeLevel, 'single', 'monthly', 25000)}
                  style={{
                    width: '100%',
                    padding: '6px',
                    borderRadius: '6px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--primary)'
                  }}
                >
                  {userSubscribedSubjects.includes('Biology') ? 'Subscribed' : 'Open'}
                </button>
              </div>

              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '2px' }}>Physics Mechanics</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>{activeLevel} PHYS 101</div>
                <button
                  onClick={() => openPaymentModal(['Physics'], activeLevel, 'single', 'monthly', 25000)}
                  style={{
                    width: '100%',
                    padding: '6px',
                    borderRadius: '6px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--primary)'
                  }}
                >
                  {userSubscribedSubjects.includes('Physics') ? 'Subscribed' : 'Open'}
                </button>
              </div>

              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  textAlign: 'center',
                  gridColumn: 'span 2'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '2px' }}>Full Science Package (All 4 Subjects)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>Math, Physics, Chem, Bio Discount Bundle</div>
                <button
                  onClick={() => openPaymentModal(['Mathematics', 'Physics', 'Chemistry', 'Biology'], activeLevel, 'full_package', 'monthly', 65000)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #059669, #0284c7)',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#fff'
                  }}
                >
                  Subscribe via Mobile Money (UGX 65,000)
                </button>
              </div>
            </div>
          </div>

          {/* CARD 3: WAITLIST */}
          <div className="widget-card">
            <div className="widget-header">
              <h3>Waitlist <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>2026 Spring</span></h3>
              <ExternalLink size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <div className="widget-body">
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>A-Level Electromagnetism Advanced Group</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>PHYS 510/2 (1697)</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '8px' }}>
                  <span>Status: <strong style={{ color: 'var(--accent-gold)' }}>Waiting</strong></span>
                  <span>Position: <strong>1</strong></span>
                </div>
                <button
                  onClick={() => setActiveTab('live')}
                  style={{
                    width: '100%',
                    padding: '6px',
                    borderRadius: '6px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--primary)'
                  }}
                >
                  Open / View Live Classroom
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* CARD 4: HOLDS */}
          <div className="widget-card">
            <div className="widget-header">
              <h3>Academic Holds & Safety Checks</h3>
              <ExternalLink size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <div className="widget-body">
              <div className="widget-item-row" onClick={() => setActiveTab('dashboard')}>
                <div>
                  <div>UNEB Physics Mechanics Formula Sheet</div>
                  <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Download Ready (PDF)</div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
              </div>

              <div className="widget-item-row" onClick={() => setActiveTab('parent_monitor')}>
                <div>
                  <div>Parent Progress Monthly Audit</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>Attendance: 96% (Grade A)</div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
              </div>

              <div className="widget-item-row" onClick={() => setActiveTab('admin_hub')}>
                <div>
                  <div>Verified Teacher Identity & Certificate Check</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>100% Safety Verified</div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => setActiveTab('parent_monitor')}
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    background: 'transparent'
                  }}
                >
                  View 5 More
                </button>
              </div>
            </div>
          </div>

          {/* CARD 5: ADVISEES (VERIFIED TEACHERS - Matching exact design!) */}
          <div className="widget-card">
            <div className="widget-header">
              <h3>Verified Science Teachers (Advisees)</h3>
              <ExternalLink size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <div className="widget-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Teacher Card 1 */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Teacher"
                    style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Dr. Mukasa Godfrey</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Physics & Math Senior Teacher (AA0004)</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> (256) 701 987654</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> g.mukasa@scienceclassroom.ug</span>
                </div>

                <button
                  onClick={() => setActiveTab('qa')}
                  style={{
                    width: '100%',
                    padding: '6px',
                    borderRadius: '6px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  Ask Teacher a Question
                </button>
              </div>

              {/* Teacher Card 2 */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                    alt="Teacher"
                    style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Ms. Sarah Akello</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Chemistry & Biology Teacher (AA0027)</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> (256) 782 555444</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> s.akello@scienceclassroom.ug</span>
                </div>

                <button
                  onClick={() => setActiveTab('qa')}
                  style={{
                    width: '100%',
                    padding: '6px',
                    borderRadius: '6px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  Ask Teacher a Question
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* COLUMN 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* CARD 6: INBOX */}
          <div className="widget-card">
            <div className="widget-header">
              <h3>Inbox & Q&A Messages</h3>
              <ExternalLink size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <div className="widget-body">
              <div className="widget-item-row" onClick={() => setActiveTab('live')}>
                <div>
                  <div>Class Meeting Schedule Update</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Physics Mechanics Live Stream Today</div>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Sep 15 &gt;</div>
              </div>

              <div className="widget-item-row" onClick={() => setActiveTab('qa')}>
                <div>
                  <div>Chemistry Titration Q&A Reply</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Ms. Sarah answered your endpoint query</div>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Sep 14 &gt;</div>
              </div>

              <div className="widget-item-row" onClick={() => setActiveTab('quizzes')}>
                <div>
                  <div>Quiz Score Report Available</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Physics Mechanics Quiz: 88% (Grade A)</div>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Sep 12 &gt;</div>
              </div>

              <div className="widget-item-row" onClick={() => setActiveTab('catalog')}>
                <div>
                  <div>Subscription Expiry Renewal Reminder</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>O-Level 3 Subjects Active via MoMo</div>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Sep 10 &gt;</div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => setActiveTab('qa')}
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    background: 'transparent'
                  }}
                >
                  View 23 More
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
