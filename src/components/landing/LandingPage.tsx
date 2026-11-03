import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AcademicLevel } from '../../types';
import {
  Play,
  GraduationCap,
  Radio,
  WifiOff,
  Smartphone,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  BookOpen,
  Zap,
  Globe,
  Shield,
  Menu,
  X,
  ChevronRight,
  FlaskConical,
  Atom,
  Microscope,
  Calculator,
  LogIn,
  UserPlus,
  Sparkles
} from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';

export const LandingPage: React.FC = () => {
  const { enterPortalAsLevel, theme, toggleTheme } = useApp();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleStartLevel = (level: AcademicLevel) => {
    enterPortalAsLevel(level);
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const stats = [
    { value: '12,000+', label: 'Active Students', icon: <Users size={22} /> },
    { value: '48', label: 'Verified Teachers', icon: <GraduationCap size={22} /> },
    { value: '320+', label: 'Video Lessons', icon: <Play size={22} /> },
    { value: '98%', label: 'UNEB Pass Rate', icon: <Award size={22} /> }
  ];

  const features = [
    {
      icon: <Radio size={28} />,
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.12)',
      title: 'Live Virtual Classrooms',
      desc: 'Zoom-like interactive sessions with digital whiteboard, real-time polling, screen sharing, and Raise Hand function.'
    },
    {
      icon: <WifiOff size={28} />,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
      title: 'Data Saver Mode',
      desc: 'Ultra low-MB audio streaming saves 80% of data. Resolution switcher from 1080p to 240p. Downloadable notes.'
    },
    {
      icon: <Smartphone size={28} />,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.12)',
      title: 'MTN & Airtel Mobile Money',
      desc: 'Instant subject activation with automatic USSD prompt simulation. Pay per subject or get full science bundle.'
    },
    {
      icon: <Award size={28} />,
      color: '#0d9488',
      bg: 'rgba(13, 148, 136, 0.12)',
      title: 'Auto-Graded UNEB Quizzes',
      desc: 'Past paper objective questions with step-by-step solutions. Teacher-marked papers with official correction PDFs.'
    },
    {
      icon: <BookOpen size={28} />,
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.12)',
      title: 'Textbook Library',
      desc: 'Curated UNEB-aligned textbooks, revision notes, and past papers from verified science educators.'
    },
    {
      icon: <Shield size={28} />,
      color: '#ec4899',
      bg: 'rgba(236, 72, 153, 0.12)',
      title: 'Parent Monitoring',
      desc: 'Real-time progress tracking, subscription management, and performance reports sent directly to parents.'
    }
  ];

  const howItWorks = [
    { step: '01', title: 'Choose Your Level', desc: 'Select O-Level (S1–S4) or A-Level (S5–S6) to enter your dedicated science portal.' },
    { step: '02', title: 'Pick Your Subjects', desc: 'Subscribe to Mathematics, Physics, Chemistry, or Biology — individually or as a full bundle.' },
    { step: '03', title: 'Learn with Expert Teachers', desc: 'Join live classes, watch recorded lessons, and access UNEB-aligned study materials.' },
    { step: '04', title: 'Test & Excel', desc: 'Practice with auto-graded UNEB quizzes and get teacher feedback on submitted papers.' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#fff', fontFamily: 'var(--font-body)' }}>

      {/* ===== STICKY NAVBAR ===== */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(15, 23, 42, 0.96)' : 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          transition: 'all 0.3s ease',
          padding: '0 clamp(8px, 2.5vw, 24px)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          minHeight: '62px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(6px, 1.5vw, 12px)',
          width: '100%'
        }}>
          {/* Brand Logo & Name */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(6px, 1.5vw, 12px)',
              cursor: 'pointer',
              minWidth: 0,
              flexShrink: 1
            }}
            title="THE SCIENCE CLASSROOM • DBROFT TECHNOLOGIES"
          >
            <div style={{
              width: 'clamp(32px, 7vw, 40px)',
              height: 'clamp(32px, 7vw, 40px)',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
              flexShrink: 0
            }}>
              <Play size={16} style={{ marginLeft: '2px', fill: '#fff', color: '#fff' }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(0.74rem, 2.5vw, 1rem)',
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                THE SCIENCE CLASSROOM
              </div>
              <div style={{
                fontSize: 'clamp(0.5rem, 1.6vw, 0.62rem)',
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '1px'
              }}>
                DBROFT TECHNOLOGIES • UGANDA 🇺🇬
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="landing-nav-links" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(14px, 2vw, 28px)',
            fontSize: '0.875rem',
            fontWeight: 600,
            flexShrink: 0
          }}>
            <a href="#levels" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s', textDecoration: 'none' }}>Curriculum</a>
            <a href="#features" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s', textDecoration: 'none' }}>Features</a>
            <a href="#how-it-works" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s', textDecoration: 'none' }}>How It Works</a>
            <a href="#pricing" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s', textDecoration: 'none' }}>Pricing</a>
          </nav>

          {/* CTA Buttons & Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 1.2vw, 8px)', flexShrink: 0 }}>
            {/* Sign In Button — ALWAYS visible on all screen sizes */}
            <button
              onClick={() => openAuth('login')}
              style={{
                padding: 'clamp(5px, 1.3vw, 8px) clamp(7px, 1.8vw, 14px)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
                border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              title="Sign In"
              aria-label="Sign In"
            >
              <LogIn size={13} />
              <span>Sign In</span>
            </button>

            {/* Join Free Button — ALWAYS visible on all screen sizes */}
            <button
              onClick={() => openAuth('signup')}
              style={{
                padding: 'clamp(5px, 1.3vw, 8px) clamp(8px, 1.8vw, 14px)',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              title="Join Free"
              aria-label="Join Free"
            >
              <UserPlus size={13} />
              <span>Join Free</span>
            </button>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                padding: 'clamp(6px, 1.4vw, 8px)',
                borderRadius: '8px',
                background: mobileMenuOpen ? 'rgba(124, 58, 237, 0.3)' : 'rgba(255,255,255,0.08)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                minWidth: '34px',
                minHeight: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              className="mobile-menu-btn"
              title="Toggle Navigation Menu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE SUB-NAV PILL BAR (Curriculum, Features, How It Works, Pricing) ===== */}
      <div
        className="landing-mobile-quickbar"
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '6px 10px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          gap: '6px',
          whiteSpace: 'nowrap',
          zIndex: 95
        }}
      >
        <a href="#levels" className="landing-quick-pill">📚 Curriculum</a>
        <a href="#features" className="landing-quick-pill">⚡ Features</a>
        <a href="#how-it-works" className="landing-quick-pill">🚀 How It Works</a>
        <a href="#pricing" className="landing-quick-pill">💰 Pricing</a>
      </div>

      {/* ===== MOBILE MENU DRAWER ===== */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '62px',
          left: 0,
          right: 0,
          zIndex: 99,
          background: 'rgba(15, 23, 42, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 16px 36px rgba(0,0,0,0.5)',
          padding: '16px 16px 20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxHeight: 'calc(100vh - 62px)',
          overflowY: 'auto'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Quick Navigation
          </div>

          {[
            { label: 'Curriculum & Academic Levels', href: '#levels', icon: '📚' },
            { label: 'Platform Features & Tools', href: '#features', icon: '⚡' },
            { label: 'How It Works (4 Steps)', href: '#how-it-works', icon: '🚀' },
            { label: 'Pricing & MoMo Subscriptions', href: '#pricing', icon: '💰' }
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 600,
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '2px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={() => { openAuth('login'); setMobileMenuOpen(false); }}
              style={{
                padding: '10px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.85rem',
                border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <LogIn size={14} /> Sign In
            </button>
            <button
              onClick={() => { openAuth('signup'); setMobileMenuOpen(false); }}
              style={{
                padding: '10px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: 'none',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <UserPlus size={14} /> Join Free
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '2px' }}>
            <button
              onClick={() => { handleStartLevel('O-Level'); setMobileMenuOpen(false); }}
              style={{
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(124, 58, 237, 0.15)',
                color: '#c4b5fd',
                fontWeight: 700,
                fontSize: '0.82rem',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <span>Enter O-Level Portal (S1–S4)</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => { handleStartLevel('A-Level'); setMobileMenuOpen(false); }}
              style={{
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(13, 148, 136, 0.15)',
                color: '#5eead4',
                fontWeight: 700,
                fontSize: '0.82rem',
                border: '1px solid rgba(13, 148, 136, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <span>Enter A-Level Portal (S5–S6)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ===== HERO SECTION ===== */}
      <section
        className="landing-hero-gradient"
        style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(50px, 8vw, 90px) clamp(16px, 4vw, 24px) clamp(60px, 10vw, 110px) clamp(16px, 4vw, 24px)' }}
      >
        {/* Decorative glows */}
        <div className="landing-hero-glow" style={{ width: '500px', height: '500px', background: 'rgba(124, 58, 237, 0.3)', top: '-150px', left: '-100px' }} />
        <div className="landing-hero-glow" style={{ width: '400px', height: '400px', background: 'rgba(13, 148, 136, 0.2)', bottom: '-100px', right: '-100px' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div className="animate-fade-up" style={{ marginBottom: '24px' }}>
            <span className="hero-badge">
              🇺🇬 Uganda's #1 Digital Science Platform
            </span>
          </div>

          {/* Title */}
          <h1
            className="landing-hero-title animate-fade-up animate-fade-up-delay-1"
            style={{ fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.03em' }}
          >
            Your Science Classroom,{' '}
            <br />
            <span className="gradient-text-hero">Wherever You Are.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up animate-fade-up-delay-2"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.68)', maxWidth: '680px', margin: '0 auto 36px auto', lineHeight: 1.7 }}
          >
            Connecting Ugandan <strong style={{ color: '#a78bfa' }}>O-Level</strong> &amp; <strong style={{ color: '#5eead4' }}>A-Level</strong> students with verified science teachers in Mathematics, Physics, Chemistry, and Biology — through live classes, data-saving video, UNEB quizzes, and Mobile Money billing.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up animate-fade-up-delay-3 landing-hero-buttons" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button
              onClick={() => handleStartLevel('O-Level')}
              style={{
                padding: '14px 28px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                color: '#fff', fontWeight: 800, fontSize: '0.95rem',
                boxShadow: '0 8px 24px rgba(124, 58, 237, 0.45)',
                display: 'flex', alignItems: 'center', gap: '8px',
                border: 'none'
              }}
            >
              Get Started <ArrowRight size={18} />
            </button>
            <button
              onClick={() => openAuth('signup')}
              style={{
                padding: '14px 24px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', gap: '8px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <UserPlus size={18} /> Register / Join Us
            </button>
            <button
              onClick={() => openAuth('login')}
              style={{
                padding: '14px 22px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.95rem',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              <LogIn size={18} /> Sign In
            </button>
          </div>

          {/* Stats Row */}
          <div
            className="animate-fade-up animate-fade-up-delay-4 landing-stats-grid"
            style={{ maxWidth: '700px', margin: '0 auto' }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: '14px 10px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center'
              }}>
                <div style={{ color: '#a78bfa', marginBottom: '4px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHOOSE YOUR LEVEL SECTION ===== */}
      <section id="levels" style={{ background: '#0f172a', padding: 'clamp(50px, 6vw, 80px) 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="hero-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              📚 Choose Your Academic Path
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', marginTop: '16px', marginBottom: '12px' }}>
              Independent Level Portals
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              O-Level and A-Level are fully separate learning paths. Each has its own dashboard, curriculum, and resources.
            </p>
          </div>

          <div className="landing-level-grid">
            {/* O-Level Card */}
            <div className="level-card-o" style={{ padding: '36px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(124, 58, 237, 0.4)'
                }}>
                  <FlaskConical size={26} color="#fff" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>O-Level Portal</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a78bfa', letterSpacing: '0.06em', textTransform: 'uppercase' }}>UNEB O-LEVEL • Senior 1–4</div>
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Comprehensive foundation in O-Level Mathematics (P456), Physics (P535), Chemistry (P545), and Biology (P553) with full UNEB past paper revision.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['O-Level Physics — Mechanics & Light Optics', 'O-Level Chemistry — Acids, Bases & Titrations', 'O-Level Math — Algebra & Quadratic Equations', 'O-Level Biology — Cell Biology & Genetics'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>
                    <CheckCircle size={16} style={{ color: '#a78bfa', flexShrink: 0, marginTop: '1px' }} />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleStartLevel('O-Level')}
                style={{
                  width: '100%', padding: '16px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                  color: '#fff', fontWeight: 800, fontSize: '0.95rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
                  border: 'none'
                }}
              >
                Enter O-Level Portal <ArrowRight size={18} />
              </button>
            </div>

            {/* A-Level Card */}
            <div className="level-card-a" style={{ padding: '36px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(13, 148, 136, 0.4)'
                }}>
                  <Atom size={26} color="#fff" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>A-Level Portal</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#5eead4', letterSpacing: '0.06em', textTransform: 'uppercase' }}>UNEB A-LEVEL • Senior 5–6</div>
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Advanced Principal Mathematics (P425), Physics (P510), Chemistry (P525), and Biology (P530) masterclasses for university preparation.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Principal Math — Calculus & Mechanics P425', 'A-Level Physics — Electromagnetism & Quantum P510', 'A-Level Chemistry — Organic Synthesis P525', 'A-Level Biology — Biochemistry & Ecology P530'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>
                    <CheckCircle size={16} style={{ color: '#5eead4', flexShrink: 0, marginTop: '1px' }} />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleStartLevel('A-Level')}
                style={{
                  width: '100%', padding: '16px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #0d9488 0%, #0891b2 100%)',
                  color: '#fff', fontWeight: 800, fontSize: '0.95rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 8px 24px rgba(13, 148, 136, 0.4)',
                  border: 'none'
                }}
              >
                Enter A-Level Portal <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" style={{ background: '#0b1120', padding: 'clamp(50px, 6vw, 80px) 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="hero-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              ⚡ Platform Capabilities
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#fff', marginTop: '16px', marginBottom: '12px' }}>
              Complete Learning Ecosystem
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              Everything a Ugandan student needs to excel in national UNEB examinations — built for Uganda's connectivity.
            </p>
          </div>

          <div className="landing-features-grid">
            {features.map((f, i) => (
              <div key={i} className="landing-feature-card">
                <div style={{
                  width: '52px', height: '52px', borderRadius: '16px',
                  background: f.bg, color: f.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '18px'
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" style={{ background: '#0f172a', padding: 'clamp(50px, 6vw, 80px) 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="hero-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>🚀 Getting Started</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#fff', marginTop: '16px', marginBottom: '12px' }}>
              How It Works
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {howItWorks.map((step, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'clamp(12px, 3vw, 24px)',
                padding: 'clamp(16px, 3vw, 24px) clamp(14px, 3.5vw, 28px)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                transition: 'all 0.25s ease'
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                  fontWeight: 900,
                  color: 'rgba(124, 58, 237, 0.45)',
                  lineHeight: 1,
                  flexShrink: 0,
                  minWidth: 'clamp(38px, 9vw, 60px)'
                }}>
                  {step.step}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h3 style={{ fontSize: 'clamp(0.95rem, 2.4vw, 1.1rem)', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{step.title}</h3>
                  <p style={{ fontSize: 'clamp(0.82rem, 1.8vw, 0.9rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section id="pricing" style={{ background: '#0b1120', padding: 'clamp(50px, 6vw, 80px) 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="hero-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>💰 Flexible Pricing</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#fff', marginTop: '16px', marginBottom: '12px' }}>
              Pay Only For What You Need
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              No forced bundles. Subscribe per subject or grab the discounted full science package via Mobile Money.
            </p>
          </div>

          <div className="landing-pricing-grid">
            {[
              { name: 'Single Subject', subtitle: 'e.g. Physics Only', price: '25,000', period: 'month', cta: 'Select Subject', highlight: false },
              { name: 'Full Science Bundle', subtitle: 'Math, Physics, Chem & Bio', price: '65,000', period: 'month', cta: 'Get Full Bundle', highlight: true },
              { name: 'Multi-Subject Pack', subtitle: 'Pick any 2 or 3 subjects', price: '45,000', period: 'month', cta: 'Customize Pack', highlight: false }
            ].map((plan, i) => (
              <div key={i} style={{
                padding: 'clamp(20px, 3.5vw, 32px) clamp(14px, 3vw, 24px)',
                background: plan.highlight ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255,255,255,0.04)',
                border: plan.highlight ? '2px solid rgba(124, 58, 237, 0.5)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                textAlign: 'center',
                position: 'relative',
                transition: 'all 0.25s ease'
              }}>
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#fff', fontSize: '0.65rem', fontWeight: 800,
                    padding: '3px 12px', borderRadius: '9999px',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    fontFamily: 'var(--font-heading)',
                    whiteSpace: 'nowrap'
                  }}>
                    ⭐ BEST VALUE
                  </div>
                )}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{plan.name}</h3>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: '16px' }}>{plan.subtitle}</p>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.7rem, 4.5vw, 2.2rem)', fontWeight: 900, color: plan.highlight ? '#a78bfa' : '#fff' }}>
                    UGX {plan.price}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginLeft: '4px' }}>/ {plan.period}</span>
                </div>
                <button
                  onClick={() => handleStartLevel('O-Level')}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '12px',
                    background: plan.highlight ? 'linear-gradient(135deg, #7c3aed, #6366f1)' : 'rgba(255,255,255,0.08)',
                    color: '#fff', fontWeight: 700, fontSize: '0.88rem',
                    border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    boxShadow: plan.highlight ? '0 6px 20px rgba(124, 58, 237, 0.35)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: '#070d1a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(40px, 5vw, 64px) 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Play size={20} style={{ fill: '#fff', color: '#fff', marginLeft: '2px' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>THE SCIENCE CLASSROOM</div>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>DBROFT TECHNOLOGIES</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: '340px' }}>
                Uganda's premier digital science education platform for O-Level and A-Level students. Built for Uganda's connectivity, UNEB curriculum, and Mobile Money ecosystem.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>Quick Portals</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={() => handleStartLevel('O-Level')} style={{ background: 'none', color: '#a78bfa', textAlign: 'left', fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: 'pointer' }}>
                  O-Level Science Portal →
                </button>
                <button onClick={() => handleStartLevel('A-Level')} style={{ background: 'none', color: '#5eead4', textAlign: 'left', fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: 'pointer' }}>
                  A-Level Science Portal →
                </button>
                <button onClick={() => openAuth('login')} style={{ background: 'none', color: 'rgba(255,255,255,0.45)', textAlign: 'left', fontSize: '0.88rem', border: 'none', cursor: 'pointer' }}>
                  Sign In to Portal
                </button>
                <button onClick={() => openAuth('signup')} style={{ background: 'none', color: 'rgba(255,255,255,0.45)', textAlign: 'left', fontSize: '0.88rem', border: 'none', cursor: 'pointer' }}>
                  Register as Student
                </button>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>Subjects</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Mathematics', 'Physics', 'Chemistry', 'Biology'].map(s => (
                  <span key={s} style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)' }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>© 2026 DBROFT TECHNOLOGIES. All Rights Reserved. • Kampala, Uganda 🇺🇬</span>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Your Science Classroom, Wherever You Are.</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};
