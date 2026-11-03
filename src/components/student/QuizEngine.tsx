import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TestQuiz, QuizSubmission } from '../../types';
import { Award, Clock, CheckCircle, XCircle, FileText, ArrowRight, HelpCircle, Check, Upload } from 'lucide-react';

export const QuizEngine: React.FC = () => {
  const { quizzes, submitQuiz, quizSubmissions } = useApp();
  const [selectedQuiz, setSelectedQuiz] = useState<TestQuiz | null>(quizzes[0]);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submittedResult, setSubmittedResult] = useState<QuizSubmission | null>(null);
  const [writtenFileUploaded, setWrittenFileUploaded] = useState(false);

  if (!selectedQuiz) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No quizzes available at the moment.</p>
      </div>
    );
  }

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submittedResult) return; // Locked after submit
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(answers).length < selectedQuiz.questions.length) {
      if (!confirm('You have unanswered questions. Are you sure you want to submit?')) return;
    }
    const result = submitQuiz(selectedQuiz.id, answers);
    setSubmittedResult(result);
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setSubmittedResult(null);
    setWrittenFileUploaded(false);
  };

  return (
    <div className="responsive-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Quiz Selector Pills */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '20px', paddingBottom: '4px' }} className="no-scrollbar">
        {quizzes.map(q => (
          <button
            key={q.id}
            onClick={() => {
              setSelectedQuiz(q);
              setAnswers({});
              setSubmittedResult(null);
            }}
            className="glass-card"
            style={{
              padding: '10px 16px',
              borderRadius: '14px',
              border: selectedQuiz.id === q.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
              background: selectedQuiz.id === q.id ? 'var(--primary-light)' : 'var(--bg-card)',
              color: selectedQuiz.id === q.id ? 'var(--primary-hover)' : 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.82rem',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: '40px'
            }}
          >
            <Award size={16} />
            {q.subject} ({q.level}): {q.topic}
          </button>
        ))}
      </div>

      {/* Quiz Container Card */}
      <div className="glass-card" style={{ padding: 'clamp(16px, 4vw, 28px)', borderRadius: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">{selectedQuiz.subject}</span>
              <span className="badge badge-gold">{selectedQuiz.level}</span>
              <span className="badge badge-blue">Topic: {selectedQuiz.topic}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.4rem)', margin: 0 }}>{selectedQuiz.title}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
              <Clock size={16} />
              <span>Time Allowed: {selectedQuiz.durationMinutes} mins</span>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Total Marks: {selectedQuiz.totalMarks}
            </div>
          </div>
        </div>

        {/* Score Report Card (if submitted) */}
        {submittedResult && (
          <div
            style={{
              background: submittedResult.scorePercent >= 70 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              border: `2px solid ${submittedResult.scorePercent >= 70 ? '#10b981' : '#f59e0b'}`,
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '6px' }}>
                AUTOMATED UNEB MARKING REPORT
              </span>
              <h3 style={{ fontSize: '1.5rem', margin: '4px 0', color: submittedResult.scorePercent >= 70 ? '#10b981' : '#f59e0b' }}>
                Your Score: {submittedResult.scorePercent}% ({submittedResult.correctAnswers}/{submittedResult.totalQuestions} Correct)
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0 }}>
                Teacher Feedback: {submittedResult.teacherFeedback}
              </p>
            </div>

            <button
              onClick={handleResetQuiz}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: '1px solid var(--border-color)'
              }}
            >
              Retry Quiz
            </button>
          </div>
        )}

        {/* Question List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '28px' }}>
          {selectedQuiz.questions.map((q, idx) => {
            const selectedOpt = answers[q.id];
            const isCorrect = submittedResult && selectedOpt === q.correctOptionIndex;
            const isWrong = submittedResult && selectedOpt !== undefined && selectedOpt !== q.correctOptionIndex;

            return (
              <div
                key={q.id}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '20px',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.5 }}>
                    Q{idx + 1}. {q.questionText}
                  </h4>
                  {q.unebYear && (
                    <span className="badge badge-blue" style={{ height: 'fit-content' }}>
                      {q.unebYear}
                    </span>
                  )}
                </div>

                {/* Multiple Choice Options */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', marginBottom: '14px' }}>
                  {q.options.map((optText, optIdx) => {
                    let optionStyle: React.CSSProperties = {
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center'
                    };

                    if (selectedOpt === optIdx) {
                      optionStyle.border = '2px solid var(--primary)';
                      optionStyle.background = 'var(--primary-light)';
                      optionStyle.color = 'var(--primary-hover)';
                    }

                    if (submittedResult) {
                      if (optIdx === q.correctOptionIndex) {
                        optionStyle.background = 'rgba(16, 185, 129, 0.2)';
                        optionStyle.border = '2px solid #10b981';
                        optionStyle.color = '#10b981';
                      } else if (selectedOpt === optIdx && optIdx !== q.correctOptionIndex) {
                        optionStyle.background = 'rgba(239, 68, 68, 0.2)';
                        optionStyle.border = '2px solid #ef4444';
                        optionStyle.color = '#ef4444';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        style={optionStyle}
                      >
                        <span style={{ fontWeight: 800, marginRight: '6px' }}>
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {optText}
                      </button>
                    );
                  })}
                </div>

                {/* Step-by-Step Formula Solution Explanation (shown after submission) */}
                {submittedResult && (
                  <div
                    style={{
                      background: 'var(--bg-card)',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      borderLeft: '4px solid var(--secondary)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>
                      💡 UNEB Solution Formula & Explanation:
                    </div>
                    <div>{q.explanation}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Written Essay / Workings Prompt (Teacher Graded Section) */}
        {selectedQuiz.writtenPrompts && selectedQuiz.writtenPrompts.length > 0 && (
          <div
            style={{
              background: 'var(--bg-surface)',
              padding: '20px',
              borderRadius: '18px',
              border: '1px solid var(--border-color)',
              marginBottom: '28px'
            }}
          >
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-gold)' }}>
              Section B: Written Essay / Calculation Submissions
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              {selectedQuiz.writtenPrompts[0]}
            </p>

            {!writtenFileUploaded ? (
              <button
                onClick={() => setWrittenFileUploaded(true)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px dashed var(--primary)'
                }}
              >
                <Upload size={16} style={{ color: 'var(--primary)' }} />
                Upload Handwritten Calculation Photo / PDF for Teacher Marking
              </button>
            ) : (
              <span className="badge badge-verified">
                ✓ Solution paper uploaded: "brian_kato_physics_workings.pdf"
              </span>
            )}
          </div>
        )}

        {/* Submit Quiz Action Button */}
        {!submittedResult && (
          <button
            onClick={handleSubmitQuiz}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #059669, #0284c7)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            Submit Quiz for Automated UNEB Grading <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};
