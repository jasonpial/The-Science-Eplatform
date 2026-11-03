import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FlaskConical,
  WifiOff,
  Wifi,
  Sun,
  Moon,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  Users,
  BookOpen,
  Radio,
  HelpCircle,
  Award,
  Layers
} from 'lucide-react';
import { UserRole, AcademicLevel } from '../types';

export const Navigation: React.FC = () => {
  const {
    currentRole,
    setRole,
    isDataSaverMode,
    toggleDataSaver,
    theme,
    toggleTheme,
    activeLevel,
    setActiveLevel,
    activeTab,
    setActiveTab,
    liveClasses
  } = useApp();

  const liveCount = liveClasses.filter(c => c.isLive).length;

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode }> = {
    student: { label: 'Student View', icon: <GraduationCap size={16} /> },
    parent: { label: 'Parent View', icon: <Users size={16} /> },
    teacher: { label: 'Teacher Studio', icon: <Award size={16} /> },
    admin: { label: 'Admin Hub', icon: <ShieldCheck size={16} /> }
  };

  return (
    <header className="header-nav glass-card" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top Banner: Ugandan Data-Saver & Level Indicator */}
      <div style={{ background: isDataSaverMode ? 'linear-gradient(90deg, #92400e, #d97706)' : 'linear-gradient(90deg, #065f46, #059669)', color: '#fff', fontSize: '0.75rem', padding: '4px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🇺🇬 DBROFT TECHNOLOGIES • UGANDA SCIENCE CURRICULUM</span>
          <span style={{ opacity: 0.6 }}>|</span>
          <span>UNEB O-LEVEL & A-LEVEL</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleDataSaver}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '0.7rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 700
            }}
          >
            {isDataSaverMode ? <WifiOff size={12} /> : <Wifi size={12} />}
            {isDataSaverMode ? '⚡ DATA SAVER: ACTIVE (LOW MB)' : 'HIGH SPEED VIDEO MODE'}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        {/* Logo & Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #059669, #0284c7)', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: 'var(--shadow-glow)' }}>
            <FlaskConical size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              THE SCIENCE CLASSROOM
              <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>UGANDA</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              Your Science Classroom, Wherever You Are
            </p>
          </div>
        </div>

        {/* Level Selector Toggle (O-Level vs A-Level) */}
        <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '4px', borderRadius: '999px', border: '1px solid var(--border-color)' }}>
          {(['O-Level', 'A-Level'] as AcademicLevel[]).map(lvl => (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              style={{
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                background: activeLevel === lvl ? 'var(--primary)' : 'transparent',
                color: activeLevel === lvl ? '#fff' : 'var(--text-secondary)'
              }}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Action Controls & Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Role Switcher Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-surface)', padding: '4px 8px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Role:</span>
            <select
              value={currentRole}
              onChange={e => setRole(e.target.value as UserRole)}
              style={{
                background: 'transparent',
                color: 'var(--text-primary)',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="student" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>🎓 Student View</option>
              <option value="parent" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>👨‍👩‍👧 Parent View</option>
              <option value="teacher" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>👨‍🏫 Teacher Studio</option>
              <option value="admin" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>🛡️ Admin Hub</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              padding: '8px',
              borderRadius: '50%',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)'
            }}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Role-Based Sub-Tab Navigation Bar */}
      <div style={{ padding: '0 20px 8px 20px', display: 'flex', gap: '16px', overflowX: 'auto', borderTop: '1px solid var(--border-color)' }} className="no-scrollbar">
        {currentRole === 'student' && (
          <>
            <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<BookOpen size={16} />} label="My Classroom" />
            <TabButton active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} icon={<Layers size={16} />} label="Subjects & Subscriptions" />
            <TabButton active={activeTab === 'live'} onClick={() => setActiveTab('live')} icon={<Radio size={16} />} label={`Live Classes ${liveCount > 0 ? `(${liveCount} LIVE)` : ''}`} badge={liveCount > 0} />
            <TabButton active={activeTab === 'quizzes'} onClick={() => setActiveTab('quizzes')} icon={<Award size={16} />} label="Tests & Quizzes" />
            <TabButton active={activeTab === 'qa'} onClick={() => setActiveTab('qa')} icon={<HelpCircle size={16} />} label="Ask Teacher Q&A" />
          </>
        )}
        {currentRole === 'parent' && (
          <>
            <TabButton active={activeTab === 'parent_monitor'} onClick={() => setActiveTab('parent_monitor')} icon={<Users size={16} />} label="Child Progress & Attendance" />
            <TabButton active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} icon={<Layers size={16} />} label="Subscribe to Subjects" />
          </>
        )}
        {currentRole === 'teacher' && (
          <>
            <TabButton active={activeTab === 'teacher_studio'} onClick={() => setActiveTab('teacher_studio')} icon={<Award size={16} />} label="Teacher Content Studio" />
            <TabButton active={activeTab === 'live'} onClick={() => setActiveTab('live')} icon={<Radio size={16} />} label="Schedule Live Lesson" />
            <TabButton active={activeTab === 'qa'} onClick={() => setActiveTab('qa')} icon={<HelpCircle size={16} />} label="Student Questions Inbox" />
          </>
        )}
        {currentRole === 'admin' && (
          <>
            <TabButton active={activeTab === 'admin_hub'} onClick={() => setActiveTab('admin_hub')} icon={<ShieldCheck size={16} />} label="Teacher Verification & Analytics" />
            <TabButton active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} icon={<Layers size={16} />} label="Manage Curriculum & Pricing" />
          </>
        )}
      </div>
    </header>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; badge?: boolean }> = ({
  active,
  onClick,
  icon,
  label,
  badge
}) => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 14px',
      fontSize: '0.85rem',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: active ? 'var(--primary)' : 'var(--text-secondary)',
      borderBottom: active ? '3px solid var(--primary)' : '3px solid transparent',
      background: 'transparent',
      whiteSpace: 'nowrap'
    }}
  >
    {icon}
    {label}
    {badge && <span className="badge badge-gold pulse-badge" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>NOW</span>}
  </button>
);
