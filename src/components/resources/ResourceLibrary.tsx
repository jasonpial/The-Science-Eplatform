import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScienceSubject } from '../../types';
import { BookOpen, Download, Lock, CheckCircle, Smartphone, PlusCircle, FileText, Search } from 'lucide-react';

export const ResourceLibrary: React.FC = () => {
  const {
    activeLevel,
    resources,
    openPaymentModal,
    currentRole,
    addResource
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<ScienceSubject | 'All'>('All');
  const [purchasedResourceIds, setPurchasedResourceIds] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New Resource Form
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<ScienceSubject>('Physics');
  const [desc, setDesc] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [priceUGX, setPriceUGX] = useState(10000);

  const levelResources = resources.filter(r => r.level === activeLevel);
  const filteredResources = selectedSubject === 'All' ? levelResources : levelResources.filter(r => r.subject === selectedSubject);

  const handleDownloadOrBuy = (resourceId: string, isPaid: boolean, priceUGX: number, title: string) => {
    if (!isPaid || purchasedResourceIds.includes(resourceId)) {
      alert(`Downloading textbook PDF: "${title}"`);
    } else {
      openPaymentModal(['Physics'], activeLevel, 'single', 'monthly', priceUGX);
      setPurchasedResourceIds([...purchasedResourceIds, resourceId]);
    }
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addResource({
      id: `tb_${Date.now()}`,
      title,
      level: activeLevel,
      subject,
      description: desc || `Official ${activeLevel} study material for ${subject}.`,
      authorTeacherName: 'Dr. Mukasa Godfrey',
      authorTeacherId: 'usr_teacher_1',
      isPaid,
      priceUGX: isPaid ? priceUGX : 0,
      coverImageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
      fileUrl: '#download-published-textbook.pdf',
      downloadsCount: 1
    });

    alert(`Resource "${title}" published to library successfully!`);
    setShowUploadModal(false);
    setTitle('');
    setDesc('');
  };

  return (
    <div className="responsive-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '6px' }}>
            UGANDAN SCIENCE TEXTBOOK LIBRARY
          </span>
          <h2 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', margin: '4px 0 0 0' }}>
            {activeLevel} Textbooks &amp; Study Materials
          </h2>
        </div>

        {(currentRole === 'teacher' || currentRole === 'admin') && (
          <button
            onClick={() => setShowUploadModal(true)}
            style={{
              padding: '12px 20px',
              borderRadius: '14px',
              background: 'var(--primary)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)',
              minHeight: '44px'
            }}
          >
            <PlusCircle size={18} /> Upload New Textbook / Resource
          </button>
        )}
      </div>

      {/* Subject Selector Pills */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }} className="no-scrollbar">
        {(['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'] as (ScienceSubject | 'All')[]).map(subj => (
          <button
            key={subj}
            onClick={() => setSelectedSubject(subj)}
            className={`category-pill ${selectedSubject === subj ? 'active' : ''}`}
            style={{ whiteSpace: 'nowrap' }}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* Grid of Textbooks */}
      <div className="cards-responsive-grid">
        {filteredResources.map(r => {
          const isUnlocked = !r.isPaid || purchasedResourceIds.includes(r.id);

          return (
            <div key={r.id} className="adari-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                <img src={r.coverImageUrl} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span
                  className={r.isPaid ? 'badge badge-gold' : 'badge badge-verified'}
                  style={{ position: 'absolute', top: '12px', right: '12px' }}
                >
                  {r.isPaid ? `UGX ${r.priceUGX.toLocaleString()}` : 'FREE DOWNLOAD'}
                </span>
                <span className="badge badge-primary" style={{ position: 'absolute', top: '12px', left: '12px', background: '#fff' }}>
                  {r.subject}
                </span>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', lineHeight: 1.4 }}>{r.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                    {r.description}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    Author: <strong>{r.authorTeacherName}</strong> • {r.downloadsCount} Downloads
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadOrBuy(r.id, r.isPaid, r.priceUGX, r.title)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    background: isUnlocked ? 'rgba(16, 185, 129, 0.15)' : 'var(--primary)',
                    color: isUnlocked ? '#10b981' : '#fff',
                    border: isUnlocked ? '1px solid #10b981' : 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {isUnlocked ? (
                    <>
                      <Download size={16} /> Download PDF Now
                    </>
                  ) : (
                    <>
                      <Lock size={16} /> Unlock for UGX {r.priceUGX.toLocaleString()}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Resource Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-responsive-card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Upload Science Textbook / Resource</h3>
            <form onSubmit={handleCreateResource} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Resource Title:</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. O-Level Organic Chemistry Guide" style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Subject:</label>
                <select value={subject} onChange={e => setSubject(e.target.value as ScienceSubject)} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Description:</label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="Detail key topics covered..." style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input type="checkbox" checked={isPaid} onChange={e => setIsPaid(e.target.checked)} /> Access Control: Require Payment
                </label>
              </div>
              {isPaid && (
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Price in UGX:</label>
                  <input type="number" value={priceUGX} onChange={e => setPriceUGX(Number(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }} />
                </div>
              )}
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => setShowUploadModal(false)} style={{ flex: '1 1 120px', padding: '10px', borderRadius: '10px', background: 'var(--bg-surface)', color: 'var(--text-primary)', minHeight: '42px' }}>Cancel</button>
                <button type="submit" style={{ flex: '1 1 160px', padding: '10px', borderRadius: '10px', background: 'var(--primary)', color: '#fff', fontWeight: 700, minHeight: '42px' }}>Publish Resource</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
