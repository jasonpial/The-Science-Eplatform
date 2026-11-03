import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lesson, ScienceSubject } from '../../types';
import {
  Play,
  Volume2,
  FileText,
  Download,
  WifiOff,
  MessageSquare,
  Send,
  BadgeCheck,
  Zap,
  ArrowLeft,
  Share2
} from 'lucide-react';

export const LessonViewer: React.FC = () => {
  const {
    activeLesson,
    setActiveLesson,
    isDataSaverMode,
    toggleDataSaver,
    qaThreads,
    postQuestion,
    userSubscribedSubjects,
    setActiveTab
  } = useApp();

  const [mediaMode, setMediaMode] = useState<'video' | 'audio'>('video');
  const [videoQuality, setVideoQuality] = useState<'1080p' | '480p' | '240p'>(isDataSaverMode ? '240p' : '480p');
  const [questionText, setQuestionText] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  if (!activeLesson) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No lesson selected.</p>
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{ padding: '10px 20px', borderRadius: '12px', background: 'var(--primary)', color: '#fff', marginTop: '12px' }}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isEnrolled = userSubscribedSubjects.includes(activeLesson.subject);
  const lessonQA = qaThreads.filter(q => q.subject === activeLesson.subject && q.level === activeLesson.level);

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    postQuestion(activeLesson.subject, activeLesson.level, questionText);
    setQuestionText('');
  };

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Back button header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-surface)',
            color: 'var(--text-secondary)',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: 600,
            border: '1px solid var(--border-color)'
          }}
        >
          <ArrowLeft size={16} /> Back to Classroom Dashboard
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-gold">{activeLesson.level}</span>
          <span className="badge badge-primary">{activeLesson.subject}</span>
          {activeLesson.unebPaperReference && (
            <span className="badge badge-blue">{activeLesson.unebPaperReference}</span>
          )}
        </div>
      </div>

      {/* Main Player Card */}
      <div className="glass-card" style={{ overflow: 'hidden', borderRadius: '24px', marginBottom: '24px' }}>
        {/* Media Player Stream Frame */}
        <div
          style={{
            background: '#000',
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            maxHeight: '480px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {mediaMode === 'video' ? (
            <video
              controls
              autoPlay
              src={activeLesson.videoUrl}
              poster="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                background: 'linear-gradient(135deg, #0b1329, #059669)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  marginBottom: '16px'
                }}
                className="pulse-badge"
              >
                <Volume2 size={40} />
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '4px' }}>
                Ultra Low-Data Audio Mode ({activeLesson.lowDataAudioSizeMB} MB)
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '20px' }}>
                Playing low-bandwidth audio stream for weak connection / data saving.
              </p>
              <audio controls src={activeLesson.audioUrl} style={{ width: '80%', maxWidth: '500px' }} />
            </div>
          )}

          {/* Top overlay controls for Data Saver */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              gap: '8px',
              zIndex: 10
            }}
          >
            <button
              onClick={() => setMediaMode(mediaMode === 'video' ? 'audio' : 'video')}
              style={{
                background: 'rgba(0,0,0,0.75)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              {mediaMode === 'video' ? <Volume2 size={14} /> : <Play size={14} />}
              {mediaMode === 'video' ? 'Switch to Audio-Only Mode (Save 80% MB)' : 'Switch to Video Mode'}
            </button>

            {mediaMode === 'video' && (
              <select
                value={videoQuality}
                onChange={e => setVideoQuality(e.target.value as any)}
                style={{
                  background: 'rgba(0,0,0,0.75)',
                  color: '#fff',
                  padding: '6px 10px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  border: '1px solid rgba(255,255,255,0.3)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="240p">240p (Data Saver: ~{activeLesson.dataSizeMB / 3} MB)</option>
                <option value="480p">480p (Balanced: ~{activeLesson.dataSizeMB} MB)</option>
                <option value="1080p">1080p HD (~{activeLesson.dataSizeMB * 2} MB)</option>
              </select>
            )}
          </div>
        </div>

        {/* Lesson Info Details */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{activeLesson.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  <BadgeCheck size={16} style={{ color: 'var(--primary)' }} />
                  {activeLesson.teacherName} {activeLesson.teacherVerified && '(Verified Science Teacher)'}
                </span>
                <span>•</span>
                <span>Topic: {activeLesson.topic}</span>
                <span>•</span>
                <span>Duration: {activeLesson.durationMinutes} mins</span>
              </div>
            </div>

            {/* Downloads Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={activeLesson.pdfNotesUrl}
                download
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none'
                }}
              >
                <FileText size={16} style={{ color: 'var(--secondary)' }} />
                PDF Notes & Formula Sheet
              </a>
              <button
                onClick={() => alert(`Simulated offline audio download started for "${activeLesson.title}" (${activeLesson.lowDataAudioSizeMB} MB)`)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary-hover)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={16} />
                Download Audio ({activeLesson.lowDataAudioSizeMB} MB)
              </button>
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
            {activeLesson.summary}
          </p>
        </div>
      </div>

      {/* Teacher Q&A Box Below Lesson */}
      <div className="glass-card" style={{ padding: '24px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Ask Teacher a Question on this Topic</h3>
          </div>
          <span className="badge badge-gold">MODERATED EDUCATIONAL QA</span>
        </div>

        {/* Post Question Form */}
        <form onSubmit={handleSendQuestion} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <input
            type="text"
            value={questionText}
            onChange={e => setQuestionText(e.target.value)}
            placeholder={`Ask ${activeLesson.teacherName} a question regarding ${activeLesson.topic}...`}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              background: 'var(--primary)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Send size={16} /> Send Question
          </button>
        </form>

        {/* Existing Q&A Threads */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {lessonQA.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              No questions submitted for this subject topic yet. Be the first to ask!
            </p>
          ) : (
            lessonQA.map(qa => (
              <div
                key={qa.id}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '16px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{qa.studentName}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{qa.postedAt}</span>
                </div>
                <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Q: {qa.question}</p>

                {qa.answer ? (
                  <div
                    style={{
                      background: 'var(--primary-light)',
                      color: 'var(--primary-hover)',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <BadgeCheck size={14} /> Answer from {qa.teacherName} ({qa.answeredAt}):
                    </div>
                    <div>{qa.answer}</div>
                  </div>
                ) : (
                  <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                    ⌛ Awaiting Teacher Answer
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
