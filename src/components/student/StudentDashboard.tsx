import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Play,
  Volume2,
  Radio,
  Award,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FlaskConical,
  Zap,
  HelpCircle
} from 'lucide-react';
import { ScienceSubject } from '../../types';

export const StudentDashboard: React.FC = () => {
  const {
    activeLevel,
    lessons,
    liveClasses,
    userSubscribedSubjects,
    setActiveLesson,
    setActiveTab,
    openPaymentModal
  } = useApp();

  const levelLessons = lessons.filter(l => l.level === activeLevel);
  const liveClass = liveClasses.find(c => c.isLive) || liveClasses[0];

  const subjects: { name: ScienceSubject; color: string }[] = [
    { name: 'Mathematics', color: '#0284c7' },
    { name: 'Physics', color: '#059669' },
    { name: 'Chemistry', color: '#d97706' },
    { name: 'Biology', color: '#10b981' }
  ];

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Welcome Banner */}
      <div
        className="glass-card"
        style={{
          padding: '28px',
          borderRadius: '24px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.2), rgba(2, 132, 199, 0.2))',
          border: '1px solid var(--primary)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-gold">UGANDA UNEB CLASSROOM</span>
              <span className="badge badge-primary">{activeLevel}</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', margin: '4px 0 6px 0' }}>
              Welcome back, Brian Kato 👋
            </h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
              Your Science Classroom is ready. You are currently subscribed to {userSubscribedSubjects.length} of 4 core science subjects.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setActiveTab('catalog')}
              style={{
                padding: '12px 20px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #059669, #0284c7)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <Layers size={18} /> Manage Subjects & Subscriptions
            </button>
          </div>
        </div>
      </div>

      {/* Live Classes Alert Banner */}
      {liveClass && (
        <div
          className="glass-card"
          style={{
            padding: '20px 24px',
            borderRadius: '20px',
            marginBottom: '28px',
            background: liveClass.isLive ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-card)',
            border: liveClass.isLive ? '2px solid #ef4444' : '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                background: liveClass.isLive ? '#ef4444' : 'var(--accent-gold)',
                color: '#fff',
                padding: '12px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Radio size={24} className={liveClass.isLive ? 'pulse-badge' : ''} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span className="badge badge-gold" style={{ background: liveClass.isLive ? '#ef4444' : '#f59e0b', color: '#fff' }}>
                  {liveClass.isLive ? '● LIVE NOW' : 'UPCOMING CLASS'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{liveClass.scheduledTime}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0 }}>{liveClass.title}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Teacher: {liveClass.teacherName} • Subject: {liveClass.subject} ({liveClass.level})
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('live')}
            style={{
              padding: '12px 24px',
              borderRadius: '14px',
              background: liveClass.isLive ? '#ef4444' : 'var(--primary)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {liveClass.isLive ? 'Join Live Classroom Now 📡' : 'View Schedule & Reminders'}
          </button>
        </div>
      )}

      {/* Main Content Layout: Enrolled Subjects Grid vs Progress Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>
        {/* Left Column: Core Science Subjects Cards */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FlaskConical size={20} style={{ color: 'var(--primary)' }} />
              {activeLevel} Core Science Subjects
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Click subject to resume lesson
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            {subjects.map(subj => {
              const isSubscribed = userSubscribedSubjects.includes(subj.name);
              const subjectLessons = levelLessons.filter(l => l.subject === subj.name);
              const latestLesson = subjectLessons[0];

              return (
                <div
                  key={subj.name}
                  className="glass-card glass-card-hover"
                  style={{
                    padding: '20px',
                    borderRadius: '20px',
                    borderLeft: `5px solid ${subj.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '1.1rem', margin: 0, color: subj.color }}>{subj.name}</h4>
                      {isSubscribed ? (
                        <span className="badge badge-verified" style={{ fontSize: '0.65rem' }}>ACTIVE</span>
                      ) : (
                        <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>LOCKED</span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.4 }}>
                      {latestLesson ? latestLesson.title : `Complete ${activeLevel} syllabus topics and UNEB past papers.`}
                    </p>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>
                        <span>Syllabus Progress</span>
                        <span>{isSubscribed ? '68%' : '0%'}</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'var(--bg-surface)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: isSubscribed ? '68%' : '0%', height: '100%', background: subj.color }} />
                      </div>
                    </div>
                  </div>

                  {isSubscribed ? (
                    <button
                      onClick={() => {
                        if (latestLesson) setActiveLesson(latestLesson);
                        setActiveTab('lesson');
                      }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '12px',
                        background: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <Play size={14} style={{ color: subj.color }} /> Resume Lesson
                    </button>
                  ) : (
                    <button
                      onClick={() => openPaymentModal([subj.name], activeLevel, 'single', 'monthly', 25000)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '12px',
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: '#f59e0b',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        border: '1px solid #f59e0b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      Unlock for UGX 25,000 / mo
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Featured Video / Audio Lessons List */}
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>
            Featured {activeLevel} Lessons & Audio Revision
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {levelLessons.map(l => (
              <div
                key={l.id}
                className="glass-card glass-card-hover"
                onClick={() => {
                  setActiveLesson(l);
                  setActiveTab('lesson');
                }}
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      background: 'var(--primary-light)',
                      color: 'var(--primary-hover)',
                      padding: '10px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Play size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span className="badge badge-primary">{l.subject}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Topic: {l.topic}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{l.title}</h4>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <div>{l.durationMinutes} mins</div>
                    <div style={{ color: 'var(--accent-gold)' }}>Audio: {l.lowDataAudioSizeMB} MB</div>
                  </div>
                  <ArrowRight size={18} style={{ color: 'var(--text-secondary)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Performance Analytics & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Quiz Trigger Card */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #0284c7, #059669)',
              color: '#fff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Award size={22} />
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#fff' }}>UNEB Practice Test</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', marginBottom: '16px', lineHeight: 1.4 }}>
              Test your knowledge on O/A-Level Physics & Math past paper questions with instant auto-grading.
            </p>
            <button
              onClick={() => setActiveTab('quizzes')}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                background: '#fff',
                color: '#0284c7',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              Start Practice Quiz Now 📝
            </button>
          </div>

          {/* Learning Progress Summary */}
          <div className="glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={18} style={{ color: 'var(--primary)' }} />
              Academic Performance Stats
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-surface)', borderRadius: '10px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Attendance Rate:</span>
                <span style={{ fontWeight: 800, color: '#10b981' }}>96%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-surface)', borderRadius: '10px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Average Quiz Score:</span>
                <span style={{ fontWeight: 800, color: 'var(--primary)' }}>86% (Grade A)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-surface)', borderRadius: '10px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Lessons Completed:</span>
                <span style={{ fontWeight: 800 }}>18 Lessons</span>
              </div>
            </div>
          </div>

          {/* Quick Question Trigger */}
          <div className="glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HelpCircle size={18} style={{ color: 'var(--accent-gold)' }} />
              Need Help with a Concept?
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Ask verified teachers questions regarding any UNEB science topic.
            </p>
            <button
              onClick={() => setActiveTab('qa')}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: '1px solid var(--border-color)'
              }}
            >
              Ask Teacher a Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
