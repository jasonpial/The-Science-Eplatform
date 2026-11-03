import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, CheckCircle, ShieldCheck, X, RefreshCw, AlertCircle } from 'lucide-react';

export const MobileMoneyModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    closePaymentModal,
    pendingSubscriptionInfo,
    completePayment
  } = useApp();

  const [provider, setProvider] = useState<'MTN Mobile Money' | 'Airtel Money' | 'Visa / Card'>('MTN Mobile Money');
  const [phoneNumber, setPhoneNumber] = useState<string>('+256 772 123456');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [ussdPromptText, setUssdPromptText] = useState<string>('');

  if (!isPaymentModalOpen || !pendingSubscriptionInfo) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setUssdPromptText(`[USSD PROMPT SENT] Check handset ${phoneNumber} & enter PIN to authorize UGX ${pendingSubscriptionInfo.amountUGX.toLocaleString()} for DBROFT THE SCIENCE CLASSROOM.`);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        completePayment(provider, phoneNumber);
        setIsSuccess(false);
      }, 1500);
    }, 2500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
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
          maxWidth: '480px',
          padding: '24px',
          position: 'relative',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <button
          onClick={closePaymentModal}
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

        {!isSuccess ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
                UGANDAN PAYMENT GATEWAY
              </span>
              <h2 style={{ fontSize: '1.4rem', margin: '4px 0' }}>Confirm Subscription</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {pendingSubscriptionInfo.level} • {pendingSubscriptionInfo.subjects.join(', ')}
              </p>
            </div>

            {/* Subscription Summary Box */}
            <div
              style={{
                background: 'var(--bg-surface)',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Selected Level:</span>
                <span style={{ fontWeight: 700 }}>{pendingSubscriptionInfo.level}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subjects ({pendingSubscriptionInfo.subjects.length}):</span>
                <span style={{ fontWeight: 700 }}>{pendingSubscriptionInfo.subjects.join(', ')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Billing Period:</span>
                <span style={{ fontWeight: 700, textTransform: 'capitalize' }}>{pendingSubscriptionInfo.period}</span>
              </div>
              <hr style={{ borderColor: 'var(--border-color)', margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800 }}>
                <span>Total Amount:</span>
                <span style={{ color: 'var(--primary)' }}>UGX {pendingSubscriptionInfo.amountUGX.toLocaleString()}</span>
              </div>
            </div>

            {/* Provider Selection Tabs */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                Select Payment Method:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => setProvider('MTN Mobile Money')}
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    border: provider === 'MTN Mobile Money' ? '2px solid #f59e0b' : '1px solid var(--border-color)',
                    background: provider === 'MTN Mobile Money' ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-surface)',
                    color: provider === 'MTN Mobile Money' ? '#f59e0b' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Smartphone size={18} />
                  MTN MoMo
                </button>
                <button
                  onClick={() => setProvider('Airtel Money')}
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    border: provider === 'Airtel Money' ? '2px solid #ef4444' : '1px solid var(--border-color)',
                    background: provider === 'Airtel Money' ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-surface)',
                    color: provider === 'Airtel Money' ? '#ef4444' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Smartphone size={18} />
                  Airtel Money
                </button>
                <button
                  onClick={() => setProvider('Visa / Card')}
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    border: provider === 'Visa / Card' ? '2px solid #0284c7' : '1px solid var(--border-color)',
                    background: provider === 'Visa / Card' ? 'rgba(2, 132, 199, 0.15)' : 'var(--bg-surface)',
                    color: provider === 'Visa / Card' ? '#0284c7' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ShieldCheck size={18} />
                  Card Payment
                </button>
              </div>
            </div>

            {/* Phone Number Input */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                Ugandan Phone Number (MoMo Wallet):
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="+256 770 000000"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
            </div>

            {/* USSD Prompt Live Output */}
            {ussdPromptText && (
              <div
                style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid #f59e0b',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  color: '#f59e0b',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <AlertCircle size={18} className="pulse-badge" />
                <span>{ussdPromptText}</span>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
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
              {isProcessing ? (
                <>
                  <RefreshCw size={18} className="pulse-badge" />
                  Sending MoMo USSD Prompt...
                </>
              ) : (
                `Pay UGX ${pendingSubscriptionInfo.amountUGX.toLocaleString()} Now`
              )}
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <CheckCircle size={36} />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#10b981' }}>Payment Confirmed!</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Your Mobile Money transaction was processed successfully. Access to your selected science subjects is now unlocked!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
