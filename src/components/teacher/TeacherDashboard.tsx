import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScienceSubject, AcademicLevel } from '../../types';
import {
  Award,
  Video,
  Volume2,
  FileText,
  PlusCircle,
  HelpCircle,
  ShieldCheck,
  Send,
  Calendar,
  CheckCircle,
  Upload,
  BookOpen,
  DollarSign,
  Radio,
  Clock,
  Check
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const {
    qaThreads,
    answerQuestion,
    createLesson,
    scheduleLiveClass,
    activateLiveClass,
    activeLevel,
    studentSubmissions,
    gradeStudentSubmission,
    addResource
  } = useApp();

  const [activeStudioTab, setActiveStudioTab] = useState<'create_lesson' | 'marking_studio' | 'resources' | 'schedule_live' | 'qa_inbox'>('marking_studio');

  // Lesson Form State
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonSubject, setLessonSubject] = useState<ScienceSubject>('Physics');
  const [lessonTopic, setLessonTopic] = useState('');
  const [lessonSummary, setLessonSummary] = useState('');

  // Marking Form State
  const [selectedSubmId, setSelectedSubmId] = useState<string | null>(null);
  const [scorePercent, setScorePercent] = useState<number>(85);
  const [feedback, setFeedback] = useState('');

  // Resource Form State
  const [resTitle, setResTitle] = useState('');
  const [resSubject, setResSubject] = useState<ScienceSubject>('Physics');
  const [resDesc, setResDesc] = useState('');
  const [resIsPaid, setResIsPaid] = useState(false);
  const [resPriceUGX, setResPriceUGX] = useState(10000);

  // Live Class Form State
  const [liveTitle, setLiveTitle] = useState('');
  const [liveSubject, setLiveSubject] = useState<ScienceSubject>('Physics');

  const handleGradeSubmit = (submissionId: string) => {
    gradeStudentSubmission(
      submissionId,
      scorePercent,
      feedback || 'Good attempt on UNEB practice calculations!',
      '#download-official-correction-answers.pdf'
    );
    alert('Student submission graded successfully! Official correction PDF published to student.');
    setSelectedSubmId(null);
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle) return;

    addResource({
      id: `tb_${Date.now()}`,
      title: resTitle,
      level: activeLevel,
      subject: resSubject,
      description: resDesc || `Official ${activeLevel} study material for ${resSubject}.`,
      authorTeacherName: 'Dr. Mukasa Godfrey',
      authorTeacherId: 'usr_teacher_1',
      isPaid: resIsPaid,
      priceUGX: resIsPaid ? resPriceUGX : 0,
      coverImageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
      fileUrl: '#download-published-textbook.pdf',
      downloadsCount: 1
    });

    alert(`Textbook Resource "${resTitle}" published to library with access pricing control!`);
    setResTitle('');
    setResDesc('');
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle) return;

    createLesson({
      id: `les_${Date.now()}`,
      title: lessonTitle,
      subject: lessonSubject,
      level: activeLevel,
      teacherId: 'usr_teacher_1',
      teacherName: 'Dr. Mukasa Godfrey',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      description: lessonSummary || `Official UNEB ${activeLevel} Science Lesson covering ${lessonTitle}.`,
      summaryNotes: lessonSummary || `Summary & Key UNEB Formulas for ${lessonTitle}.`,
      duration: '45min',
      isFree: true,
      priceUGX: 0,
      pdfAttachmentUrl: '#download-uneb-notes.pdf',
      qaThreads: []
    });

    alert(`Science Lesson "${lessonTitle}" created and published to ${activeLevel} student portal! 🎥`);
    setLessonTitle('');
    setLessonSummary('');
  };

  const handleActivateLive = () => {
    activateLiveClass('live_phy_101');
    alert('📡 Live session activated! Real-time notification broadcasted to all enrolled students.');
  };

  const handleScheduleLiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveTitle) return;

    scheduleLiveClass({
      id: `live_${Date.now()}`,
      title: liveTitle,
      teacherName: 'Dr. Mukasa Godfrey',
      subject: liveSubject,
      level: activeLevel,
      scheduledTime: 'Today at 4:30 PM (EAT)',
      isLive: false,
      meetingUrl: 'https://meet.jit.si/the-science-classroom-ug'
    });

    alert(`Live Virtual Lecture "${liveTitle}" scheduled for ${activeLevel}! Students notified via app notification drawer. 📅`);
    setLiveTitle('');
  };

  return (
    <div style={{ padding: '24px 28px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Teacher Profile Banner */}
      <div
        className="adari-card"
        style={{
          padding: '24px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
          color: '#fff'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-verified" style={{ background: '#fff', color: '#1d4ed8' }}>✓ VERIFIED SCIENCE TEACHER</span>
              <span className="badge badge-gold">UNEB EXAMINER</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: '1.6rem', margin: '4px 0' }}>Dr. Mukasa Godfrey Studio</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', margin: 0 }}>
              MSc Physics (Makerere University) • Teaching Physics & Mathematics for {activeLevel}
            </p>
          </div>

          <button
            onClick={handleActivateLive}
            style={{
              padding: '12px 24px',
              borderRadius: '14px',
              background: '#ef4444',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
            }}
          >
            <Radio size={18} className="pulse-badge" /> GO LIVE NOW (Broadcast to Students)
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto' }} className="no-scrollbar">
        <button
          onClick={() => setActiveStudioTab('marking_studio')}
          className={`category-pill ${activeStudioTab === 'marking_studio' ? 'active' : ''}`}
        >
          <Award size={16} /> Mark Student Work & Corrections
        </button>
        <button
          onClick={() => setActiveStudioTab('resources')}
          className={`category-pill ${activeStudioTab === 'resources' ? 'active' : ''}`}
        >
          <BookOpen size={16} /> Upload Textbooks & Set Prices
        </button>
        <button
          onClick={() => setActiveStudioTab('create_lesson')}
          className={`category-pill ${activeStudioTab === 'create_lesson' ? 'active' : ''}`}
        >
          <Video size={16} /> Create Video & Audio Lessons
        </button>
        <button
          onClick={() => setActiveStudioTab('schedule_live')}
          className={`category-pill ${activeStudioTab === 'schedule_live' ? 'active' : ''}`}
        >
          <Calendar size={16} /> Schedule Live Class
        </button>
      </div>

      {/* TAB 1: Student Work Marking Studio */}
      {activeStudioTab === 'marking_studio' && (
        <div className="adari-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} style={{ color: 'var(--primary)' }} />
            Student Assignments & Tests Marking Studio ({activeLevel})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {studentSubmissions.map(subm => (
              <div
                key={subm.id}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '18px',
                  borderRadius: '16px',
                  border: subm.status === 'graded' ? '1px solid #10b981' : '1px solid var(--accent-orange)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 2px 0' }}>{subm.testTitle}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Student: <strong>{subm.studentName}</strong> • Submitted: {subm.submissionDate}
                    </span>
                  </div>

                  {subm.status === 'graded' ? (
                    <span className="badge badge-verified">✓ GRADED: {subm.scorePercent}% (Grade A)</span>
                  ) : (
                    <span className="badge badge-gold">NEEDS MARKING</span>
                  )}
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
                  <strong>Student Answers / File:</strong> {subm.answersText || 'Attached workings PDF file.'}
                </div>

                {subm.status === 'graded' ? (
                  <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '12px', borderLeft: '4px solid #10b981', fontSize: '0.85rem' }}>
                    <div><strong>Feedback:</strong> {subm.teacherFeedback}</div>
                    <div style={{ color: 'var(--primary)', marginTop: '4px' }}>✓ Correction PDF published: official_correction_answers.pdf</div>
                  </div>
                ) : (
                  <div>
                    {selectedSubmId === subm.id ? (
                      <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '14px', border: '1px solid var(--primary)', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Enter Score Percentage (%):</label>
                          <input type="number" value={scorePercent} onChange={e => setScorePercent(Number(e.target.value))} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Teacher Written Feedback:</label>
                          <textarea value={feedback} onChange={e => setFeedback(e.target.value)} rows={2} placeholder="Detail strength & areas for revision..." style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }} />
                        </div>
                        <button onClick={() => handleGradeSubmit(subm.id)} style={{ padding: '10px', borderRadius: '10px', background: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Submit Marks & Publish Correction Answers PDF</button>
                      </div>
                    ) : (
                      <button onClick={() => setSelectedSubmId(subm.id)} style={{ padding: '8px 16px', borderRadius: '10px', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>
                        Mark Work & Enter Grade
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Upload Textbooks & Set Prices */}
      {activeStudioTab === 'resources' && (
        <div className="adari-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} style={{ color: 'var(--primary)' }} />
            Upload Textbooks & Set Access Pricing (FREE vs PAID)
          </h3>

          <form onSubmit={handleCreateResource} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Textbook / Material Title:</label>
              <input type="text" value={resTitle} onChange={e => setResTitle(e.target.value)} placeholder="e.g. Advanced A-Level Pure Mathematics P425/1 Guide" required style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Subject:</label>
                <select value={resSubject} onChange={e => setResSubject(e.target.value as ScienceSubject)} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Access Control:</label>
                <select value={resIsPaid ? 'paid' : 'free'} onChange={e => setResIsPaid(e.target.value === 'paid')} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}>
                  <option value="free">FREE Access for Enrolled Students</option>
                  <option value="paid">PAID Resource (Mobile Money Purchase)</option>
                </select>
              </div>
            </div>

            {resIsPaid && (
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Set Custom Price (UGX):</label>
                <input type="number" value={resPriceUGX} onChange={e => setResPriceUGX(Number(e.target.value))} placeholder="15000" style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Resource Description:</label>
              <textarea value={resDesc} onChange={e => setResDesc(e.target.value)} rows={2} placeholder="Detail topics, formula sheets, and past questions included..." style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }} />
            </div>

            <button type="submit" style={{ padding: '12px', borderRadius: '12px', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
              Publish Resource to Library 📚
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: Create Video & Audio Lessons */}
      {activeStudioTab === 'create_lesson' && (
        <div className="adari-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Video size={20} style={{ color: 'var(--primary)' }} />
            Create & Publish Video & Audio Lessons ({activeLevel})
          </h3>

          <form onSubmit={handleCreateLesson} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Lesson Title:</label>
              <input type="text" value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} placeholder="e.g. O-Level Physics: Newton's 2nd Law Calculations" required style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Subject:</label>
              <select value={lessonSubject} onChange={e => setLessonSubject(e.target.value as ScienceSubject)} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}>
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Lesson Summary & Key UNEB Formulas:</label>
              <textarea value={lessonSummary} onChange={e => setLessonSummary(e.target.value)} rows={3} placeholder="Outline key topics, equations, and UNEB past paper question references..." style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }} />
            </div>

            <button type="submit" style={{ padding: '12px', borderRadius: '12px', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
              Publish Video Lesson 🎥
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: Schedule Live Class */}
      {activeStudioTab === 'schedule_live' && (
        <div className="adari-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} style={{ color: 'var(--secondary)' }} />
            Schedule Live Virtual Science Lecture ({activeLevel})
          </h3>

          <form onSubmit={handleScheduleLiveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Lecture Topic Title:</label>
              <input type="text" value={liveTitle} onChange={e => setLiveTitle(e.target.value)} placeholder="e.g. Interactive Chemistry Volumetric Analysis & Titration Calculations" required style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Subject:</label>
              <select value={liveSubject} onChange={e => setLiveSubject(e.target.value as ScienceSubject)} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}>
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            <button type="submit" style={{ padding: '12px', borderRadius: '12px', background: 'var(--secondary)', color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
              Schedule Live Virtual Lecture & Notify Students 📅
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
