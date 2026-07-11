import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { sendWelcomeEmail } from '../utils/emailService';
import { Mail, Lock, User, LogIn, UserPlus, ShieldAlert, Sparkles } from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    const cleanEmail = email.trim();

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: { data: { full_name: name.trim() || 'Elite Operator' } },
        });
        if (error) throw error;
        await sendWelcomeEmail(cleanEmail);
        alert('Registration complete! Check your inbox for confirmation updates.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });
        if (error) throw error;
        
        // FIXED: Shift navigation pointer from root ('/') directly into your protected workspace canvas
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Authentication gateway structural error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#020202',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* Background Ambient Light Spheres */}
      <div style={{
        position: 'absolute', width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
        filter: 'blur(50px)', top: '15%', left: '25%', pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
        filter: 'blur(40px)', bottom: '15%', right: '25%', pointerEvents: 'none', zIndex: 0
      }} />

      {/* Main Glassmorphism Portal Card Container */}
      <div style={{
        width: '100%',
        maxWidth: '430px',
        background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.6) 0%, rgba(8, 8, 8, 0.4) 100%)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '24px',
        padding: '44px 40px',
        boxSizing: 'border-box',
        boxShadow: '0 30px 70px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
        animation: 'portalEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 1
      }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '50px', height: '50px', borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, transparent 100%)',
            border: '1px solid rgba(245, 158, 11, 0.25)', marginBottom: '16px'
          }}>
            <Sparkles size={20} style={{ color: '#f59e0b', fill: 'rgba(245, 158, 11, 0.05)' }} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
            NoteNinja
          </h1>
          <p style={{ fontSize: '13px', color: '#71717a', margin: '6px 0 0 0', fontWeight: '500' }}>
            Initialize Memory Optimization Pipeline
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            backgroundColor: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '12px', padding: '12px 16px', marginBottom: '24px',
            fontSize: '13px', color: '#ef4444', animation: 'shake 0.4s ease'
          }}>
            <ShieldAlert size={16} style={{ flexShrink: 0 }} />
            <span style={{ lineHeight: '1.4' }}>{errorMessage}</span>
          </div>
        )}

        {/* Input & Form Control Stack */}
        <form onSubmit={handleAuthAction} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {isSignUp && (
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#52525b', display: 'flex' }}>
                <User size={16} />
              </span>
              <input
                type="text"
                placeholder="Operator Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%', padding: '14px 16px 14px 46px', 
                  backgroundColor: 'rgba(15, 15, 15, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '12px', color: '#ffffff',
                  fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                  transition: 'all 0.25s ease'
                }}
                className="luxury-input"
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#52525b', display: 'flex' }}>
              <Mail size={16} />
            </span>
            <input
              type="email"
              placeholder="Identity Signature Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%', padding: '14px 16px 14px 46px', 
                backgroundColor: 'rgba(15, 15, 15, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '12px', color: '#ffffff',
                fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                transition: 'all 0.25s ease'
              }}
              className="luxury-input"
            />
          </div>

          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#52525b', display: 'flex' }}>
              <Lock size={16} />
            </span>
            <input
              type="password"
              placeholder="Vault Entry Keyphrase"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%', padding: '14px 16px 14px 46px', 
                backgroundColor: 'rgba(15, 15, 15, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '12px', color: '#ffffff',
                fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                transition: 'all 0.25s ease'
              }}
              className="luxury-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: '700',
              border: '1px solid rgba(245, 158, 11, 0.4)', 
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.04) 100%)',
              color: '#f59e0b', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', outline: 'none', marginTop: '10px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#f59e0b';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(245, 158, 11, 0.25)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.04) 100%)';
                e.currentTarget.style.color = '#f59e0b';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? (
              <span style={{ opacity: 0.6 }}>Synchronizing Portal Matrix...</span>
            ) : isSignUp ? (
              <>
                <UserPlus size={16} />
                <span>Initialize Operator Workspace</span>
              </>
            ) : (
              <>
                <LogIn size={16} />
                <span>Unlock Matrix Storage</span>
              </>
            )}
          </button>
        </form>

        {/* Dynamic Mode Switcher */}
        <div style={{ marginTop: '32px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '20px' }}>
          <button
            onClick={() => { setIsSignUp(!isSignUp); setErrorMessage(''); }}
            style={{
              background: 'none', border: 'none', color: '#52525b', fontSize: '13px',
              fontWeight: '600', cursor: 'pointer', transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#52525b'}
          >
            {isSignUp ? 'Already registered? Authenticate Credentials' : 'New operator sequence? Register Footprint'}
          </button>
        </div>

      </div>

      <style>{`
        @keyframes portalEntrance {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .luxury-input::placeholder {
          color: #3f3f46 !important;
          opacity: 1;
        }
        .luxury-input:focus {
          border-color: rgba(245, 158, 11, 0.35) !important;
          background-color: rgba(20, 20, 20, 0.8) !important;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.05);
        }
      `}</style>
    </div>
  );
}