import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { HeaderBar } from './components/HeaderBar';
import { AjariDashboardView } from './components/dashboard/AjariDashboardView';
import { StudentDashboard } from './components/student/StudentDashboard';
import { SubjectCatalog } from './components/student/SubjectCatalog';
import { LessonViewer } from './components/student/LessonViewer';
import { LiveClassroom } from './components/student/LiveClassroom';
import { QuizEngine } from './components/student/QuizEngine';
import { ResourceLibrary } from './components/resources/ResourceLibrary';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MobileMoneyModal } from './components/payment/MobileMoneyModal';
import { LandingPage } from './components/landing/LandingPage';
import { BottomNavBar } from './components/BottomNavBar';
import { Play } from 'lucide-react';

const AppLayout: React.FC = () => {
  const { activeTab, currentRole, activeLevel } = useApp();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSubtab, setActiveSubtab] = useState('general');

  const isOLevel = activeLevel === 'O-Level';
  const accentColor = isOLevel ? '#7c3aed' : '#0d9488';

  const renderMainContent = () => {
    // Subtab routing
    if (activeSubtab === 'finance') {
      return <SubjectCatalog />;
    } else if (activeSubtab === 'studies') {
      return <AjariDashboardView />;
    } else if (activeSubtab === 'teaching' && (currentRole === 'teacher' || currentRole === 'admin')) {
      return <TeacherDashboard />;
    }

    // Default tab routing
    switch (activeTab) {
      case 'dashboard':
        return <AjariDashboardView />;
      case 'resources':
        return <ResourceLibrary />;
      case 'catalog':
        return <SubjectCatalog />;
      case 'lesson':
        return <LessonViewer />;
      case 'live':
        return <LiveClassroom />;
      case 'quizzes':
        return <QuizEngine />;
      case 'qa':
        return <LessonViewer />;
      case 'parent_monitor':
        return <ParentDashboard />;
      case 'teacher_studio':
        return <TeacherDashboard />;
      case 'admin_hub':
        return <AdminDashboard />;
      default:
        return <AjariDashboardView />;
    }
  };

  return (
    <div className="app-layout">
      {/* Left Sidebar Navigation */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        mobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <HeaderBar
          activeSubtab={activeSubtab}
          setActiveSubtab={setActiveSubtab}
          onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <div style={{ flex: 1 }}>
          {renderMainContent()}
        </div>

        <MobileMoneyModal />
        <BottomNavBar />

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid var(--border-color)',
          padding: '20px 28px',
          background: 'var(--bg-card)',
          flexShrink: 0
        }}>
          <div style={{
            maxWidth: '1400px', margin: '0 auto',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px',
                background: `linear-gradient(135deg, ${accentColor}, ${isOLevel ? '#6366f1' : '#0891b2'})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Play size={13} style={{ fill: '#fff', color: '#fff', marginLeft: '1px' }} />
              </div>
              <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                THE SCIENCE CLASSROOM
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                • DBROFT TECHNOLOGIES 🇺🇬
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              Your Science Classroom, Wherever You Are. (UNEB O &amp; A-Level Science)
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              © 2026 DBROFT. All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const RootView: React.FC = () => {
  const { viewMode } = useApp();

  if (viewMode === 'landing') {
    return <LandingPage />;
  }

  return <AppLayout />;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <RootView />
    </AppProvider>
  );
};

export default App;
