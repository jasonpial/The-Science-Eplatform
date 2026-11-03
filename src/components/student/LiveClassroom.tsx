import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Radio,
  Users,
  Hand,
  MessageSquare,
  Send,
  PenTool,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Monitor,
  PhoneOff,
  Award,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const LiveClassroom: React.FC = () => {
  const { liveClasses, currentRole } = useApp();
  const liveClass = liveClasses.find(c => c.isLive) || liveClasses[0];

  const [handRaised, setHandRaised] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [activeView, setActiveView] = useState<'stream' | 'whiteboard' | 'screen'>('stream');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(liveClass?.chatMessages || []);
  const [polls, setPolls] = useState(liveClass?.polls || []);
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);

  if (!liveClass) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No live class currently scheduled.</p>
      </div>
    );
  }

  const participants = liveClass.participants || [
    { id: 'p1', name: liveClass.teacherName, role: 'teacher', isMuted: false, handRaised: false },
    { id: 'p2', name: 'Brian Kato (You)', role: 'student', isMuted: isMicMuted, handRaised },
    { id: 'p3', name: 'Apophia Namuli', role: 'student', isMuted: true, handRaised: false },
    { id: 'p4', name: 'Emmanuel Okello', role: 'student', isMuted: true, handRaised: false }
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderName: currentRole === 'student' ? 'Brian Kato' : liveClass.teacherName,
      senderRole: currentRole,
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setChatInput('');
  };

  const handleVotePoll = (pollId: string, optionId: number) => {
    setSelectedPollOption(optionId);
    setPolls(prev =>
      prev.map(p =>
        p.id === pollId
          ? {
              ...p,
              options: p.options.map(opt =>
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
              )
            }
          : p
      )
    );
  };

  return (
    <div className="responsive-container">
      {/* Zoom Classroom Header */}
      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          borderRadius: '20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          borderLeft: '6px solid #ef4444'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <div style={{ background: '#ef4444', color: '#fff', padding: '8px', borderRadius: '10px', flexShrink: 0 }}>
            <Radio size={22} className="pulse-badge" />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge badge-gold" style={{ background: '#ef4444', color: '#fff' }}>
                ● LIVE CLASSROOM
              </span>
              <span className="badge badge-primary">{liveClass.subject}</span>
              <span className="badge badge-blue">{liveClass.level}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', margin: '4px 0 0 0' }}>{liveClass.title}</h2>
          </div>
        </div>

        {/* Zoom Control Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsMicMuted(!isMicMuted)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              background: isMicMuted ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              color: isMicMuted ? '#ef4444' : '#10b981',
              fontWeight: 700,
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: isMicMuted ? '1px solid #ef4444' : '1px solid #10b981',
              minHeight: '40px'
            }}
          >
            {isMicMuted ? <MicOff size={16} /> : <Mic size={16} />}
            {isMicMuted ? 'Muted' : 'Unmuted'}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              background: isVideoOn ? 'var(--primary-light)' : 'var(--bg-surface)',
              color: isVideoOn ? 'var(--primary-hover)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid var(--border-color)',
              minHeight: '40px'
            }}
          >
            {isVideoOn ? <VideoIcon size={16} /> : <VideoOff size={16} />}
            {isVideoOn ? 'Video On' : 'Video Off'}
          </button>

          <button
            onClick={() => setHandRaised(!handRaised)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              background: handRaised ? '#f59e0b' : 'var(--bg-surface)',
              color: handRaised ? '#000' : 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid var(--border-color)',
              minHeight: '40px'
            }}
          >
            <Hand size={16} />
            {handRaised ? 'Raised' : 'Raise Hand'}
          </button>
        </div>
      </div>

      {/* Main Grid: Zoom Stage + Whiteboard vs Participants & Chat */}
      <div className="two-col-grid">
        
        {/* LEFT COLUMN: Zoom Video Stage / Interactive Whiteboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Zoom Stage Navigation Bar */}
          <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-card)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)', overflowX: 'auto' }} className="no-scrollbar">
            <button
              onClick={() => setActiveView('stream')}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.8rem',
                background: activeView === 'stream' ? 'var(--primary)' : 'transparent',
                color: activeView === 'stream' ? '#fff' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                minHeight: '38px'
              }}
            >
              <VideoIcon size={15} /> Video Stream
            </button>
            <button
              onClick={() => setActiveView('whiteboard')}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.8rem',
                background: activeView === 'whiteboard' ? 'var(--primary)' : 'transparent',
                color: activeView === 'whiteboard' ? '#fff' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                minHeight: '38px'
              }}
            >
              <PenTool size={15} /> Whiteboard
            </button>
            <button
              onClick={() => setActiveView('screen')}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.8rem',
                background: activeView === 'screen' ? 'var(--primary)' : 'transparent',
                color: activeView === 'screen' ? '#fff' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                minHeight: '38px'
              }}
            >
              <Monitor size={15} /> Screen Share
            </button>
          </div>

          {/* Active View Container */}
          <div className="adari-card" style={{ overflow: 'hidden', borderRadius: '20px', background: '#000', minHeight: '380px', position: 'relative' }}>
            {activeView === 'stream' && (
              <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '380px' }}>
                <video
                  controls
                  autoPlay
                  muted
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.75)', padding: '6px 12px', borderRadius: '8px', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>
                  Host: {liveClass.teacherName} (Verified Teacher)
                </div>
              </div>
            )}

            {activeView === 'whiteboard' && (
              <div style={{ background: '#0f172a', padding: '24px', minHeight: '380px', fontFamily: 'monospace', color: '#38bdf8', fontSize: '1rem', lineHeight: 1.8 }}>
                <div style={{ color: '#f59e0b', fontWeight: 800, marginBottom: '12px' }}>
                  === TEACHER LIVE WHITEBOARD CANVAS (SYNCED) ===
                </div>
                {liveClass.whiteboardNotes?.map((note, idx) => (
                  <div key={idx}>✏️ {note}</div>
                ))}
                <div style={{ marginTop: '16px', color: '#4ade80' }}>
                  ▶ Formula Check: Force = mass x acceleration (F = ma)
                </div>
              </div>
            )}

            {activeView === 'screen' && (
              <div style={{ background: '#1e293b', padding: '24px', minHeight: '380px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Monitor size={48} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
                <h3>Teacher Screen Share Presentation</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Displaying UNEB Past Paper Solution PDF...</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Zoom Participants Panel & Classroom Chat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Zoom Participant List Card */}
          <div className="adari-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} style={{ color: 'var(--primary)' }} />
                Participants ({participants.length})
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {participants.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'var(--bg-surface)', borderRadius: '8px', fontSize: '0.8rem' }}>
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {p.handRaised && <span style={{ fontSize: '0.7rem' }}>✋</span>}
                    {p.isMuted ? <MicOff size={14} style={{ color: '#ef4444' }} /> : <Mic size={14} style={{ color: '#10b981' }} />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Discussion Chat */}
          <div className="adari-card" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', height: '360px' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={16} style={{ color: 'var(--primary)' }} />
              Classroom Live Chat
            </h3>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }} className="no-scrollbar">
              {messages.map(m => (
                <div key={m.id} style={{ background: 'var(--bg-surface)', padding: '8px 10px', borderRadius: '8px', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '2px' }}>{m.senderName} ({m.timestamp})</div>
                  <div>{m.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
              <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Type chat message..." style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem', outline: 'none' }} />
              <button type="submit" style={{ padding: '8px 12px', borderRadius: '8px', background: 'var(--primary)', color: '#fff' }}><Send size={14} /></button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
