import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Radio, CreditCard, Award, FolderDown } from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { activeTab, setActiveTab, liveClasses } = useApp();
  const liveCount = liveClasses.filter(c => c.isLive).length;

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: <Home size={19} /> },
    {
      id: 'live',
      label: 'Live Class',
      icon: <Radio size={19} />,
      hasBadge: liveCount > 0
    },
    { id: 'catalog', label: 'Subjects', icon: <CreditCard size={19} /> },
    { id: 'quizzes', label: 'UNEB Tests', icon: <Award size={19} /> },
    { id: 'resources', label: 'Library', icon: <FolderDown size={19} /> }
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      <div className="mobile-bottom-nav-inner">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`mobile-bottom-nav-item ${isActive ? 'active' : ''}`}
              title={item.label}
              aria-label={item.label}
            >
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {item.icon}
                {item.hasBadge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-3px',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#ef4444'
                    }}
                  />
                )}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
