import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Award, CheckCircle2, XCircle, ArrowLeft, HelpCircle, RefreshCw, Layers, Zap, Star } from 'lucide-react';

// Internal Premium Glass Layout Wrapper
function GlassPanel({ children, style = {} }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.55) 0%, rgba(3, 3, 3, 0.35) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(38, 38, 38, 0.4)',
      borderRadius: '20px',
      padding: '32px',
      boxSizing: 'border-box',
      boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.5)',
      ...style
    }}>
      {children}
    </div>
  );
}

// Internal Glass Component: Metric Performance Box
function PerformanceMetric({ title, value, subtext, icon: Icon, iconColor = '#f59e0b' }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.4) 0%, rgba(5, 5, 5, 0.2) 100%)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(38, 38, 38, 0.4)',
      borderRadius: '16px',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flex: '1 1 200px',
      boxSizing: 'border-box',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
    }}>
      <div>
        <span style={{ display: 'block', fontSize: '10px', color: '#71717a', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
          {title}
        </span>
        <span style={{ display: 'block', fontSize: '26px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
          {value}
        </span>
        {subtext && (
          <span style={{ display: 'block', fontSize: '11px', color: '#52525b', marginTop: '4px', fontWeight: '500' }}>
            {subtext}
          </span>
        )}
      </div>
      {Icon && (
        <div style={{
          width: '42px', height: '42px', borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <Icon size={18} style={{ color: iconColor }} />
        </div>
      )}
    </div>
  );
}

export default function QuizTab({ notebooksList, stats, onUpdateStats }) {
  // Navigation & Retrieval State Control Loops
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [quizCards, setQuizCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  
  // Active Running Quiz Session Progress Metrics
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionIncorrect, setSessionIncorrect] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Derive static analytical insights from historical parameter hooks
  const accuracyRate = useMemo(() => {
    if (!stats || stats.totalQuizzes === 0) return 0;
    const totalAnswers = stats.correct + stats.incorrect;
    if (totalAnswers === 0) return 0;
    return Math.round((stats.correct / totalAnswers) * 100);
  }, [stats]);

  // Network Query: Securely pull dynamic flashcard arrays when notebook node shifts
  const startQuizSession = async (notebook) => {
    setIsLoadingCards(true);
    setSelectedNotebook(notebook);
    try {
      const { data: cards, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('note_id', notebook.id);

      if (error) throw error;
      
      const shuffled = (cards || []).sort(() => Math.random() - 0.5);
      setQuizCards(shuffled);
      setCurrentIdx(0);
      setRevealed(false);
      setSessionCorrect(0);
      setSessionIncorrect(0);
      setQuizCompleted(false);
    } catch (err) {
      alert(`Failed to fetch quiz dataset nodes: ${err.message}`);
    } finally {
      setIsLoadingCards(false);
    }
  };

  const handleScoreSubmission = (isCorrectAnswer) => {
    if (isCorrectAnswer) {
      setSessionCorrect(prev => prev + 1);
    } else {
      setSessionIncorrect(prev => prev + 1);
    }

    if (currentIdx + 1 >= quizCards.length) {
      setQuizCompleted(true);
      onUpdateStats({
        totalQuizzes: (stats.totalQuizzes || 0) + 1,
        correct: (stats.correct || 0) + (isCorrectAnswer ? sessionCorrect + 1 : sessionCorrect),
        incorrect: (stats.incorrect || 0) + (isCorrectAnswer ? sessionIncorrect : sessionIncorrect + 1)
      });
    } else {
      setRevealed(false);
      setCurrentIdx(prev => prev + 1);
    }
  };

  const resetWorkspaceView = () => {
    setSelectedNotebook(null);
    setQuizCards([]);
    setQuizCompleted(false);
  };

  // ==========================================
  // CONFIGURATION VIEW A: HOME SELECTION MATRIX
  // ==========================================
  if (!selectedNotebook) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', boxSizing: 'border-box', animation: 'fadeIn 0.3s ease' }}>
        
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>Active Recall Quizzes</h2>
          <p style={{ fontSize: '13px', color: '#71717a', margin: '4px 0 0 0' }}>Engage automated testing matrix parameters across compiled structures</p>
        </div>

        <section style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', width: '100%' }}>
          <PerformanceMetric title="Completed Sessions" value={stats.totalQuizzes || 0} icon={Layers} iconColor="#f59e0b" />
          <PerformanceMetric title="Global Accuracy Matrix" value={`${accuracyRate}%`} subtext={`${stats.correct || 0} correct / ${stats.incorrect || 0} incorrect`} icon={Award} iconColor="#ffffff" />
        </section>

        <GlassPanel style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#ffffff' }}>Select Target Vault</h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#71717a' }}>Choose a structural notebook asset context to launch active evaluations</p>
          </div>

          {notebooksList.length === 0 ? (
            <div style={{ padding: '40px 0', textAlign: 'center', border: '1px dashed rgba(38, 38, 38, 0.5)', borderRadius: '12px' }}>
              <HelpCircle size={24} style={{ color: '#3f3f46', marginBottom: '8px' }} />
              <p style={{ margin: 0, color: '#71717a', fontSize: '13px' }}>No configured note nodes online to pull data structures from.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', width: '100%' }}>
              {notebooksList.map((notebook) => (
                <div
                  key={notebook.id}
                  onClick={() => startQuizSession(notebook)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.01)',
                    border: '1px solid rgba(38, 38, 38, 0.4)',
                    borderRadius: '14px', padding: '20px', cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex', flexDirection: 'column', gap: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.02)';
                    e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.01)';
                    e.currentTarget.style.borderColor = 'rgba(38, 38, 38, 0.4)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <h4 style={{ margin: 0, color: '#ffffff', fontSize: '14px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {notebook.title}
                  </h4>
                  <span style={{ fontSize: '12px', color: '#52525b', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'auto' }}>
                    <Zap size={12} style={{ color: '#f59e0b' }} /> Launch Recall Routine →
                  </span>
                </div>
              ))}
            </div>
          )}
        </GlassPanel>
      </div>
    );
  }

  // ==========================================
  // CONFIGURATION VIEW B: ACTIVE RETRIEVAL PROCESSING NODE
  // ==========================================
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', boxSizing: 'border-box', animation: 'fadeIn 0.3s ease' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={resetWorkspaceView}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none',
            color: '#a1a1aa', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: 0
          }}
          onMouseEnter={(e) => e.target.style.color = '#ffffff'}
          onMouseLeave={(e) => e.target.style.color = '#a1a1aa'}
        >
          <ArrowLeft size={16} /> Exit Quiz Session
        </button>
      </div>

      {isLoadingCards ? (
        <GlassPanel style={{ textAlign: 'center', padding: '60px 20px' }}>
          <RefreshCw size={24} style={{ color: '#f59e0b', animation: 'spin 1.5s linear infinite', marginBottom: '14px' }} />
          <p style={{ margin: 0, color: '#a1a1aa', fontSize: '13px', fontWeight: '500', letterSpacing: '0.5px' }}>Compiling evaluation vectors...</p>
        </GlassPanel>
      ) : quizCards.length === 0 ? (
        <GlassPanel style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ margin: 0, color: '#a1a1aa', fontSize: '14px' }}>This selected vault location contains 0 card records. Compile cards inside your notebooks grid first.</p>
        </GlassPanel>
      ) : quizCompleted ? (
        <GlassPanel style={{ maxWidth: '540px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '28px', padding: '40px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={24} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>Evaluation Matrix Finalized</h3>
            <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#71717a' }}>Workspace metrics safely committed to your permanent analytical cloud record</p>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', width: '100%', justifyContent: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '16px 24px', borderRadius: '12px', border: '1px solid rgba(38,38,38,0.5)', minWidth: '100px' }}>
              <span style={{ display: 'block', fontSize: '11px', color: '#71717a', fontWeight: '700', textTransform: 'uppercase' }}>Passed</span>
              <span style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: '#f59e0b', marginTop: '4px' }}>{sessionCorrect}</span>
            </div>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '16px 24px', borderRadius: '12px', border: '1px solid rgba(38,38,38,0.5)', minWidth: '100px' }}>
              <span style={{ display: 'block', fontSize: '11px', color: '#71717a', fontWeight: '700', textTransform: 'uppercase' }}>Failed</span>
              <span style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: '#ef4444', marginTop: '4px' }}>{sessionIncorrect}</span>
            </div>
          </div>

          <button
            onClick={() => startQuizSession(selectedNotebook)}
            style={{
              width: '100%', padding: '14px', backgroundColor: 'rgba(245, 158, 11, 0.06)', color: '#f59e0b',
              border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '10px', fontSize: '14px', fontWeight: '700',
              cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f59e0b'; e.currentTarget.style.color = '#000000'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.06)'; e.currentTarget.style.color = '#f59e0b'; }}
          >
            Restart Evaluation Iteration
          </button>
        </GlassPanel>
      ) : (
        <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#71717a', fontWeight: '600', marginBottom: '8px', fontFamily: 'monospace' }}>
              <span>VAULT RECALL ELEMENT INDEX: {currentIdx + 1} / {quizCards.length}</span>
              <span style={{ color: '#ffffff' }}>{Math.round(((currentIdx) / quizCards.length) * 100)}%</span>
            </div>
            <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(38, 38, 38, 0.4)', borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
              <div style={{
                height: '100%', width: `${((currentIdx) / quizCards.length) * 100}%`,
                backgroundColor: '#f59e0b', borderRadius: '2px',
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 0 10px #f59e0b'
              }} />
            </div>
          </div>

          <div style={{ perspective: '1000px', width: '100%', height: '260px' }}>
            <div style={{
              width: '100%', height: '100%', position: 'relative',
              transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: revealed ? 'rotateX(180deg)' : 'none'
            }}>
              
              <div style={{
                position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden', background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.6) 0%, rgba(5, 5, 5, 0.4) 100%)',
                border: '1px solid rgba(38, 38, 38, 0.5)', borderRadius: '20px', padding: '36px',
                boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
              }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(38,38,38,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <HelpCircle size={14} style={{ color: '#f59e0b' }} />
                </div>
                <p style={{ margin: 0, fontSize: '16px', color: '#ffffff', fontWeight: '600', textAlign: 'center', lineHeight: '1.6' }}>
                  {quizCards[currentIdx]?.question}
                </p>
                
                {!revealed && (
                  <button
                    onClick={() => setRevealed(true)}
                    style={{
                      position: 'absolute', bottom: '24px', background: 'none', border: 'none',
                      color: '#f59e0b', fontSize: '12px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.2px'
                    }}
                  >
                    Reveal Core Axiom Node ↓
                  </button>
                )}
              </div>

              <div style={{
                position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden', transform: 'rotateX(180deg)',
                background: 'linear-gradient(135deg, rgba(12, 12, 12, 0.7) 0%, rgba(3, 3, 3, 0.6) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: '20px', padding: '36px',
                boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                boxShadow: '0 0 30px rgba(245,158,11,0.02)'
              }}>
                <p style={{ margin: 0, fontSize: '15px', color: '#d4d4d8', textAlign: 'center', lineHeight: '1.6' }}>
                  {quizCards[currentIdx]?.answer}
                </p>
              </div>

            </div>
          </div>

          {revealed && (
            <div style={{ display: 'flex', gap: '16px', width: '100%', animation: 'slideUp 0.25s ease' }}>
              <button
                onClick={() => handleScoreSubmission(false)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  backgroundColor: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)',
                  padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444';
                  e.currentTarget.style.color = '#ffffff'; // FIXED: Label color switches to white seamlessly on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
                  e.currentTarget.style.color = '#ef4444';
                }}
              >
                <XCircle size={16} /> Mark Incorrect
              </button>
              
              <button
                onClick={() => handleScoreSubmission(true)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  backgroundColor: 'rgba(245, 158, 11, 0.06)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)',
                  padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f59e0b';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.06)';
                  e.currentTarget.style.color = '#f59e0b';
                }}
              >
                <CheckCircle2 size={16} /> Nailed It! (Correct)
              </button>
            </div>
          )}

        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}