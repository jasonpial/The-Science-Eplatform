import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  CreditCard,
  Calendar,
  GraduationCap,
  MessageSquare,
  Menu,
  ChevronDown,
  ChevronRight,
  WifiOff,
  Wifi,
  ShieldCheck,
  Users,
  Award,
  LogOut,
  FolderDown,
  Play,
  BookOpen,
  Sparkles,
  Home,
  FlaskConical,
  Atom,
  Settings,
  X
} from 'lucide-react';
import { UserRole } from '../types';

export const Sidebar: React.FC<{
  isCollapsed: boolean;
  toggleCollapse: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}> = ({ isCollapsed, toggleCollapse, mobileOpen = false, onMobileClose }) => {
  const {
    currentRole,
    activeTab,
    setActiveTab,
    isDataSaverMode,
    toggleDataSaver,
    liveClasses,
    qaThreads,
    logout,
    currentUser,
    openPaymentModal,
    activeLevel,
    returnToLandingPage
  } = useApp();

  const [openSubmenu, setOpenSubmenu] = useState<string | null>('courses');

  const pendingQA = qaThreads.filter(q => !q.resolved).length;
  const liveCount = liveClasses.filter(c => c.isLive).length;

  const isOLevel = activeLevel === 'O-Level';
  const accentColor = isOLevel ? '#7c3aed' : '#0d9488';
  const accentLight = isOLevel ? '#f3e8ff' : '#ccfbf1';
  const accentGlow = isOLevel ? 'rgba(124, 58, 237, 0.25)' : 'rgba(13, 148, 136, 0.25)';

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: <Home size={19} />,
      roleAllowed: ['student', 'parent', 'teacher', 'admin'],
      tab: 'dashboard'
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: <BookOpen size={19} />,
      roleAllowed: ['student', 'teacher', 'parent', 'admin'],
      tab: 'dashboard',
      hasSubmenu: true,
      submenu: [
        { label: 'Active Courses', tab: 'dashboard', count: 3, active: true },
        { label: 'Completed', tab: 'dashboard', count: 4 },
        { label: 'All Courses', tab: 'catalog', count: 16 }
      ]
    },
    {
      id: 'schedule',
      label: 'Calendar',
      icon: <Calendar size={19} />,
      roleAllowed: ['student', 'teacher', 'admin'],
      tab: 'live',
      badge: liveCount > 0 ? `${liveCount} LIVE` : undefined,
      badgeType: 'live'
    },
    {
      id: 'team',
      label: 'Team',
      icon: <Users size={19} />,
      roleAllowed: ['student', 'teacher', 'parent', 'admin'],
      tab: 'parent_monitor'
    },
    {
      id: 'resources',
      label: 'Library',
      icon: <FolderDown size={19} />,
      roleAllowed: ['student', 'teacher', 'parent', 'admin'],
      tab: 'resources'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={19} />,
      roleAllowed: ['student', 'teacher', 'parent', 'admin'],
      tab: 'resources'
    },
    {
      id: 'quizzes',
      label: 'UNEB Practice Tests',
      icon: <Award size={19} />,
      roleAllowed: ['student', 'teacher', 'admin'],
      tab: 'quizzes'
    },
    {
      id: 'financials',
      label: 'Financials & MoMo',
      icon: <CreditCard size={19} />,
      roleAllowed: ['student', 'parent', 'admin'],
      tab: 'catalog'
    },
    {
      id: 'messages',
      label: 'Messages & Q&A',
      icon: <MessageSquare size={19} />,
      roleAllowed: ['student', 'teacher', 'parent', 'admin'],
      tab: 'qa',
      badge: pendingQA > 0 ? `${pendingQA}` : undefined
    }
  ];

  const visibleItems = menuItems.filter(item => item.roleAllowed.includes(currentRole));

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    if (onMobileClose) onMobileClose();
  };

  return (
    <>
      <aside
        className={`sidebar-container ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
      >
        {/* ======== 1. HEADER / LOGO ROW ======== */}
        <div style={{
          padding: isCollapsed ? '20px 12px' : '20px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          borderBottom: '1px solid var(--sidebar-border)',
          flexShrink: 0
        }}>
          {!isCollapsed ? (
            <div
              onClick={returnToLandingPage}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1, minWidth: 0 }}
              title="Return to Landing Page"
            >
              {/* Squircle logo box */}
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)', flexShrink: 0
              }}>
                <Play size={18} style={{ marginLeft: '2px', fill: '#fff', color: '#fff' }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem',
                  color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  Learnify
                </div>
                <div style={{
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.04em',
                  color: accentColor, marginTop: '2px'
                }}>
                  SCIENCE CLASSROOM
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={toggleCollapse}
              style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)', cursor: 'pointer'
              }}
              title="Expand Sidebar"
            >
              <Play size={18} style={{ marginLeft: '2px', fill: '#fff', color: '#fff' }} />
            </div>
          )}

          {!isCollapsed && (
            <button
              onClick={toggleCollapse}
              style={{
                background: 'var(--bg-surface)', color: 'var(--text-secondary)',
                padding: '7px', borderRadius: '8px',
                border: '1px solid var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                marginLeft: '8px'
              }}
              title="Collapse Sidebar"
            >
              <Menu size={16} />
            </button>
          )}

          {/* Mobile close button */}
          {mobileOpen && !isCollapsed && (
            <button
              onClick={onMobileClose}
              style={{
                background: 'var(--bg-surface)', color: 'var(--text-secondary)',
                padding: '7px', borderRadius: '8px',
                border: '1px solid var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginLeft: '6px'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* ======== 2. NAVIGATION ITEMS ======== */}
        <div style={{
          flex: 1, padding: isCollapsed ? '12px 6px' : '14px 12px', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: '4px'
        }} className="no-scrollbar">

          {visibleItems.map(item => {
            const isActive = activeTab === item.tab && !item.hasSubmenu;
            const isSubmenuOpen = openSubmenu === item.id;

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.hasSubmenu && !isCollapsed) {
                      toggleSubmenu(item.id);
                    }
                    handleNavClick(item.tab);
                  }}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  style={{
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    padding: isCollapsed ? '12px' : '10px 14px',
                  }}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <span className="nav-icon" style={{ flexShrink: 0 }}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: (isActive || isSubmenuOpen) ? 700 : 500,
                        color: (isActive || isSubmenuOpen) ? 'var(--text-primary)' : 'var(--sidebar-text)',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>
                        {item.label}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      {item.badge && (
                        <span className={`sidebar-badge ${item.badgeType === 'live' ? 'live' : ''}`}
                          style={{ background: item.badgeType === 'live' ? '#ef4444' : accentColor }}>
                          {item.badge}
                        </span>
                      )}
                      {item.hasSubmenu && (
                        isSubmenuOpen
                          ? <ChevronDown size={15} style={{ color: 'var(--sidebar-icon-color)' }} />
                          : <ChevronRight size={15} style={{ color: 'var(--sidebar-icon-color)' }} />
                      )}
                    </div>
                  )}
                </button>

                {/* Tree Submenu for Courses */}
                {item.hasSubmenu && isSubmenuOpen && !isCollapsed && (
                  <div className="sidebar-submenu-tree">
                    {item.submenu?.map((sub, idx) => {
                      const isSubActive = sub.active || activeTab === sub.tab;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(sub.tab)}
                          className={`sidebar-submenu-item-tree ${isSubActive ? 'active' : ''}`}
                        >
                          <span>{sub.label}</span>
                          {sub.count && (
                            <span className="sidebar-count-badge">{sub.count}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Spacer */}
          <div style={{ flex: 1, minHeight: '16px' }} />

          {/* ======== 3. UPGRADE PLAN CARD ======== */}
          {!isCollapsed && (
            <div className="sidebar-upgrade-card" style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '16px',
              margin: '8px 0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)', flexShrink: 0
                }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                    Upgrade plan
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    You free trial will be over
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '999px', overflow: 'hidden', marginTop: '10px', marginBottom: '8px' }}>
                <div style={{
                  width: '65%', height: '100%',
                  background: 'linear-gradient(90deg, #7c3aed, #6366f1)',
                  borderRadius: '999px'
                }} />
              </div>
            </div>
          )}
        </div>

        {/* ======== 4. USER PROFILE FOOTER ======== */}
        <div className="sidebar-user-footer" style={{
          padding: isCollapsed ? '16px 10px' : '16px 18px',
          borderTop: '1px solid var(--sidebar-border)',
          display: 'flex', alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            {/* Avatar with bright green online dot */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt="User avatar"
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--border-color)'
                }}
              />
              <div style={{
                position: 'absolute', bottom: '1px', right: '1px',
                width: '10px', height: '10px', borderRadius: '50%',
                background: '#10b981', border: '2px solid var(--sidebar-bg)'
              }} />
            </div>

            {!isCollapsed && (
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{
                  fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)',
                  fontFamily: 'var(--font-heading)', lineHeight: 1.2,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  {currentUser?.name || 'Jenny Wilson'}
                </div>
                <div style={{
                  fontSize: '0.72rem', color: 'var(--text-muted)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  {currentUser?.email || 'jennywilson@gmail.com'}
                </div>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={logout}
              style={{
                background: 'transparent', color: 'var(--text-secondary)',
                border: 'none',
                padding: '6px', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, cursor: 'pointer'
              }}
              title="Log Out"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
