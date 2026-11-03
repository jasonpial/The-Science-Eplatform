import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScienceSubject, AcademicLevel, SubscriptionTier, SubscriptionPeriod } from '../../types';
import { Check, ShieldCheck, Zap, Sparkles, BookOpen, Calculator, Atom, TestTube, Dna } from 'lucide-react';

export const SubjectCatalog: React.FC = () => {
  const {
    activeLevel,
    setActiveLevel,
    userSubscribedSubjects,
    openPaymentModal
  } = useApp();

  const [selectedSubjects, setSelectedSubjects] = useState<ScienceSubject[]>(['Mathematics', 'Physics']);
  const [selectedPeriod, setSelectedPeriod] = useState<SubscriptionPeriod>('monthly');

  const allSubjects: { id: ScienceSubject; name: string; icon: React.ReactNode; color: string; desc: string }[] = [
    {
      id: 'Mathematics',
      name: `${activeLevel} Mathematics`,
      icon: <Calculator size={28} />,
      color: '#0284c7',
      desc: activeLevel === 'O-Level' ? 'Algebra, Trigonometric Ratios, Geometry & UNEB P456 Revision' : 'Pure Math P425/1, Mechanics & Statistics P425/2'
    },
    {
      id: 'Physics',
      name: `${activeLevel} Physics`,
      icon: <Atom size={28} />,
      color: '#059669',
      desc: activeLevel === 'O-Level' ? 'Mechanics, Wave Motion, Light, Magnetism & UNEB P535' : 'Principal Physics P510/1, P510/2 Electromagnetism & Modern Physics'
    },
    {
      id: 'Chemistry',
      name: `${activeLevel} Chemistry`,
      icon: <TestTube size={28} />,
      color: '#d97706',
      desc: activeLevel === 'O-Level' ? 'Physical Chemistry, Atomic Structure, Titration & UNEB P545' : 'Physical, Organic Synthesis, Electrochemistry & UNEB P525'
    },
    {
      id: 'Biology',
      name: `${activeLevel} Biology`,
      icon: <Dna size={28} />,
      color: '#10b981',
      desc: activeLevel === 'O-Level' ? 'Cell Division, Nutrition, Transport Systems & UNEB P553' : 'Principal Biology P530/1 Cell Biology, Genetics & Physiology'
    }
  ];

  const toggleSubject = (subj: ScienceSubject) => {
    if (selectedSubjects.includes(subj)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter(s => s !== subj));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  // Pricing Logic (UGX)
  const calculatePriceUGX = (count: number, period: SubscriptionPeriod): number => {
    let monthlyBase = 25000; // Single
    if (count === 2) monthlyBase = 45000;
    else if (count === 3) monthlyBase = 58000;
    else if (count === 4) monthlyBase = 65000; // Full Science Package Bundle Discount

    let multiplier = 1;
    if (period === 'term') multiplier = 2.7; // 3-month school term discount
    else if (period === 'annual') multiplier = 9.0; // Annual discount

    return Math.round(monthlyBase * multiplier);
  };

  const currentTotalPriceUGX = calculatePriceUGX(selectedSubjects.length, selectedPeriod);
  const tier: SubscriptionTier = selectedSubjects.length === 1 ? 'single' : selectedSubjects.length === 4 ? 'full_package' : 'multi';

  const handleSubscribeNow = () => {
    openPaymentModal(selectedSubjects, activeLevel, tier, selectedPeriod, currentTotalPriceUGX);
  };

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Catalog Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
          UGANDA CURRICULUM • SUBJECT-BASED SUBSCRIPTIONS
        </span>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>
          Select Your Science Subjects ({activeLevel})
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem' }}>
          Pay only for the subjects you need. Subscribe individually, combine multiple subjects, or get the discounted <strong>Full Science Package</strong>.
        </p>
      </div>

      {/* Level Selector Toggle Header */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
        {(['O-Level', 'A-Level'] as AcademicLevel[]).map(lvl => (
          <button
            key={lvl}
            onClick={() => setActiveLevel(lvl)}
            className="glass-card"
            style={{
              padding: '12px 28px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '1rem',
              background: activeLevel === lvl ? 'linear-gradient(135deg, #059669, #0284c7)' : 'var(--bg-card)',
              color: activeLevel === lvl ? '#fff' : 'var(--text-primary)',
              border: activeLevel === lvl ? 'none' : '1px solid var(--border-color)',
              boxShadow: activeLevel === lvl ? 'var(--shadow-glow)' : 'none'
            }}
          >
            {lvl} Science Curriculum
          </button>
        ))}
      </div>

      {/* Grid of Subjects */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        {allSubjects.map(subj => {
          const isSelected = selectedSubjects.includes(subj.id);
          const isEnrolled = userSubscribedSubjects.includes(subj.id);

          return (
            <div
              key={subj.id}
              className={`glass-card glass-card-hover ${isSelected ? 'data-saver-active' : ''}`}
              onClick={() => toggleSubject(subj.id)}
              style={{
                padding: '24px',
                cursor: 'pointer',
                border: isSelected ? `2px solid ${subj.color}` : '1px solid var(--border-color)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ background: `${subj.color}20`, color: subj.color, padding: '12px', borderRadius: '16px' }}>
                    {subj.icon}
                  </div>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: isSelected ? subj.color : 'var(--bg-surface)',
                      border: isSelected ? 'none' : '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}
                  >
                    {isSelected && <Check size={16} />}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>{subj.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.4 }}>
                  {subj.desc}
                </p>
              </div>

              <div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={14} style={{ color: 'var(--primary)' }} /> Live Interactive Classes
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={14} style={{ color: 'var(--secondary)' }} /> Data Saver Video & Audio Lessons
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} style={{ color: 'var(--accent-gold)' }} /> UNEB Paper Revision & Quizzes
                  </li>
                </ul>

                {isEnrolled ? (
                  <span className="badge badge-verified" style={{ width: '100%', justifyContent: 'center' }}>
                    ✓ ACTIVELY SUBSCRIBED
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: isSelected ? subj.color : 'var(--text-secondary)'
                    }}
                  >
                    {isSelected ? '✓ Selected' : '+ Click to Select'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription Pricing Summary Box */}
      <div className="glass-card" style={{ padding: '28px', borderRadius: '24px', border: '1px solid var(--primary)', background: 'var(--bg-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Sparkles size={22} style={{ color: 'var(--accent-gold)' }} />
              <h3 style={{ fontSize: '1.3rem', margin: 0 }}>
                Selected Package: {selectedSubjects.length === 4 ? 'Full Science Package Bundle (Best Value 🎉)' : `${selectedSubjects.length} Subject(s)`}
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              {selectedSubjects.join(', ')} • {activeLevel} Level
            </p>
          </div>

          {/* Period Selector Tabs */}
          <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            {(['monthly', 'term', 'annual'] as SubscriptionPeriod[]).map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  background: selectedPeriod === period ? 'var(--primary)' : 'transparent',
                  color: selectedPeriod === period ? '#fff' : 'var(--text-secondary)'
                }}
              >
                {period === 'monthly' ? 'Monthly' : period === 'term' ? 'Term (3 Mo -10%)' : 'Annual (-25%)'}
              </button>
            ))}
          </div>

          {/* Pricing & Checkout Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
                UGX {currentTotalPriceUGX.toLocaleString()}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Instant Access via Mobile Money
              </span>
            </div>

            <button
              onClick={handleSubscribeNow}
              style={{
                padding: '14px 28px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #059669, #0284c7)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              Subscribe Now via Mobile Money 📲
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
