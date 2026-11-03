import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScienceSubject } from '../../types';
import {
  Play,
  Star,
  Users,
  Clock,
  Lock,
  Bookmark,
  Send,
  Sparkles,
  Calculator,
  Atom,
  TestTube,
  Dna,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Check,
  Award,
  FileText,
  Calendar,
  TrendingUp,
  Download
} from 'lucide-react';

export const AjariDashboardView: React.FC = () => {
  const {
    activeLevel,
    setActiveTab,
    setActiveLesson,
    lessons,
    openPaymentModal,
    userSubscribedSubjects
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ScienceSubject | 'All'>('All');
  const [chatMessageInput, setChatMessageInput] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const [chatList, setChatList] = useState([
    { id: 1, sender: 'teacher', name: 'Dr. Mukasa Godfrey', text: 'Hi Brian, what science topics are you reviewing today?', time: '4:10 PM' },
    { id: 2, sender: 'user', name: 'Brian Kato', text: 'O-Level Physics Mechanics and Chemistry Titration!', time: '4:12 PM' },
    { id: 3, sender: 'teacher', name: 'Dr. Mukasa Godfrey', text: 'Excellent! Make sure to complete the UNEB P535 mechanics practice quiz.', time: '4:15 PM' }
  ]);

  const categories: { id: ScienceSubject | 'All'; name: string; icon: React.ReactNode }[] = [
    { id: 'All', name: 'All Subjects', icon: <Sparkles size={16} /> },
    { id: 'Mathematics', name: 'Mathematics', icon: <Calculator size={16} /> },
    { id: 'Physics', name: 'Physics', icon: <Atom size={16} /> },
    { id: 'Chemistry', name: 'Chemistry', icon: <TestTube size={16} /> },
    { id: 'Biology', name: 'Biology', icon: <Dna size={16} /> }
  ];

  const popularCourses = [
    {
      id: 'c1',
      title: `${activeLevel} Physics Mechanics & Force`,
      subject: 'Physics' as ScienceSubject,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      reviewsCount: 234,
      studentsJoined: 406,
      duration: '4h 24min',
      priceUGX: 25000
    },
    {
      id: 'c2',
      title: `${activeLevel} Mathematics Quadratic Equations & Graphing`,
      subject: 'Mathematics' as ScienceSubject,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      reviewsCount: 312,
      studentsJoined: 520,
      duration: '5h 10min',
      priceUGX: 25000
    },
    {
      id: 'c3',
      title: `${activeLevel} Chemistry Volumetric Analysis & Titration`,
      subject: 'Chemistry' as ScienceSubject,
      image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      reviewsCount: 189,
      studentsJoined: 340,
      duration: '3h 45min',
      priceUGX: 25000
    }
  ];

  const topicsBreakdown = [
    { num: '#1', title: 'What is Linear Momentum & Force?', duration: '28min', free: true, subject: 'Physics' as ScienceSubject },
    { num: '#2', title: 'How Newton\'s Laws Work in Motion', duration: '32min', free: true, subject: 'Physics' as ScienceSubject },
    { num: '#3', title: 'Why Conservation of Momentum Matters', duration: '25min', free: true, subject: 'Physics' as ScienceSubject },
    { num: '#4', title: 'UNEB P535 Worked Practice Questions Part 1', duration: '40min', free: false, subject: 'Physics' as ScienceSubject },
    { num: '#5', title: 'UNEB P535 Worked Practice Questions Part 2', duration: '45min', free: false, subject: 'Physics' as ScienceSubject }
  ];

  const handleTopicClick = (topic: typeof topicsBreakdown[0]) => {
    const isEnrolled = userSubscribedSubjects.includes(topic.subject);
    if (topic.free || isEnrolled) {
      const match = lessons.find(l => l.subject === topic.subject && l.level === activeLevel);
      if (match) setActiveLesson(match);
      setActiveTab('lesson');
    } else {
      openPaymentModal([topic.subject], activeLevel, 'single', 'monthly', 25000);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessageInput.trim()) return;
    setChatList([
      ...chatList,
      {
        id: Date.now(),
        sender: 'user',
        name: 'Brian Kato',
        text: chatMessageInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setChatMessageInput('');
  };

  return (
    <div className="responsive-container">
      
      {/* Category Pills Header Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Select Category ({activeLevel})
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Ajari Dashboard Layout Grid */}
      <div className="two-col-grid">
        
        {/* LEFT COLUMN: Popular Science Courses & Course Content Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* SECTION 1: Popular Courses Carousel Grid */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.35rem)', margin: 0 }}>Popular Science Courses</h2>
              <button
                onClick={() => setActiveTab('catalog')}
                style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, background: 'transparent' }}
              >
                View More &gt;
              </button>
            </div>

            <div className="cards-responsive-grid">
              {popularCourses
                .filter(c => selectedCategory === 'All' || c.subject === selectedCategory)
                .map(course => {
                  const isEnrolled = userSubscribedSubjects.includes(course.subject);

                  return (
                    <div key={course.id} className="adari-card" style={{ display: 'flex', flexDirection: 'column' }}>
                      {/* Image Thumbnail with Overlay Play Icon */}
                      <div style={{ position: 'relative', width: '100%', height: '160px', overflow: 'hidden' }}>
                        <img
                          src={course.image}
                          alt={course.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)'
                          }}
                        />

                        <button
                          onClick={() => {
                            const match = lessons.find(l => l.subject === course.subject && l.level === activeLevel);
                            if (match) setActiveLesson(match);
                            setActiveTab('lesson');
                          }}
                          style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(29, 78, 216, 0.4)'
                          }}
                          title="Play Lesson Stream"
                        >
                          <Play size={20} style={{ marginLeft: '2px' }} />
                        </button>

                        <span
                          className="badge badge-primary"
                          style={{ position: 'absolute', top: '12px', left: '12px', background: '#fff', color: 'var(--primary)' }}
                        >
                          {course.subject}
                        </span>
                      </div>

                      {/* Course Card Body */}
                      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', marginBottom: '6px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b', fontWeight: 800 }}>
                              <Star size={14} fill="#f59e0b" /> {course.rating}
                            </span>
                            <span style={{ color: 'var(--text-secondary)' }}>({course.reviewsCount} Discussion)</span>
                          </div>

                          <h3 style={{ fontSize: '1.05rem', lineHeight: 1.4, marginBottom: '12px' }}>
                            {course.title}
                          </h3>

                          <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Users size={14} /> {course.studentsJoined} Students
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={14} /> {course.duration}
                            </span>
                          </div>
                        </div>

                        {/* Subscription Action Button */}
                        {isEnrolled ? (
                          <button
                            onClick={() => {
                              const match = lessons.find(l => l.subject === course.subject && l.level === activeLevel);
                              if (match) setActiveLesson(match);
                              setActiveTab('lesson');
                            }}
                            style={{
                              width: '100%',
                              padding: '10px',
                              borderRadius: '12px',
                              background: 'rgba(16, 185, 129, 0.15)',
                              color: '#10b981',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              border: '1px solid #10b981',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            <CheckCircle size={16} /> Enrolled (Resume Lesson)
                          </button>
                        ) : (
                          <button
                            onClick={() => openPaymentModal([course.subject], activeLevel, 'single', 'monthly', 25000)}
                            style={{
                              width: '100%',
                              padding: '10px',
                              borderRadius: '12px',
                              background: 'var(--primary)',
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)'
                            }}
                          >
                            PURCHASE (UGX 25,000)
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* SECTION 2: Course Content Breakdown List */}
          <div className="adari-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Course Content Syllabus</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>5 Topic Modules • UNEB Exam Preparedness</span>
              </div>
              <span className="badge badge-gold">UNLIMITED REVISION</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {topicsBreakdown.map((t, idx) => (
                <div key={idx} className="topic-item" onClick={() => handleTopicClick(t)} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="topic-number">{t.num}</div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{t.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t.duration}</div>
                    </div>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleTopicClick(t);
                    }}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: t.free ? 'var(--primary-light)' : 'var(--bg-surface)',
                      color: t.free ? 'var(--primary)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {t.free ? <Play size={16} style={{ marginLeft: '2px' }} /> : <Lock size={16} />}
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Floating Action Bar */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setBookmarked(!bookmarked);
                  alert(bookmarked ? 'Course removed from bookmarks.' : 'Course saved to your bookmarks!');
                }}
                style={{
                  padding: '12px 18px',
                  borderRadius: '14px',
                  background: bookmarked ? 'var(--accent-coral)' : 'rgba(255, 59, 48, 0.15)',
                  color: bookmarked ? '#fff' : 'var(--accent-coral)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '44px',
                  minHeight: '44px'
                }}
                title={bookmarked ? 'Bookmarked' : 'Bookmark Course'}
                aria-label={bookmarked ? 'Bookmarked' : 'Bookmark Course'}
              >
                <Bookmark size={20} />
              </button>
              <button
                onClick={() => openPaymentModal(['Physics', 'Mathematics', 'Chemistry', 'Biology'], activeLevel, 'full_package', 'monthly', 65000)}
                style={{
                  flex: 1,
                  minWidth: '240px',
                  padding: '12px 20px',
                  borderRadius: '14px',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 16px rgba(29, 78, 216, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minHeight: '44px'
                }}
              >
                SUBSCRIBE ALL (UGX 65,000) <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Q&A Chat Discussions + Get Started Banner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* SECTION 3: Ajari Chat & Q&A Discussion Bubbles */}
          <div className="adari-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '480px' }}>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Teacher"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Dr. Mukasa Godfrey</div>
                  <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>● Online Verified Teacher</div>
                </div>
              </div>
            </div>

            {/* Message Stream */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }} className="no-scrollbar">
              {chatList.map(msg => (
                <div key={msg.id}>
                  {msg.sender === 'user' ? (
                    <div className="chat-bubble-right">
                      <div>{msg.text}</div>
                      <div style={{ fontSize: '0.65rem', textAlign: 'right', opacity: 0.8, marginTop: '4px' }}>
                        {msg.time}
                      </div>
                    </div>
                  ) : (
                    <div className="chat-bubble-left">
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '2px' }}>
                        {msg.name}
                      </div>
                      <div>{msg.text}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {msg.time}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Send Chat Bar */}
            <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <input
                type="text"
                value={chatMessageInput}
                onChange={e => setChatMessageInput(e.target.value)}
                placeholder="Type message to teacher..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '12px',
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
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(29, 78, 216, 0.3)'
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* SECTION 4: Ajari Onboarding / Get Started Hero Banner */}
          <div
            className="adari-card"
            style={{
              padding: '28px 24px',
              background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
              color: '#fff',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <Sparkles size={32} />
            </div>

            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>
              Your Science Classroom, Wherever You Are
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '20px' }}>
              Master Ugandan O-Level and A-Level Mathematics, Physics, Chemistry & Biology with live teachers and data-saver revision.
            </p>

            <button
              onClick={() => setActiveTab('catalog')}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                background: '#ffffff',
                color: '#1d4ed8',
                fontWeight: 800,
                fontSize: '0.9rem'
              }}
            >
              GET STARTED NOW
            </button>
          </div>

        </div>

      </div>

      {/* SECTION 5: Recent Activity & UNEB Test Performance Node */}
      <div style={{ marginTop: '28px' }} className="cards-responsive-grid">
        {/* Performance Node */}
        <div className="adari-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <TrendingUp size={22} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Recent UNEB Test Scores</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Physics Mechanics P535</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Completed 2 days ago</div>
              </div>
              <span className="badge badge-verified">88% (Grade Distinction 1)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Chemistry Titration P525</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Completed Yesterday</div>
              </div>
              <span className="badge badge-verified">92% (Grade Distinction 1)</span>
            </div>
          </div>
        </div>

        {/* Schedule & Material Downloads Node */}
        <div className="adari-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Calendar size={22} style={{ color: 'var(--secondary)' }} />
            <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Upcoming Science Live Sessions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{activeLevel} Physics Mechanics Live</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Today, 4:00 PM • Dr. Mukasa</div>
              </div>
              <button onClick={() => setActiveTab('live')} style={{ padding: '6px 12px', borderRadius: '8px', background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>JOIN LIVE</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{activeLevel} Biology Genetics Session</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Tomorrow, 10:00 AM • Tr. Sarah</div>
              </div>
              <button onClick={() => setActiveTab('live')} style={{ padding: '6px 12px', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700 }}>Set Reminder</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
