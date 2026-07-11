import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating authentication routing for now
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard'); 
    }, 1200);
  };

  return (
    <div style={{ 
      backgroundColor: '#000000', 
      color: '#d4d4d8', 
      minHeight: '100vh', 
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      
      {/* Subtle Yellowish-Orange Premium Glow */}
      <div style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        backgroundColor: 'rgba(245, 158, 11, 0.02)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        position: 'absolute'
      }}></div>

      <div style={{ width: '100%', maxWidth: '400px', zIndex: 10 }}>
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#52525b', 
            textDecoration: 'none', 
            fontSize: '14px', 
            marginBottom: '24px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#a1a1aa'}
          onMouseLeave={(e) => e.target.style.color = '#52525b'}
        >
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div style={{ 
          backgroundColor: '#050505', 
          border: '1px solid #1c1917', 
          borderRadius: '16px', 
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>NoteNinja</h1>
            <p style={{ color: '#71717a', fontSize: '14px', margin: 0 }}>
              {isSignUp ? 'Create your elite study command center.' : 'Welcome back to your workspace.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#a1a1aa', paddingLeft: '4px' }}>Email address</label>
              <input 
                type="email" 
                required
                style={{ 
                  backgroundColor: '#000000', 
                  border: '1px solid #27272a', 
                  borderRadius: '8px', 
                  padding: '12px 16px', 
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                onBlur={(e) => e.target.style.borderColor = '#27272a'}
                placeholder="ninja@example.com"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '500', color: '#a1a1aa', paddingLeft: '4px' }}>Password</label>
              <input 
                type="password" 
                required
                style={{ 
                  backgroundColor: '#000000', 
                  border: '1px solid #27272a', 
                  borderRadius: '8px', 
                  padding: '12px 16px', 
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                onBlur={(e) => e.target.style.borderColor = '#27272a'}
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              style={{ 
                backgroundColor: '#f59e0b', 
                color: '#000000', 
                fontWeight: 'bold', 
                padding: '14px', 
                borderRadius: '8px', 
                border: 'none',
                cursor: 'pointer',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                marginTop: '8px',
                boxShadow: '0 0 15px rgba(245,158,11,0.2)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              style={{ 
                backgroundColor: 'transparent', 
                border: 'none', 
                color: '#52525b', 
                fontSize: '14px', 
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = '#52525b'}
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}