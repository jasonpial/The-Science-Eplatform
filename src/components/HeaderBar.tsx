import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Sun,
  Moon,
  LogOut,
  ShieldCheck,
  Menu,
  Settings,
  GraduationCap,
  FlaskConical,
  Atom,
  ChevronDown
} from 'lucide-react';
import { AcademicLevel } from '../types';
import { SettingsModal } from './settings/SettingsModal';
import { NotificationDrawer } from './notifications/NotificationDrawer';
import { AuthModal } from './auth/AuthModal';

export const HeaderBar: React.FC<{
  activeSubtab: string;
  setActiveSubtab: (subtab: string) => void;
  onMobileMenuToggle?: () => void;
}> = ({ activeSubtab, setActiveSubtab, onMobileMenuToggle }) => {
  const {
    currentRole,
    activeLevel,
    setActiveLevel,
    activeTab,
    theme,
    toggleTheme,
    logout,
    notifications,
    currentUser
  } = useApp();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const isOLevel = activeLevel === 'O-Level';
  const accentColor = isOLevel ? '#7c3aed' : '#0d9488';
  const accentLight = isOLevel ? 'var(--primary-light)' : 'var(--secondary-light)';

  const subtabs = [
    { id: 'general', label: 'General' },
    { id: 'studies', label: 'Studies' },
    { id: 'finance', label: 'Finance' },
    { id: 'teaching', label: 'Teaching' }
  ];

  const getPageTitle = () => {
    switch (activeTab) {
      case 'catalog': return 'Financials & Subscriptions';
      case 'live': return 'Live Virtual Classroom';
      case 'quizzes': return 'UNEB Tests & Quizzes';
      case 'resources': return 'Textbooks & Study Materials';
      case 'parent_monitor': return 'Parent Monitoring';
      case 'teacher_studio': return 'Teacher Content Studio';
      case 'admin_hub': return 'Admin Verification Hub';
      default: return 'Dashboard';
    }
  };

  return (
    <div style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)', flexShrink: 0 }}>

      {/* ===== TOP NAVBAR ROW ===== */}
      <div
        className="header-top-row"
        style={{
          padding: '10px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          gap: '8px'
        }}
      >
        {/* Left: Hamburger (mobile) + Page Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
          {/* Mobile hamburger */}
          <button
            onClick={onMobileMenuToggle}
            style={{
              padding: '8px', borderRadius: '8px',
              background: 'var(--bg-surface)', color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              display: 'flex', alignItems: 'center',
              flexShrink: 0, minWidth: '38px', minHeight: '38px', justifyContent: 'center'
            }}
            className="mobile-menu-trigger"
            title="Open Navigation"
            aria-label="Open Navigation Drawer"
          >
            <Menu size={18} />
          </button>

          <div style={{ minWidth: 0 }}>
            <h1
              className="header-title-heading"
              style={{
                fontSize: '1rem', fontWeight: 800, margin: 0,
                color: 'var(--text-primary)', fontFamily: 'var(--font-heading)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
              }}
            >
              {getPageTitle()}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                padding: '2px 8px', borderRadius: '9999px',
                background: accentLight,
                border: `1px solid ${isOLevel ? 'rgba(124,58,237,0.2)' : 'rgba(13,148,136,0.2)'}`
              }}>
                {isOLevel
                  ? <FlaskConical size={11} style={{ color: accentColor }} />
                  : <Atom size={11} style={{ color: accentColor }} />
                }
                <span style={{ fontSize: '0.62rem', fontWeight: 800, color: accentColor, letterSpacing: '0.04em' }}>
                  {activeLevel}
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                • {currentRole}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Level Switch + Actions */}
        <div className="header-action-group" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>

          {/* Level Switcher Pill */}
          <div style={{
            display: 'flex', background: 'var(--bg-surface)',
            padding: '2px', borderRadius: '9999px',
            border: '1px solid var(--border-color)'
          }}>
            {(['O-Level', 'A-Level'] as AcademicLevel[]).map(lvl => (
              <button
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                style={{
                  padding: '4px 8px', borderRadius: '9999px',
                  fontSize: '0.7rem', fontWeight: 800,
                  background: activeLevel === lvl ? (lvl === 'O-Level' ? '#7c3aed' : '#0d9488') : 'transparent',
                  color: activeLevel === lvl ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Notification Bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              style={{
                padding: '8px', borderRadius: '8px',
                background: 'var(--bg-surface)', color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                display: 'flex', alignItems: 'center', position: 'relative',
                minWidth: '36px', minHeight: '36px', justifyContent: 'center'
              }}
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell size={16} />
              {unreadNotifCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  background: '#ef4444', color: '#fff', borderRadius: '50%',
                  width: '16px', height: '16px', fontSize: '0.58rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--bg-card)'
                }}>
                  {unreadNotifCount}
                </span>
              )}
            </button>
            <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              padding: '8px', borderRadius: '8px',
              background: 'var(--bg-surface)', color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              display: 'flex', alignItems: 'center', gap: '5px',
              fontWeight: 600, fontSize: '0.75rem',
              minWidth: '36px', minHeight: '36px', justifyContent: 'center'
            }}
            title="Toggle Theme"
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark'
              ? <Sun size={15} style={{ color: '#f59e0b' }} />
              : <Moon size={15} style={{ color: '#6366f1' }} />
            }
            <span className="header-theme-text">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            style={{
              padding: '8px', borderRadius: '8px',
              background: 'var(--bg-surface)', color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              display: 'flex', alignItems: 'center',
              minWidth: '36px', minHeight: '36px', justifyContent: 'center'
            }}
            title="Settings"
            aria-label="Open settings"
          >
            <Settings size={16} />
          </button>

          {/* Log Out */}
          <button
            onClick={() => { logout(); }}
            style={{
              padding: '8px 10px', borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              fontWeight: 700, fontSize: '0.75rem',
              display: 'flex', alignItems: 'center', gap: '4px',
              minWidth: '36px', minHeight: '36px', justifyContent: 'center'
            }}
            title="Log Out"
            aria-label="Log Out"
          >
            <LogOut size={15} />
            <span className="header-theme-text">Log Out</span>
          </button>
        </div>
      </div>

      {/* ===== GREETING + SUBTABS ROW ===== */}
      <div className="header-greeting-row" style={{ padding: '12px 20px 0 20px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '8px', marginBottom: '8px'
        }}>
          <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)', fontWeight: 800, margin: 0, fontFamily: 'var(--font-heading)' }}>
            Hello, {currentUser?.name?.split(' ')[0] || 'Brian'}! 👋
          </h2>

          <button
            onClick={() => setIsAuthOpen(true)}
            style={{
              padding: '6px 12px', borderRadius: '8px',
              background: accentLight,
              color: accentColor, fontWeight: 700, fontSize: '0.75rem',
              border: `1px solid ${isOLevel ? 'rgba(124,58,237,0.2)' : 'rgba(13,148,136,0.2)'}`,
              display: 'flex', alignItems: 'center', gap: '5px'
            }}
          >
            <GraduationCap size={14} /> Switch Account
          </button>
        </div>

        {/* Subtabs */}
        <div
          className="header-subtabs no-scrollbar"
          style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '2px' }}
        >
          {subtabs.map(tab => {
            const isSubActive = activeSubtab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubtab(tab.id)}
                style={{
                  padding: '7px 2px 12px 2px', fontSize: '0.875rem',
                  fontWeight: isSubActive ? 700 : 500,
                  color: isSubActive ? accentColor : 'var(--text-secondary)',
                  borderBottom: isSubActive ? `3px solid ${accentColor}` : '3px solid transparent',
                  background: 'transparent', border: 'none',
                  borderBottomStyle: 'solid',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};
