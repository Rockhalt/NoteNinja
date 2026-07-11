import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Edit3, Check, X, Eye, Sparkles, FileText, Layers, Plus } from 'lucide-react';

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

export default function NotebooksTab({
  notebooksList,
  selectedNotebook,
  onSelectNotebook,
  onBackToList,
  generatedCards,
  currentCardIndex,
  isFlipped,
  onToggleFlip,
  onNextCard,
  onUpdateTitle,
  onDeleteNotebook,
  onUpdateSummary,
  onCreateMultiFormatNote
}) {
  // Local Interface Action Hooks
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [tempSummary, setTempSummary] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // New Note Model Configuration Hooks
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Sync temporary variables whenever active repository switches context
  useEffect(() => {
    if (selectedNotebook) {
      setTempTitle(selectedNotebook.title || '');
      setTempSummary(selectedNotebook.summary || '');
      setIsEditingTitle(false);
      setIsEditingSummary(false);
    }
  }, [selectedNotebook]);

  const saveTitleModification = () => {
    if (tempTitle.trim() && tempTitle !== selectedNotebook.title) {
      onUpdateTitle(selectedNotebook.id, tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const saveSummaryModification = () => {
    if (tempSummary.trim() !== selectedNotebook.summary) {
      onUpdateSummary(selectedNotebook.id, tempSummary.trim());
    }
    setIsEditingSummary(false);
  };

  const executeNoteGeneration = async (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    await onCreateMultiFormatNote(newTitle.trim() || "Untitled Text Node", newContent.trim(), null);
    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  // ==========================================
  // VIEW MODE A: LIST & CREATION INTERFACE
  // ==========================================
  if (!selectedNotebook) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Header Block Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>Vault Repositories</h2>
            <p style={{ fontSize: '13px', color: '#71717a', margin: '4px 0 0 0' }}>Manage structural study profiles and AI models</p>
          </div>
          <button
            onClick={() => setIsCreating(!isCreating)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: isCreating ? 'transparent' : '#f59e0b',
              color: isCreating ? '#a1a1aa' : '#000000', border: isCreating ? '1px solid rgba(38,38,38,0.8)' : 'none',
              padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {isCreating ? <X size={16} /> : <Plus size={16} />}
            {isCreating ? 'Cancel Wizard' : 'New Text Deck'}
          </button>
        </div>

        {/* Dynamic Context Creator Panel */}
        {isCreating && (
          <GlassPanel style={{ animation: 'slideDown 0.3s ease' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '700', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={16} style={{ color: '#f59e0b' }} /> AI Multi-Format Generation Deck
            </h3>
            <form onSubmit={executeNoteGeneration} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Enter workspace conceptual label (e.g., Quantum Mechanics Overview)..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{
                  width: '100%', padding: '14px 18px', backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(38, 38, 38, 0.7)', borderRadius: '10px', color: '#ffffff',
                  fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(245, 158, 11, 0.4)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(38, 38, 38, 0.7)'}
              />
              <textarea
                placeholder="Paste your raw lecture documentation, conceptual bullet arrays, or notes matrices directly here. NoteNinja will convert them instantly into cards..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
                rows={5}
                style={{
                  width: '100%', padding: '16px 18px', backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(38, 38, 38, 0.7)', borderRadius: '10px', color: '#ffffff',
                  fontSize: '14px', fontFamily: 'inherit', outline: 'none', resize: 'vertical',
                  boxSizing: 'border-box', lineHeight: '1.6', transition: 'border 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(245, 158, 11, 0.4)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(38, 38, 38, 0.7)'}
              />
              <button
                type="submit"
                style={{
                  alignSelf: 'flex-end', backgroundColor: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b',
                  border: '1px solid rgba(245, 158, 11, 0.3)', padding: '12px 24px', borderRadius: '10px',
                  fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#f59e0b'; e.target.style.color = '#000000'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.08)'; e.target.style.color = '#f59e0b'; }}
              >
                Synthesize Knowledge
              </button>
            </form>
          </GlassPanel>
        )}

        {/* Grid Array: Available Decks */}
        {notebooksList.length === 0 ? (
          <GlassPanel style={{ padding: '60px 20px', textAlign: 'center' }}>
            <FileText size={32} style={{ color: '#52525b', marginBottom: '16px' }} />
            <p style={{ color: '#a1a1aa', fontSize: '14px', margin: 0 }}>No dynamic study frameworks captured yet.</p>
          </GlassPanel>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', width: '100%' }}>
            {notebooksList.map((notebook) => (
              <div
                key={notebook.id}
                onClick={() => onSelectNotebook(notebook)}
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.5) 0%, rgba(5, 5, 5, 0.3) 100%)',
                  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(38, 38, 38, 0.4)', borderRadius: '16px',
                  padding: '24px', boxSizing: 'border-box', cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '20px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(245, 158, 11, 0.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(38, 38, 38, 0.4)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3)';
                }}
              >
                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(38,38,38,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <Layers size={16} style={{ color: '#f59e0b' }} />
                  </div>
                  <h4 style={{ margin: '0 0 6px 0', color: '#ffffff', fontSize: '16px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.4' }}>
                    {notebook.title}
                  </h4>
                  <p style={{ margin: 0, color: '#52525b', fontSize: '12px' }}>
                    Captured: {new Date(notebook.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                
                <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(38,38,38,0.3)', paddingTop: '14px', marginTop: 'auto' }}>
                  <span style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Eye size={12} style={{ color: '#f59e0b' }} /> Review Workspace
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteNotebook(notebook.id); }}
                    style={{ background: 'none', border: 'none', color: '#3f3f46', cursor: 'pointer', padding: '4px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                    onMouseLeave={(e) => e.target.style.color = '#3f3f46'}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW MODE B: ACTIVE STUDIO DECK VIEW
  // ==========================================
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', boxSizing: 'border-box', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Return Navigation Anchor Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <button
          onClick={onBackToList}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none',
            color: '#a1a1aa', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: 0,
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#ffffff'}
          onMouseLeave={(e) => e.target.style.color = '#a1a1aa'}
        >
          <ArrowLeft size={16} /> Back to Repositories
        </button>
        
        <button
          onClick={() => handleDeleteNotebook(selectedNotebook.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(239, 68, 68, 0.05)',
            color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '8px 16px',
            borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#ef4444'}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'; e.target.style.color = '#ef4444'; }}
        >
          <Trash2 size={14} /> Purge Deck Vault
        </button>
      </div>

      {/* Identity Configurations Matrix Box */}
      <GlassPanel style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
          {isEditingTitle ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1 }}>
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                style={{
                  flexGrow: 1, backgroundColor: '#000000', border: '1px solid #f59e0b',
                  borderRadius: '8px', padding: '10px 14px', color: '#ffffff', fontSize: '18px',
                  fontWeight: '700', outline: 'none'
                }}
              />
              <button onClick={saveTitleModification} style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer' }}><Check size={18} /></button>
              <button onClick={() => { setTempTitle(selectedNotebook.title); setIsEditingTitle(false); }} style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer' }}><X size={18} /></button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', overflow: 'hidden' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {selectedNotebook.title}
              </h2>
              <button
                onClick={() => setIsEditingTitle(true)}
                style={{ background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', padding: '4px', display: 'flex' }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                onMouseLeave={(e) => e.target.style.color = '#52525b'}
              >
                <Edit3 size={14} />
              </button>
            </div>
          )}
        </div>
      </GlassPanel>

      {/* Primary Split View Canvas */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap-reverse', width: '100%' }}>
        
        {/* Core Briefing Array (Left Side) */}
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column' }}>
          <GlassPanel style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Core Lecture Briefing
              </h3>
              {!isEditingSummary && (
                <button
                  onClick={() => setIsEditingSummary(true)}
                  style={{ background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#52525b'}
                >
                  <Edit3 size={12} /> Modify Context
                </button>
              )}
            </div>

            {isEditingSummary ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                <textarea
                  value={tempSummary}
                  onChange={(e) => setTempSummary(e.target.value)}
                  rows={8}
                  style={{
                    width: '100%', padding: '14px', backgroundColor: '#000000',
                    border: '1px solid #f59e0b', borderRadius: '10px', color: '#d4d4d8',
                    fontSize: '13px', lineHeight: '1.6', fontFamily: 'inherit', outline: 'none', resize: 'vertical'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
                  <button onClick={() => { setTempSummary(selectedNotebook.summary); setIsEditingSummary(false); }} style={{ backgroundColor: 'transparent', border: '1px solid rgba(38,38,38,0.8)', color: '#a1a1aa', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={saveSummaryModification} style={{ backgroundColor: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Save Changes</button>
                </div>
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '14px', color: '#a1a1aa', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                {selectedNotebook.summary || "No automated structural executive brief compiled for this note node instance."}
              </p>
            )}
          </GlassPanel>
        </div>

        {/* Studio Flashcard Deck Review Engine (Right Side) */}
        <div style={{ flex: '2 1 480px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          {generatedCards.length === 0 ? (
            <GlassPanel style={{ width: '100%', textAlign: 'center', padding: '80px 20px' }}>
              <Layers size={28} style={{ color: '#52525b', marginBottom: '12px' }} />
              <p style={{ color: '#a1a1aa', fontSize: '14px', margin: 0 }}>No dynamic structural cards mapped to this node location.</p>
            </GlassPanel>
          ) : (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
              
              {/* The Studio Interactive Card Canvas */}
              <div
                onClick={onToggleFlip}
                style={{
                  width: '100%', height: '280px', perspective: '1000px', cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '100%', height: '100%', position: 'relative',
                  transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isFlipped ? 'rotateY(180deg)' : 'none'
                }}>
                  
                  {/* FACE 1: FRONT PANEL (QUESTION ELEMENT) */}
                  <div style={{
                    position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden', background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.6) 0%, rgba(5, 5, 5, 0.4) 100%)',
                    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(38, 38, 38, 0.5)', borderRadius: '20px', padding: '36px',
                    boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
                  }}>
                    <span style={{ position: 'absolute', top: '24px', left: '28px', fontSize: '10px', color: '#71717a', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Prompt Query Node
                    </span>
                    <p style={{ margin: 0, fontSize: '18px', color: '#ffffff', fontWeight: '600', textAlign: 'center', lineHeight: '1.5' }}>
                      {generatedCards[currentCardIndex]?.question}
                    </p>
                    <span style={{ position: 'absolute', bottom: '24px', fontSize: '11px', color: '#52525b', fontWeight: '600' }}>
                      Click Surface to Reveal Answer
                    </span>
                  </div>

                  {/* FACE 2: BACK PANEL (ANSWER ELEMENT) */}
                  <div style={{
                    position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.7) 0%, rgba(0, 0, 0, 0.6) 100%)',
                    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: '20px', padding: '36px',
                    boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    boxShadow: '0 0 40px rgba(245, 158, 11, 0.03)'
                  }}>
                    <span style={{ position: 'absolute', top: '24px', left: '28px', fontSize: '10px', color: '#f59e0b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Resolved Core Axiom
                    </span>
                    <p style={{ margin: 0, fontSize: '16px', color: '#d4d4d8', textAlign: 'center', lineHeight: '1.6' }}>
                      {generatedCards[currentCardIndex]?.answer}
                    </p>
                    <span style={{ position: 'absolute', bottom: '24px', fontSize: '11px', color: '#52525b', fontWeight: '600' }}>
                      Click Surface to Return to Front
                    </span>
                  </div>

                </div>
              </div>

              {/* Action Registry Navigation Bar Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style={{ fontSize: '13px', color: '#71717a', fontFamily: 'monospace', fontWeight: '600' }}>
                  NODE FRAME: <span style={{ color: '#ffffff' }}>{currentCardIndex + 1}</span> / {generatedCards.length}
                </span>
                
                <button
                  onClick={onNextCard}
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.06)', color: '#f59e0b',
                    border: '1px solid rgba(245, 158, 11, 0.3)', padding: '10px 24px',
                    borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = '#f59e0b'; e.target.style.color = '#000000'; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.06)'; e.target.style.color = '#f59e0b'; }}
                >
                  Advance Card Stream →
                </button>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Embedded Animations Framework Injection */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}