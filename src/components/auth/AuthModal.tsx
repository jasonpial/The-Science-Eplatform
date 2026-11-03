import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, AcademicLevel } from '../../types';
import { GraduationCap, LogIn, UserPlus, X, ShieldCheck, Smartphone, Lock, Mail, User as UserIcon } from 'lucide-react';

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { login, signup, setRole, setActiveLevel } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+256 ');
  const [role, setSelectedRole] = useState<UserRole>('student');
  const [level, setSelectedLevel] = useState<AcademicLevel>('O-Level');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'brian.kato@student.ug', role);
    onClose();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      name: name || 'New Student',
      email: email || 'student@school.ug',
      role: 'student',
      academicLevel: level,
      phone: phone || '+256 700 000000'
    });
    setActiveLevel(level);
    onClose();
  };

  const handleDemoLogin = (demoRole: UserRole, demoEmail: string) => {
    login(demoEmail, demoRole);
    setRole(demoRole);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '28px',
          borderRadius: '24px',
          position: 'relative',
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
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

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'var(--primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)'
            }}
          >
            <GraduationCap size={32} />
          </div>
          <h2 style={{ fontSize: '1.4rem', margin: '0 0 4px 0' }}>THE SCIENCE CLASSROOM</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
            {mode === 'login' ? 'Sign in to access your portal' : 'Create student account & select level'}
          </p>
        </div>

        {/* Toggle Mode Bar */}
        <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '4px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setMode('login')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: mode === 'login' ? 'var(--primary)' : 'transparent',
              color: mode === 'login' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: mode === 'signup' ? 'var(--primary)' : 'transparent',
              color: mode === 'signup' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            Student Sign Up
          </button>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Email Address:
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="brian.kato@student.ug"
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '10px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Password:
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '10px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Portal Role:
              </label>
              <select
                value={role}
                onChange={e => setSelectedRole(e.target.value as UserRole)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
              >
                <option value="student">🎓 Student Portal</option>
                <option value="parent">👨‍👩‍👧 Parent Dashboard</option>
                <option value="teacher">👨‍🏫 Teacher Studio</option>
                <option value="admin">🛡️ Admin Verification Hub</option>
              </select>
            </div>

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
                marginTop: '6px',
                boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <LogIn size={18} /> Sign In to Portal
            </button>
          </form>
        ) : (
          /* STUDENT SIGNUP FORM */
          <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Full Student Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Apophia Namuli"
                required
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
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Select Independent Academic Level:
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {(['O-Level', 'A-Level'] as AcademicLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: level === lvl ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      background: level === lvl ? 'var(--primary-light)' : 'var(--bg-surface)',
                      color: level === lvl ? 'var(--primary-hover)' : 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Email Address:
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@school.ug"
                required
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
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Ugandan Phone Number (Mobile Money):
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+256 770 000000"
                required
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
            </div>

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
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <UserPlus size={18} /> Create Account & Select Subjects
            </button>
          </form>
        )}

        {/* Demo Fast Login Divider */}
        <div style={{ margin: '20px 0 14px 0', textAlign: 'center', position: 'relative' }}>
          <hr style={{ borderColor: 'var(--border-color)' }} />
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'var(--bg-card)',
              padding: '0 8px',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
              fontWeight: 700
            }}
          >
            FAST DEMO ROLE ACCESS
          </span>
        </div>

        {/* Quick Demo Login Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={() => handleDemoLogin('student', 'brian.kato@student.ug')}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)'
            }}
          >
            🎓 Demo Student
          </button>
          <button
            onClick={() => handleDemoLogin('teacher', 'g.mukasa@scienceclassroom.ug')}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)'
            }}
          >
            👨‍🏫 Demo Teacher
          </button>
          <button
            onClick={() => handleDemoLogin('parent', 'david.kato@parent.ug')}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)'
            }}
          >
            👨‍👩‍👧 Demo Parent
          </button>
          <button
            onClick={() => handleDemoLogin('admin', 'admin@scienceclassroom.ug')}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)'
            }}
          >
            🛡️ Demo Admin
          </button>
        </div>
      </div>
    </div>
  );
};
